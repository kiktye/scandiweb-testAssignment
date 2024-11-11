<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class AttributeItem extends Model
{

    protected $table = 'attribute_items';

    protected $fillable = [
        'attribute_id',
        'display_value',
        'value'
    ];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }
}
