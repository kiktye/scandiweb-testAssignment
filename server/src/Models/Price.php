<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $table = 'prices';

    protected $fillable = [
        'product_id',
        'currency_id',
        'amount',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }
}
