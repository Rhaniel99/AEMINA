import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

export default function SignupForm() {
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
        <form onSubmit={submit} className="space-y-4">
            <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                    id="nome"
                    value={data.nome}
                    placeholder="Ednaldo Pereira"
                    onChange={(e) => setData("nome", e.target.value)}
                    required
                    className="bg-[#A6907C] text-[#402E1F] placeholder-[#735848]"
                />
            </div>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="nome@example.com"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    className="bg-[#A6907C] text-[#402E1F] placeholder-[#735848]"
                />
            </div>
            <div>
                <Label htmlFor="senha">Senha</Label>
                <Input
                    id="senha"
                    type="password"
                    value={data.senha}
                    placeholder="••••••••"
                    onChange={(e) => setData("senha", e.target.value)}
                    required
                    className="bg-[#A6907C] text-[#402E1F] placeholder-[#735848]"
                />
            </div>
            <div className="">
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                <DatePicker
                    name="dt_nasc"
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#A6907C] text-[#402E1F] placeholder-[#735848]"
                    placeholderText="Selecione a data de nascimento"
                    onChange={handleDateChange}
                    selected={date}
                    locale={ptBR}
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-[#735848] hover:bg-[#402E1F] text-[#D9CDBF]"
            >
                Registrar
            </Button>
        </form>
    );
}
