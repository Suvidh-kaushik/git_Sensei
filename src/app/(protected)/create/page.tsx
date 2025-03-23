'use client' 

import React from 'react'
import { Button } from "~/components/ui/button";
import { useForm } from 'react-hook-form'
import { Input } from '~/components/ui/input'
import { api } from '~/trpc/react';
import { toast } from 'sonner';

type FormInput = {
    repoUrl: string
    projectname: string
    githubToken?: string
}

export default function CreatePage() {
    const { register, handleSubmit, reset } = useForm<FormInput>();

    const createProject = api.project.createProject.useMutation();

    const onSubmit = (data: FormInput) => {
        window.alert(JSON.stringify(data)); 
        createProject.mutate({
            githubUrl : data.repoUrl,
            name: data.projectname,
        },{
            onSuccess: () => {
                toast.success("Project created successfully")
                reset()
            },
            onError: () =>{
                toast.error("Error creating project")
            }
        });
    }

    return (
        <div className="flex items-center gap-12 h-full justify-center">
            <div>
                <div className='my-3'>
                    <h1 className="font-semibold text-2xl">Github Repository Link</h1>
                    <p>Enter the URL of the repository to link to Gen Sensei</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2 flex-col'>
                    <Input
                        {...register('projectname', { required: true })}
                        placeholder="Project Name"
                        className='outline-none'
                    />
                    <Input
                        {...register('repoUrl', { required: true })}
                        placeholder="Github URL"
                        className='outline-none'
                    />
                    <Button >Create Project</Button>
                </form>
            </div>
        </div>
    )
}
