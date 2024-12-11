import { useForm } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { Plus } from "lucide-react";

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
                </form>
            </div>
        </>
    );
}
