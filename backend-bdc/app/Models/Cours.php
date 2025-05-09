<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'titre',
        'description',
        'video_url',
        'contenu',
        'image_couverture',
        'categorie',
        'niveau',
        'duree_estimee',
        'tags',
        'statut',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    // Relation avec User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
