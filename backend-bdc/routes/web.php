<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\CoursViewController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route d'accueil
Route::get('/', function () {
    return view('welcome');
});

// Routes d'authentification
Route::post('/login', [AuthController::class, 'login']);
Route::get('/sanctum/csrf-cookie', function() {
    return response()->json(['message' => 'CSRF cookie set']);
});

// Routes pour les cours
Route::middleware(['auth'])->group(function () {
    // Routes pour les formateurs
    Route::prefix('formateur')->group(function () {
        Route::get('cours', [CoursViewController::class, 'formateurIndex'])->name('formateur.cours.index');
        Route::post('cours', [CoursController::class, 'store'])->name('formateur.cours.store');
        Route::put('cours/{cours}', [CoursController::class, 'update'])->name('formateur.cours.update');
        Route::delete('cours/{cours}', [CoursController::class, 'destroy'])->name('formateur.cours.destroy');
    });

    // Routes pour les administrateurs
    Route::prefix('admin')->group(function () {
        Route::get('cours', [CoursViewController::class, 'adminIndex'])->name('admin.cours.index');
        Route::post('cours', [CoursController::class, 'store'])->name('admin.cours.store');
        Route::put('cours/{cours}', [CoursController::class, 'update'])->name('admin.cours.update');
        Route::delete('cours/{cours}', [CoursController::class, 'destroy'])->name('admin.cours.destroy');
    });
});
