<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Cours;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StatsController extends Controller
{
    /**
     * Récupère les statistiques pour le tableau de bord administrateur.
     */
    public function index()
    {
        try {
            // Calculer les statistiques à partir des modèles
            $totalUtilisateurs = User::count();
            $totalCours = Cours::count();
            $totalApprenants = User::where('role', 'apprenant')->count();
            $totalFormateurs = User::where('role', 'formateur')->count();
            
            // Retourner les statistiques au format attendu par le frontend
            return response()->json([
                'totalUtilisateurs' => $totalUtilisateurs,
                'totalCours' => $totalCours,
                'totalApprenants' => $totalApprenants,
                'totalFormateurs' => $totalFormateurs
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur dans StatsController@index: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des statistiques.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
