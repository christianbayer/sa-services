<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
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
        $events = $this->eventModel->all();

        return response()->json([
            'events' => $events,
        ]);
    }

}
