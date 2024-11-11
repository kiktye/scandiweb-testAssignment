<?php

namespace App\Types;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Models\AttributeItem;

class AttributeItemType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'displayValue' => Type::nonNull(Type::string()),
                'value' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
