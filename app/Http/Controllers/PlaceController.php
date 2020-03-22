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
            'message'       => ''
        ];
        if(strlen($request->input('location')) <= 0) {
            $result['message'] = 'non siamo riusciti a verificare la tua posizione';
            return response()->json($result);
        }

        $data = [
            'location'  => $request->input('location'),
            'radius'    => 2000
        ];

        $googlePlaces = new GooglePlaces();
        try{
            $places = $googlePlaces->nearbyPlacesWithPopularTimes($data);
        }catch(GooglePlacesException $e){
           return $e->getMessage();
        }

        $result['list'] = $places;
        $result['status'] = true;
        return response()->json($result);
    }

    /*
     * @params $request, $place
     * Retrun a place of given id with its own popular times
    public function show(Request $request, $place)
    {
        $data = $request->all();
        $googlePlaces = new GooglePlaces();

        try{
            $places = $googlePlaces->placeDetailWithPopularTimes($place);
        }catch(GooglePlacesException $e){
           return $e->getMessage();
        }
        return response()->json($places, 200);
    }
    */
}