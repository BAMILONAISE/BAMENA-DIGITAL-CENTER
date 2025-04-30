// src/components/Sidebar.jsx

import { Link } from 'react-router-dom';

function Sidebar({ role }) {
  // Liens selon le rôle
  const links = {
    apprenant: [
      { label: 'Accueil', to: '/dashboard' },
      { label: 'Mes cours', to: '/mes-cours' },
      { label: 'Profil', to: '/profil' },
    ],
    formateur: [
      { label: 'Accueil', to: '/dashboard' },
      { label: 'Ajouter un cours', to: '/ajouter-cours' },
      { label: 'Mes cours', to: '/mes-cours' },
      { label: 'Profil', to: '/profil' },
    ],
    admin: [
      { label: 'Accueil', to: '/dashboard' },
      { label: 'Gérer les utilisateurs', to: '/admin/utilisateurs' },
      { label: 'Gérer les cours', to: '/admin/cours' },
      { label: 'Profil', to: '/profil' },
    ],
  };

  const roleLinks = links[role] || [];

  return (
    <div className="bg-white w-64 min-h-screen p-6 shadow-md">
      <h1 className="text-2xl font-bold mb-8 text-center text-red-500">Bamena Center</h1>
      <nav className="flex flex-col space-y-4">
        {roleLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            className="text-gray-700 hover:bg-red-100 hover:text-red-500 p-2 rounded transition"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
