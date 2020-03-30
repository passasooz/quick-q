<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{csrf_token()}}">
        <title>Laravel</title>

    </head>
    <body>
        <div id="map" style="height:100vh;width:100vw;"></div>
                
        <script>
            var ABSOLUTE_URL = "{{Request::root()}}";
            var IMG_ME = "{{asset('img/marker.png')}}";
            var IMG_MARKET = "{{asset('img/supermarket.png')}}";
        </script>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key={{env('GOOGLE_KEY')}}&signed_in=true"></script>
        <script src="{{asset('js/main.js')}}"></script>
    </body>
</html>
