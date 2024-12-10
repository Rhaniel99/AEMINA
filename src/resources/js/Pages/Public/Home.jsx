import { useState } from "react";
import { Plus } from "lucide-react";
import UserLogin from "@/components/forms/user/login";

export default function Home() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`relative flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200`}>
            <div className={`container relative w-full max-w-4xl min-h-[480px] rounded-lg shadow-lg overflow-hidden ${isActive ? "active" : ""}`}>
                {/* Cadastro Form */}
                <div className={`form-container absolute inset-0 w-1/2 bg-white transition-transform duration-300 ${isActive ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"}`}>
                    <form className="flex flex-col items-center justify-center h-full px-10">
                        <h1 className="text-xl font-semibold mb-4">Criar Conta</h1>
                        <div className="social-icons flex space-x-2 mb-4">
                            {["google", "facebook", "github", "linkedin"].map((icon) => (
                                <a key={icon} href="#" className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full">
                                    <Plus name={icon} size={18} />
                                </a>
                            ))}
                        </div>
                        <span className="text-sm mb-4">ou use seu email para registro</span>
                        <input type="text" placeholder="Name" className="input" />
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <button type="button" className="btn-primary mt-4">Cadastrar-se</button>
                    </form>
                </div>

                {/* Login Form */}
                <div className={`form-container absolute inset-0 w-1/2 bg-white transition-transform duration-300 ${!isActive ? "translate-x-0 z-10 opacity-100" : "-translate-x-full opacity-0 z-0"}`}>
                    <UserLogin />
                </div>

                {/* Toggle Panel */}
                <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-300 rounded-r-lg z-20">
                    <div className="toggle bg-gradient-to-r from-indigo-500 to-purple-600 h-full text-white flex flex-col items-center justify-center">
                        <div className="toggle-panel absolute left-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-6">
                            <h1 className="text-2xl font-semibold mb-4">Bem-vindo(a) de volta!</h1>
                            <p className="text-sm mb-6">Digite seus dados pessoais para manter contato</p>
                            <button className="btn-secondary" onClick={() => setIsActive(false)}>Entrar</button>
                        </div>
                        <div className="toggle-panel absolute right-0 w-1/2 h-full flex flex-col items-center justify-center text-center p-6">
                            <h1 className="text-2xl font-semibold mb-4">Olá, Amigo!</h1>
                            <p className="text-sm mb-6">Registre-se conosco e descubra oportunidades incriveis</p>
                            <button className="btn-secondary" onClick={() => setIsActive(true)}>Cadastrar-se</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
