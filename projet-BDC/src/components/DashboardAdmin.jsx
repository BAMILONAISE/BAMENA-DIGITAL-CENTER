// src/pages/DashboardAdmin.jsx

import React, { useState, useEffect } from 'react';

const DashboardAdmin = () => {
  // --- Données dynamiques (exemple) ---
  const [stats, setStats] = useState({
    totalUtilisateurs: 150,
    totalCours: 20,
    totalApprenants: 100,
    totalFormateurs: 30,
  });

  useEffect(() => {
    // Ici tu peux fetch tes vraies données depuis l'API plus tard
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Titre principal */}
      <h2 className="text-3xl font-bold text-green-700">Tableau de bord Administrateur</h2>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-700">{stats.totalUtilisateurs}</h3>
          <p className="text-gray-500">Utilisateurs</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-700">{stats.totalCours}</h3>
          <p className="text-gray-500">Cours</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-700">{stats.totalApprenants}</h3>
          <p className="text-gray-500">Apprenants</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold text-green-700">{stats.totalFormateurs}</h3>
          <p className="text-gray-500">Formateurs</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardAdmin;
