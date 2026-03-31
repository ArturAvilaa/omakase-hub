<?php

use App\Controllers\ExampleController;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/** @var \Slim\App $app */

$app->get('/', function (RequestInterface $request, ResponseInterface $response, $args) {
    $response->getBody()->write("Hello world!");
    return $response;
});

$app->get('/dependency-injection', ExampleController::class . ':dependencyInjection');
$app->get('/application-exception', ExampleController::class . ':applicationException');