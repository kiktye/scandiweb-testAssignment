<?php

namespace App\Types;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use Models\Currency;

class CurrencyType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::nonNull(Type::string()),
                'symbol' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
