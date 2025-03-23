'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import CommitLog from "./CommitLog"
import useGetProjects from '~/hooks/use-projects'
import { ExternalLink, Github } from 'lucide-react'

const page =() => {
  
  const {project} = useGetProjects();

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-3 items-center bg-black text-white w-fit p-2 rounded-md'>
        <Github/>
        <p className='text-sm'>This is the repo link {" "}
          <a href={project?.githubUrl} className='font-thin hover:underline'>{project?.githubUrl}</a>
        </p>
        
      </div>

      <div className=''>
        <h2 className='my-2 font-semibold text-xl'>Commits</h2>
        <CommitLog />
      </div>
    </div>
  )
}

export default page