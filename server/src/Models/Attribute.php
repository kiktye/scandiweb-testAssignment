<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    protected $table = 'attributes';

    protected $fillable = [
        'product_id',
        'name',
        'type'
    ];

    public function items()
    {
        return $this->hasMany(AttributeItem::class, 'attribute_id');
    } 
}


?>