import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

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

export function TableRepository({ media, columns }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

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
            <div className="w-full z-0 mt-2">
                {/* Body da tabela */}
                <Table className="rounded-md border bg-[#D9CDBF]">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="bg-[#402E1F] text-white py-2 px-4 border-b"
                                    >
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
                                    className="hover:bg-[#735848]"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={`py-2 px-4 border-b ${
                                                cell.row.index % 2 === 0
                                                    ? "bg-[#D9CDBF]"
                                                    : "bg-[#BFAC9B]"
                                            }`}
                                        >
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
                                                    ? "bg-[#402E1F] text-white"
                                                    : "bg-[#A6907C] hover:bg-[#735848]"
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
        </>
    );
}
