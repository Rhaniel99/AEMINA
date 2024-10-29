import { useForm, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useEffect } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function UserLogin({ openHandleSignup, handleClose }) {
    const route = useRoute();

    const { data, setData, post, processing, reset } = useForm({
        email: "",
        senha: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("login.store"), {
            onSuccess: () => {
                handleClose(); // Fechar o modal
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
            <form className="space-y-4 md:space-y-6" onSubmit={submit}>
            <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Seu Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-neutral-950 dark:focus:border-neutral-950"
                        placeholder="nome@examplo.com"
                        required
                    />
                </div>


                <div>
                    <label
                        htmlFor="senha"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        name="senha"
                        value={data.senha}
                        onChange={(e) => setData("senha", e.target.value)}
                        id="senha"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                required=""
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="">
                                Lembrar
                            </label>
                        </div>
                    </div>
                    <a href="#" className="text-link">
                        Esqueceu a senha?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Entrar
                </button>
            </form>
            
            <p className="text-sm font-light">
                    Não tem a conta ainda?{" "}
                    <button
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        onClick={openHandleSignup}>
                        Cadastrar
                    </button>

                    {/* <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Cadastrar
                    </a> */}
            </p>
        </>
    );
}
