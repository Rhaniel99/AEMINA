import { useForm, usePage } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

// import "react-toastify/dist/ReactToastify.css";

export default function UserLogin() {
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
            <form
                className="flex flex-col items-center justify-center h-full px-10"
                onSubmit={submit}
            >
                <h1 className="text-xl font-semibold mb-4">Entrar</h1>
                <div className="social-icons flex space-x-2 mb-4">
                    {["google", "facebook", "github", "linkedin"].map(
                        (icon) => (
                            <a
                                key={icon}
                                href="#"
                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full"
                            >
                                <Plus name={icon} size={18} />
                            </a>
                        )
                    )}
                </div>

                <span className="text-sm mb-4">ou use seu email e senha</span>

                <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="nome@examplo.com"
                    className="input"
                    required
                />

                <input
                    type="password"
                    name="senha"
                    value={data.senha}
                    onChange={(e) => setData("senha", e.target.value)}
                    id="senha"
                    placeholder="••••••••"
                    className="input"
                    required
                />

                <a href="#" className="text-sm text-gray-600 mb-4">
                    Esqueceu sua senha?
                </a>

                <button type="submit" className="btn-primary mt-4">
                    Entrar
                </button>

                {/* 
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
                </button> */}
            </form>
        </>
    );
}
