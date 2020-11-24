<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 50; $i ++) {
            User::create([
                'name'      => $faker->name,
                'birthdate' => $faker->date(),
                'identity'  => $faker->numberBetween(00000000000, 99999999999),
                'email'     => $faker->email,
                'password'  => Hash::make('123456'),
            ]);
        }
    }
}
