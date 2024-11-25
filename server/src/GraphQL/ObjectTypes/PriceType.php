<?php

namespace App\Types;

require_once __DIR__ . '/CurrencyType.php';

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType
{
    public static function getType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::nonNull(Type::float()),
                'currency' => CurrencyType::getType(),
            ],
        ]);
    }
}
