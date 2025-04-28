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
            'password' => Hash::make($request->password),
            'quartier' => $request->quartier,
            'date_naissance' => $request->date_naissance,
            'role' => 'apprenant',
            'statut' => 'actif',
        ]);

        return response()->json([
            'message' => 'Utilisateur inscrit avec succès.',
            'user' => $user
        ], 201);
    }

   

   
//   Connexion d'un utilisateur existant
//  
//     public function login(Request $request)
// {
//     // Validation des champs
//     $request->validate([
//         'email' => 'required|email',
//         'password' => 'required|string',
//     ]);

//     // Recherche de l'utilisateur par email
//     $user = User::where('email', $request->email)->first();

//     // Vérifie si l'utilisateur existe et que le mot de passe est correct
//     if (!$user || !Hash::check($request->password, $user->password)) {
//         return response()->json([
//             'message' => 'Identifiants incorrects.'
//         ], 401);
//     }

//     // Vérifie que l'utilisateur est actif
//     if ($user->statut !== 'actif') {
//         return response()->json([
//             'message' => 'Votre compte est inactif. Veuillez contacter l\'administrateur.'
//         ], 403);
//     }

//     // Crée un token avec Sanctum
//     $token = $user->createToken('auth_token')->plainTextToken;

//     // Retourne le token + info utilisateur
//     return response()->json([
//         'access_token' => $token,
//         'token_type' => 'Bearer',
//         'user' => $user
//     ]);
// }

// public function me(Request $request)
// {
//     return response()->json($request->user());
// }


    // Connexion
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }
    

        // Si ok, on retourne l'utilisateur connecté
        return response()->json(Auth::user());
    }

    // Récupérer l'utilisateur connecté
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté avec succès']);
    }
}

