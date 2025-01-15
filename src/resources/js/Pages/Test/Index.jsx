import FileUploader from "@/components/test/FileUpload";
// import { useForm } from "@inertiajs/react";

export default function Index() {
    // const { data, setData, post, reset } = useForm({
    //     title: "",
    //     file: null,
    // });

    // const submit = (e) => {
    //     e.preventDefault();
    //     post(route("test.store"), {
    //         onSuccess: () => {
    //             reset("title");
    //         },
    //         onError: () => {
    //             // Não fechar o modal caso haja erros de validação
    //             console.log("Erros de validação detectados.");
    //         },
    //     });
    // };

    return (
        <div>
            {/* <form
                className="flex flex-col items-center justify-center h-full px-10 bg-white"
                onSubmit={submit}
            >
                <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    placeholder="nome do arquivo"
                    className="bg-[#eee] border-none my-2 px-4 py-2.5 text-sm rounded-lg w-full outline-none"
                /> */}
                <FileUploader name="file" />
            {/* </form> */}
        </div>
    );
}
