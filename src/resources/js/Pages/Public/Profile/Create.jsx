import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRoute } from "ziggy";

export default function Index() {
    const { auth } = usePage().props;

    const route = useRoute();

    const { data, setData, post } = useForm({
        name: "",
        avatar: null,
        is_kids: false,
    });

    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("avatar", file);

            // Cria um preview da imagem
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.store", auth.user.id));
    };

    return (
        <Dialog open>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Perfil</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar um perfil
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Usuário
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="picture" className="text-right">
                            Avatar
                        </Label>
                        <Input
                            id="picture"
                            type="file"
                            className="col-span-3"
                            onChange={handleFileChange}
                        />
                    </div>

                    {preview && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <div className="col-span-4 flex justify-center">
                                <img
                                    src={preview}
                                    alt="Preview do Avatar"
                                    className="w-32 h-32 rounded-full object-cover border"
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
