// src/pages/GestionCours.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSpinner, FaSearch, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import api from '../api';

const GestionCours = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');
  const [filteredCours, setFilteredCours] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [courseToPublish, setCourseToPublish] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Récupérer les cours
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        // Récupérer le token d'authentification
        const token = localStorage.getItem('token');
        
        let response;
        // Si admin: tous les cours, si formateur: ses cours uniquement
        if (user && user.role === 'admin') {
          response = await api.get('/cours', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } else {
          response = await api.get('/mes-cours', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        
        setCours(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des cours:', err);
        setError('Impossible de charger les cours. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  // Filtrer les cours en fonction de la recherche et du statut
  useEffect(() => {
    const filterCourses = () => {
      let filtered = cours;
      
      // Filtrer par terme de recherche
      if (searchTerm.trim() !== '') {
        filtered = filtered.filter(course => 
          course.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.categorie.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filtrer par statut
      if (filterStatus !== 'tous') {
        filtered = filtered.filter(course => course.statut === filterStatus);
      }
      
      setFilteredCours(filtered);
    };

    filterCourses();
  }, [cours, searchTerm, filterStatus]);

  // Supprimer un cours
  const deleteCourse = async () => {
    try {
      if (!courseToDelete) return;
      
      // Récupérer le token d'authentification
      const token = localStorage.getItem('token');
      
      await api.delete(`/cours/${courseToDelete.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Mettre à jour la liste des cours
      setCours(prevCours => prevCours.filter(c => c.id !== courseToDelete.id));
      
      // Afficher un message de succès
      setMessage({
        text: 'Cours supprimé avec succès !',
        type: 'success'
      });
      
      // Fermer la modal
      setDeleteModalOpen(false);
      setCourseToDelete(null);
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
      
    } catch (err) {
      console.error('Erreur lors de la suppression du cours:', err);
      
      // Afficher un message d'erreur
      setMessage({
        text: 'Erreur lors de la suppression du cours.',
        type: 'error'
      });
      
      // Fermer la modal
      setDeleteModalOpen(false);
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  // Publier ou retirer un cours
  const togglePublishStatus = async () => {
    try {
      if (!courseToPublish) return;
      
      // Récupérer le token d'authentification
      const token = localStorage.getItem('token');
      
      const isPublishing = courseToPublish.statut === 'brouillon';
      const endpoint = isPublishing ? 
        `/cours/${courseToPublish.id}/publier` : 
        `/cours/${courseToPublish.id}/retirer`;
      
      const response = await api.put(endpoint, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Mettre à jour la liste des cours
      setCours(prevCours => prevCours.map(c => 
        c.id === courseToPublish.id ? {...c, statut: isPublishing ? 'publie' : 'brouillon'} : c
      ));
      
      // Afficher un message de succès
      setMessage({
        text: isPublishing ? 'Cours publié avec succès !' : 'Cours retiré avec succès !',
        type: 'success'
      });
      
      // Fermer la modal
      setPublishModalOpen(false);
      setCourseToPublish(null);
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
      
    } catch (err) {
      console.error('Erreur lors de la modification du statut du cours:', err);
      
      // Afficher un message d'erreur
      setMessage({
        text: 'Erreur lors de la modification du statut du cours.',
        type: 'error'
      });
      
      // Fermer la modal
      setPublishModalOpen(false);
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Gestion des Cours
        </h1>
        <p className="text-gray-600">
          {user && user.role === 'admin' 
            ? 'Gérez tous les cours de la plateforme' 
            : 'Gérez vos cours et proposez de nouvelles formations'}
        </p>
      </div>

      {/* Message de notification */}
      {message.text && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          <div className="flex items-center">
            {message.type === 'success' ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaExclamationTriangle className="mr-2" />
            )}
            <span>{message.text}</span>
          </div>
        </motion.div>
      )}

      {/* Barre d'outils */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Recherche */}
          <div className="relative flex-grow mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Filtre par statut */}
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
          >
            <option value="tous">Tous les statuts</option>
            <option value="brouillon">Brouillons</option>
            <option value="publie">Publiés</option>
          </select>
        </div>
        
        {/* Bouton d'ajout */}
        <button
          onClick={() => navigate('/dashboard/formateur/ajouter-cours')}
          className="bg-[#a52a2a] text-white px-4 py-2 rounded-md hover:bg-[#cc7722] transition flex items-center whitespace-nowrap"
        >
          <FaPlus className="mr-2" />
          Ajouter un cours
        </button>
      </div>

      {/* Liste des cours */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-3xl text-[#a52a2a]" />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-md">
          <FaExclamationTriangle className="inline-block mr-2" />
          {error}
        </div>
      ) : filteredCours.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded-md text-center">
          <p className="text-gray-600 mb-4">Aucun cours trouvé.</p>
          <button
            onClick={() => navigate('/dashboard/formateur/ajouter-cours')}
            className="bg-[#a52a2a] text-white px-4 py-2 rounded-md hover:bg-[#cc7722] transition inline-flex items-center"
          >
            <FaPlus className="mr-2" />
            Créer votre premier cours
          </button>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredCours.map(course => (
            <motion.div 
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              variants={item}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image du cours */}
                <div className="md:w-1/4 h-48 md:h-auto relative">
                  {course.image_couverture ? (
                    <img 
                      src={`http://127.0.0.1:8000/storage/${course.image_couverture}`} 
                      alt={course.titre} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Pas d'image</span>
                    </div>
                  )}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-medium ${
                    course.statut === 'publie' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                  }`}>
                    {course.statut === 'publie' ? 'Publié' : 'Brouillon'}
                  </div>
                </div>
                
                {/* Contenu du cours */}
                <div className="p-4 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      {course.titre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description.length > 150 
                        ? `${course.description.substring(0, 150)}...` 
                        : course.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {course.categorie}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        Niveau: {course.niveau}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        Durée: {course.duree_estimee} heures
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => navigate(`/cours/${course.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition flex items-center text-sm"
                    >
                      <FaEye className="mr-1" />
                      Voir
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/formateur/modifier-cours/${course.id}`)}
                      className="bg-[#cc7722] text-white px-3 py-1 rounded-md hover:bg-[#cc7722]/80 transition flex items-center text-sm"
                    >
                      <FaEdit className="mr-1" />
                      Modifier
                    </button>
                    <button
                      onClick={() => {
                        setCourseToPublish(course);
                        setPublishModalOpen(true);
                      }}
                      className={`${
                        course.statut === 'brouillon' 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-yellow-500 hover:bg-yellow-600'
                      } text-white px-3 py-1 rounded-md transition flex items-center text-sm`}
                    >
                      {course.statut === 'brouillon' ? 'Publier' : 'Retirer'}
                    </button>
                    <button
                      onClick={() => {
                        setCourseToDelete(course);
                        setDeleteModalOpen(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center text-sm"
                    >
                      <FaTrash className="mr-1" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal de confirmation de suppression */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer le cours "{courseToDelete?.titre}" ? Cette action est irréversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setCourseToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Annuler
              </button>
              <button
                onClick={deleteCourse}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de publication/retrait */}
      {publishModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {courseToPublish?.statut === 'brouillon' ? 'Publier le cours' : 'Retirer le cours'}
            </h3>
            <p className="text-gray-600 mb-6">
              {courseToPublish?.statut === 'brouillon' 
                ? `Êtes-vous sûr de vouloir publier le cours "${courseToPublish?.titre}" ? Il sera visible par tous les apprenants.`
                : `Êtes-vous sûr de vouloir retirer le cours "${courseToPublish?.titre}" ? Il ne sera plus visible par les apprenants.`}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setPublishModalOpen(false);
                  setCourseToPublish(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Annuler
              </button>
              <button
                onClick={togglePublishStatus}
                className={`px-4 py-2 ${
                  courseToPublish?.statut === 'brouillon' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-yellow-500 hover:bg-yellow-600'
                } text-white rounded-md transition`}
              >
                {courseToPublish?.statut === 'brouillon' ? 'Publier' : 'Retirer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionCours;
