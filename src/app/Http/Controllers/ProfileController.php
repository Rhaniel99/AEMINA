<?php

namespace App\Http\Controllers;

use App\Models\UserProfiles;
use Auth;
use Illuminate\Http\Request;
use Storage;

class ProfileController extends Controller
{
    /**
     * Listar todos os profiles.
     */
    public function index()
    {
        $profiles = Auth::user()->profiles->map(function ($profile) {
            $profile->avatar_url = $profile->avatar 
            ? Storage::disk('s3_public')->temporaryUrl(
                $profile->avatar,
                now()->addMinutes(120)
            )
                : '/default-avatar.png'; // URL para avatar padrão
            return $profile;
        });
    
        return inertia('Public/Profile/index', [
            'profiles' => $profiles,
        ]);   
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Criar novo profile e salvar avatar.
     */
    public function store(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'avatar' => 'required|file|max:102400', // 100mb
        ]);
       
        $extension = $request->avatar->getClientOriginalExtension();
        $encoded = file_get_contents($request->avatar);
        $path = "profiles/{$id}/avatar.{$extension}";

        $success = Storage::disk('s3')->put($path, $encoded);

        if (!$success) {
            return back()->withErrors(['errors' => "Erro ao enviar o avatar!"]);
        }

        $profile = UserProfiles::create([
            "user_id" => $id,
            "username" => $request->name,
            "avatar" => $path,
        ]);

        if (!$profile) {
            return back()->withErrors(['errors' => "Erro ao salvar as informações do perfil."]);
        }

        session(['selected_profile' => $profile->id]);

        return to_route('aemina.index', ['content' => 'filme'])->with(["success" => "Perfil criado com sucesso!"]);
    }

    /**
     * Criar novo profile e salvar avatar.
     */
    public function selected($id)
    {
        $profile = UserProfiles::find($id);
        // Armazena o perfil selecionado na sessão
        session(['selected_profile' => $profile->id]);
    
        return to_route('aemina.index', ['content' => 'filme', 'category' => 'lancamento'])->with(["success" => "Bem vindo de volta, {$profile->username}!"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
