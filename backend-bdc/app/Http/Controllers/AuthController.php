<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Méthode pour enregistrer un nouvel utilisateur.
     * Tous les utilisateurs ont par défaut le rôle 'apprenant' et le statut 'actif'.
     */
    public function register(Request $request)
    {
        // Validation des données entrantes
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'contact' => 'nullable|string|max:20',
            'quartier' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'password' => 'required|string|confirmed|min:8',
        ]);
        
        // En cas d'erreur de validation
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Création de l'utilisateur
        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'contact' => $request->contact,
            'password' => Hash::make($request->password),
            'quartier' => $request->quartier,
            'date_naissance' => $request->date_naissance,
            'role' => 'apprenant',
            'statut' => 'actif',
        ]);

        // Authentifier l'utilisateur
        Auth::login($user);
        
        // Générer un token d'authentification
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Utilisateur inscrit avec succès.',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }

   

   
    public function login(Request $request)
    {
        // Validation des champs
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Tentative de connexion avec Auth
        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerate();
            $user = Auth::user();
            
            // Vérifie que l'utilisateur est actif
            if ($user->statut !== 'actif') {
                Auth::logout();
                return response()->json([
                    'message' => 'Votre compte est inactif. Veuillez contacter l\'administrateur.'
                ], 403);
            }
            
            // Crée un token avec Sanctum
            $token = $user->createToken('auth_token')->plainTextToken;
            
            // Retourne le token + info utilisateur
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user
            ]);
        }
        
        // Identifiants incorrects
        return response()->json([
            'message' => 'Identifiants incorrects.'
        ], 401);
    }

    public function me(Request $request)
{
    try {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }
        return response()->json($user);
    } catch (\Exception $e) {
        \Log::error('Erreur dans la méthode me: ' . $e->getMessage());
        return response()->json(['message' => 'Erreur lors de la récupération des données utilisateur'], 500);
    }
}

    /**
     * Mettre à jour le profil de l'utilisateur
     */
    public function updateProfile(Request $request)
    {
        try {
            // Récupérer l'utilisateur authentifié
            $user = $request->user();
            if (!$user) {
                return response()->json(['message' => 'Non authentifié'], 401);
            }
            
            // Journaliser les données reçues pour le débogage
            \Log::info('Données reçues pour la mise à jour du profil:', $request->all());
            
            // Validation des données
            $validator = Validator::make($request->all(), [
                'nom' => 'nullable|string|max:255',
                'prenom' => 'nullable|string|max:255',
                'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
                'contact' => 'nullable|string|max:20',
                'quartier' => 'nullable|string|max:255',
                'date_naissance' => 'nullable|date',
                'image_profil' => 'nullable|image|max:2048', // 2MB max
                'langue' => 'nullable|string|max:50',
                'theme' => 'nullable|string|max:50',
            ]);
            
            // En cas d'erreur de validation
            if ($validator->fails()) {
                \Log::warning('Erreurs de validation lors de la mise à jour du profil:', $validator->errors()->toArray());
                return response()->json(['errors' => $validator->errors()], 422);
            }
            
            // Mise à jour des champs si présents dans la requête
            if ($request->has('nom')) {
                $user->nom = $request->nom;
            }
            
            if ($request->has('prenom')) {
                $user->prenom = $request->prenom;
            }
            
            if ($request->has('email') && $request->email !== $user->email) {
                $user->email = $request->email;
            }
            
            if ($request->has('contact')) {
                $user->contact = $request->contact;
            }
            
            if ($request->has('quartier')) {
                $user->quartier = $request->quartier;
            }
            
            if ($request->has('date_naissance')) {
                $user->date_naissance = $request->date_naissance;
            }
            
            // Traitement des préférences utilisateur (langue et thème)
            // Ces champs peuvent ne pas exister dans la table users, 
            // vous pourriez avoir besoin de les ajouter via une migration
            if ($request->has('langue') && property_exists($user, 'langue')) {
                $user->langue = $request->langue;
            }
            
            if ($request->has('theme') && property_exists($user, 'theme')) {
                $user->theme = $request->theme;
            }
            
            // Traitement de l'image de profil
            if ($request->hasFile('image_profil')) {
                try {
                    // Supprimer l'ancienne image si elle existe
                    if ($user->image_profil) {
                        \Storage::disk('public')->delete($user->image_profil);
                    }
                    
                    // Stocker la nouvelle image
                    $imagePath = $request->file('image_profil')->store('users/profile', 'public');
                    $user->image_profil = $imagePath;
                } catch (\Exception $e) {
                    \Log::error('Erreur lors du traitement de l\'image: ' . $e->getMessage());
                    return response()->json([
                        'message' => 'Erreur lors du traitement de l\'image',
                        'error' => $e->getMessage()
                    ], 500);
                }
            }
            
            // Sauvegarder les modifications
            $user->save();
            
            \Log::info('Profil mis à jour avec succès pour l\'utilisateur ID: ' . $user->id);
            
            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'user' => $user
            ]);
            
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du profil: ' . $e->getMessage());
            \Log::error('Trace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté avec succès']);
    }
}
