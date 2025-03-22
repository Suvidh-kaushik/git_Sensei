import { api } from "~/trpc/react"
import { useLocalStorage } from 'usehooks-ts'

export const useGetProjects=()=>{
 const {data:projects} =api.project.getProjects.useQuery();
 const [projectId,setProjectId]=useLocalStorage('git_Sensei',' ');
 const project=projects?.find(project => project.id === projectId);
 return {
    projects,
    projectId,
    project
 }
}

//created this hook original name is use-project
//make the next hook , ask for any queries

export default useGetProjects
