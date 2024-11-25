<?php

namespace App\Types;

require_once __DIR__ . '/ProductType.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType
{
    public static function getType(): ObjectType
    {
        return new ObjectType([
            'name' => 'Order',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'products' => Type::nonNull(Type::string()),
                'status' => Type::string(),
                'total_price' => Type::float(),
                'order_date' => Type::string(),
            ],
        ]);
    }
}
