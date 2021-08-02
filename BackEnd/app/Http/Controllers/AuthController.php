<?php

namespace App\Http\Controllers;

// use App\User;
use Illuminate\Http\Request;

use App\Models\Admin;

class AuthController extends Controller

{

    public function register(Request $request)
    {
        $admin = Admin::create([
            'UserName' => $request->UserName,
             'Email'    => $request->Email,
             'password' => $request->password,
             'Number' => $request->Number,
             'Image' => $request->Image,
         ]);

        $token = auth()->login($admin);

        return $this->respondWithToken($token);
    }

    public function login()
    {

        $credentials = request(['Email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $data = Admin::where('Email', $credentials['Email'])->first();
            $data->update(['remember_token' => $token]);
        } catch (Exception $e) {
            return false;
        }

        // return Admin::where('username', $credentials['username'])->first();
        return $this->respondWithToken($token);
    }

    public function logout()
    {
        $credentials = request(['Email']);

        try {
            $data = Admin::where('Email', $credentials['Email'])->first();
            $data->update(['remember_token' => null]);
        } catch (Exception $e) {
            return false;
        }

        // auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ]);
    }
}
