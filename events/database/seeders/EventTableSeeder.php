<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $count = 1;
        foreach (Category::get() as $category) {
            for ($i = 0; $i < 3; $i ++) {

                $startsAt = Carbon::now()
                                  ->addDays($count)
                                  ->hours(random_int(0, 20))
                                  ->minutes(array_rand([
                                      0,
                                      30,
                                  ]))
                                  ->seconds(0);
                $endsAt = Carbon::now()
                                ->addDays($count)
                                ->hours(random_int($startsAt->hour + 1, 23))
                                ->minutes(array_rand([
                                    0,
                                    30,
                                ]))
                                ->seconds(0);

                Event::create([
                    'category_id' => $category->id,
                    'name'        => 'Evento ' . $count,
                    'description' => 'Descrição do evento ' . $count,
                    'starts_at'   => $startsAt,
                    'ends_at'     => $endsAt,
                ]);
                $count ++;
            }
        }
    }
}
