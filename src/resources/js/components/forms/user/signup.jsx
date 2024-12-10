import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("pt-BR", ptBR);

import { toast } from "react-toastify";

export default function UserSignup() {
    const [startDate, setStartDate] = useState();

    const { data, setData, post, errors, processing, reset } = useForm({
        email: "",
        nome: "",
        senha: "",
        dt_nasc: "",
    });

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                toast.warn(error, {
                    position: "top-right",
                    autoClose: 3000,
                    className: "bg-white-500 text-black",
                });
            });
        }
    }, [errors]);

    const handleDateChange = (date) => {
        setStartDate(date);
        setData("dt_nasc", date ? date.toISOString().split("T")[0] : ""); // Salvando em formato ISO (yyyy-mm-dd)
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
                        htmlFor="nome"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        id="nome"
                        value={data.nome}
                        onChange={(e) => setData("nome", e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-neutral-950 dark:focus:border-neutral-950"
                        placeholder="José Eduardo"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="dt_nasc"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Data de Nascimento
                    </label>
                    <DatePicker
                        id="dt_nasc"
                        name="dt_nasc"
                        selected={startDate}
                        onChange={handleDateChange}
                        // onChange={[(date) => setStartDate(date), (e) => setData("dt_nasc", e.target.value)]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" // Ajuste de largura
                        placeholderText="Selecionar a data de nascimento"
                        locale="pt-BR"
                        dateFormat="dd/MM/yyyy"
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

                <button
                    type="submit"
                    className="w-full border border-gray-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    Criar Conta
                </button>
            </form>
        </>
    );
}
