import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "ziggy";

export default function Layout ({ children }) {
    const route = useRoute();

    return (
        <>
        <header className="bg-slate-800 shadow-md">
            <nav className="p-5 max-w-screen-lg mx-auto flex items-center justify-between">
                <Link className="nav-link" href="/">Home</Link>
                {/* <Link className="nav-link" href={ route('login') }>Login</Link> */}
                {/* <Link className="nav-link" href="/posts/create">Criar</Link> */}
            </nav>
        </header>

        <main>

            {children}

        </main>
        </>
    );
}