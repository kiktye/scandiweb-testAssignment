<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public $timestamps = false;

    protected $table = 'orders';

    protected $casts = [
        'products' => 'array',
    ];

    protected $fillable = [
        'products',
        'status',
        'total_price',
        'order_date',
    ];
}
