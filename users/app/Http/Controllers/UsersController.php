<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    private $userModel;

    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    public function store(Request $request)
    {
        $inputs = $request->only($this->userModel->getFillable());

        if( ! ($user = $this->userModel->where('identity', $inputs['identity'])->first())
            && isset($inputs['email'])
            && ($user = $this->userModel->where('email', $inputs['email'])->first())) {
            return response()->json(['error' => 'This email is already registered!'], 400);
        }

        if( ! $user) {
            $user = new User();
        }
        $user->fill($inputs);
        if($request->has('password')) {
            $user->password = Hash::make($request->get('password'));
        }
        $user->save();

        return response()->json([
            'user' => $user,
        ], 200);
    }

    public function attempt(Request $request)
    {
        if( ! ($user = $this->userModel->where('email', $request->get('email'))->first())
            || ! Hash::check($request->get('password'), $user->password)) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }

        return response()->json([
            'user' => $user,
        ], 200);
    }

    public function exists($id)
    {
        return response()->json([
            'exists' => $this->userModel->where('id', $id)->count() > 0,
        ]);
    }

    public function fetch(Request $request)
    {
        $inputs = $request->all();
        $users = [];

        if(isset($inputs['ids'])) {
            $users = $this->userModel->whereIn('id', json_decode($inputs['ids']))->get();
        }

        $mapUser = function ($user) {
            return [
                'id'        => $user['id'],
                'name'      => $user['name'],
                'birthdate' => $user['birthdate'],
                'identity'  => $user['identity'],
                'email'     => $user['email'],
            ];
        };

        return response()->json([
            'users' => array_map($mapUser, $users->toArray()),
        ]);
    }

}
