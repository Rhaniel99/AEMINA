export function TableActions({ openDialog, selectedContent }) {
    return (
        <div className="flex gap-2">
            <Button onClick={() => openDialog(selectedContent)}>
                <span className="sr-only">Open Content</span>
            </Button>
        </div>
    );
}

