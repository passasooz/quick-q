<?php
$result = [
    'status'    => false,
    'message'   => ''
];
$ch = curl_init();
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$api_key = $_POST['api_key'];

// set url
curl_setopt($ch, CURLOPT_URL, "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$lat.",".$lng."&radius=2000&keyword=Grocery%20store&key=".$api_key);

//return the transfer as a string
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

// $output contains the output string
$output = curl_exec($ch);

// close curl resource to free up system resources
curl_close($ch);

$output_decode = json_decode($output);
if(!is_object($output_decode)) {
    $result['message'] = 'error';
    echo json_encode($result);
    exit();
}
$results = $output_decode->results;
if(!is_array($results) || count($results) <= 0) {
    $result['message'] = 'no results';
    echo json_encode($result);
    exit();
}
$result['status'] = true;
$result['list'] = $results;
$result['message'] = 'returns grocery store list';
echo json_encode($result);
?>