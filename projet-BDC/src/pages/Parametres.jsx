import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaSave, FaUser, FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

// Définir l'URL de base de l'API
const API_URL = 'http://127.0.0.1:8000';

export default function Parametres() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    langue: 'Français',
    theme: 'Clair'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        langue: 'Français',
        theme: 'Clair'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Vous devez être connecté pour modifier vos informations');
        setLoading(false);
        return;
      }

      const response = await axios.put(
        `${API_URL}/api/user`,
        {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          langue: formData.langue,
          theme: formData.theme
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setSuccess('Informations mises à jour avec succès !');

      if (updateUser) {
        await updateUser();
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);

      if (err.response) {
        if (err.response.status === 401) {
          setError('Session expirée. Veuillez vous reconnecter.');
        } else if (err.response.status === 422) {
          const validationErrors = err.response.data.errors;
          if (validationErrors) {
            const errorMessages = Object.values(validationErrors).flat();
            setError(errorMessages.join(', '));
          } else {
            setError(`Erreur: ${err.response.data.message || 'Une erreur est survenue'}`);
          }
        } else {
          setError(`Erreur ${err.response.status}: ${err.response.data.message || 'Une erreur est survenue'}`);
        }
      } else if (err.request) {
        setError('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
      } else {
        setError('Une erreur est survenue lors de la préparation de la requête.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold text-[#a52a2a] mb-6">Paramètres du compte</h1>

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
              <FaCheckCircle className="mr-2" />
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
              <FaExclamationTriangle className="mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image de profil */}
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
                {user && user.image_profil ? (
                  <img src={`${API_URL}/storage/${user.image_profil}`} alt="profil" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FaUser size={32} />
                  </div>
                )}
              </div>
            </div>

            {/* Nom et prénom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#cc7722]/50 focus:border-[#cc7722]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#cc7722]/50 focus:border-[#cc7722]"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#cc7722]/50 focus:border-[#cc7722]"
                required
              />
            </div>

            {/* Langue & Thème */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                <select
                  name="langue"
                  value={formData.langue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#cc7722]/50 focus:border-[#cc7722]"
                >
                  <option value="Français">Français</option>
                  <option value="Anglais">Anglais</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thème</label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#cc7722]/50 focus:border-[#cc7722]"
                >
                  <option value="Clair">Clair</option>
                  <option value="Sombre">Sombre</option>
                </select>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#a52a2a] hover:bg-[#a52a2a]/90 transition text-white px-5 py-2 rounded flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
