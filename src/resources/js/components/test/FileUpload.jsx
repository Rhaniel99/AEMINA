import React from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";

// import "../../../../node_modules/@uppy/core/dist/style.css";
// import "../../../../node_modules/@uppy/dashboard/dist/style.css";

import "uppy-css";  
import "uppy-dashboard-css"; 

import { useForm } from "@inertiajs/react";

const FileUploader = () => {
    const { data, setData, post, reset } = useForm({
        title: "",
        file_name: "",
    });

    const TUS_ENDPOINT = route("tus.post");

    const uppy = new Uppy({
        debug: true,
        autoProceed: true,
        restrictions: {
            maxFileSize: 50000000000, // Tamanho máximo do arquivo
            maxNumberOfFiles: 1,  // Máximo de arquivos simultâneos
        },
    }).use(Tus, {
        endpoint: TUS_ENDPOINT,
        chunkSize: 5 * 1024 * 1024, // 5 MB
    });

    // Quando o upload for bem-sucedido, envie o nome do arquivo ao backend
    uppy.on("upload-success", (file) => {
        const fileName = file.name; // Nome do arquivo enviado
        const urlFile = file.tus.uploadUrl; // URL do arquivo enviado pelo protocolo TUS
    
        console.log("->>>", fileName);
        console.log("->>>", urlFile);
    
        // Atualizar os valores no estado do formulário
        setData({
            title: fileName, // Nome do arquivo como título
            file_name: urlFile, // URL do arquivo
        });
    
        // Enviar os dados ao backend
        post(route("test.store"), {
            data,
            onSuccess: () => {
                console.log("Dados enviados com sucesso!");
            },
            onError: () => {
                console.log("Erro ao enviar dados.");
            },
        });
    });

    return <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} singleFileFullScreen={true} />;
};

export default FileUploader;
