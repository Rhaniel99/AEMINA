import { Link } from "@inertiajs/inertia-react";

export default function Layout ({ children }) {
    return (
        <>
        <header>
            <nav>
                <Link className="nav-link" href="/">Home</Link>
                <Link className="nav-link" href="/posts/create">Criar</Link>
            </nav>
        </header>

        <main>

            {children}

        </main>
        </>
    );
}