// src/components/ListeCours.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Echo from '../echo';
import { FaEdit, FaTrash, FaEye, FaCheckCircle, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

function ListeCours() {
  const { user } = useAuth();
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fonction pour charger les cours
  const fetchCours = async () => {
    try {
      setLoading(true);
      const response = await api.get('/mes-cours');
      console.log('Cours chargés:', response.data); // Debug
      setCours(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des cours:', err);
      setError('Impossible de charger vos cours.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCours();

    // Configuration de l'écoute des événements en temps réel
    const channel = Echo.channel('cours');
    
    channel.listen('CoursUpdated', (e) => {
      console.log('Événement CoursUpdated reçu:', e); // Debug
      if (e.action === 'created') {
        // Si l'utilisateur connecté est le créateur du cours ou un admin
        if (e.cours.user_id === user.id || user.role === 'admin') {
          setCours(prevCours => {
            console.log('Mise à jour après création:', [...prevCours, e.cours]); // Debug
            return [...prevCours, e.cours];
          });
        }
      } else if (e.action === 'updated') {
        setCours(prevCours => prevCours.map(c => c.id === e.cours.id ? e.cours : c));
      } else if (e.action === 'deleted') {
        setCours(prevCours => prevCours.filter(c => c.id !== e.cours.id));
      }
    });

    // Nettoyage à la désinscription du composant
    return () => {
      channel.stopListening('CoursUpdated');
    };
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      return;
    }

    try {
      await api.delete(`/cours/${id}`);
      setCours(cours.filter(c => c.id !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError('Erreur lors de la suppression du cours.');
    }
  };

  const handlePublish = async (id) => {
    try {
      await api.put(`/cours/${id}`, { statut: 'publie' });
      setCours(cours.map(c => c.id === id ? { ...c, statut: 'publie' } : c));
    } catch (err) {
      console.error('Erreur lors de la publication:', err);
      setError('Erreur lors de la publication du cours.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">Mes cours</h1>
          <a 
            href="/ajouter-cours" 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Ajouter un cours
          </a>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {cours.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">Vous n'avez pas encore créé de cours.</p>
            <a 
              href="/ajouter-cours" 
              className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Créer votre premier cours
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cours.map(c => (
              <div key={c.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-40 bg-gray-200 relative">
                  {c.image_couverture ? (
                    <img 
                      src={getImageUrl(c.image_couverture)} 
                      alt={c.titre} 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <FaBook className="text-gray-400" size={32} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      c.statut === 'publie' ? 'bg-green-100 text-green-800' : 
                      c.statut === 'brouillon' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {c.statut === 'publie' ? 'Publié' : c.statut === 'brouillon' ? 'Brouillon' : 'Archivé'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{c.titre}</h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {c.description || 'Aucune description disponible'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {c.apprenants_count || 0} apprenants
                    </span>
                    <Link 
                      to={`/cours/${c.id}`}
                      className="text-[#a52a2a] hover:text-[#cc7722] text-sm font-medium"
                    >
                      Voir le cours
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListeCours;