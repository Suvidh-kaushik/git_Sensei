'use client'

import { Bot, CreditCard, LayoutDashboard, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import Link from 'next/link'; 
import { cn } from "~/lib/utils"; 
import { Button } from "~/components/ui/button";
import useGetProjects from "~/hooks/use-projects";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
];


export default function AppSidebar() {

    const pathname = usePathname();
    const {projects, setProjectId, projectId} = useGetProjects();

    console.log(projects)

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <h1 className="font-bold text-xl">Git Sensei</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent >
                        {
                            items.map(item => {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} className={cn({
                                                '!bg-primary !text-white': pathname === item.url
                                            }, 'list-none')}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })
                        }
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {
                            projects?.map(project => {
                                return (
                                    <SidebarMenuItem key={project.name}>
                                        <SidebarMenuButton asChild>
                                            <div onClick={() => setProjectId(project.id)}>
                                                <div className={cn(
                                                    'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',
                                                    {
                                                        'bg-primary text-white' : project.id === projectId
                                                    }
                                                )}>
                                                    {project.name[0]}
                                                </div>
                                                <span>{project.name}</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })
                        }
                        <div className="h-2"></div>
                        <SidebarMenuItem>
                            <Link href={"/create"}>
                                <Button variant={'outline'} className="w-fit">Create Project <Plus/> </Button>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarGroupContent>
                </SidebarGroup>


            </SidebarContent>
        </Sidebar>
    );
}
