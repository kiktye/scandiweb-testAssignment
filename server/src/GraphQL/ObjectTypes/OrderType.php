<?php

namespace App\Types;

require_once __DIR__ . '/ProductType.php';

use App\GraphQL\TypeRegistry;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Order;

class OrderType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'products' => Type::nonNull(Type::listOf(TypeRegistry::product())),
                'status' => Type::string(),
                'total_price' => Type::float(),
                'order_date' => Type::string(),
            ],
        ]);
    }
}



?>