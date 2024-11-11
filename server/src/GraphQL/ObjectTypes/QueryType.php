<?php

namespace App\Types;

require_once __DIR__ . '/ProductType.php';
require_once __DIR__ . '/CategoryType.php';

use App\Models\Category;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\AttributeItem;
use App\Models\Currency;
use App\Models\Product;

class QueryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf(new CategoryType()),
                    'resolve' => function () {
                        return Category::all();
                    }
                ],
                'category' => [
                    'type' => new CategoryType(),
                    'args' => [
                        'id' => Type::nonNull(Type::id()),
                    ],
                    'resolve' => function ($root, $args) {
                        // find category by id 
                        return Category::find($args['id']);
                    }
                ],
                'products' => [
                    'type' => Type::listOf(new ProductType()),
                    'resolve' => function () {
                        $products = Product::with('category')->get();

                        return $products->map(function ($product) {

                            // product category->name 
                            $product->category = $product->category?->name;

                            // product_gallery
                            $product->gallery = $product->gallery()->pluck('image_url')->toArray();

                            // attributes
                            $product->attributes = $product->attributes()->get()->map(function ($attribute) {
                                $attribute->items = AttributeItem::where('attribute_id', $attribute->id)->get()->map(function ($item) {
                                    return [
                                        'displayValue' => $item->display_value,
                                        'value' => $item->value,
                                        'id' => $item->id
                                    ];
                                });
                                return $attribute;
                            });

                            // price with its currency (label & symbol)
                            $product->prices = $product->prices()->get()->map(function ($price) {
                                $currency = Currency::find($price->currency_id);
                                return [
                                    'amount' => $price->amount,
                                    'currency' => [
                                        'label' => $currency->label,
                                        'symbol' => $currency->symbol
                                    ]
                                ];
                            });

                            return $product;
                        });
                    }
                ],
                'product' => [
                    'type' => new ProductType(),
                    'args' => [
                        'id' => Type::nonNull(Type::id()),
                    ],
                    'resolve' => function ($root, $args) {
                        $product = Product::with('category', 'attributes.items')->find($args['id']);
                        if (!$product) return null;

                        // product category name
                        $product->category = $product->category?->name;

                        // product->gallery
                        $product->gallery = $product->gallery()->pluck('image_url')->toArray();

                        // attributes and it's items 
                        $product->attributes = $product->attributes()->get()->map(function ($attribute) {
                            $attribute->items = AttributeItem::where('attribute_id', $attribute->id)->get()->map(function ($item) {
                                return [
                                    'displayValue' => $item->display_value,
                                    'value' => $item->value,
                                    'id' => $item->id
                                ];
                            });
                            return $attribute;
                        });

                        // prices and its currency type
                        $product->prices = $product->prices()->get()->map(function ($price) {
                            $currency = Currency::find($price->currency_id);
                            return [
                                'amount' => $price->amount,
                                'currency' => [
                                    'label' => $currency->label,
                                    'symbol' => $currency->symbol
                                ]
                            ];
                        });

                        return $product;
                    }
                ]
            ]
        ]);
    }
}
