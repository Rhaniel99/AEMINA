import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

// import Dialogs from '@/Components/Dialogs/Index';

export default function Index( { notes } ) {
    return (
        <>
            <h1>Chegou em notas</h1>

            {/* <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            </Accordion> */}



            <div>
            {notes.data.map(note => (
                <Accordion key={note.id} type="single" collapsible>
                    <AccordionItem value={note.id}>
                    <AccordionTrigger>{note.title}</AccordionTrigger>
                    <AccordionContent>
                        {note.content_html}
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
                ))}
            </div>
        </>
    );
}