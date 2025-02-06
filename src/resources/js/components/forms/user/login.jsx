import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { router } from "@inertiajs/react";

export default function LoginForm() {
    const { data, setData, post, processing, reset } = useForm({
            email: "",
            senha: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("login.store"), {
            onSuccess: () => {
                reset("email", "senha"); // Resetar os dados do formulário
            },
            onError: () => {
                // Não fechar o modal caso haja erros de validação
                console.log("Erros de validação detectados.");
            },
        });
    }

    const handleGoogleLogin = () => {
        // route("auth.google")
        window.location.href = route("auth.google");
    };

    return (
        <>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        className="bg-[#A6907C] text-[#402E1F] placeholder-[#735848]"
                    />
                </div>
                <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.senha}
                        onChange={(e) => setData("senha", e.target.value)}
                        required
                        className="bg-[#A6907C] text-[#402E1F] placeholder-[#735848]"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-[#735848] hover:bg-[#402E1F] text-[#D9CDBF]"
                >
                    Entrar
                </Button>
                <div className="text-center">
                    <a
                        href="#"
                        className="text-sm text-[#402E1F] hover:text-[#735848]"
                    >
                        Esqueceu a senha?
                    </a>
                </div>
                <div className="flex space-x-4">
                    <Button
                        type="button"
                        className="flex-1 bg-[#735848] hover:bg-[#402E1F] text-[#D9CDBF]"
                        // href={route("auth.google")}
                        onClick={handleGoogleLogin}
                    >
                        <FaGoogle className="mr-2" /> Google
                    </Button>
                    <Button
                        type="button"
                        className="flex-1 bg-[#735848] hover:bg-[#402E1F] text-[#D9CDBF]"
                        onClick={() => console.log("Facebook login")}
                    >
                        <FaFacebook className="mr-2" /> Facebook
                    </Button>
                </div>
            </form>
        </>
    );
}
