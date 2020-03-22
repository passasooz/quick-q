<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use lquintana\GooglePlaces\GooglePlaces;
use lquintana\GooglePlaces\Exceptions\GooglePlacesException;

class PlaceController extends Controller
{

    /**
     * @params $request
     * Return list of places with its popular time
     */
    public function places(Request $request)
    {
        $result = [
            'status'        => false,
            'message'       => '',
            'list'          => []
        ];
        if(strlen($request->input('location')) <= 0) {
            $result['message'] = 'non siamo riusciti a verificare la tua posizione';
            return response()->json($result);
        }

        $data = [
            'location'  => $request->input('location'),
            'radius'    => 3000,
            'keyword'   => 'Grocery store'
        ];

        $googlePlaces = new GooglePlaces();
        try{
            $places = $googlePlaces->nearbyPlacesWithPopularTimes($data);
        }catch(GooglePlacesException $e){
           return $e->getMessage();
        }

        foreach($places as $index => $place) {
            if(array_key_exists('now', $place)) {
                array_push($result['list'], $place);
            }
        }
        if(count($result['list']) <= 0) {
            $result['message'] = 'non ci sono dati per la tua zona';
            return response()->json($result);
        }

        $result['status'] = true;
        return response()->json($result);
    }
}