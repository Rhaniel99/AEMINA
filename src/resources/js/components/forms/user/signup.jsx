import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
// import ptBR from "date-fns/locale/pt-BR";
import { Plus } from "lucide-react";
// import { DateTimePicker } from "@/components/utils/datapicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
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
                className={`absolute inset-0 w-1/2 bg-white transition-transform duration-300 ${
                    isActive
                        ? "translate-x-full opacity-100 z-5 move-animation"
                        : "opacity-0 z-0"
                }`}
            >
                <form
                    className="bg-white flex items-center justify-center flex-col px-10 h-full"
                    onSubmit={submit}
                >
                    <h1 className="text-xl font-semibold mb-4">Criar Conta</h1>

                    <div className="my-5 flex space-x-2 mb-4">
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
                        ou use seu email para registro
                    </span>

                    <input
                        type="text"
                        id="nome"
                        value={data.nome}
                        onChange={(e) => setData("nome", e.target.value)}
                        placeholder="Name"
                        className="bg-gray-200 border-0 my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="nome@examplo.com"
                        className="bg-gray-200 border-0 my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                        required
                    />

                    <input
                        type="password"
                        name="senha"
                        value={data.senha}
                        onChange={(e) => setData("senha", e.target.value)}
                        placeholder="••••••••"
                        className="bg-gray-200 border-0 my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                        required
                    />

                    <DatePicker value={date} onChange={handleDateChange} />

                    {/* <DateTimePicker
                        hideTime
                        id="dt_nasc"
                        name="dt_nasc"
                        value={date}
                        // placeholder="Escolha sua data de nascimento"
                        onChange={handleDateChange}
                        // renderTrigger={}
                    /> */}

                    <button
                        type="submit"
                        className={`bg-[#512da8] text-white text-xs px-[45px] py-[10px] border border-transparent rounded-lg font-semibold tracking-[0.5px] uppercase mt-5 cursor-pointer ${
                            isActive ? "bg-transparent border-white" : ""
                        }`}
                    >
                        Cadastrar-se
                    </button>
                </form>
            </div>
        </>
    );
}
