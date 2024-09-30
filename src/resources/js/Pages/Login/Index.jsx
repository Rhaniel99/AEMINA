import { useForm, Head, usePage } from "@inertiajs/inertia-react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa os estilos do Toastify

export default function Login() {
    
    const route = useRoute();

    const { flash } = usePage().props;

    const { data, setData, post, errors, processing, reset } = useForm({
        email: "", senha: "",
    });

        // Exibe mensagem flash de erro
        useEffect(() => {
            if (flash.message) {
                const [message, timestamp] = flash.message.split('|');

                toast.error(message, {
                    position: "top-right",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    autoClose: 3000, // Fecha em 3 segundos
                });

                reset("senha");
            }
        }, [flash.message]);
    
        // Exibe erros de validação
        useEffect(() => {
            if (Object.keys(errors).length > 0) {
                Object.values(errors).forEach((error) => {
                    toast.warn(error, {
                        position: "top-right",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        autoClose: 3000,
                        // autoClose: false, // Não fecha automaticamente
                        className: 'bg-yellow-500 text-black', // Estilo personalizado para erros de validação
                    });

                    reset("senha");

                });
            }
        }, [errors]);
    

    function submit(e) {
        e.preventDefault();
        // destroy( route('login.store') );
        post( route('login.store'));
    }

    // console.log(errors);

    // console.log(useForm());

    return (
        <>
            <h1 className="title">Login</h1>

            <ToastContainer />

            <Head title="Login" />

            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://i.etsystatic.com/47876873/r/il/c37789/5950496434/il_570xN.5950496434_faki.jpg"
                            alt="logo"
                        />
                        AEMINA
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Entre com a sua conta
                            </h1>
                            {/* {errors.email && <p className="error" >{errors.email}</p>}
                            {errors.senha && <p className="error" >{errors.senha}</p>} */}

                            <form className="space-y-4 md:space-y-6" onSubmit={submit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Seu Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData("email", e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="nome@examplo.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="senha"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        name="senha"
                                        value={data.senha}
                                        onChange={e => setData("senha", e.target.value)}
                                        id="senha"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Lembrar
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-link"
                                    >
                                        Esqueceu a senha?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Entrar
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Não tem a conta ainda?{" "}
                                    <a
                                        href="#"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Cadastrar
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* <form onSubmit={submit}>
                <textarea rows="10" 
                value={data.body}
                onChange={e => setData("body", e.target.value)}
                className={errors.body && '!ring-red-500'}                ></textarea>

                {errors.body && <p className="error" >{errors.body}</p>}

                <button type="submit" className="primary-btn mt-4" disabled={processing}>Criar Post</button>
            </form> */}
        </>
    );
}
