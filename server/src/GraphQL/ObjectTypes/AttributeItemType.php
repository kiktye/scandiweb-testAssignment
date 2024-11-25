<?php

namespace App\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeItemType
{
    public static function getType(): ObjectType
    {
        return new ObjectType([
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'displayValue' => Type::nonNull(Type::string()),
                'value' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
