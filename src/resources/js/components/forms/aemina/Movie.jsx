import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ptBR from "date-fns/locale/pt-BR";
import { FancyMultiSelect } from "@/components/select/Fancy";

export default function Index({ onSuccess, Movie }) {
    // console.log(Movie.categories);
    const { items_sidebar } = usePage().props;
    const [date, setDate] = useState();
    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const { data, setData, post, reset } = useForm({
        titulo_filme: "",
        desc_filme: "",
        categorias: [],
        capa_filme: null,
        arquivo_filme: null,
        dt_lancamento: "",
    });

    // Atualiza as categorias quando o Movie é passado
    useEffect(() => {
        if (Movie?.categories) {
            const initialCategories = Movie.categories.map((cat) => ({
                value: cat,
                label: cat.charAt(0).toUpperCase() + cat.slice(1),
            }));
            setSelectedCategories(initialCategories);
        }
    }, [Movie]);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        const formattedDate = selectedDate
            ? selectedDate.toISOString().split("T")[0]
            : "";
        setData("dt_lancamento", formattedDate);
    };

    const handleCategoriesChange = (newCategories) => {
        setSelectedCategories(newCategories); // Atualiza o estado de categorias selecionadas
        setData(
            "categorias",
            newCategories.map((cat) => cat.value)
        ); // Atualiza o campo categorias no formulário
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const { id } = e.target; // ? Identifica qual input chamou a função
            setData(id, file); // ? Atualiza o dado correspondente no formulário

            // ? Se o arquivo for uma imagem, cria o preview
            if (id === "capa_filme" && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(file);
            }
        }
    };

    // ? Extrair as categorias únicas dos filmes em items_sidebar
    useEffect(() => {
        if (items_sidebar) {
            const uniqueCategories = items_sidebar
                .filter((item) => item.content_type === "filme") // Apenas filmes
                .map((item) => ({
                    value: item.category_name_normalized,
                    label: item.category_name,
                    // label: item.category_name.toUpperCase(),
                }))
                .filter(
                    (category, index, self) =>
                        self.findIndex(
                            (cat) => cat.value === category.value
                        ) === index
                );

            setCategories(uniqueCategories);
        }
    }, [items_sidebar]);

    const submit = (e) => {
        e.preventDefault();
        post(route("aemina.store", "filme"), {
            onSuccess: () => {
                reset(); // Opcional: reseta o formulário
                if (onSuccess) {
                    onSuccess(); // Fecha o diálogo
                }
            },
        });
    };

    return (
        <>
            <form onSubmit={submit}>
                <div className="container px-6 m-auto">
                    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                        {/* Titulo do Filme */}
                        <div className="col-span-4 lg:col-span-6">
                            <Label
                                htmlFor="titulo_filme"
                                className="text-right"
                            >
                                Titulo do Filme
                            </Label>
                            <Input
                                id="titulo_filme"
                                className="col-span-3"
                                placeholder="Digite o nome do filme"
                                value={data.titulo_filme || Movie?.title || ""}
                                onChange={(e) =>
                                    setData("titulo_filme", e.target.value)
                                }
                            />
                        </div>

                        {/* Data de Lançamento */}
                        <div className="col-span-4 lg:col-span-6">
                            <Label htmlFor="nome" className="text-right">
                                Data de Lançamento
                            </Label>
                            <DatePicker
                                name="dt_lancamento"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholderText="Selecione a data de lançamento"
                                onChange={handleDateChange}
                                selected={date || Movie?.dt_lancamento || ""}
                                locale={ptBR}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>

                        {/* Descrição */}
                        <div className="col-span-4 lg:col-span-6">
                            <Label htmlFor="desc_filme" className="text-right">
                                Descrição
                            </Label>
                            <Textarea
                                id="desc_filme"
                                className="col-span-3"
                                placeholder="Digite a descrição do filme."
                                value={data.desc_filme || Movie?.descricao || ""}
                                onChange={(e) =>
                                    setData("desc_filme", e.target.value)
                                }
                            />
                        </div>

                        {/* Categorias */}
                        <div className="col-span-4 lg:col-span-6">
                            <Label htmlFor="nome" className="text-right">
                                Categorias
                            </Label>
                            <FancyMultiSelect
                                categories={categories}
                                onCategoriesChange={handleCategoriesChange}
                                initialSelected={selectedCategories} // Passa as categorias selecionadas
                            />
                        </div>

                        {/* Capa de Filme */}
                        <div className="col-span-4 lg:col-span-6">
                            <Label htmlFor="capa_filme">Capa</Label>
                            <Input
                                id="capa_filme"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Arquivo bruto do Filme */}
                        <div className="col-span-4 lg:col-span-6">
                            <Label htmlFor="arquivo_filme">
                                Arquivo do Filme
                            </Label>
                            <Input
                                id="arquivo_filme"
                                type="file"
                                accept=".mkv, .mp4"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Preview */}
                        <div className="col-span-4 lg:col-span-6">
                            {preview && (
                                <div className="col-span-4 flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Preview da Capa"
                                        className="w-64 h-32 object-cover border"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-4">
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </form>
        </>
    );
}
