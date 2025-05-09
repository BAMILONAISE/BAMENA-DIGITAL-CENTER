// src/components/DashboardAdmin.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AjouterCours from './AjouterCours';
import axios from 'axios';
import { FaUsers, FaBook, FaUserGraduate, FaChalkboardTeacher, FaSignOutAlt, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminUsers from '../pages/admin/AdminUsers';

const DashboardAdmin = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  
  // États pour les données
  const [stats, setStats] = useState({
    totalUtilisateurs: 0,
    totalCours: 0,
    totalApprenants: 0,
    totalFormateurs: 0,
  });

  const [cours, setCours] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gestion des onglets
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'utilisateurs', 'cours', 'ajouter-cours'

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Récupérer le token d'authentification
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Vous devez être connecté pour accéder au tableau de bord');
          setLoading(false);
          return;
        }
        
        // Configuration des headers pour les requêtes
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        // Initialiser les statistiques à zéro
        setStats({
          totalUtilisateurs: 0,
          totalCours: 0,
          totalApprenants: 0,
          totalFormateurs: 0
        });
        
        try {
          // Essayer de récupérer les statistiques depuis l'API
          const statsResponse = await axios.get('http://127.0.0.1:8000/api/admin/stats', config);
          console.log('Réponse statistiques:', statsResponse.data);
          
          if (statsResponse.data) {
            setStats(statsResponse.data);
          }
        } catch (statsErr) {
          console.error('Erreur lors de la récupération des statistiques:', statsErr);
          // Les statistiques seront mises à jour partiellement avec les données des cours et utilisateurs ci-dessous
        }
        
        try {
          // Récupérer la liste des cours
          const coursResponse = await axios.get('http://127.0.0.1:8000/api/cours', config);
          console.log('Réponse cours:', coursResponse.data);
          
          if (coursResponse.data) {
            let coursData = [];
            if (Array.isArray(coursResponse.data)) {
              coursData = coursResponse.data;
            } else if (coursResponse.data && Array.isArray(coursResponse.data.data)) {
              coursData = coursResponse.data.data;
            } else if (coursResponse.data && typeof coursResponse.data === 'object') {
              coursData = Object.values(coursResponse.data);
            }
            
            // Mettre à jour les statistiques si on n'a pas pu récupérer les stats globales
            setStats(prev => ({
              ...prev,
              totalCours: coursData.length
            }));
            
            setCours(coursData);
          }
        } catch (coursErr) {
          console.error('Erreur lors de la récupération des cours:', coursErr);
          // En cas d'erreur, laisser les cours vides
          setCours([]);
        }
        
        try {
          // Essayer de récupérer les utilisateurs - cette route doit être implémentée côté backend
          const usersResponse = await axios.get('http://127.0.0.1:8000/api/users', config);
          console.log('Réponse utilisateurs:', usersResponse.data);
          
          if (usersResponse.data) {
            let usersData = [];
            if (Array.isArray(usersResponse.data)) {
              usersData = usersResponse.data;
            } else if (usersResponse.data && Array.isArray(usersResponse.data.data)) {
              usersData = usersResponse.data.data;
            } else if (usersResponse.data && typeof usersResponse.data === 'object') {
              usersData = Object.values(usersResponse.data);
            }
            
            // Calculer le nombre d'apprenants et de formateurs
            const apprenants = usersData.filter(u => u.role === 'apprenant').length;
            const formateurs = usersData.filter(u => u.role === 'formateur').length;
            
            // Mettre à jour les statistiques si on n'a pas pu récupérer les stats globales
            setStats(prev => ({
              ...prev,
              totalUtilisateurs: usersData.length,
              totalApprenants: apprenants,
              totalFormateurs: formateurs
            }));
            
            setUtilisateurs(usersData);
          }
        } catch (usersErr) {
          console.error('Erreur lors de la récupération des utilisateurs:', usersErr);
          
          // Si on ne peut pas récupérer les utilisateurs, mettre quelques données fictives
          setUtilisateurs([
            { id: 1, prenom: "Jean", nom: "Dupont", email: "jean@example.com", role: "formateur" },
            { id: 2, prenom: "Marie", nom: "Martin", email: "marie@example.com", role: "formateur" },
            { id: 3, prenom: "Pierre", nom: "Durand", email: "pierre@example.com", role: "apprenant" },
          ]);
        }
        
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
        
        // En cas d'erreur, utiliser des données fictives pour la démo
        setStats({
          totalUtilisateurs: 150,
          totalCours: 20,
          totalApprenants: 100,
          totalFormateurs: 30,
        });
        
        setCours([
          { id: 1, titre: "HTML & CSS pour débutants", user: { prenom: "Jean", nom: "Dupont" }, apprenants_count: 25, description: "Apprenez les bases du développement web" },
          { id: 2, titre: "Principes de UI/UX Design", user: { prenom: "Marie", nom: "Martin" }, apprenants_count: 18, description: "Créez des interfaces utilisateur attrayantes" },
          { id: 3, titre: "Développement JavaScript", user: { prenom: "Pierre", nom: "Durand" }, apprenants_count: 30, description: "Maîtrisez le langage de programmation du web" },
        ]);
        
        setUtilisateurs([
          { id: 1, prenom: "Jean", nom: "Dupont", email: "jean@example.com", role: "formateur" },
          { id: 2, prenom: "Marie", nom: "Martin", email: "marie@example.com", role: "formateur" },
          { id: 3, prenom: "Pierre", nom: "Durand", email: "pierre@example.com", role: "apprenant" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Obtenir le prénom de l'utilisateur
  const getUserFirstName = () => {
    if (user && user.prenom) return user.prenom;
    if (user && user.name) {
      const nameParts = user.name.split(' ');
      return nameParts[0];
    }
    if (user && user.email) {
      return user.email.split('@')[0];
    }
    return 'Administrateur';
  };

  const userFirstName = getUserFirstName();

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* En-tête du tableau de bord */}
      <div className="bg-gradient-to-r from-[#a52a2a] to-[#cc7722] text-white py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Bienvenue, {userFirstName}</h1>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-[#a52a2a] rounded-md hover:bg-gray-100 transition-colors flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
        {/* Navigation par onglets */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'dashboard' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Tableau de bord
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'utilisateurs' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('utilisateurs')}
          >
            Utilisateurs
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'cours' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('cours')}
          >
            Cours
          </button>
          <Link
            to="/dashboard/admin/cours"
            className="py-2 px-4 font-medium whitespace-nowrap text-gray-500 hover:text-[#a52a2a]"
          >
            Gestion avancée des cours
          </Link>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'ajouter-cours' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('ajouter-cours')}
          >
            Ajouter un cours
          </button>
        </div>
        
        {/* Contenu des onglets */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Vue d'ensemble</h2>
            
            {/* Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Utilisateurs</p>
                    <p className="text-3xl font-bold text-[#a52a2a]">
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        stats.totalUtilisateurs
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-[#a52a2a] rounded-full text-white">
                    <FaUsers size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Cours</p>
                    <p className="text-3xl font-bold text-[#a52a2a]">
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        stats.totalCours
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-[#a52a2a] rounded-full text-white">
                    <FaBook size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Apprenants</p>
                    <p className="text-3xl font-bold text-[#a52a2a]">
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        stats.totalApprenants
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-[#a52a2a] rounded-full text-white">
                    <FaUserGraduate size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Formateurs</p>
                    <p className="text-3xl font-bold text-[#a52a2a]">
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        stats.totalFormateurs
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-[#a52a2a] rounded-full text-white">
                    <FaChalkboardTeacher size={20} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Aperçu des utilisateurs */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Utilisateurs récents</h3>
                <button 
                  onClick={() => setActiveTab('utilisateurs')}
                  className="text-[#a52a2a] text-sm hover:underline"
                >
                  Voir tous les utilisateurs
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600">Chargement des utilisateurs...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              ) : utilisateurs.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-yellow-700">Aucun utilisateur trouvé.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Utilisateur
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {utilisateurs.slice(0, 5).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.prenom} {user.nom}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                              user.role === 'formateur' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role === 'admin' ? 'Admin' : 
                               user.role === 'formateur' ? 'Formateur' : 'Apprenant'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Link to={`/dashboard/users/${user.id}/edit`} className="p-1 text-blue-600 hover:text-blue-800" title="Modifier">
                                <FaEdit />
                              </Link>
                              <button className="p-1 text-red-600 hover:text-red-800" title="Supprimer">
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Aperçu des cours */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Cours récents</h3>
                <button 
                  onClick={() => setActiveTab('cours')}
                  className="text-[#a52a2a] text-sm hover:underline"
                >
                  Voir tous les cours
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600">Chargement des cours...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              ) : cours.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-yellow-700">Aucun cours trouvé.</p>
                  <button
                    onClick={() => setActiveTab('ajouter-cours')}
                    className="mt-2 text-[#a52a2a] hover:underline"
                  >
                    Ajouter un cours
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cours.slice(0, 3).map((cours) => (
                    <div key={cours.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{cours.titre}</span>
                        <span className="text-sm text-gray-500">
                          {cours.apprenants_count || 0} apprenants
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2 line-clamp-1">
                        {cours.description || 'Aucune description disponible'}
                      </div>
                      <div className="text-sm text-gray-500">
                        Formateur: {cours.formateur}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Contenu de l'onglet Utilisateurs */}
        {activeTab === 'utilisateurs' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Gestion des utilisateurs</h2>
            <AdminUsers embedded={true} />
          </div>
        )}
        
        {/* Contenu de l'onglet Cours */}
        {activeTab === 'cours' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Gestion des cours</h2>
              <button 
                onClick={() => setActiveTab('ajouter-cours')}
                className="px-4 py-2 bg-[#a52a2a] text-white rounded-md hover:bg-opacity-90 flex items-center"
              >
                <FaPlus className="mr-2" size={14} />
                Nouveau cours
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-600">Chargement des cours...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            ) : cours.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-700">Aucun cours trouvé.</p>
                <button
                  onClick={() => setActiveTab('ajouter-cours')}
                  className="mt-2 text-[#a52a2a] hover:underline"
                >
                  Ajouter un cours
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {cours.map((cours) => (
                  <div key={cours.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{cours.titre}</h3>
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                            {cours.description || 'Aucune description disponible'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Formateur: {cours.formateur}
                          </p>
                          <p className="text-sm text-gray-500">
                            {cours.apprenants_count || 0} apprenants inscrits
                          </p>
                        </div>
                        
                        <div className="ml-4 flex flex-col space-y-2">
                          <button className="px-3 py-1 bg-[#a52a2a] text-white rounded-md text-sm hover:bg-opacity-90">
                            Modifier
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-opacity-90">
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Contenu de l'onglet Ajouter un cours */}
        {activeTab === 'ajouter-cours' && (
          <div>
            <h2 className="text-xl font-bold mb-6">Ajouter un nouveau cours</h2>
            <AjouterCours />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
