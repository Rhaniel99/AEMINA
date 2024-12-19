import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
// import { registerLocale } from "react-datepicker";
// import ptBR from "date-fns/locale/pt-BR";
// import "react-datepicker/dist/react-datepicker.css";
import { Plus } from "lucide-react";
// import { toast } from "react-toastify";
import { DateTimePicker } from "@/components/utils/datapicker";


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
  // registerLocale("pt-BR", ptBR);

export default function UserSignup({ isActive }) {
    const [date, setDate] = useState();

    const { data, setData, post, reset } = useForm({
        email: "",
        nome: "",
        senha: "",
        dt_nasc: "",
    });

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        const formattedDate = selectedDate
            ? selectedDate.toISOString().split("T")[0] // Formata para yyyy-mm-dd
            : "";
        setData("dt_nasc", formattedDate);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("login.create"), {
            onSuccess: () => {
                reset("email", "nome", "senha", "dt_nasc");
            },
            onError: () => {
                // Não fechar o modal caso haja erros de validação
                console.log("Erros de validação detectados.");
            },
        });
    };

    return (
        <>
            <div
                className={`form-container_home absolute inset-0 w-1/2 bg-white transition-transform duration-300 ${
                    isActive
                        ? "translate-x-full opacity-100 z-10"
                        : "opacity-0 z-0"
                }`}
            >
                <form
                    className="flex flex-col items-center justify-center h-full px-10 bg-white"
                    onSubmit={submit}
                >
                    <h1 className="text-xl font-semibold mb-4">Criar Conta</h1>

                    <div className="social-icons flex space-x-2 mb-4">
                        {["google", "facebook", "github", "linkedin"].map(
                            (icon) => (
                                <a
                                    key={icon}
                                    href="#"
                                    className="text-sm text-gray-700 mt-3.75 mb-2.5 underline-none w-10 h-10 flex items-center justify-center border border-gray-700 rounded-full"
                                >
                                    <Plus name={icon} size={18} />
                                </a>
                            )
                        )}
                    </div>
                    
                    <span className="text-sm mb-4">
                        ou use seu email para registro
                    </span>

                    <input
                        type="text"
                        id="nome"
                        value={data.nome}
                        onChange={(e) => setData("nome", e.target.value)}
                        placeholder="José Roberto"
                        className="bg-[#eee] border-none my-2 px-4 py-2.5 text-sm rounded-lg w-full outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="nome@example.com"
                        className="bg-[#eee] border-none my-2 px-4 py-2.5 text-sm rounded-lg w-full outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="senha"
                        value={data.senha}
                        onChange={(e) => setData("senha", e.target.value)}
                        placeholder="••••••••"
                        className="bg-[#eee] border-none my-2 px-4 py-2.5 text-sm rounded-lg w-full outline-none"
                        required
                    />

                    <DateTimePicker
                        hideTime
                        id="dt_nasc"
                        name="dt_nasc"
                        value={date}
                        // placeholder="Escolha sua data de nascimento"
                        onChange={handleDateChange}
                        // renderTrigger={}
                    />
                    
                    {/* <FormDescription>
                        Your date of birth is used to calculate your age.
                    </FormDescription> */}

                    <button type="submit" className="btn-primary mt-5 bg-[#512da8] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wide uppercase cursor-pointer">
                        Cadastrar-se
                    </button>
                </form>
            </div>
        </>
    );
}
