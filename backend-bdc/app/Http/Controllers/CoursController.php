<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CoursController extends Controller
{
    // Ajouter un cours
    public function store(Request $request)
    {
        try {
            // Vérifier que l'utilisateur est formateur ou admin
            if (!in_array(Auth::user()->role, ['formateur', 'admin'])) {
                return response()->json(['message' => 'Non autorisé.'], 403);
            }

            // Log des données reçues
            Log::info('Données reçues dans CoursController@store', [
                'all' => $request->all(),
                'files' => $request->allFiles(),
                'user_id' => Auth::id(),
                'user_role' => Auth::user()->role
            ]);

            // Valider les données
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'contenu' => 'nullable|string',
                'video_url' => 'nullable|string',
                'image_couverture' => 'nullable|image|max:2048',
                'categorie' => 'nullable|string',
                'niveau' => 'nullable|string|in:debutant,intermediaire,avance',
                'duree_estimee' => 'nullable|integer',
                'tags' => 'nullable|string',
                'statut' => 'nullable|string|in:brouillon,publie,archive',
            ]);

            Log::info('Données validées', ['validated' => $validated]);

            // Traitement de l'image
            $imagePath = null;
            if ($request->hasFile('image_couverture')) {
                $imagePath = $request->file('image_couverture')->store('cours/images', 'public');
                Log::info('Image traitée', ['path' => $imagePath]);
            }

            // Traitement des tags - Convertir en JSON pour le stockage
            $tagsJson = null;
            if (!empty($validated['tags'])) {
                $tagsArray = explode(',', $validated['tags']);
                $tagsArray = array_map('trim', $tagsArray);
                $tagsJson = json_encode($tagsArray);
                Log::info('Tags traités', ['tags' => $tagsArray, 'tagsJson' => $tagsJson]);
            }

            // Créer le cours
            $coursData = [
                'user_id' => Auth::id(),
                'titre' => $validated['titre'],
                'description' => $validated['description'] ?? null,
                'contenu' => $validated['contenu'] ?? null,
                'video_url' => $validated['video_url'] ?? null,
                'image_couverture' => $imagePath,
                'categorie' => $validated['categorie'] ?? null,
                'niveau' => $validated['niveau'] ?? 'debutant',
                'duree_estimee' => $validated['duree_estimee'] ?? null,
                'tags' => $tagsJson,
                'statut' => $validated['statut'] ?? 'brouillon',
            ];
            
            Log::info('Données à insérer dans la base de données', ['coursData' => $coursData]);
            
            $cours = Cours::create($coursData);

            Log::info('Cours créé avec succès', ['cours_id' => $cours->id]);

            // Déclencher un événement pour les mises à jour en temps réel
            // event(new CoursUpdated($cours, 'created'));

            return response()->json([
                'message' => 'Cours ajouté avec succès !',
                'cours' => $cours
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erreur dans CoursController@store', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'ajout du cours.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Lister tous les cours (pour l'admin)
    public function index()
    {
        // Vérifier que l'utilisateur est admin
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        return response()->json(Cours::with('user')->get());
    }

    // Lister les cours de l'utilisateur connecté (formateur)
    public function mesCours()
    {
        // Permettre aux formateurs et aux administrateurs d'accéder à cette route
        if (Auth::user()->role === 'admin') {
            // Pour les administrateurs, retourner tous les cours
            return response()->json(Cours::with('user')->get());
        } else if (Auth::user()->role === 'formateur') {
            // Pour les formateurs, retourner uniquement leurs cours
            return response()->json(Auth::user()->cours);
        } else {
            // Pour les autres rôles (apprenants), refuser l'accès
            return response()->json(['message' => 'Non autorisé.'], 403);
        }
    }

    // Mettre à jour un cours
    public function update(Request $request, Cours $cours)
    {
        // Vérifier les permissions
        if (Auth::user()->role === 'formateur' && $cours->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        // Valider les données
        $validated = $request->validate([
            'titre' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'contenu' => 'nullable|string',
            'video_url' => 'nullable|string',
            'image_couverture' => 'nullable|image|max:2048',
            'categorie' => 'nullable|string',
            'niveau' => 'nullable|string|in:debutant,intermediaire,avance',
            'duree_estimee' => 'nullable|integer',
            'tags' => 'nullable|string',
            'statut' => 'nullable|string|in:brouillon,publie,archive',
        ]);

        // Traitement de l'image
        $imagePath = $cours->image_couverture;
        if ($request->hasFile('image_couverture')) {
            // Supprimer l'ancienne image si elle existe
            if ($cours->image_couverture) {
                Storage::disk('public')->delete($cours->image_couverture);
            }
            $imagePath = $request->file('image_couverture')->store('cours/images', 'public');
        }

        // Traitement des tags
        $tags = $cours->tags;
        if (isset($validated['tags'])) {
            $tags = explode(',', $validated['tags']);
            $tags = array_map('trim', $tags);
        }

        // Mettre à jour le cours
        $cours->update([
            'titre' => $validated['titre'] ?? $cours->titre,
            'description' => $validated['description'] ?? $cours->description,
            'contenu' => $validated['contenu'] ?? $cours->contenu,
            'video_url' => $validated['video_url'] ?? $cours->video_url,
            'image_couverture' => $imagePath,
            'categorie' => $validated['categorie'] ?? $cours->categorie,
            'niveau' => $validated['niveau'] ?? $cours->niveau,
            'duree_estimee' => $validated['duree_estimee'] ?? $cours->duree_estimee,
            'tags' => $tags,
            'statut' => $validated['statut'] ?? $cours->statut,
        ]);

        // Déclencher un événement pour les mises à jour en temps réel
        // event(new CoursUpdated($cours, 'updated'));

        return response()->json([
            'message' => 'Cours mis à jour avec succès !',
            'cours' => $cours
        ]);
    }

    // Supprimer un cours
    public function destroy(Cours $cours)
    {
        // Vérifier les permissions
        if (Auth::user()->role === 'formateur' && $cours->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé.'], 403);
        }

        // Supprimer l'image si elle existe
        if ($cours->image_couverture) {
            Storage::disk('public')->delete($cours->image_couverture);
        }

        $cours->delete();

        // Déclencher un événement pour les mises à jour en temps réel
        // event(new CoursUpdated($cours, 'deleted'));

        return response()->json([
            'message' => 'Cours supprimé avec succès !'
        ]);
    }
    
    // Afficher un cours spécifique
    public function show(Cours $cours)
    {
        // Tout utilisateur authentifié peut voir un cours
        return response()->json($cours->load('user'));
    }
    
    // Récupérer les cours pour un apprenant
    public function coursApprenant()
    {
        try {
            // Vérifier que l'utilisateur est un apprenant
            if (Auth::user()->role !== 'apprenant') {
                return response()->json(['message' => 'Non autorisé.'], 403);
            }
            
            // Récupérer tous les cours disponibles pour les apprenants
            // Dans une vraie application, vous pourriez avoir une table d'inscriptions
            // qui lie les apprenants aux cours auxquels ils sont inscrits
            $cours = Cours::with('user')->get();
            
            // Renvoyer les données dans le format attendu par le frontend
            return response()->json([
                'data' => $cours
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur dans CoursController@coursApprenant', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des cours.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Récupérer les cours publics (sans authentification)
    public function publicIndex()
    {
        try {
            // Récupérer uniquement les cours publiés
            $cours = Cours::where('statut', 'publie')
                ->with('user')
                ->get()
                ->map(function ($cours) {
                    // Transformer les tags JSON en tableau
                    if ($cours->tags) {
                        $cours->tags = json_decode($cours->tags);
                    }
                    return $cours;
                });

            return response()->json($cours);
        } catch (\Exception $e) {
            Log::error('Erreur dans CoursController@publicIndex', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des cours.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
