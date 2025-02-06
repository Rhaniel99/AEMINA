import { useState, useRef } from "react";
// import { Inertia } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Upload, LogOut } from "lucide-react";
import logo from "/public/img/logo/aemina.png";
import { router } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";

export default function CreateProfile() {
    const { auth } = usePage().props;

    const { data, setData, post } = useForm({
        name: "",
        avatar: null,
        is_kids: false,
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setData("avatar", file);
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleExit = () => {
        // Handle logout logic here
        router.post("/logout");
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.store", auth.user.id));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D9CDBF] p-4 relative">
            <Button
                variant="ghost"
                onClick={handleExit}
                className="absolute top-4 right-4 text-[#402E1F] hover:text-[#735848]"
            >
                <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>

            <Card className="w-full max-w-md bg-[#BFAC9B]">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <img
                            src={logo}
                            alt="Aemina Logo"
                            width={200}
                            height={60}
                        />
                    </div>
                    <CardTitle className="text-2xl text-center text-[#402E1F]">
                        Criar Perfil
                    </CardTitle>
                    <CardDescription className="text-center text-[#735848]">
                        Escolha um nome e carregue um avatar para seu perfil
                    </CardDescription>
                </CardHeader>
                <form onSubmit={submit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-[#402E1F]"
                            >
                                Nome do Perfil
                            </Label>
                            <Input
                                id="name"
                                value={data.name}

                                // value={profileName}
                                onChange={(e) => setData("name", e.target.value)}

                                // onChange={(e) => setProfileName(e.target.value)}
                                required
                                className="bg-[#A6907C] text-[#402E1F] placeholder-[#735848]"
                                placeholder="Digite o nome do perfil"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[#402E1F]">
                                Carregar Avatar
                            </Label>
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-32 h-32 rounded-full overflow-hidden bg-[#A6907C] flex items-center justify-center cursor-pointer"
                                    onClick={triggerFileInput}
                                >
                                    {avatarPreview ? (
                                        <img
                                            src={
                                                avatarPreview ||
                                                "/placeholder.svg"
                                            }
                                            alt="Avatar preview"
                                            width={128}
                                            height={128}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <Upload className="w-12 h-12 text-[#735848]" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={triggerFileInput}
                                    className="mt-2 border-[#735848] text-[#402E1F] hover:bg-[#735848] hover:text-[#D9CDBF]"
                                >
                                    {avatarFile
                                        ? "Alterar Avatar"
                                        : "Carregar Avatar"}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full space-y-2">
                            <Button
                                type="submit"
                                className="w-full bg-[#735848] hover:bg-[#402E1F] text-[#D9CDBF]"
                                disabled={!data.name || !avatarFile}
                            >
                                Criar Perfil
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get("/index-profile")}
                                className="w-full border-[#735848] text-[#402E1F] hover:bg-[#735848] hover:text-[#D9CDBF]"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
