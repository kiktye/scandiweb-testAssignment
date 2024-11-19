<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use App\Types\AttributeItemType;
use App\Types\AttributeType;
use App\Types\CategoryType;
use App\Types\CurrencyType;
use App\Types\OrderType;
use App\Types\PriceType;
use App\Types\ProductType;

class TypeRegistry
{
    private static $instances = [];

    public static function attributeItem(): Type
    {
        return self::getInstance(AttributeItemType::class);
    }

    public static function attribute(): Type
    {
        return self::getInstance(AttributeType::class);
    }

    public static function category(): Type
    {
        return self::getInstance(CategoryType::class);
    }

    public static function currency(): Type
    {
        return self::getInstance(CurrencyType::class);
    }

    public static function order(): Type
    {
        return self::getInstance(OrderType::class);
    }

    public static function price(): Type
    {
        return self::getInstance(PriceType::class);
    }

    public static function product(): Type
    {
        return self::getInstance(ProductType::class);
    }

    private static function getInstance(string $className): Type
    {
        if (!isset(self::$instances[$className])) {
            self::$instances[$className] = new $className();
        }

        return self::$instances[$className];
    }
}
