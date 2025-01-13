"use client";

import { useState } from "react";
import { ChevronsUpDown, CirclePlay, GalleryVerticalEnd } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Content from "./dialogs/Content";

export function TeamSwitcher({ contents }) {
    const { isMobile } = useSidebar();
    const [openDialog, setOpenDialog] = useState(false); // Controla o estado do diálogo
    const [selectedContent, setSelectedContent] = useState(null); // Armazena o conteúdo selecionado

    const handleContentClick = (content) => {
        setSelectedContent(content); // Define o conteúdo selecionado
        setOpenDialog(true); // Abre o diálogo
    };

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                asChild
                            >
                                <a>
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <CirclePlay className="size-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">
                                            Aemina
                                        </span>
                                        <span className="truncate text-xs">
                                            Filmes | Séries | Anime
                                        </span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto" />
                                </a>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            align="start"
                            side={isMobile ? "bottom" : "right"}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Cadastro de Conteúdo
                            </DropdownMenuLabel>
                            {contents.map((content, index) => (
                                <DropdownMenuItem
                                    key={content.name}
                                    onClick={() => handleContentClick(content)}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-sm border">
                                        <content.logo className="size-4 shrink-0" />
                                    </div>
                                    {content.name}
                                    <DropdownMenuShortcut>
                                        ⌘{index + 1}
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>

            {/* Diálogo separado */}
            <Content
                open={openDialog}
                onOpenChange={setOpenDialog}
                content={selectedContent}
            />
        </>
    );
}
