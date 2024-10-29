import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

export default function NoteCreate( { onSuccess }) {
    const { data, setData, post, errors, processing, reset } = useForm({
        title: "",
        note: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("note.store"), {
            onSuccess: () => {
                onSuccess();
                reset("title", "note");
            },
            onError: () => {
                console.log("Erros de validação detectados.");
            },
        });
    };

    return (
        <>
            <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Titulo</Label>
                    <Input
                        name="title"
                        id="title"
                        placeholder="Digite o titulo"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="note">Nota</Label>
                    <Textarea
                        placeholder="Digite sua nota aqui"
                        id="note"
                        name="note"
                        value={data.note}
                        onChange={(e) => setData("note", e.target.value)}
                    />
                </div>

                <div className="flex justify-end mt-4">                    
                    <Button variant="outline">Salvar</Button>
                </div>
            </form>
        </>
    );
}

