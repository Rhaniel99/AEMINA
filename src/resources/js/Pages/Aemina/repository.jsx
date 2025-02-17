import { useState } from "react";
import { Head, router, useForm, usePoll } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/hooks/use-dialog";

import AlertDelete from "@/components/dialogs/alert-delete";
import MediaForm from "@/components/forms/aemina/media-form";
import { TableRepository } from "@/components/tables/table-repository";
import { ColumnsRepository } from "@/components/tables/columns-repository";

export default function Index({ media }) {
    const { data, setData } = useForm({
        search: "",
    });

    const [searchValue, setSearchValue] = useState(data.search);

    // ? Controla o estado de expansão do formulário
    const [isExpanded, setIsExpanded] = useState(false);

    usePoll(5000, {
        onFinish() {
            router.reload({
                preserveState: true,
                preserveScroll: true,
                preserveUrl: true,
                async: true,
                only: ["progress_upload"],
            });
        },
    });

    const {
        isOpen: isAlertDialogOpen,
        content: alertContent,
        openDialog: openAlertDialog,
        closeDialog: closeAlertDialog,
    } = useDialog();

    // ? Função de pesquisa
    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue); // Atualiza o valor local
        setData("search", searchValue); // Atualiza o valor no formulário
        router.reload({
            data: { search: searchValue },
            preserveState: true,
            preserveScroll: true,
            showProgress: true,
        });
    };

    // ? Função para confirmar exclusão
    const handleDelete = () => {
        if (alertContent && alertContent.id) {
            router.delete(route("aemina.destroy", alertContent.id), {
                onSuccess: closeAlertDialog,
            });
        } else {
            console.error("Erro: Nenhum item selecionado para exclusão.");
        }
    };

    const columns = ColumnsRepository({
        handleDeleteClick: openAlertDialog, // Passando o diálogo de exclusão
    });

    return (
        <>
            <Head title="REPÓSITORIO" />

            <div className="p-6">
                {/* Filtro e dropdown da coluna da tabela */}
                <div className="flex items-center justify-between mb-4">
                    <Input
                        placeholder="Pesquisar por..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        className="max-w-sm bg-[#D9CDBF] text-black py-2 px-4 border-b"
                    />

                    {/* Botão de expandir/recolher o formulário */}
                    <button
                        className="bg-[#735848] text-white px-4 py-2 rounded"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "Ocultar" : "Cadastro"}
                    </button>
                </div>

                <MediaForm isExpanded={isExpanded}  className="relative z-10"/>

                <TableRepository
                    media={media}
                    columns={columns}
                />

            </div>

            <AlertDelete
                isOpen={isAlertDialogOpen}
                onClose={closeAlertDialog}
                onConfirm={handleDelete}
            />
        </>
    );
}
