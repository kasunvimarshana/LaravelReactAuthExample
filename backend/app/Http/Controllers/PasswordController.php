<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ResetRequest;
use App\Models\User;
use \Exception;

class PasswordController extends Controller
{
    public function fogot(Request $request){
        $email = $request->input('email');
        $token = Str::random(12);

        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token
        ]);

        Mail::send('reset', ['token' => $token], function (Message $message) use ($email) {
            $message->subject('Reset Your Password');
            $message->to($email);
        });

        return response(['message' => 'check your emails']);
    }

    public function reset(ResetRequest $request){
        //
        $passwordReset = DB::table('password_resets')->where('token', $request->input('token'))->first();
        if( !$user = User::where('email', $passwordReset->email)->first() ){
            throw new Exception('user not found');
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();

        return response(['message' => 'success']);
    }
}
