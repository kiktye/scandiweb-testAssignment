<?php

namespace App\Types;

require_once __DIR__ . '/CurrencyType.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Models\Price;

class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::nonNull(Type::float()),
                'currency' => new CurrencyType(),
            ],
        ]);
    }
}
