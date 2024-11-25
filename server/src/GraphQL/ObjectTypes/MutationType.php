<?php

namespace App\Types;

require_once __DIR__ . '/ProductInputType.php';
require_once __DIR__ . '/OrderType.php';

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Models\Order;

use Exception;
use PDOException;
use Throwable;

class MutationType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => OrderType::getType(),
                    'args' => [
                        'products' => Type::nonNull(Type::listOf(ProductInputType::getType())),
                        'status' => Type::string(),
                        'total_price' => Type::float(),
                        'order_date' => Type::string(),
                    ],
                    'resolve' => function ($root, $args) {
                        return $this->createOrder($args);
                    },
                ],
            ],
        ]);
    }

    // handle creating the actual order
    private function createOrder(array $args): Order
    {
        error_log('Received args: ' . print_r($args, true));

        $productsJson = json_encode($args['products']);

        $order = new Order();
        $order->status = $args['status'] ?? 'pending';
        $order->total_price = $args['total_price'];
        $order->order_date = $args['order_date'];
        $order->products = $productsJson;

        try {
            $order->save();
        } catch (PDOException $e) {
            error_log('PDO Exception: ' . $e->getMessage());
            throw new Exception('Database error: ' . $e->getMessage());
        } catch (Throwable $e) {
            error_log('Unexpected Exception: ' . $e->getMessage());
            throw new Exception('Unexpected error: ' . $e->getMessage());
        }

        return $order;
    }
}
