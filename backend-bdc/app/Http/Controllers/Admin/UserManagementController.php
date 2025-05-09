<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class UserManagementController extends Controller
{
    /**
     * Récupère la liste de tous les utilisateurs (admin uniquement).
     */
    public function index()
    {
        try {
            // Récupération de tous les utilisateurs
            $users = User::all();
            
            return response()->json($users);
        } catch (\Exception $e) {
            Log::error('Erreur dans UserManagementController@index: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération des utilisateurs.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crée un nouvel utilisateur (admin uniquement).
     */
    public function store(Request $request)
    {
        try {
            // Validation des données entrantes
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'password_confirmation' => 'required_with:password|same:password',
                'quartier' => 'required|string|max:255',
                'date_naissance' => 'nullable|date',
                'contact' => 'nullable|string|max:20',
                'role' => ['required', Rule::in(['admin', 'formateur', 'apprenant'])],
                'statut' => ['required', Rule::in(['actif', 'inactif'])],
            ]);

            // Hachage du mot de passe
            $validated['password'] = Hash::make($validated['password']);
            
            // Supprimer le champ password_confirmation qui n'est pas nécessaire
            unset($validated['password_confirmation']);

            // Création de l'utilisateur
            $user = User::create($validated);

            return response()->json([
                'message' => 'Utilisateur créé avec succès.',
                'user' => $user
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erreur dans UserManagementController@store: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de l\'utilisateur.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Met à jour les informations d'un utilisateur (admin uniquement).
     */
    public function update(Request $request, $id)
    {
        try {
            // Récupération de l'utilisateur à modifier
            $user = User::findOrFail($id);

            // Validation des données entrantes
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
                'contact' => 'nullable|string|max:20',
                'quartier' => 'required|string|max:255',
                'date_naissance' => 'nullable|date',
                'role' => ['required', Rule::in(['admin', 'formateur', 'apprenant'])],
                'statut' => ['required', Rule::in(['actif', 'inactif'])],
            ]);

            // Si un nouveau mot de passe est fourni, le hacher
            if ($request->has('password') && !empty($request->password)) {
                $validated['password'] = Hash::make($request->password);
            }

            // Mise à jour des champs
            $user->update($validated);

            return response()->json(['message' => 'Utilisateur mis à jour avec succès.']);
        } catch (\Exception $e) {
            Log::error('Erreur dans UserManagementController@update: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user);
        } catch (\Exception $e) {
            Log::error('Erreur dans UserManagementController@show: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la récupération de l\'utilisateur.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprime un utilisateur du système (admin uniquement).
     */
    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            
            // On empêche la suppression du dernier administrateur
            if ($user->role === 'admin') {
                $adminCount = User::where('role', 'admin')->count();
                if ($adminCount <= 1) {
                    return response()->json([
                        'message' => 'Impossible de supprimer le dernier administrateur du système.'
                    ], 403);
                }
            }
            
            // Suppression de l'utilisateur
            $user->delete();
            
            return response()->json(['message' => 'Utilisateur supprimé avec succès.']);
        } catch (\Exception $e) {
            Log::error('Erreur dans UserManagementController@destroy: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de l\'utilisateur.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
