// import Layout from "../Layouts/Layout";

import { Link } from "@inertiajs/inertia-react";

export default function Home ( { name } ) {
    return (
        <>
        <h1 className="bg-blue-500 title">Hello {name}</h1>

        <Link preserveScroll href="/" className="block title mt-[1000px]">{new Date().toLocaleTimeString()}</Link>

        </>
    );
}
 
// Home.layout = page => <Layout children={page} />;

// export default Home;