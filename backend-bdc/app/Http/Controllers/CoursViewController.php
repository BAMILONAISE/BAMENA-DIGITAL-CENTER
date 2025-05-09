<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use Illuminate\Http\Request;

class CoursViewController extends Controller
{
    // Afficher tous les cours (pour l'admin)
    public function adminIndex()
    {
        $cours = Cours::with('user')->get();
        return view('cours.index', compact('cours'));
    }

    // Afficher les cours du formateur
    public function formateurIndex()
    {
        $cours = auth()->user()->cours;
        return view('cours.index', compact('cours'));
    }
}
