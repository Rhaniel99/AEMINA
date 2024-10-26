import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { Plus } from 'lucide-react';
  import { Link, usePage, Head } from "@inertiajs/react";
  import Modal from "@/components/modal";
  import { useState } from "react";
  import Markdown from 'markdown-to-jsx';
  
  import NoteCreate from "@/components/forms/note/create";
// import Dialogs from '@/Components/Dialogs/Index';

export default function Index( { notes } ) {
    const { component } = usePage();
    const { auth } = usePage().props;

    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false); // Fecha o modal de inscrição
    };

    return (
        <>
            <Head title={component}/>

            <div className="fixed bottom-4 right-4">
                <button onClick={() => setOpen(true)}>
                    <Plus />
                </button>
            </div>

            {notes.data.map(note => (
                <Accordion key={note.id} type="single" collapsible>
                    <AccordionItem value={note.id}>
                        <AccordionTrigger>{note.title}</AccordionTrigger>
                        <AccordionContent>
                            <Markdown>
                                {note.content}
                            </Markdown>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}

                <Modal open={open} onClose={() => setOpen(false)}>
                    {open && ( // Verifica se o modal está aberto antes de renderizar o conteúdo
                        <section>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Cria sua notinha!
                                    </h1>

                                    <NoteCreate />
                                    {/* <NoteCreate onSuccess={handleSuccess}/> */}

                                </div>
                            </div>
                        </section>
                    )}
                </Modal>
        </>
    );
}