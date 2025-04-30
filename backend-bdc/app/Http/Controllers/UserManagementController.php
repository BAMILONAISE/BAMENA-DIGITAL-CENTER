<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserManagementController extends Controller
{
    /**
     * Met à jour les informations d'un utilisateur (admin uniquement).
     */
    public function update(Request $request, $id)
    {
        // Récupération de l'utilisateur à modifier
        $user = User::findOrFail($id);

        // Validation des données entrantes
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($id)],
            'quartier' => 'nullable|string|max:255',
            'date_naissance' => 'nullable|date',
            'role' => ['required', Rule::in(['admin', 'formateur', 'apprenant'])],
            'statut' => ['required', Rule::in(['actif', 'inactif'])],
        ]);

        // Mise à jour des champs
        $user->update($validated);

        return response()->json(['message' => 'Utilisateur mis à jour avec succès.']);
    }

    public function show($id)
{
    return User::findOrFail($id);
}
}
