import { useForm, Link, Head } from "@inertiajs/react";
import { useRoute } from "ziggy";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Index() {
    const route = useRoute();

    const { data, setData, post, progress, errors } = useForm({
        planoAcao: null, // Set default to null for file input
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

    function submit(e) {
        e.preventDefault();
        post(route("planoAcao.upload"));
    }

    return (
        <>

            <Head title="Index" />

            <ToastContainer />

            <div className="p-4 border-b">
                <form onSubmit={submit}>

                    <div>
                        <input
                            type="file"
                            className="file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#65406A] file:text-white hover:file:bg-[#C38EA2]"
                            placeholder=""
                            onChange={(e) =>
                                setData("planoAcao", e.target.files[0])
                            }
                        />
                    </div>
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <button className="bg-red-500 rounded-md text-sm px-4 py-1 mt-8 text-white">
                        Enviar
                    </button>
                </form>
            </div>
        </>
    );
}
