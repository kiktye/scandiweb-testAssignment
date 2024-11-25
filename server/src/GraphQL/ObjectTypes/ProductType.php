<?php

namespace App\Types;

require_once __DIR__ . '/AttributeType.php';
require_once __DIR__ . '/PriceType.php';


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    private static ?ObjectType $instance = null;

    public static function getType(): ObjectType
    {
        if (!self::$instance) {
            self::$instance = new ObjectType([
                'name' => 'Product',
                'fields' => [
                    'id' => Type::nonNull(Type::id()),
                    'product_id' => Type::nonNull(Type::string()),
                    'name' => Type::nonNull(Type::string()),
                    'inStock' => Type::boolean(),
                    'gallery' => Type::listOf(Type::string()),
                    'category' => Type::string(),
                    'attributes' => Type::listOf(AttributeType::getType()),
                    'prices' => Type::listOf(PriceType::getType()),
                    'brand' => Type::nonNull(Type::string()),
                    'description' => Type::nonNull(Type::string()),
                ],
            ]);
        }

        return self::$instance;
    }
}
