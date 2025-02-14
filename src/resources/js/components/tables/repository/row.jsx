export function TableRow({ row, handleEdit, handleDelete }) {
    return (
        <tr key={row.id} className="hover:bg-[#735848]">
            {row.cells.map((cell) => (
                <td key={cell.id} className="py-2 px-4 border-b">
                    {cell.render}
                </td>
            ))}
            <td className="py-2 px-4 border-b">
                <div className="flex gap-2">
                    <Button onClick={() => handleEdit(row)}>
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button onClick={() => handleDelete(row)}>
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            </td>
        </tr>
    );
}