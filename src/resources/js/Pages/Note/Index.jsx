import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { Plus, SquarePen, Trash2 } from "lucide-react";
import { Link, usePage, Head } from "@inertiajs/react";
import Modal from "@/components/modal";
import { useState } from "react";
import Markdown from "markdown-to-jsx";
import NoteCreate from "@/components/forms/note/create";
import NoteEdit from "@/components/forms/note/edit";
import NoteDelete from "@/components/forms/note/delete";

export default function Index({ notes }) {
    const { component } = usePage();

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const [currentNote, setCurrentNote] = useState(null); // Estado para armazenar a nota atual

    const handleSuccess = () => {
        setOpen(false); // Fecha o modal de criação
    };

    const handleSuccessEdit = () => {
        setOpenEdit(false); // Fecha o modal de edição
    };

    const handleSuccessDelete = () => {
        setOpenDelete(false); // Fecha o modal de exclusão
    };

    const handleEditClick = (note) => {
        setCurrentNote(note); // Define a nota atual para edição
        setOpenEdit(true); // Abre o modal de edição
    };

    const handleDeleteClick = (note) => {
        setCurrentNote(note); // Define a nota atual para exclusão
        setOpenDelete(true); // Abre o modal de exclusão
    };

    return (
        <>
            <Head title={component} />

            {/* Adicionar uma nova nota */}
            <div className="fixed bottom-4 right-4">
                <button
                    onClick={() => setOpen(true)}
                    className="rounded-full border-color border-2 p-2"
                >
                    <Plus />
                </button>
            </div>

            {/* Acordeões */}
            <div className="flex justify-center">
                <div className="flex flex-col items-center mr-4 w-1/2">
                    {notes.data.slice(0, 5).map((note) => (
                        <div className="flex flex-row gap-2 mb-2" key={note.id}>
                            <Accordion type="single" collapsible>
                                <AccordionItem value={note.id}>
                                    <AccordionTrigger>
                                        {note.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {note.content ? (
                                            <Markdown>{note.content}</Markdown>
                                        ) : (
                                            ""
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <button onClick={() => handleEditClick(note)}>
                                <SquarePen />
                            </button>
                            <button onClick={() => handleDeleteClick(note)}>
                                <Trash2 />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center w-1/2">
                    {notes.data.slice(5, 10).map((note) => (
                        <div className="flex flex-row gap-2 mb-2" key={note.id}>
                            <Accordion type="single" collapsible>
                                <AccordionItem value={note.id}>
                                    <AccordionTrigger>
                                        {note.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {note.content ? (
                                            <Markdown>{note.content}</Markdown>
                                        ) : (
                                            ""
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            <button onClick={() => handleEditClick(note)}>
                                <SquarePen />
                            </button>
                            <button>
                                <Trash2 />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Paginação Footer */}
            <div className="py-12 px-4 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        {notes.links.map((link) =>
                            link.url ? (
                                <PaginationItem key={link.label}>
                                    {link.label === "Próxima" ? (
                                        <PaginationNext href={link.url} />
                                    ) : link.label === "Anterior" ? (
                                        <PaginationPrevious href={link.url} />
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

            {/* Modal de criação */}
            <Modal open={open} onClose={() => setOpen(false)}>
                {open && ( // Verifica se o modal está aberto antes de renderizar o conteúdo
                    <section>
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Cria sua notinha!
                                </h1>

                                {/* <NoteCreate /> */}
                                <NoteCreate onSuccess={handleSuccess} />
                            </div>
                        </div>
                    </section>
                )}
            </Modal>
            {/* Modal de edição */}
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                {openEdit &&
                    currentNote && ( // Verifica se o modal está aberto e se há uma nota atual
                        <section>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Edite sua notinha!
                                    </h1>
                                    <NoteEdit
                                        note={currentNote} // Passa a nota atual para o componente de edição
                                        onSuccess={handleSuccessEdit}
                                    />
                                </div>
                            </div>
                        </section>
                    )}
            </Modal>
            {/* Modal de delete */}
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
                {openDelete &&
                    currentNote && ( // Verifica se o modal está aberto e se há uma nota atual
                        <section>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Tem certeza que deseja deletar essa
                                        notinha?
                                    </h1>
                                    <NoteDelete
                                        note={currentNote} // Passa a nota atual para o componente de edição
                                        onSuccess={handleSuccessDelete}
                                    />
                                </div>
                            </div>
                        </section>
                    )}
            </Modal>
        </>
    );
}
