import { useState } from "react";

export function useDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const openDialog = (item) => {
        setContent(item);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setContent(null);
        setIsOpen(false);
    };

    return { isOpen, content, openDialog, closeDialog };
}
