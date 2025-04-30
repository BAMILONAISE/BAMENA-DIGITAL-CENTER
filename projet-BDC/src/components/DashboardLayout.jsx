// src/layouts/DashboardLayout.jsx

import React, { useState, useEffect } from 'react';
import DashboardApprenant from './DashboardApprenant';
import DashboardFormateur from './DashboardFormateur';
import DashboardAdmin from './DashboardAdmin';

const DashboardLayout = () => {
  // --- On stocke le rôle ici ---
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Simulation : récupérer le rôle depuis localStorage
    const storedRole = localStorage.getItem('userRole'); // exemple: 'apprenant', 'formateur', 'admin'
    setRole(storedRole);
  }, []);

  const renderDashboard = () => {
    switch (role) {
      case 'apprenant':
        return <DashboardApprenant />;
      case 'formateur':
        return <DashboardFormateur />;
      case 'admin':
        return <DashboardAdmin />;
      default:
        return (
          <div className="text-center text-red-500 mt-10">
            <p>Erreur : rôle inconnu ou non connecté.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {renderDashboard()}
    </div>
  );
};

export default DashboardLayout;
