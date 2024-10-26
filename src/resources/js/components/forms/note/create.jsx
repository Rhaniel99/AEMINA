import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

export default function NoteCreate() {
    const { data, setData, post, errors, processing, reset } = useForm({
        titulo: "",
        nota: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("note.store"), {
            onSuccess: () => {
                onSuccess();
                reset("titulo", "nota");
            },
            onError: () => {
                // Não fechar o modal caso haja erros de validação
                console.log("Erros de validação detectados.");
            },
        });
    };

    return (
        <>
            <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="titulo">Titulo</Label>
                    <Input
                        name="titulo"
                        id="titulo"
                        placeholder="Digite o titulo"
                        value={data.titulo}
                        onChange={(e) => setData("titulo", e.target.value)}
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="nota">Nota</Label>
                    <Textarea
                        placeholder="Digite sua nota aqui"
                        id="nota"
                        name="nota"
                        value={data.nota}
                        onChange={(e) => setData("nota", e.target.value)}
                    />
                </div>

                <div className="fixed bottom-4 right-4">
                    <Button variant="outline">Salvar</Button>
                </div>
            </form>
        </>
    );
}
