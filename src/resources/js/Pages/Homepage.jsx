import { useForm, Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage() {

    const { component } = usePage();

    const { flash } = usePage().props;

    // Exibe mensagem flash de erro
    useEffect(() => {
        if (flash.message) {
            const [message, timestamp] = flash.message.split("|");
            toast.success(message, {
                position: "top-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                autoClose: 3000, // Fecha em 3 segundos
            });
        }
    }, [flash.message]);

    return (
        <>
            <Head title={component} />

            <ToastContainer />

            <div className="flex justify-between mt-8">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img
                        className="w-full"
                        src="/img/background/background.png"
                        alt="Sunset in the mountains"
                    />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            The Coldest Sunset
                        </div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Voluptatibus quia, nulla! Maiores et
                            perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #photography
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #travel
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #winter
                        </span>
                    </div>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img
                        className="w-full"
                        src="/img/background/background.png"
                        alt="Sunset in the mountains"
                    />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                            Another Sunset
                        </div>
                        <p className="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Voluptatibus quia, nulla! Maiores et
                            perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #nature
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #explore
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #summer
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
