// import Layout from "../Layouts/Layout";

import { Link } from "@inertiajs/inertia-react";

export default function Home ( { posts } ) {
    return (
        <>
        <h1 className="bg-blue-500 title">Hello</h1>

        <div>
            {posts.data.map((post) => (
                <div key={post.id} className="p-4 border-b">
                    <div className="text-sm text-slate-600">
                        <span>Postado em: </span>
                        <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                    </div>
                    <p className="font-medium">{post.body}</p>
                </div>
            ))}
        </div>

        <div className="py-12 px-4">
            {posts.links.map(link => (
                link.url ?

                <Link 
                key={link.label} 
                href={link.url} 
                dangerouslySetInnerHTML = {{ __html: link.label }}
                className={`p-1 mx-1 ${link.active ? "text-blue-500 font-bold" : ""}`} 
                />
                :
                <span
                key={link.label} 
                dangerouslySetInnerHTML = {{ __html: link.label }}
                className={"p-1 mx-1 text-slate-300"} 
                ></span>

                // <a href={link.url}>{link.label}</a>
            ))}
        </div>
        
        {/* <h1 className="bg-blue-500 title">Hello {name}</h1> */}

        {/* <Link preserveScroll href="/" className="block title mt-[1000px]">{new Date().toLocaleTimeString()}</Link> */}

        </>
    );
}
 
// Home.layout = page => <Layout children={page} />;

// export default Home;