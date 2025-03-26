import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pollCommit } from "~/lib/github";


export const projectRouter=createTRPCRouter({
    createProject:protectedProcedure.input(z.object({
        name:z.string(),
        githubUrl:z.string(),
        githubToken:z.string().optional()
    })).mutation(async ({ctx, input})=>{
        const project=await ctx.db.project.findUnique({
            where:{
                githubUrl:input.githubUrl
            }
        })
        if(!project){
            const project =await ctx.db.project.create({
                data:{
                    name:input.name,
                    githubUrl:input.githubUrl,
                    users:{
                        connect:{
                            id:ctx.user.userId!,
                        }
                    }
                }
            })
            await pollCommit(project.id);
        }
        else{
            const isProjectRelationPresent=await ctx.db.user.findFirst({
                where:{
                    id:ctx.user.userId!,
                    projects:{
                        some:{
                            id:project.id
                        }
                    }
                }
            })
            if(isProjectRelationPresent){
                console.log("already present");
                return project;
            }
            else{
                await ctx.db.user.update({
                    where:{
                        id:ctx.user.userId!,
                    },
                    data:{
                        projects:{
                            connect:{
                                id:project.id
                            }
                        }
                    }
                })
            }
        }
        return project;
    }),
    getProjects:protectedProcedure.query(async({ctx})=>{
        return await ctx.db.project.findMany({
            where:{
                users:{
                    some:{
                      id:ctx.user.userId!
                    }
                }
            }
        })
    }),
    getCommits:protectedProcedure.input(z.object({
        projectId:z.string()
    })).query(async({ctx,input})=>{
        return await ctx.db.commit.findMany({where:{projectId:input.projectId}})
    })
})