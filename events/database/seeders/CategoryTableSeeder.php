<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Festas e Shows',
            'Cursos e Workshops',
            'Moda e Beleza',
            'Arte e Cultura',
            'Esportivo',
            'Gastronômico',
            'Religioso',
            'Tecnologia',
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category,
            ]);
        }
    }
}
