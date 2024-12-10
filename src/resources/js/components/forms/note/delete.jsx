import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";

export default function NoteDelete({ note, onSuccess }) {
    const route = useRoute();
    const { delete: destroy } = useForm({});
    const submit = (e) => {
        e.preventDefault();
        destroy( route( "note.destroy", note.id ), {
            // Muda para a rota de atualização
            onSuccess: () => {
                onSuccess();
            },
            onError: () => {
                console.log("Erros de validação detectados.");
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="flex justify-center gap-4 pt-4">
                {/* Botão Cancelar */}
                <Button variant="outline" type="button" onClick={onSuccess}>
                    Cancelar
                </Button>

                {/* Botão Confirmar */}
                <Button variant="destructive" type="submit">
                    Confirmar
                </Button>
            </div>
        </form>
    );
}
