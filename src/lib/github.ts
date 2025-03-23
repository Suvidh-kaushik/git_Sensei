import {Octokit} from "octokit";
import { db } from "~/server/db";
import axios from "axios"
import { summarizeCommit } from "./gemini";

export const octokit=new Octokit({
    auth:process.env.GITHUB_TOKEN,
});

const githubUrl="https://github.com/Suvidh-kaushik/chat_application" //hardcoded commit value 

type Response={
    commitHash:string,
    commitMessage:string,
    commitAuthorName:string,
    commitAuthorAvatar:string,
    commitDate:Date,
}

export const getCommitHashes=async (githubUrl:string):Promise<Response[]>=>{
  const [owner,repo]=githubUrl.split('/').slice(-2)
  if(!owner || !repo){
    throw new Error("invalid url");
  }
  const {data}=await octokit.rest.repos.listCommits({
    owner,
    repo
  })
  //https://github.com/docker/genai-stack --- https://github.com/owner/repo

  const sortedCommits=data.sort((a:any,b:any)=> new Date(b.commit.author.date).getTime()-new Date(a.commit.author.date).getTime()) as any[]
  return sortedCommits.slice(0,10).map((commit:any)=>({
    commitHash:commit.sha as string,
    commitMessage:commit.commit.message ?? "",
    commitAuthorName:commit.commit.author?.name ?? "",
    commitAuthorAvatar:commit.author?.avatar_url ?? "",
    commitDate:commit.commit.author?.date ?? ""
  }))
}

export const pollCommit = async (projectId:string)=>{
  const {project,githubUrl}=await fetchProjectGithubUrl(projectId);
  const commitHashes=await getCommitHashes(githubUrl);
  const unprocessedCommits=await filterUnProcessedCommits(projectId,commitHashes);
  const summaryResponses=await Promise.allSettled(unprocessedCommits.map(commit=>{
    return summarizeHashes(githubUrl,commit.commitHash)
  }))

  const summaries=summaryResponses.map((response)=>{
    if(response.status === "fulfilled"){
        return response.value as unknown as string   //an error might come 
    }
    return ""
  })

  const commits=await db.commit.createMany({
    data: summaries.map((summary, index) => {
        return {
          projectId,
          commitHash: unprocessedCommits[index]!.commitHash,
          commitMessage: unprocessedCommits[index]!.commitMessage,
          commitDate: unprocessedCommits[index]!.commitDate,
          commitAuthorName: unprocessedCommits[index]!.commitAuthorName,
          commitAuthorAvatar: unprocessedCommits[index]!.commitAuthorAvatar,
          summary,
        };
      }),
    })
    return commits;
}


async function summarizeHashes(githubUrl:string,commitHash:string){
    //repourl/commit/commitHash.diff --- gives the difference and all changes for a commit 
    const {data}=await axios.get(`${githubUrl}/commit/${commitHash}.diff`,{
        headers:{
            Accept:'application/vnd.github.v3.diff'
        }
    })
  return await summarizeCommit(data) || "sorry please try again laster"
}

async function fetchProjectGithubUrl(projectId:string){
    const project = await db.project.findUnique({
        where:{
           id:projectId
        },
        select:{
           githubUrl:true
        }
   })
   if(!project?.githubUrl){
    throw new Error("Porject has no github url")
   }
   return {project,githubUrl:project?.githubUrl};
}

async function filterUnProcessedCommits(projectId:string,commitHashes:Response[]){
    const proccessedCommits= await db.commit.findMany({
        where:{projectId}
    })

    const unprocessedCommits=commitHashes.filter((commit)=> !proccessedCommits.some((proccessedCommits)=>proccessedCommits.commitHash===commit.commitHash));
    return unprocessedCommits;
}


