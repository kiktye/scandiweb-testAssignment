<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'product_id',
        'name',
        'in_stock',
        'description',
        'brand',
    ];

    public function getInStockAttribute()
    {
        return $this->attributes['in_stock'];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function resolveCategory($root)
    {
        return $root->category ? $root->category->name : null;
    }

    public function prices()
    {
        return $this->hasMany(Price::class, 'product_id');
    }

    public function attributes()
    {
        return $this->hasMany(Attribute::class, 'product_id');
    }

    public function gallery()
    {
        return $this->hasMany(ProductGallery::class, 'product_id');
    }
}
