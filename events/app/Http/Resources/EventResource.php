<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'description' => $this->description,
            'starts_at'   => $this->starts_at,
            'ends_at'     => $this->ends_at,
            'category'    => $this->whenLoaded('category', fn() => new CategoryResource($this->category)),
        ];
    }
}
