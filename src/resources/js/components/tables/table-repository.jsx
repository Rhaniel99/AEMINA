export function TableRepository({ media, columns, search, handleSearch }) {
    const table = useReactTable({
        data: media.data,
        columns,
        // ... other table configurations
    });

    const handleEdit = (row) => {
        // Handle edit action
    };

    const handleDelete = (row) => {
        // Handle delete action
    };

    return (
        <div className="w-full overflow-hidden rounded-lg border">
            <TableHeader columns={columns} />
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            row={row}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <TableRow colSpan={columns.length}>
                        No results found
                    </TableRow>
                )}
            </TableBody>
            <TablePagination pagination={table.pagination} />
        </div>
    );
}