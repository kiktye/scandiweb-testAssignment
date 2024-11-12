<?php

namespace App\Types;

require_once __DIR__ . '/AttributeType.php';
require_once __DIR__ . '/PriceType.php'; 
require_once __DIR__ . '/CategoryType.php'; 


use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Types\CategoryType;
class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
                'product_id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::boolean(),
                'gallery' => Type::listOf(Type::string()),
                'category' => Type::string(),
                'attributes' => Type::listOf(new AttributeType()),
                'prices' => Type::listOf(new PriceType()),
                'brand' => Type::nonNull(Type::string()),
                'description' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}



?>