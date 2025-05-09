// src/components/DashboardFormateur.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AjouterCours from './AjouterCours';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBook, FaUserGraduate, FaClock, FaSignOutAlt, FaPlus, FaSearch, FaFilter, FaEdit, FaEye, FaTrash, FaChartLine } from 'react-icons/fa';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

// Définir l'URL de base de l'API
const API_URL = 'http://127.0.0.1:8000';

const DashboardFormateur = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  
  // États pour les données
  const [stats, setStats] = useState({
    coursPublies: 0,
    heuresEnseignees: 0,
    apprenantsFormes: 0,
  });

  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous'); // 'tous', 'publié', 'brouillon'

  // Gestion des onglets
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'cours', 'ajouter-cours'
  
  // Gestion de la suppression
  const [deletingCourseId, setDeletingCourseId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Charger les cours du formateur
  useEffect(() => {
    loadCours();
  }, []);

  const loadCours = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Récupérer le token d'authentification
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour accéder à vos cours');
        setLoading(false);
        return;
      }
      
      console.log('Tentative de chargement des cours...');
      
      // Récupérer les cours du formateur
      const response = await axios.get(`${API_URL}/api/mes-cours`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Réponse reçue:', response.data);
      
      if (response.data) {
        // S'assurer que nous avons un tableau de cours
        const coursData = Array.isArray(response.data) ? response.data : response.data.cours || [];
        
        setCours(coursData);
        setFilteredCours(coursData);
        
        // Calculer les statistiques
        const stats = {
          coursPublies: coursData.filter(c => c.statut === 'publié').length,
          heuresEnseignees: coursData.reduce((total, cours) => total + (parseInt(cours.duree_estimee) || 0), 0),
          apprenantsFormes: coursData.reduce((total, cours) => total + (cours.apprenants_count || 0), 0)
        };
        
        console.log('Statistiques calculées:', stats);
        setStats(stats);
      }
    } catch (err) {
      console.error('Erreur détaillée lors du chargement des cours:', err);
      if (err.response) {
        console.error('Données de réponse:', err.response.data);
        console.error('Statut:', err.response.status);
        console.error('En-têtes:', err.response.headers);
      }
      setError('Impossible de charger vos cours. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les cours en fonction des termes de recherche et du statut
  useEffect(() => {
    let filtered = cours;
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrer par statut
    if (filterStatus !== 'tous') {
      filtered = filtered.filter(c => c.statut === filterStatus);
    }
    
    setFilteredCours(filtered);
  }, [searchTerm, filterStatus, cours]);

  // Fonction pour supprimer un cours
  const deleteCours = async (id) => {
    try {
      setLoading(true);
      
      // Récupérer le token d'authentification
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour supprimer un cours');
        setLoading(false);
        return;
      }
      
      // Faire la requête API pour supprimer le cours (avec le préfixe /api)
      await axios.delete(`${API_URL}/api/cours/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Mettre à jour la liste des cours
      setCours(prevCours => prevCours.filter(c => c.id !== id));
      setShowDeleteConfirm(false);
      setDeletingCourseId(null);
      
      // Afficher un message de succès temporaire
      setError(null);
      
    } catch (err) {
      console.error('Erreur lors de la suppression du cours:', err);
      setError('Impossible de supprimer le cours. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

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
    return 'Formateur';
  };

  const userFirstName = getUserFirstName();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

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
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'dashboard' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Tableau de bord
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'cours' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('cours')}
          >
            Mes cours
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'ajouter-cours' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Cours publiés</p>
                    <p className="text-3xl font-bold text-[#a52a2a]">
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        stats.coursPublies
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
                    <p className="text-gray-500 text-sm">Heures enseignées</p>
                    <p className="text-3xl font-bold text-[#a52a2a]">
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        stats.heuresEnseignees
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-[#a52a2a] rounded-full text-white">
                    <FaClock size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Apprenants formés</p>
                    <p className="text-3xl font-bold text-[#a52a2a]">
                      {loading ? (
                        <span className="inline-block w-6 h-6 border-2 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        stats.apprenantsFormes
                      )}
                    </p>
                  </div>
                  <div className="p-3 bg-[#a52a2a] rounded-full text-white">
                    <FaUserGraduate size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cours récents */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Cours récents</h3>
                <button 
                  onClick={() => setActiveTab('ajouter-cours')}
                  className="px-3 py-1 bg-[#a52a2a] text-white rounded-md text-sm hover:bg-opacity-90 flex items-center"
                >
                  <FaPlus className="mr-1" size={12} />
                  Ajouter un cours
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-gray-600">Chargement de vos cours...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              ) : cours.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-yellow-700">Vous n'avez pas encore créé de cours.</p>
                  <button
                    onClick={() => setActiveTab('ajouter-cours')}
                    className="mt-2 text-[#a52a2a] hover:underline"
                  >
                    Créer votre premier cours
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCours.slice(0, 3).map((cours) => (
                    <div key={cours.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          {cours.image_couverture ? (
                            <img 
                              src={getImageUrl(cours.image_couverture)} 
                              alt={cours.titre}
                              className="w-full h-full object-cover rounded-md"
                              onError={(e) => {
                                console.log('Erreur de chargement image:', cours.image_couverture);
                                handleImageError(e);
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                              <FaBook className="text-gray-400" size={24} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{cours.titre}</span>
                            <span className="text-sm text-gray-500">
                              {cours.apprenants_count || 0} apprenants
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mb-2 line-clamp-1">
                            {cours.description || 'Aucune description disponible'}
                          </div>
                          <div className="flex justify-end">
                            <Link 
                              to={`/cours/${cours.id}/edit`}
                              className="text-[#a52a2a] text-sm hover:underline"
                            >
                              Modifier
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Contenu de l'onglet Mes cours */}
        {activeTab === 'cours' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Mes cours</h2>
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
                <p className="mt-2 text-gray-600">Chargement de vos cours...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700">{error}</p>
              </div>
            ) : cours.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-yellow-700">Vous n'avez pas encore créé de cours.</p>
                <button
                  onClick={() => setActiveTab('ajouter-cours')}
                  className="mt-2 text-[#a52a2a] hover:underline"
                >
                  Créer votre premier cours
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredCours.map((cours) => (
                  <div key={cours.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{cours.titre}</h3>
                          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                            {cours.description || 'Aucune description disponible'}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {cours.categorie && (
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                                {cours.categorie}
                              </span>
                            )}
                            {cours.niveau && (
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                                Niveau: {cours.niveau}
                              </span>
                            )}
                            {cours.duree_estimee && (
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                                {cours.duree_estimee} heures
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-4">
                              {cours.apprenants_count || 0} apprenants inscrits
                            </span>
                            <span>
                              Statut: <span className={`font-medium ${cours.statut === 'publié' ? 'text-green-600' : 'text-yellow-600'}`}>
                                {cours.statut || 'Brouillon'}
                              </span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="ml-4 flex flex-col space-y-2">
                          <Link 
                            to={`/cours/${cours.id}/edit`}
                            className="px-3 py-1 bg-[#a52a2a] text-white rounded-md text-sm hover:bg-opacity-90"
                          >
                            Modifier
                          </Link>
                          <Link 
                            to={`/cours/${cours.id}`}
                            className="px-3 py-1 border border-[#a52a2a] text-[#a52a2a] rounded-md text-sm hover:bg-gray-50"
                          >
                            Aperçu
                          </Link>
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

export default DashboardFormateur;
