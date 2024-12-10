import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Link, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import UserSignup from "@/components/forms/user/signup";

export function LoginForm() {
    const route = useRoute();
    const { flash } = usePage().props;

    // ? Controle Modal de Criar
    const [open, setOpen] = useState(false);
    // ? Controle Modal de Esqueci
    const [openForgout, setOpenForgout] = useState(false);

    const { data, setData, post, errors, processing, reset } = useForm({
        email: "",
        senha: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("login.store"), {
            onSuccess: () => {
                reset("email", "senha");
            },
            onError: () => {
                // Não fechar o modal caso haja erros de validação
                console.log("Erros de validação detectados.");
            },
        });
    }

    // ? Fechar Modal de Criar
    const handleSuccess = () => {
        setOpen(false);
    };

    // ? Fechar Modal de Esqueci a Senha
    const handleSuccessForgout = () => {
        setOpenForgout(false);
    };

    // ? Exibe mensagem flash de erro
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.message) {
            const [message, timestamp] = flash.message.split("|");

            toast.error(message, {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 3000, // Fecha em 3 segundos
            });

            reset("senha");
        }

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                toast.warn(error, {
                    position: "top-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 3000,
                    // autoClose: false, // Não fecha automaticamente
                    className: "bg-yellow-500 text-black", // Estilo personalizado para erros de validação
                });

                reset("senha");
            });
        }
    }, [flash.message, flash.success, errors]);

    return (
        <>
            <Card className="mx-auto max-w-sm">
                <ToastContainer />

                <CardHeader>
                    <CardTitle className="text-2xl">Aemina</CardTitle>
                    <CardDescription>
                        Insira seu email abaixo para logar na sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="user.aemina@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    <button type="button"
                                        onClick={() => setOpenForgout(true)}
                                        className="ml-auto inline-block text-sm underline"
                                    >
                                        Esqueceu sua senha?
                                    </button>
                                </div>
                                <Input
                                    id="senha"
                                    name="senha"
                                    type="password"
                                    value={data.senha}
                                    onChange={(e) =>
                                        setData("senha", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Entrar
                            </Button>
                            <Button variant="outline" className="w-full">
                                Entrar com o Google
                            </Button>
                        </div>
                    </form>

                    <div className="mt-4 text-center text-sm">
                        Não tem uma conta?{" "}
                        <button
                            onClick={() => setOpen(true)}
                            className="underline"
                        >
                            Inscrever-se
                        </button>
                    </div>
                </CardContent>
            </Card>

            <Modal open={open} onClose={() => setOpen(false)}>
                {open && ( // Verifica se o modal está aberto antes de renderizar o conteúdo
                    <section>
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Crie sua conta
                                </h1>

                                <UserSignup onSuccess={handleSuccess} />
                            </div>
                        </div>
                    </section>
                )}
            </Modal>


            <Modal open={openForgout} onClose={() => setOpenForgout(false)}>
                {openForgout && ( // Verifica se o modal está aberto antes de renderizar o conteúdo
                    <section>
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Recuperar senha 
                                </h1>

                                {/* <UserSignup onSuccess={handleSuccess} /> */}
                            </div>
                        </div>
                    </section>
                )}
            </Modal>
        </>
    );
}
