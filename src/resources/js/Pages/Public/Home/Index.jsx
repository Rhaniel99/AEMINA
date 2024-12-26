import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { usePage } from "@inertiajs/react";
import HomeCard from "@/components/cards/Home/Index";
import UserLogin from "@/components/forms/user/login";
import UserSignup from "@/components/forms/user/signup";
import HomeToggle from "@/components/toggle/Home/Index";

export default function Index() {
    const { flash, errors } = usePage().props;

    // ? Toast
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
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
                });
            });
        }
    }, [flash.success, errors]);

    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <ToastContainer />
            
            <HomeCard isActive={isActive}>
                {/* Cadastro Form */}
                <UserSignup isActive={isActive} />

                {/* Login Form */}
                <UserLogin isActive={isActive} />

                {/* Toggle Panel */}
                <HomeToggle>
                    <div className="toggle-panel absolute left-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-6">
                        <h1 className="text-2xl font-semibold mb-4">
                            Bem-vindo(a) de volta!
                        </h1>

                        <p className="mb-6 text-xs leading-5 tracking-wide mt-5">
                            Digite seus dados pessoais para manter contato
                        </p>
                        <button
                            className="btn-secondary bg-[#512da8] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-5 cursor-pointer"
                            onClick={() => setIsActive(false)}
                        >
                            Entrar
                        </button>
                    </div>

                    <div className="toggle-panel absolute right-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-6">
                        <h1 className="text-2xl font-semibold mb-4">
                            Olá, Amigo!
                        </h1>

                        <p className="mb-6 text-xs leading-5 tracking-wide mt-5">
                            Registre-se conosco e descubra oportunidades
                            incriveis
                        </p>

                        <button
                            className="btn-secondary bg-[#512da8] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-5 cursor-pointer"
                            onClick={() => setIsActive(true)}
                        >
                            Cadastrar-se
                        </button>
                    </div>
                </HomeToggle>
            </HomeCard>
        </>
    );
}
