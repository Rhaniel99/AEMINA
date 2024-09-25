import { useForm } from "@inertiajs/inertia-react";

export default function Create () {

    const {data, setData, post, errors, processing } = useForm({
        body: '', 
    })

    function submit(e) {
        e.preventDefault();
        // post("/posts", { preserveScroll: true });

        post('/posts');
    }

    // console.log(errors);

    // console.log(useForm());

    return (
        <>
        <h1 className="bg-blue-500 title">Criar Post</h1>
        {/* {data.body} */}

        <div className="w-1/2 mx-auto">
            <form onSubmit={submit}>
                <textarea rows="10" 
                value={data.body}
                onChange={e => setData("body", e.target.value)}
                className={errors.body && '!ring-red-500'}
                ></textarea>

                {errors.body && <p className="error" >{errors.body}</p>}

                <button type="submit" className="primary-btn mt-4" disabled={processing}>Criar Post</button>
            </form>
        </div>
        </>
    );
}