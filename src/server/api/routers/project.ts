import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


export const projectRouter=createTRPCRouter({
    createProject:protectedProcedure.input(z.object({
        name:z.string(),
        githubUrl:z.string(),
        githubToken:z.string().optional()
    })).mutation(async ({ctx, input})=>{
        const project =await ctx.db.project.create({
            data:{
                name:input.name,
                githubUrl:input.githubUrl,
                authorId:ctx.user.userId!,

            }
        })
        return project
    }),
    getProjects:protectedProcedure.query(async({ctx})=>{
        return await ctx.db.project.findMany({
            where:{
                authorId:ctx.user.userId!,
                isDeleted:false
            }
        })
    })
})