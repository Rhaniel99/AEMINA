import { Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import Modal from "../Components/Modal";
import { useRoute } from "ziggy";
import UserSignup from "../Components/Forms/UserSignup";
import UserLogin from "../Components/Forms/UserLogin";

export default function Layout({ children }) {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false); // Estado para o modal de login
    const { auth } = usePage().props;

    const route = useRoute();

    const handleSuccess = () => {
        setOpen(false); // Fecha o modal de inscrição
    };

    const handleLoginOpen = () => {
        setOpen(false); // Fecha o modal de inscrição
        setLoginOpen(true); // Abre o modal de login
    };

    const HandleSignupOpen = () => {
        setOpen(true); // Abre o modal de inscrição
        setLoginOpen(false); // Fecha o modal de login
    };

    const handleClose = () => {
        setOpen(false); // Fecha o modal de inscrição
        setLoginOpen(false); // Fecha o modal de login
    };

    return (
        <>
            <header className="bg-gradient-to-t to-[#F3BD97] from-[#CB665A] shadow-md">
                <nav className="p-5 max-w-screen-lg mx-auto flex items-center">
                    <div className="flex items-center space-x-4">
                        <Link
                            className="text-[#000000] hover:bg-[#CB665A] hover:text-[#F3BD97] rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300"
                            href={route("home")}
                        >
                            Home
                        </Link>
                        <Link
                            className="text-[#000000] hover:bg-[#CB665A] hover:text-[#F3BD97] rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300"
                            href="#"
                        >
                            Galeria
                        </Link>
                        {!auth.user && (
                            <button
                                className="text-[#000000] hover:bg-[#CB665A] hover:text-[#F3BD97] rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300"
                                onClick={() => setOpen(true)}
                            >
                                Inscreva-se
                            </button>
                        )}
                    </div>

                    {/* O botão de logout é empurrado para a direita com ml-auto */}
                    {auth.user && (
                        <Link
                            href={route("login.logout")}
                            className="ml-auto text-[#000000] hover:bg-[#CB665A] hover:text-[#F3BD97] rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300"
                            method="post"
                            as="button"
                            type="button"
                        >
                            Logout
                        </Link>
                    )}
                </nav>
            </header>
            {!auth.user && (
                <Modal open={open} onClose={() => setOpen(false)}>
                    {open && ( // Verifica se o modal está aberto antes de renderizar o conteúdo
                        <section>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Crie sua conta
                                    </h1>
                                    <UserSignup
                                        onSuccess={handleSuccess}
                                        onLoginClick={handleLoginOpen}
                                    />
                                    {/* <UserSignup onSuccess={handleSuccess}/> */}
                                </div>
                            </div>
                        </section>
                    )}
                </Modal>
            )}
            ;
            {!auth.user && (
                <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
                    <section>
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Entre com a sua conta
                                </h1>

                                <UserLogin
                                    openHandleSignup={HandleSignupOpen}
                                    handleClose={handleClose}
                                />
                            </div>
                        </div>
                    </section>
                </Modal>
            )}
            ;
            <main className="max-w-screen-lg mx-auto">
                {auth.user && <h1>Você está logado como: {auth.user.name}.</h1>}

                {children}
            </main>
        </>
    );
}
