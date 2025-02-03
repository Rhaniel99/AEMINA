import { useState, useEffect } from "react";
import { Head, router, useForm, Link, usePoll } from "@inertiajs/react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import EditMedia from "@/components/dialogs/edit-media";

import { tableColumnsMediaList } from "@/components/tables/columns-list-media";
import { TableMediaList } from "@/components/tables/table-list-media";
import { useDialog } from "@/hooks/use-dialog";
import { debounce } from "lodash";

export default function Index({ media }) {
    const { data, setData } = useForm({
        search: "",
    });

    const [searchValue, setSearchValue] = useState(data.search);

    usePoll(5000, {
        onFinish() {
            router.reload({
                preserveState: true,
                preserveScroll: true,
                preserveUrl: true,
                async: true,
                only: ['progress_upload']
            });
        },
    });

    const {
        isOpen: isEditDialogOpen,
        content: selectedContent,
        openDialog: openEditDialog,
        closeDialog: closeEditDialog,
    } = useDialog();

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

    const columns = tableColumnsMediaList({
        handleContentClick: openEditDialog,
        handleDeleteClick: openAlertDialog, // Passando o diálogo de exclusão
    });

    return (
        <>
            
            <Head title="LISTAR" />
            <h1 className="title p-6">Lista novos Recursos</h1>

            <div className="p-6">
                <TableMediaList
                    media={media} // Usa o estado atualizado
                    columns={columns}
                    search={searchValue}
                    handleSearch={handleSearchChange} // Função de busca
                    data={data}
                />
            </div>

            {/* Diálogo separado */}
            <EditMedia
                open={isEditDialogOpen}
                onOpenChange={(isOpen) => !isOpen && closeEditDialog()}
                content={selectedContent}
            />

            <AlertDialog
                open={isAlertDialogOpen}
                onOpenChange={(isOpen) => !isOpen && closeAlertDialog()}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Tem certeza que deseja deletar?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá excluir
                            permanentemente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={closeAlertDialog}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="mt-2 sm:mt-0"
                            onClick={handleDelete}
                        >
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
