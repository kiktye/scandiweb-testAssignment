<?php

namespace App\Types;

require_once __DIR__ . '/AttributeItemType.php';


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Models\Attribute;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'name' => Type::nonNull(Type::string()),
                'type' => Type::nonNull(Type::string()),
                'items' => Type::listOf(new AttributeItemType()),
            ],
        ]);
    }
}
