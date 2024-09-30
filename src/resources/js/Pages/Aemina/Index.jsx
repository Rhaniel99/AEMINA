import { useForm, Link } from "@inertiajs/inertia-react";
// import { useRoute } from "../../../../vendor/tightenco/ziggy"


export default function Index ( { usuario } ) {
    // const route = useRoute();

    // const {post, errors, processing } = useForm();


    function submit (e) {
        e.preventDefault();
        // post( route('login.logout') );
    }

    return (
        <>
        {/* <h1 className="bg-blue-500 title">{post.body}</h1> */}
        <div  className="p-4 border-b">
                    <div className="text-sm text-slate-600">
                        <span>Usuário Autenticado, bem vindo! {usuario.name} </span>
                    </div>
                    
                    <Link href={ route('login.logout') } className="bg-red-500 rounded-md text-sm px-4 py-1 text-white" method="post" as="button" type="button">Logout</Link>

                    {/* <form onSubmit={submit}>
                        <button className="bg-red-500 rounded-md text-sm px-4 py-1 text-white">
                                Logout
                        </button>
                    </form> */}
        </div>
        </>
    );
}