import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";

export default function NoteEdit({ note, onSuccess }) {
    const route = useRoute();

    const { data, setData, post, errors, processing, reset } = useForm({
        title: note.title || "", // Preenche o título da nota
        note: note.content || "", // Preenche o conteúdo da nota
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("note.update", note.id), { // Muda para a rota de atualização
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
                    <Button variant="outline" type="submit" disabled={processing}>Salvar</Button>
                </div>
            </form>
        </>
    );
}
