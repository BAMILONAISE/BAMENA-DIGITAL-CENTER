// src/components/AdminUserAddForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes, FaUserPlus, FaSpinner } from 'react-icons/fa';
import QuartierSelector from './QuartierSelector';

const API_URL = 'http://127.0.0.1:8000';

function AdminUserAddForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    password_confirmation: '',
    date_naissance: '',
    quartier: '',
    quartierAutre: '',
    role: 'apprenant',
    statut: 'actif'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur lorsque l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleQuartierChange = (quartier) => {
    setFormData(prev => ({
      ...prev,
      quartier: quartier,
      quartierAutre: '' // Réinitialiser le champ autre quand un quartier est sélectionné
    }));
  };

  const handleQuartierAutreChange = (quartierAutre) => {
    setFormData(prev => ({
      ...prev,
      quartierAutre: quartierAutre
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    
    if (!formData.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.quartier) {
      newErrors.quartier = 'Le quartier est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setSuccessMessage('');
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Vous devez être connecté pour effectuer cette action');
      }
      
      // Préparer les données à envoyer
      const sendData = {
        ...formData,
        quartier: formData.quartier === 'autre' ? formData.quartierAutre : formData.quartier,
        password_confirmation: formData.password_confirmation
      };
      
      const response = await axios.post(`${API_URL}/api/users`, sendData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSuccessMessage('Utilisateur créé avec succès!');
      
      // Vider le formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
        date_naissance: '',
        quartier: '',
        quartierAutre: '',
        role: 'apprenant',
        statut: 'actif'
      });
      
      // Callback de succès après un court délai
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(response.data);
        }
      }, 1500);
      
    } catch (err) {
      console.error('Erreur lors de la création de l\'utilisateur:', err);
      
      // Traitement des erreurs de validation du serveur
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({
          general: err.response?.data?.message || 'Une erreur est survenue lors de la création de l\'utilisateur'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Ajouter un nouvel utilisateur</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Message d'erreur général */}
          {errors.general && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{errors.general}</p>
            </div>
          )}
          
          {/* Message de succès */}
          {successMessage && (
            <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
              <p>{successMessage}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
            </div>
            
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.prenom ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quartier <span className="text-red-500">*</span>
            </label>
            <QuartierSelector
              quartier={formData.quartier}
              setQuartier={handleQuartierChange}
              quartierAutre={formData.quartierAutre}
              setQuartierAutre={handleQuartierAutreChange}
            />
            {errors.quartier && <p className="mt-1 text-sm text-red-600">{errors.quartier}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-700 mb-1">
              Date de naissance
            </label>
            <input
              type="date"
              id="date_naissance"
              name="date_naissance"
              value={formData.date_naissance}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.date_naissance ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.date_naissance && <p className="mt-1 text-sm text-red-600">{errors.date_naissance}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="apprenant">Apprenant</option>
              <option value="formateur">Formateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#a52a2a] hover:bg-[#cc7722]'} text-white rounded-md transition-colors flex items-center gap-2`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  En cours...
                </>
              ) : (
                'Créer l\'utilisateur'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminUserAddForm;
