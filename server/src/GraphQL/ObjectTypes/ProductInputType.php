<?php

namespace App\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class ProductInputType
{
    private static ?InputObjectType $instance = null;

    public static function getType(): InputObjectType
    {
        if (!self::$instance) {
            self::$instance = new InputObjectType([
                'name' => 'ProductInput',
                'fields' => [
                    'id' => Type::nonNull(Type::id()),
                    'product_id' => Type::string(),
                    'name' => Type::string(),
                    'quantity' => Type::int(),
                    'price' => Type::string(),
                    'attributes' => Type::listOf(Type::string()),
                ],
            ]);
        }

        return self::$instance;
    }
}
