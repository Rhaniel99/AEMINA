export function TableHeader({ columns }) {
    return (
        <thead>
            {columns.map((column) => (
                <tr key={column.id}>
                    <th className="px-4 py-2 text-left">{column.header}</th>
                </tr>
            ))}
        </thead>
    );
}