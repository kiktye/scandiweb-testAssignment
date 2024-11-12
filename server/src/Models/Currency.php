<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $table = 'currencies';

    protected $fillable = [
        'label',
        'symbol'
    ];

    public function prices() 
    {
        return $this->hasMany(Price::class);
    }
}

?>