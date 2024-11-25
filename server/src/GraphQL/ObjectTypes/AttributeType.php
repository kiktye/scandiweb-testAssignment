<?php

namespace App\Types;

require_once __DIR__ . '/AttributeItemType.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType
{
    public static function getType(): ObjectType

    {
        return new ObjectType([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'name' => Type::nonNull(Type::string()),
                'type' => Type::nonNull(Type::string()),
                'items' => Type::listOf(AttributeItemType::getType()),
            ],
        ]);
    }
}
