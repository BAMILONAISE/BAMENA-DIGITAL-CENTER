// src/pages/DashboardFormateur.jsx

import React, { useState, useEffect } from 'react';

const DashboardFormateur = () => {
  // --- Données dynamiques (exemple) ---
  const [stats, setStats] = useState({
    coursPublies: 5,
    heuresEnseignees: 120,
    apprenantsFormes: 80,
  });

  const [cours, setCours] = useState([
    { titre: "HTML & CSS pour débutants", progression: 100 },
    { titre: "Principes de UI/UX Design", progression: 75 },
    { titre: "Développement JavaScript", progression: 60 },
  ]);

  useEffect(() => {
    // Ici tu peux fetch tes vraies données depuis l'API plus tard
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Titre principal */}
      <h2 className="text-3xl font-bold text-green-700">Tableau de bord Formateur</h2>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-700">{stats.coursPublies}</h3>
          <p className="text-gray-500">Cours publiés</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-700">{stats.heuresEnseignees}</h3>
          <p className="text-gray-500">Heures enseignées</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-700">{stats.apprenantsFormes}</h3>
          <p className="text-gray-500">Apprenants formés</p>
        </div>
      </div>

      {/* Cours en cours */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Vos cours en cours</h3>
        
        <div className="space-y-4">
          {cours.map((cours, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span>{cours.titre}</span>
                <span>{cours.progression}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${cours.progression}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardFormateur;
