<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use App\Models\User;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    //
    public function register(RegisterRequest $request){
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return \response($user, Response::HTTP_CREATED);
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('email', 'password'))){
            return response([
                'error' => 'invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token, (60*24));

        return response(['jwt' => $token])->withCookie($cookie);
    }

    public function user(Request $request){
        return $request->user();
    }

    public function logout() {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'success'
        ])->withCookie($cookie);
    }
}
