<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->post('api/users/attempt', ['uses' => 'UsersController@attempt']);
$router->get('api/users/{id}/exists', ['uses' => 'UsersController@exists']);
$router->post('api/users/store', ['uses' => 'UsersController@store']);
$router->get('api/users/fetch', ['uses' => 'UsersController@fetch']);
