'use client'

import { Bot, CreditCard, LayoutDashboard, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import Link from 'next/link'; 
import { cn } from "~/lib/utils"; 
import { Button } from "~/components/ui/button";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Q&A",
        url: "/qna",
        icon: Bot
    },
    {
        title: "Billing",
        url: "/billing",
        icon: CreditCard
    }
];

const projects = [
    {
        name : "Project 1"
    },
    {
        name : "Project 2"
    },
    {
        name : "Project 3"
    },
]

export default function AppSidebar() {

    const pathname = usePathname();

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
                            projects.map(project => {
                                return (
                                    <SidebarMenuItem key={project.name}>
                                        <SidebarMenuButton asChild>
                                            <div>
                                                <div className={cn(
                                                    'rounded-sm border size-6 flex items-center justify-center text-sm bg-white text-primary',
                                                    {
                                                        'bg-primary text-white' : true
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
