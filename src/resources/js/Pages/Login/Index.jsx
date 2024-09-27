import { useForm, Head } from "@inertiajs/inertia-react";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        body: "",
    });

    function submit(e) {
        e.preventDefault();
        // post("/posts", { preserveScroll: true });

        post("/posts");
    }

    // console.log(errors);

    // console.log(useForm());

    return (
        <>
            <h1 className="title">Login</h1>
            {/* {data.body} */}
            <Head title="Login" />

            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a
                        href="#"
                        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://i.etsystatic.com/47876873/r/il/c37789/5950496434/il_570xN.5950496434_faki.jpg"
                            alt="logo"
                        />
                        AEMINA
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Entre com a sua conta
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        for="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Seu Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="nome@examplo.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        for="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
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
                                                for="remember"
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
