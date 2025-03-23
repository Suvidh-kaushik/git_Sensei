import {GoogleGenerativeAI} from "@google/generative-ai"
import 'dotenv/config';
import axios from "axios"
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model=genAI.getGenerativeModel({
    model:"gemini-2.0-flash"
})

export const summarizeCommit=async(diff:string)=>{
    const res = await model.generateContent([
        `You are an expert programmer, and you are trying to summarize a git diff.
  Reminders about the git diff format:
  For every file, there are a few metadata lines, like (for example):
  \`\`\`
  diff --git a/lib/index.js b/lib/index.js
  index aadf691..bfef603 100644
  --- a/lib/index.js
  +++ b/lib/index.js
  \`\`\`
  This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
  Then there is a specifier of the lines that were modified.
  A line starting with \`+\` means it was added.
  A line that starting with \`-\` means that line was deleted.
  A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.
  It is not part of the diff.
  [...]
  EXAMPLE SUMMARY COMMENTS:
  \`\`\`
  * Raised the amount of returned recordings from \`10\` to \`100\`  [packages/server/recordings_api.ts, packages/server/constants.ts]
  * Fixed a typo in the github action name [github/workflows/gpt-commit-summarizer.yml]
  * Moved the \`octokit\` initialization to a separate file [src/octokit.ts, src/index.ts]
  * Added an OpenAI API for completions [packages/utils/apis/openai.ts]
  * Lowered numeric tolerance for test files
  \`\`\`
  Most commits will have less comments than this examples list.
  The last comment does not include the file names, because there were more than two relevant files in the hypothetical commit.
  Only include file names if there are two or less files that were modified.
  Do not include parts of the example in your summary.
  It is given only as an example of appropriate comments.`,
        `Please summarise the following diff file in 150 words: \n\n${diff}`,
      ]);
 return res.response.text();
}


const answerQuestionRegCommit=async(commitHash:string,githubUrl:string,question:string)=>{
    const {data:diff}=await axios.get(`${githubUrl}/commit/${commitHash}.diff`,{
        headers:{
            Accept:'application/vnd.github.v3.diff'
        }
    })
    const res = await model.generateContent([
        `You are an expert programmer, software architect, and GitHub repository maintainer. Your task is to analyze a Git diff provided as context and accurately answer any question related to the changes made in that commit.
        
        ## **Understanding the Git Diff Format:**
        - A diff file contains the changes made in a commit.
        - Lines starting with \`+\` indicate additions.
        - Lines starting with \`-\` indicate deletions.
        - Lines that start with neither \`+\` nor \`-\` are context lines that provide better understanding but are not part of the change.
        - Metadata block example:
        \`\`\`
        diff --git a/src/routes/api.ts b/src/routes/api.ts
        index abc123..def456 100644
        --- a/src/routes/api.ts
        +++ b/src/routes/api.ts
        \`\`\`
        This block indicates that \`src/routes/api.ts\` was modified.
      
        ##**Guidelines for Answering Questions:**
        - Carefully analyze the diff provided as context.
        - Answer the question based on the changes in the diff.
        - If the question asks about security, performance, refactoring, or feature additions, explain how the commit impacts these aspects.
        - If the answer cannot be derived from the diff, explicitly state:
          \`\`\`
          The provided diff does not contain relevant changes to answer this question. Please review the full repository for more context.
          \`\`\`
      
        ## **Example Input and Response Format:**
        ---
        ### Input:
        **Diff:**
        \`\`\`
        diff --git a/src/routes/user.ts b/src/routes/user.ts
        index abc123..def456 100644
        --- a/src/routes/user.ts
        +++ b/src/routes/user.ts
        @@ -32,7 +32,9 @@
        -  const user = await getUserByEmail(req.body.email);
        +  const user = await getUserByEmail(req.body.email.toLowerCase());
           if (!user) {
             return res.status(404).send({ error: "User not found" });
           }
        +  if (!validateEmail(req.body.email)) {
        +    return res.status(400).send({ error: "Invalid email format" });
        +  }
        \`\`\`
      
        **Question:**
        "Did this commit fix a security vulnerability?"
      
        ---
        ### Expected Response:
        **Yes.** This commit improves security by adding input validation for email format and converting the email to lowercase to prevent case-sensitive mismatches. These changes reduce the risk of SQL injection and ensure data consistency.
        ---
        
        ## **Additional Guidelines:**
        - Provide answers with technical accuracy but avoid verbosity.
        - Be precise when explaining the impact of changes.
        - Avoid speculating beyond the scope of the provided diff.
        - If the diff modifies multiple files, consider the overall impact.
      
        ---
        `,
        `##  **Context:**
        Here’s the Git diff:
        \`\`\`
        ${diff}
        \`\`\`
      
        ## ❓ **Question:**
        ${question}
      
        --- **Please provide a concise and relevant answer based on the diff provided of 800 words assuming i am a junior and new developer.**`,
      ]);
    return res.response.text();
}
