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
        Schema::table('cours', function (Blueprint $table) {
            // Add the missing fields
            $table->foreignId('user_id')->constrained()->after('id');
            $table->string('titre')->after('user_id');
            $table->text('description')->nullable()->after('titre');
            $table->string('video_url')->nullable()->after('description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cours', function (Blueprint $table) {
            $table->dropColumn(['user_id', 'titre', 'description', 'video_url']);
        });
    }
};
