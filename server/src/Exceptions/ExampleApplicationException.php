<?php

namespace App\Exceptions;

use App\Infra\ApplicationException;
use Throwable;

class ExampleApplicationException extends ApplicationException
{
    public function __construct(string $message, ?Throwable $previous = null)
    {
        parent::__construct($message, 400, "EXAMPLE_APPLICATION_EXCEPTION", $previous);
    }
}