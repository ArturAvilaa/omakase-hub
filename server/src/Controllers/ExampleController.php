<?php

namespace App\Controllers;

use App\Exceptions\ExampleApplicationException;
use App\InterfaceAdapters\Example;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ExampleController
{

    public function __construct(private Example $example)
    {
    }

    public function dependencyInjection(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $this->example->doSomething();

        $response->getBody()->write(json_encode([
            'data' => 'dependency injected'
        ]));

        return $response->withHeader('Content-Type', 'application/json');
    }

    public function applicationException(ServerRequestInterface $request, ResponseInterface $response)
    {
        throw new ExampleApplicationException("Example application exception");
    }
}
