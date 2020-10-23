<?php

$token = getenv('API_TOKEN');
$endpoint = getenv('API_ENDPOINT');

if ($endpoint && $token) {
    $data = $_POST;
    $data['campaign'] = 'NisteOraseni';
    $data['product'] = 'Niște Orășeni';
    $data['url'] = $_SERVER['HTTP_REFERER'];
    $url = $endpoint;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer '.$token]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $response = curl_exec($ch);

    http_response_code(curl_getinfo($ch)['http_code'] ?? 200);
    header('Content-type: '.(curl_getinfo($ch)['content_type'] ?? 'application/json'));

    die($response);
} else {
    http_response_code(404);
    header('Content-type: application/json');
    die(json_encode([
        'errors' => [
            'form' => ['404 API not found'],
        ],
    ]));
}

