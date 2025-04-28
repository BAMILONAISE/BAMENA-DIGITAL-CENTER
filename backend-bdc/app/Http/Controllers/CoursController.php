<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CoursController extends Controller
{
    // Ajouter un cours
    public function store(Request $request)
    {
        // Vérifier que l'utilisateur est formateur ou admin
        if (!in_array(Auth::user()->role, ['formateur', 'admin'])) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        // Valider les données
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'required|url',
        ]);

        // Créer le cours
        $cours = Cours::create([
            'user_id' => Auth::id(),
            'titre' => $validated['titre'],
            'description' => $validated['description'] ?? null,
            'video_url' => $validated['video_url'],
        ]);

        return response()->json([
            'message' => 'Cours ajouté avec succès !',
            'cours' => $cours
        ], 201);
    }

    // Lister tous les cours (pour l'admin)
    public function index()
    {
        return response()->json(Cours::with('user')->get());
    }

    // Lister les cours de l'utilisateur connecté (formateur)
    public function mesCours()
    {
        return response()->json(Auth::user()->cours);
    }
}
