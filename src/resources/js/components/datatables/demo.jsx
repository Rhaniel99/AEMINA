import * as React from "react";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { useForm, router } from "@inertiajs/react";

const columns = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
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
            const item = row.original;

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
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Deletar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataTableDemo({ media }) {
    const { data, setData, get } = useForm({
        search: "",
    });

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;

        // Atualiza o valor no formulário
        setData("search", searchValue);

        // Faz a requisição para atualizar a página, garantindo que a URL seja atualizada
        router.visit(route("aemina.list"), {
            method: "get",
            data: { search: searchValue },
            preserveState: true, // Preserva o estado atual da página
            preserveScroll: true, // Preserva a posição de rolagem
        });
    };

    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: media.data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            {/* Filtro e dropdown da coluna da tabela */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar por titulo..."
                    value={data.search}
                    onChange={handleSearchChange}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border">
                {/* Body da tabela */}
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Não há resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Pagination>
                        <PaginationContent>
                            {media.links.map((link) =>
                                link.url ? (
                                    <PaginationItem key={link.label}>
                                        {link.label === "Próxima" ? (
                                            <PaginationNext href={link.url} />
                                        ) : link.label === "Anterior" ? (
                                            <PaginationPrevious
                                                href={link.url}
                                            />
                                        ) : (
                                            <PaginationLink
                                                href={link.url}
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ) : (
                                    <span
                                        key={link.label}
                                        className={"p-1 mx-1 text-slate-300"}
                                    >
                                        {link.label} {">"}
                                    </span>
                                )
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
