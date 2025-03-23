'use client'

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../../components/ui/sheet";
import { ArrowBigRight } from "lucide-react";
import { useState } from "react";
import useGetProjects from "~/hooks/use-projects";
// import { answerQuestionRegCommit } from "../../../lib/gemini";


export default function CommitCard({commitHash} : {commitHash : string}) {

    const [query, setQuery] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const {project} = useGetProjects();

    async function getResponse(e: any) {
        e.preventDefault();
        if (project) {
            console.log(query)
            console.log(project.githubUrl)
            console.log(commitHash);

            // const res = await answerQuestionRegCommit(commitHash, project.githubUrl, query);
            // console.log(res);

            // setResponse(res)
        }
    }
    

    return (
        <SheetContent className="h-screen w-1/2">
            <SheetHeader className="h-11/12 "> 
                <div>
                    {response}
                </div>
            </SheetHeader>
            <div className="px-4 flex items-center justify-center mb-4 h-1/12 gap-2">
                <Input placeholder="Ask your query" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <Button onClick={getResponse}>
                    <ArrowBigRight/>
                </Button>
            </div>
        </SheetContent>
    );
}


