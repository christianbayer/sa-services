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

// Authentication
$router->post('/users/attempt', ['uses' => 'UsersController@attempt']);

// Integrity verification
$router->get('/users/{id}/exists', ['uses' => 'UsersController@exists']);

// Create new user
$router->post('/users/store', ['uses' => 'UsersController@store']);

// List of users
$router->get('/users/fetch', ['uses' => 'UsersController@fetch']);
