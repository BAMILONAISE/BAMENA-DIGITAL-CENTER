// src/pages/admin/AdminCours.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminCours = () => {
  const navigate = useNavigate();
  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCours, setSelectedCours] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  const API_URL = 'http://127.0.0.1:8000/api';
  
  // Fonction pour récupérer les cours
  const fetchCours = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Vous devez être connecté pour accéder à cette page');
      }
      
      const response = await axios.get(`${API_URL}/cours`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Données des cours récupérées:', response.data);
      
      // Extraction des données selon leur format
      let coursData;
      if (Array.isArray(response.data)) {
        coursData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        coursData = response.data.data;
      } else if (response.data && typeof response.data === 'object') {
        coursData = Object.values(response.data);
      } else {
        coursData = [];
      }
      
      // Extraire les catégories uniques
      const uniqueCategories = [...new Set(coursData
        .filter(cours => cours.categorie)
        .map(cours => cours.categorie))];
      
      setCategories(uniqueCategories);
      setCours(coursData);
      setFilteredCours(coursData);
    } catch (err) {
      console.error('Erreur lors de la récupération des cours:', err);
      setError(err.message || 'Une erreur est survenue lors de la récupération des cours');
    } finally {
      setLoading(false);
    }
  };
  
  // Récupérer les cours au chargement
  useEffect(() => {
    fetchCours();
  }, []);
  
  // Filtrage des cours lors des changements de recherche ou de filtres
  useEffect(() => {
    if (!cours) return;
    
    let filtered = [...cours];
    
    // Recherche par titre ou description
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        course => 
          (course.titre && course.titre.toLowerCase().includes(searchTermLower)) ||
          (course.description && course.description.toLowerCase().includes(searchTermLower))
      );
    }
    
    // Filtrage par statut
    if (filterStatus !== 'all') {
      filtered = filtered.filter(course => course.statut === filterStatus);
    }
    
    // Filtrage par catégorie
    if (filterCategory !== 'all') {
      filtered = filtered.filter(course => course.categorie === filterCategory);
    }
    
    setFilteredCours(filtered);
  }, [searchTerm, filterStatus, filterCategory, cours]);
  
  // Fonction pour supprimer un cours
  const deleteCours = async () => {
    if (!selectedCours) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.delete(`${API_URL}/cours/${selectedCours.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Actualiser la liste après suppression
      fetchCours();
      setShowDeleteModal(false);
      setSelectedCours(null);
    } catch (err) {
      console.error('Erreur lors de la suppression du cours:', err);
      setError(err.message || 'Une erreur est survenue lors de la suppression du cours');
    } finally {
      setLoading(false);
    }
  };
  
  // Traiter l'affichage du statut
  const renderStatus = (status) => {
    const statusMap = {
      brouillon: { label: 'Brouillon', color: 'bg-gray-200 text-gray-800' },
      publie: { label: 'Publié', color: 'bg-green-200 text-green-800' },
      archive: { label: 'Archivé', color: 'bg-red-200 text-red-800' }
    };
    
    const { label, color } = statusMap[status] || { label: status, color: 'bg-gray-200 text-gray-800' };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };
  
  // Gérer l'affichage de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    return imagePath.startsWith('http') 
      ? imagePath 
      : `http://127.0.0.1:8000/storage/${imagePath}`;
  };
  
  // Fonction pour formater la date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date inconnue';
    try {
      return format(new Date(dateStr), 'dd MMMM yyyy', { locale: fr });
    } catch (e) {
      return dateStr;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des cours</h1>
        <button
          onClick={() => navigate('/dashboard/ajoutcours')}
          className="px-4 py-2 bg-[#a52a2a] text-white rounded-md hover:bg-opacity-90 flex items-center"
        >
          <FaPlus className="mr-2" />
          Ajouter un cours
        </button>
      </div>
      
      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              <FaFilter className="mr-2" />
              Filtrer
              <FaChevronDown className="ml-2" />
            </button>
            
            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md p-4 z-10 min-w-[250px] border border-gray-200">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="brouillon">Brouillon</option>
                    <option value="publie">Publié</option>
                    <option value="archive">Archivé</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                  >
                    <option value="all">Toutes les catégories</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterCategory('all');
                    }}
                    className="text-sm text-[#a52a2a] hover:underline"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Affichage des cours */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a52a2a]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchCours}
            className="mt-2 text-[#a52a2a] hover:underline"
          >
            Réessayer
          </button>
        </div>
      ) : filteredCours.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">Aucun cours ne correspond à vos critères de recherche.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterCategory('all');
            }}
            className="text-[#a52a2a] hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCours.map((cours) => (
            <motion.div
              key={cours.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                {getImageUrl(cours.image_couverture) ? (
                  <img
                    src={getImageUrl(cours.image_couverture)}
                    alt={cours.titre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzAwIDIwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2NjY2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZmlsbD0iIzY2NjY2NiI+QXVjdW5lIGltYWdlPC90ZXh0Pjwvc3ZnPg==";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Aucune image</span>
                  </div>
                )}
                <div className="absolute top-0 right-0 m-2">
                  {renderStatus(cours.statut)}
                </div>
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{cours.titre}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cours.description || 'Aucune description disponible'}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="mr-3">
                    <strong>Niveau:</strong> {cours.niveau || 'Non spécifié'}
                  </span>
                  <span>
                    <strong>Durée:</strong> {cours.duree_estimee ? `${cours.duree_estimee} h` : 'Non spécifiée'}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 mb-4">
                  Créé le {formatDate(cours.created_at)}
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedCours(cours);
                      setShowPreviewModal(true);
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center text-sm"
                  >
                    <FaEye className="mr-1" />
                    Prévisualiser
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/dashboard/cours/${cours.id}/edit`)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                      title="Modifier"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCours(cours);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                      title="Supprimer"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Modal de confirmation de suppression */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Confirmation de suppression</h3>
              <p className="mb-6">
                Êtes-vous sûr de vouloir supprimer le cours <strong>{selectedCours?.titre}</strong> ? Cette action est irréversible.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  onClick={deleteCours}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Suppression...
                    </>
                  ) : (
                    <>
                      <FaTrash className="mr-2" />
                      Supprimer
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Modal de prévisualisation du cours */}
      <AnimatePresence>
        {showPreviewModal && selectedCours && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <div className="h-64 overflow-hidden">
                  <img
                    src={getImageUrl(selectedCours.image_couverture) || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzAwIDIwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2NjY2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZmlsbD0iIzY2NjY2NiI+QXVjdW5lIGltYWdlPC90ZXh0Pjwvc3ZnPg=="}
                    alt={selectedCours.titre}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="absolute top-4 left-4">
                  {renderStatus(selectedCours.statut)}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCours.titre}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Catégorie</p>
                    <p className="font-medium">{selectedCours.categorie || 'Non spécifiée'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Niveau</p>
                    <p className="font-medium">{selectedCours.niveau || 'Non spécifié'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Durée estimée</p>
                    <p className="font-medium">{selectedCours.duree_estimee ? `${selectedCours.duree_estimee} heures` : 'Non spécifiée'}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{selectedCours.description || 'Aucune description disponible.'}</p>
                </div>
                
                {selectedCours.video_url && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Vidéo du cours</h3>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={selectedCours.video_url}
                        title="Video preview"
                        allowFullScreen
                        className="rounded-lg w-full h-64"
                      ></iframe>
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Contenu du cours</h3>
                  <div 
                    className="prose max-w-none border p-4 rounded-lg bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: selectedCours.contenu || '<p>Aucun contenu disponible.</p>' }}
                  ></div>
                </div>
                
                {selectedCours.tags && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        let tagsArray = [];
                        try {
                          if (typeof selectedCours.tags === 'string') {
                            // Essayer de parser le JSON si c'est une chaîne
                            tagsArray = JSON.parse(selectedCours.tags);
                          } else if (Array.isArray(selectedCours.tags)) {
                            tagsArray = selectedCours.tags;
                          }
                        } catch (e) {
                          // Si ce n'est pas du JSON valide, utiliser comme une chaîne simple
                          tagsArray = selectedCours.tags.split(',').map(tag => tag.trim());
                        }
                        
                        return Array.isArray(tagsArray) ? tagsArray.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                            {tag}
                          </span>
                        )) : (
                          <span className="text-gray-500">Aucun tag disponible</span>
                        );
                      })()}
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <div className="text-sm text-gray-500">
                    <p>Créé le: {formatDate(selectedCours.created_at)}</p>
                    <p>Dernière modification: {formatDate(selectedCours.updated_at)}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowPreviewModal(false);
                        navigate(`/dashboard/cours/${selectedCours.id}/edit`);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Modifier
                    </button>
                    <button
                      onClick={() => {
                        setShowPreviewModal(false);
                        setShowDeleteModal(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                    >
                      <FaTrash className="mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCours;
