<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\StatsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Routes publiques - sans préfixe /api car il est ajouté automatiquement
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Route pour tester CORS
Route::get('/test-cors', function() {
    return response()->json(['message' => 'CORS is working!']);
});

// Route pour vérifier le statut de l'authentification
Route::get('/check-auth', function() {
    return response()->json(['authenticated' => auth()->check()]);
});

// Route publique pour les cours
Route::get('/public/cours', [CoursController::class, 'publicIndex']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    // Informations utilisateur
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']); // Mise à jour du profil
    Route::put('/user', [AuthController::class, 'updateProfile']);

    // Gestion des cours
    Route::post('/cours', [CoursController::class, 'store']); // Ajouter un cours
    Route::get('/cours', [CoursController::class, 'index']); // Voir tous les cours (admin)
    Route::get('/mes-cours', [CoursController::class, 'mesCours']); // Voir ses cours (formateur)
    Route::get('/cours/{cours}', [CoursController::class, 'show']); // Voir un cours spécifique
    Route::put('/cours/{cours}', [CoursController::class, 'update']); // Mettre à jour un cours
    Route::delete('/cours/{cours}', [CoursController::class, 'destroy']); // Supprimer un cours
    Route::get('/cours-apprenant', [CoursController::class, 'coursApprenant']); // Voir les cours d'un apprenant

    // Routes administrateur
    Route::middleware('is_admin')->group(function () {
        Route::put('/users/{id}', [UserManagementController::class, 'update']);
        Route::post('/users', [UserManagementController::class, 'store']); // Nouvelle route pour créer un utilisateur
        Route::get('/users', [UserManagementController::class, 'index']); // Nouvelle route pour récupérer tous les utilisateurs
        Route::get('/users/{id}', [UserManagementController::class, 'show']);
        Route::delete('/users/{id}', [UserManagementController::class, 'destroy']); // Route pour supprimer un utilisateur
        Route::get('/admin/stats', [StatsController::class, 'index']); // Route pour les statistiques du dashboard admin
    });
});
