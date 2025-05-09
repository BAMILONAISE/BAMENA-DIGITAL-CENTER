<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cours', function (Blueprint $table) {
            $table->text('contenu')->nullable();
            $table->string('image_couverture')->nullable();
            $table->string('categorie')->nullable();
            $table->string('niveau')->default('debutant');
            $table->integer('duree_estimee')->nullable();
            $table->json('tags')->nullable();
            $table->string('statut')->default('brouillon');
        });
    }

    /**php 
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cours', function (Blueprint $table) {
            $table->dropColumn([
                'contenu',
                'image_couverture',
                'categorie',
                'niveau',
                'duree_estimee',
                'tags',
                'statut'
            ]);
        });
        
    }
};