import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { FancyMultiSelect } from "@/components/select/Fancy";

import { useForm, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import "uppy-css";
import "uppy-dashboard-css";

export default function Edit({ media }) {
    const { items_sidebar } = usePage().props;

    // ? Estados da Categoria
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // ? Data
    const [date, setDate] = useState();

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

    // ? Categorias
    useEffect(() => {
        if (media?.categories) {
            const initialCategories = media.categories.map((cat) => ({
                value: cat,
                label: cat,
            }));
            setSelectedCategories(initialCategories);
        }
    }, [media]);

    const handleCategoriesChange = (newCategories) => {
        setSelectedCategories(newCategories);
        setData(
            "categorias",
            newCategories.map((cat) => cat.value)
        );
    };

    // ? Formatar Data
    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        const formattedDate = selectedDate
            ? selectedDate.toISOString().split("T")[0]
            : "";
        setData("dt_lancamento", formattedDate);
    };

    // ? Uppy

    const TUS_ENDPOINT = route("tus.post");

    const uppy = new Uppy({
        debug: true,
        autoProceed: true,
        restrictions: {
            maxFileSize: 50000000000, // Tamanho máximo do arquivo
            maxNumberOfFiles: 1, // Máximo de arquivos simultâneos
        },
    }).use(Tus, {
        endpoint: TUS_ENDPOINT,
        chunkSize: 5 * 1024 * 1024, // 5 MB
    });

    uppy.on("upload-success", (file) => {
        const fileName = file.name; // Nome do arquivo enviado
        const urlFile = file.tus.uploadUrl; // URL do arquivo enviado pelo protocolo TUS

        console.log("->>>", fileName);
        console.log("->>>", urlFile);

        // Atualizar os valores no estado do formulário
        setData({
            arquivo_filme: urlFile, // URL do arquivo
        });

        // Enviar os dados ao backend
        // post(route("test.store"), {
        //     data,
        //     onSuccess: () => {
        //         console.log("Dados enviados com sucesso!");
        //     },
        //     onError: () => {
        //         console.log("Erro ao enviar dados.");
        //     },
        // });
    });

    // ? Formulário

    const { data, setData, post, reset, patch } = useForm({
        titulo_filme: media?.title || "",
        desc_filme: media?.description || "",
        categorias: media?.categories || [],
        capa_filme: null,
        arquivo_filme: null,
        dt_lancamento: media?.release_date || "",
    });

    return (
        <>
            <section>
                {/* Titulo */}
                <div className="container px-6 m-auto p-6">
                    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex justify-center">
                            {media.title}
                        </div>
                    </div>
                </div>

                {/* Body 1 */}
                <div className="container px-6 m-auto p-6">
                    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-4 lg:col-span-3">
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
                                value={data.titulo_filme || media?.title || ""}
                                onChange={(e) =>
                                    setData("titulo_filme", e.target.value)
                                }
                            />
                        </div>
                        <div className="col-span-4 lg:col-span-3">
                            <Label htmlFor="nome" className="text-right">
                                Categorias
                            </Label>
                            <FancyMultiSelect
                                categories={categories}
                                initialSelected={selectedCategories}
                                onCategoriesChange={handleCategoriesChange}
                            />
                        </div>
                        <div className="col-span-4 lg:col-span-3">
                            <Label htmlFor="nome" className="text-right">
                                Data de Lançamento
                            </Label>
                            <DatePicker
                                name="dt_lancamento"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholderText="Selecione a data de lançamento"
                                onChange={handleDateChange}
                                selected={date || media?.release_date || ""}
                                locale={ptBR}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>

                        <div className="col-span-4 lg:col-span-3">
                            <Label htmlFor="desc_filme" className="text-right">
                                Descrição
                            </Label>
                            <Textarea
                                id="desc_filme"
                                className="col-span-3"
                                placeholder="Digite a descrição do filme."
                                value={
                                    data.desc_filme || media?.description || ""
                                }
                                onChange={(e) =>
                                    setData("desc_filme", e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Body 2 */}
                <div className="container px-6 m-auto p-6">
                    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                        <div className="col-span-4 lg:col-span-6">
                            Column 1/2
                        </div>
                        <div className="col-span-4 lg:col-span-6">
                            <Label
                                htmlFor="arquivo_filme"
                                className="text-left"
                            >
                                Arquivo do Filme
                            </Label>
                            <Dashboard
                                id="arquivo_filme"
                                height={275}
                                width={375}
                                uppy={uppy}
                                proudlyDisplayPoweredByUppy={false}
                                singleFileFullScreen={true}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Button type="submit">Salvar</Button>
                </div>
            </section>
        </>
    );
}
