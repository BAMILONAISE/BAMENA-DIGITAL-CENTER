<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('prenom'); // Prénom
            $table->string('nom'); // Nom
            $table->string('email')->unique(); // Email unique
            $table->timestamp('email_verified_at')->nullable();
            $table->string('quartier'); // Quartier (champ texte ou valeur d’une liste)
            $table->date('date_naissance'); // Date de naissance        
            $table->string('password'); // Mot de passe
            $table->enum('role', ['apprenant', 'formateur', 'admin'])->default('apprenant'); // Rôle par défaut
            $table->enum('statut', ['actif', 'inactif'])->default('actif'); // Statut
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
