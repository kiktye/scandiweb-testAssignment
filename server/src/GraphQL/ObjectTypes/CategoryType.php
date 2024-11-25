<?php

namespace App\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends ObjectType
{
    private static ?ObjectType $instance = null;

    public static function getType(): ObjectType
    {
        if (!self::$instance) {
            self::$instance = new ObjectType([
                'name' => 'Category',
                'fields' => [
                    'id' => Type::nonNull(Type::id()),
                    'name' => Type::nonNull(Type::string()),
                ],
            ]);
        }

        return self::$instance;
    }
}
