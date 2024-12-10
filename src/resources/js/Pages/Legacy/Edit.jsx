import { useForm, Head } from "@inertiajs/react";

export default function Edit ( { post } ) {

    const {data, setData, put, errors, processing } = useForm({
        body: post.body, 
    })

    function submit(e) {
        e.preventDefault();
        // post("/posts", { preserveScroll: true });

        put(`/posts/${post.id}`);
    }

    // console.log(errors);

    // console.log(useForm());

    return (
        <>
        <h1 className="bg-blue-500 title">Atualizar Post</h1>
        {/* {data.body} */}
        <Head title='Editar' />

        <div className="w-1/2 mx-auto">
            <form onSubmit={submit}>
                <textarea rows="10" 
                value={data.body}
                onChange={e => setData("body", e.target.value)}
                className={errors.body && '!ring-red-500'}
                ></textarea>

                {errors.body && <p className="error" >{errors.body}</p>}

                <button type="submit" className="primary-btn mt-4" disabled={processing}>Atualizar Post</button>
            </form>
        </div>
        </>
    );
}