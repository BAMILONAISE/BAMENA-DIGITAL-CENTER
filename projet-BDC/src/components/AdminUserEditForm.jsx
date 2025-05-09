// components/AdminUserEditForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const AdminUserEditForm = ({ userId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    quartier: '',
    date_naissance: '',
    role: '',
    statut: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Récupérer les données existantes de l'utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Vous devez être connecté pour modifier un utilisateur');
          return;
        }
        
        const response = await axios.get(`${API_URL}/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setFormData(response.data);
        setError('');
      } catch (err) {
        console.error('Erreur lors de la récupération des données utilisateur:', err);
        setError(err.response?.data?.message || 'Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour modifier un utilisateur');
        return;
      }
      
      await axios.put(`${API_URL}/api/users/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      onSuccess(); // pour recharger la liste et fermer le formulaire
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-[#a52a2a] text-white px-6 py-4">
          <h2 className="text-xl font-semibold">Modifier l'utilisateur</h2>
        </div>
        
        {loading && (
          <div className="p-4 text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-600">Chargement...</p>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                />
                {fieldErrors.nom && <p className="text-red-500 text-xs mt-1">{fieldErrors.nom[0]}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                />
                {fieldErrors.prenom && <p className="text-red-500 text-xs mt-1">{fieldErrors.prenom[0]}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
              />
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email[0]}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
              <input
                type="text"
                name="quartier"
                value={formData.quartier || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
              />
              {fieldErrors.quartier && <p className="text-red-500 text-xs mt-1">{fieldErrors.quartier[0]}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                name="date_naissance"
                value={formData.date_naissance || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
              />
              {fieldErrors.date_naissance && <p className="text-red-500 text-xs mt-1">{fieldErrors.date_naissance[0]}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                <select 
                  name="role" 
                  value={formData.role || ''} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                >
                  <option value="">Sélectionner</option>
                  <option value="admin">Administrateur</option>
                  <option value="formateur">Formateur</option>
                  <option value="apprenant">Apprenant</option>
                </select>
                {fieldErrors.role && <p className="text-red-500 text-xs mt-1">{fieldErrors.role[0]}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select 
                  name="statut" 
                  value={formData.statut || ''} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                >
                  <option value="">Sélectionner</option>
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
                {fieldErrors.statut && <p className="text-red-500 text-xs mt-1">{fieldErrors.statut[0]}</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#a52a2a] hover:bg-[#cc7722] text-white rounded-md transition-colors"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUserEditForm;
