import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { Plus } from "lucide-react";
// import Modal from "@/components/modal";
// import { useEffect, useState } from "react";

export default function UserLogin({ isActive }) {
    const route = useRoute();
    
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

    return (
        <>
            <div
                className={`form-container absolute inset-0 w-1/2 bg-white transition-transform duration-300 ${
                    !isActive
                        ? "translate-x-0 z-10 opacity-100"
                        : "-translate-x-full opacity-0 z-0"
                }`}
            >
                <form
                    className="flex flex-col items-center justify-center h-full px-10 bg-white"
                    onSubmit={submit}
                >
                    <h1 className="text-xl font-semibold mb-4">Entrar</h1>
                    <div className="my-5 flex space-x-2 mb-4">
                        {["google", "facebook", "github", "linkedin"].map(
                            (icon) => (
                                <a
                                    key={icon}
                                    href="#"
                                    className="border border-[#ccc] rounded-[20%] inline-flex justify-center items-center mx-0.5 w-10 h-10
                                    text-sm text-gray-700 mt-3.75 mb-2.5 underline-none"
                                >
                                    <Plus name={icon} size={18} />
                                </a>
                            )
                        )}
                    </div>

                    <span className="text-sm mb-4">
                        ou use seu email e senha
                    </span>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="nome@examplo.com"
                        className="bg-[#eee] border-none my-2 px-4 py-2.5 text-sm rounded-lg w-full outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="senha"
                        value={data.senha}
                        onChange={(e) => setData("senha", e.target.value)}
                        id="senha"
                        placeholder="••••••••"
                        className="bg-[#eee] border-none my-2 px-4 py-2.5 text-sm rounded-lg w-full outline-none"
                        required
                    />

                    <a className="underline-none text-sm text-gray-600 mb-4">
                        Esqueceu sua senha?
                    </a>

                    <button type="submit" className="btn-primary mt-5 bg-[#512da8] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wide uppercase cursor-pointer">
                        Entrar
                    </button>
                </form>
            </div>
        </>
    );
}
