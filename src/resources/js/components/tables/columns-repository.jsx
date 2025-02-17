import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressWind from "@/components/bar/progress-wind";
import { Link } from "@inertiajs/react";

export const ColumnsRepository = ({
    // handleContentClick,
    handleDeleteClick,
}) => [
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
        header: "Responsável",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("username")}</div>
        ),
    },
    // ? Porcentual
    {
        accessorKey: "progress_upload",
        header: () => <div className="text-center">Percentual</div>,
        cell: ({ row }) => {
            return <ProgressWind progress={row.getValue("progress_upload")} />;
        },
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
                        {/*  */}
                        <Link href={route("aemina.show", [row.original.content_type, row.original.categories[0], row.original.id])}>
                            <DropdownMenuItem>
                                Visualizar
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />

                        {/* <Link href={route("aemina.edit", row.original.id)}>
                            <DropdownMenuItem>
                                Editar
                            </DropdownMenuItem>
                        </Link> */}

                        <DropdownMenuItem
                            // onClick={() => handleContentClick(content)}
                        >
                            Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => handleDeleteClick(content)}
                        >
                            Deletar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
