<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::orderBy('updated_at', 'desc')->latest()->paginate(5);

        // $posts = Post::latest()->paginate(5);
        return inertia('Home', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // sleep(2);
        $campos =$request->validate(['body' => ['required', 'min:5']]);

        Post::create($campos);

        return redirect('/')->with('message', 'Post criado com sucesso!');
        // \Log::info($request->all()); // Verifica se os dados estão chegando
        // dd($request->all()); // Verifica a saída
        // dd($request);
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Show', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return inertia("Edit", ['post' => $post]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        sleep(1);
        $campos =$request->validate(['body' => ['required', 'min:5']]);

        $post->update($campos);

        return redirect('/')->with('message','Post atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect('/')->with('message', 'Post deletado com sucesso!');
    }
}
