// src/layouts/DashboardLayout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaChalkboardTeacher, FaUserGraduate, FaUserShield, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Rediriger vers le bon dashboard en fonction du rôle
    if (user && user.role) {
      const path = location.pathname;
      if (path === '/dashboard') {
        switch (user.role) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'formateur':
            navigate('/dashboard/formateur');
            break;
          case 'apprenant':
            navigate('/dashboard/apprenant');
            break;
          default:
            // Si le rôle n'est pas reconnu, rediriger vers apprenant par défaut
            navigate('/dashboard/apprenant');
        }
      }
    }
  }, [user, navigate, location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Déterminer quel lien est actif
  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div> <Navbar/>
    <div className="flex h-screen bg-gray-100"> 
   
      {/* Sidebar */}
      <div className={`bg-[#a52a2a] text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}>
        <div className="flex items-center space-x-2 px-4">
          <span className="text-xl font-extrabold">BAMENA DIGITAL CENTER</span>
          <button 
            className="md:hidden p-2 rounded-md hover:bg-[#cc7722]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav>
          {user && user.role === 'admin' && (
            <a 
              href="/dashboard/admin" 
              className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/admin') ? 'bg-[#cc7722]' : 'hover:bg-[#cc7722]/70'}`}
            >
              <div className="flex items-center">
                <FaUserShield className="mr-3" />
                <span>Dashboard Admin</span>
              </div>
            </a>
          )}
          
          {user && user.role === 'formateur' && (
            <a 
              href="/dashboard/formateur" 
              className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/formateur') ? 'bg-[#cc7722]' : 'hover:bg-[#cc7722]/70'}`}
            >
              <div className="flex items-center">
                <FaChalkboardTeacher className="mr-3" />
                <span>Dashboard Formateur</span>
              </div>
            </a>
          )}
          
          {user && (user.role === 'apprenant' || !user.role) && (
            <a 
              href="/dashboard/apprenant" 
              className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/apprenant') ? 'bg-[#cc7722]' : 'hover:bg-[#cc7722]/70'}`}
            >
              <div className="flex items-center">
                <FaUserGraduate className="mr-3" />
                <span>Dashboard Apprenant</span>
              </div>
            </a>
          )}
          
          <a 
            href="/dashboard/parametres" 
            className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard/parametres') ? 'bg-[#cc7722]' : 'hover:bg-[#cc7722]/70'}`}
          >
            <div className="flex items-center">
              <FaCog className="mr-3" />
              <span>Paramètres</span>
            </div>
          </a>
          
          <button 
            onClick={handleLogout}
            className="w-full text-left block py-2.5 px-4 rounded transition duration-200 hover:bg-[#cc7722]/70"
          >
            <div className="flex items-center">
              <FaSignOutAlt className="mr-3" />
              <span>Déconnexion</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-md h-16 flex items-center justify-between md:hidden px-4">
          <button 
            className="p-2 rounded-md hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center">
            <span className="mr-2">{user?.name || user?.email || 'Utilisateur'}</span>
            <FaUserCircle className="h-8 w-8 text-gray-500" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
    </div>
    
  );
};

export default DashboardLayout;
