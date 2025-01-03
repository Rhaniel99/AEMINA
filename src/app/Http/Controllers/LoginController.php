<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserProfiles;
use Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Criação de usuário
     */
    public function create(Request $request)
    {
        $validated_data = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'senha' => 'required|string|min:6',
            'dt_nasc' => 'required|date',
        ]);

        // ? Criação do usuário
        User::create([
            'name' => $validated_data['nome'],
            'email' => $validated_data['email'],
            'birth_date' => $validated_data['dt_nasc'],
            'password' => bcrypt($validated_data['senha']),
        ]);
        
        return to_route('home')->with(["success" => "Criado com sucesso!"]);
    }

    /**
     * Autenticação
     */
    public function store(Request $request)
    {

        $request->validate([
            'email' => ['required', 'email'],
            'senha' => ['required'],
            // 'senha' => ['required', 'min:5'],
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->senha])) {

            // return redirect('/aemina/index')->with(["success" => "Login efetuado com sucesso!"]);

            return to_route('aemina.index')->with(["success" => "Login efetuado com sucesso!"]);
        } else {
            return back()->withErrors(['errors' => "Email ou senha inválidos."]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, string $type)
    {
        switch ($type) {
            case 'account':
                $request->validate([
                    "email" => "required|email|unique:users,email,{$id}",
                    "name" => "required|string",
                ]);

                User::where('id', $id)->update([
                    'email' => $request->email,
                    'name' => $request->name
                ]);

                return to_route('aemina.index')->with(["success" => "Atualizado com sucesso!"]);
            case 'password':
                $request->validate([
                    "senha_atual" => "required|string|min:6",
                    "nova_senha" => "required|string|min:6",
                ]);

                if (!\Illuminate\Support\Facades\Hash::check($request->senha_atual, Auth::user()->password)) {
                    return back()->withErrors(['errors' => "Senha atual está incorreta!"]);
                }

                User::where('id', $id)->update([
                    'password' => bcrypt($request->nova_senha)
                ]);

                return to_route('aemina.index')->with(["success" => "Senha atualizada com sucesso!"]);
            default:
                break;
        }
    }

    /**
     * Logout do login
     */
    public function destroy()
    {
        Auth::logout();
        session()->forget('selected_profile');
        return to_route('home');
    }

    // ! Profile

    /**
     * Display the specified resource.
     */
    // public function create_profile(Request $request, string $id)
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'avatar' => 'required|file|max:102400', // 100mb
    //     ]);
       
    //     $extension = $request->avatar->getClientOriginalExtension();
    //     $encoded = file_get_contents($request->avatar);
    //     $path = "profiles/{$id}/avatar.{$extension}";

    //     $success = \Storage::disk('s3')->put($path, $encoded);

    //     if (!$success) {
    //         return back()->withErrors(['errors' => "Erro ao enviar o avatar!"]);
    //     }

    //     $profile = UserProfiles::create([
    //         "user_id" => $id,
    //         "username" => $request->name,
    //         "avatar" => $path,
    //     ]);

    //     if (!$profile) {
    //         return back()->withErrors(['errors' => "Erro ao salvar as informações do perfil."]);
    //     }

    //     return to_route('aemina.index')->with(["success" => "Perfil criado com sucesso!"]);
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function create_profile()
    // {
    //     return inertia('Login/CreateProfile');
    // }

}
