import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
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

import Content from "@/components/dialogs/Content";

export function TableMediaList({ media, columns, search, handleSearch, data }) {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});

    const [openDialog, setOpenDialog] = React.useState(false); // Controla o estado do diálogo
    const [selectedContent, setSelectedContent] = React.useState(null); // Armazena o conteúdo selecionado

    const handleContentClick = (content) => {
        setSelectedContent(content); // Define o conteúdo selecionado
        setOpenDialog(true); // Abre o diálogo
    };

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
        <>
            <div className="w-full">
                {/* Filtro e dropdown da coluna da tabela */}
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filtrar por titulo..."
                        value={search}
                        onChange={handleSearch}
                        className="max-w-sm bg-[#D9CDBF] text-black py-2 px-4 border-b"
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Novo <ChevronDown />
                            </Button>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                className="capitalize"
                                onClick={() => handleContentClick("Filme")}
                            >
                                Filme
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                className="capitalize"
                                onClick={() => console.log("Nova Série")}
                            >
                                Série
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                className="capitalize"
                                onClick={() => console.log("Novo Anime")}
                            >
                                Anime
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-4">
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
                
                <div className="rounded-md border bg-[#D9CDBF]">
                    {/* Body da tabela */}
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="bg-[#402E1F] text-white py-2 px-4 border-b">
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

                        <TableBody >
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        className="hover:bg-[#735848]"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className={`py-2 px-4 border-b ${
                                                cell.row.index % 2 === 0 
                                                  ? 'bg-[#D9CDBF]' 
                                                  : 'bg-[#BFAC9B]'
                                              }`}>
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
                                        className="h-24 text-center text-[#402E1F]"
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
                                            <PaginationItem
                                                key={link.label}
                                                className={`rounded-full ${
                                                    link.active
                                                        ? 'bg-[#402E1F] text-white'
                                                        : 'bg-[#A6907C] hover:bg-[#735848]'
                                                }`}
                                            >
                                                {link.label === "Próxima" ? (
                                                    <PaginationNext
                                                        href={link.url}
                                                        className="text-[#402E1F]"
                                                    />
                                                ) : link.label === "Anterior" ? (
                                                    <PaginationPrevious
                                                        href={link.url}
                                                        className="text-[#402E1F]"
                                                    />
                                                ) : (
                                                    <PaginationLink
                                                        href={link.url}
                                                        isActive={link.active}
                                                        className="text-[#402E1F]"
                                                    >
                                                        {link.label}
                                                    </PaginationLink>
                                                )}
                                            </PaginationItem>
                                        ) : (
                                            <span
                                                key={link.label}
                                                className="p-1 mx-1 text-[#735848]"
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

            <Content
                open={openDialog}
                onOpenChange={setOpenDialog}
                content={selectedContent}
            />
        </>
    );
}
