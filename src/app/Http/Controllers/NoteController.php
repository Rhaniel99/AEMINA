<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = auth()->id();
        // $notas = Notes::where('user_id', $user_id)->get();
        // $notes = Notes::where('user_id', $user_id)->orderBy('updated_at', 'desc')->latest()->paginate(5);

        $notes = Notes::where('user_id', $user_id)
        ->orderBy('updated_at', 'desc')
        ->latest()
        ->paginate(10)
        ->through(fn($note) => [
            'id' => $note->id,
            'title' => $note->title,
            'content' => $note->content,
            'update_url' => route('note.update', $note->id),
        ]);

        return inertia('Note/Index', ['notes' => $notes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $user_id = auth()->id();

        $fields = $request->validate([
            'title' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($user_id) {
                    $exists = \DB::table('notes_schema.notes')
                        ->where('user_id', $user_id)
                        ->where('title', $value)
                        ->exists();
    
                    if ($exists) {
                        $fail('O título da nota já existe para este usuário!');
                    }
                },
            ],
        ], [
            'title.required' => 'O campo título é obrigatório!',
        ]);
    
        Notes::create([
            'title' => $fields['title'],
            'content' => $request->note ?? null,
            'user_id' => $user_id   
        ]);

        // return Inertia::render('Notes/Index', [
        //     'flash' => ['success' => 'Nota criada com sucesso!']
        // ]);

        return to_route('note.index')->with(["success" => "Nota criada com sucesso!"]);
        // return to_route('note.index')->with(["success" => "Nota criada com sucesso!"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        dd($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $note = Notes::findOrFail($id);
        return inertia('Note/Edit', [
            'note' => $note,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
