'use client'

import useGetProjects from "~/hooks/use-projects"
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

export default function CommitLog(){

    const { projectId } = useGetProjects();
    const { data } = api.project.getCommits.useQuery({ projectId });
    console.log(data);

    return (
        <ul className="space-y-6 mt-4">
            {
                data?.map((commit, idx) => {
                    return (
                        <li key={idx} className="h-fit min-w-full relative flex gap-x-4 text-sm p-1">
                            <div className="flex gap-4 w-full" >
                                <img src={commit.commitAuthorAvatar} alt="Commit Author" className="size-9 rounded-full"/>
                                <div  className="w-[100%] h-full bg-white shadow flex p-2 flex-col rounded-md">
                                    <div>
                                        <div className="flex justify-between">
                                            <p className="text-xs">{commit.commitAuthorName}</p>
                                            <p className="text-xs">{commit.commitDate.toLocaleDateString()}</p>
                                        </div>
                                        <p className="text-lg font-medium" >{commit.commitMessage}</p>
                                    </div>
                                    <div className="py-1 flex flex-col gap-1">
                                        {
                                            commit.summary.split("*").map(s => {
                                                return (
                                                    (s.length>0) && <p key={s} className="text-sm text-zinc-600">{"* "} {s}</p> 
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    );
}
