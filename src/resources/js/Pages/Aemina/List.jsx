import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { TableListMedia } from "@/components/datatables/list-media";
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenu,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import EditMedia from "@/components/dialogs/edit-media";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export default function Index({ media }) {
    const [openDialog, setOpenDialog] = useState(false); // Controla o estado do diálogo
    const [selectedContent, setSelectedContent] = useState(null); // Armazena o conteúdo selecionado

    // ? Colunas da tabela
    const columns = [
        // ? Conteúdo
        {
            accessorKey: "content_type",
            header: "Tipo de Conteúdo",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("content_type")}</div>
            ),
        },
        // ? Titulo
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Titulo
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("title")}</div>,
        },
        // ? Categorias
        {
            accessorKey: "categories",
            header: "Categorias",
            cell: ({ row }) => (
                <div className="capitalize">
                    {row.getValue("categories").join(", ")}
                </div>
            ),
        },
        // ? Nome do Responsavel
        {
            accessorKey: "username",
            header: "Responsável por Envio",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("username")}</div>
            ),
        },
        // ? Data de Lançamento
        {
            accessorKey: "release_date",
            header: () => <div className="text-right">Data de Lançamento</div>,
            cell: ({ row }) => {
                return (
                    <div className="text-right font-medium">
                        {new Date(
                            row.getValue("release_date")
                        ).toLocaleDateString()}
                    </div>
                );
            },
        },
        // ? Ações
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const content = {
                    name:
                        row.original.content_type.charAt(0).toUpperCase() +
                        row.original.content_type.slice(1),
                    title: row.original.title,
                    descricao: row.original.descricao,
                    dt_lancamento: row.original.release_date,
                    id: row.original.id,
                    categories: row.original.categories,
                };

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(item.id)
                                }
                            >
                                Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => handleContentClick(content)}
                            >
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>Deletar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    // ? Funções de Pesquisa
    const handleSearchChange = (e) => {
        const searchValue = e.target.value;

        // Atualiza o valor no formulário
        setData("search", searchValue);

        // Faz a requisição para atualizar a página, garantindo que a URL seja atualizada
        router.visit(route("aemina.list.media"), {
            method: "get",
            data: { search: searchValue },
            preserveState: true, // Preserva o estado atual da página
            preserveScroll: true, // Preserva a posição de rolagem
        });
    };

    // ? Função para abrir o diálogo
    const handleContentClick = (content) => {
        setSelectedContent(content); // Define o conteúdo selecionado
        setOpenDialog(true); // Abre o diálogo
    };

    return (
        <>
            <Head title="LISTAR" />
            <h1 className="title p-6">Lista novos Recursos</h1>

            <div className="p-6">
                <TableListMedia media={media} columns={columns} handleSearch={handleSearchChange}/>
            </div>

            {/* Diálogo separado */}
            <EditMedia
                open={openDialog}
                onOpenChange={setOpenDialog}
                content={selectedContent}
            />
        </>
    );
}
