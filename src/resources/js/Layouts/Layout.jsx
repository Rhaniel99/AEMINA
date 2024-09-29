import { Link } from "@inertiajs/inertia-react";
import { useRoute } from "../../../vendor/tightenco/ziggy";

export default function Layout ({ children }) {
    const route = useRoute();

    return (
        <>
        <header>
            <nav>
                <Link className="nav-link" href="/">Home</Link>
                <Link className="nav-link" href={ route('login.index') }>Login</Link>
                <Link className="nav-link" href="/posts/create">Criar</Link>
            </nav>
        </header>

        <main>

            {children}

        </main>
        </>
    );
}