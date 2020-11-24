<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventCollection;
use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    private $categoryModel;
    private $eventModel;

    public function __construct(Category $categoryModel, Event $eventModel)
    {
        $this->categoryModel = $categoryModel;
        $this->eventModel = $eventModel;
    }

    public function index(Request $request)
    {
        $events = $this->eventModel->with('category')->get();

        return response()->json([
            'events' => new EventCollection($events),
        ]);
    }

    public function exists($id)
    {
        return response()->json([
            'exists' => $this->eventModel->where('id', $id)->count() > 0,
        ]);
    }

    public function fetch(Request $request)
    {
        $inputs = $request->all();
        $events = [];

        if(isset($inputs['ids'])) {
            $events = $this->eventModel->whereIn('id', json_decode($inputs['ids']))->get();
        }

        return response()->json([
            'events' => new EventCollection($events),
        ]);
    }

}
