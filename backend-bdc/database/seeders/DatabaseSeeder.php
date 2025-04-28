<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\Hash;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        \App\Models\User::create([
            'prenom' => 'Admin',
            'nom' => 'Principal',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'date_naissance' => '1990-01-01',
            'quartier' => 'Centre',
            'role' => 'admin',
            'statut' => 'actif',
        ]);
    
        echo "✅ Admin inséré avec succès.\n"; 
         dd('Seeder lancé'); 
    }
    
    // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
     // ]);
    }




