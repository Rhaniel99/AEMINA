<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Login/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Login/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'email' => ['required', 'email'],
            'senha' => ['required'],
            // 'senha' => ['required', 'min:5'],
        ]);
        if (Auth::attempt(['email' => $request->email, 'password' => $request->senha])) {

            return to_route('aemina.index')->with('message','Sucesso!');

            // return redirect('/aemina')->with('message','Sucesso!');
        } else {
            $uniqueErrorIdentifier = time(); // ou use um contador
            return redirect()->back()->with('message', "Email ou senha inválidos.|{$uniqueErrorIdentifier}");

            // $uniqueErrorIdentifier = Carbon::now()->format('d/m/Y H:i:s'); // Formato desejado
            // return redirect()->back()->with('message', 'Email ou senha inválidos. ' . $uniqueErrorIdentifier);
        }
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
    public function destroy()
    {
        Auth::logout();
        return inertia('Login/Index');
    }
}
