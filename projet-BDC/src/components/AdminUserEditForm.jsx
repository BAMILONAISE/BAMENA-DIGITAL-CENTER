// components/AdminUserEditForm.jsx
import { useState, useEffect } from 'react';
// import api from '../services/api'; // ton fichier axios

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

  const [errors, setErrors] = useState({});

  // Récupérer les données existantes de l'utilisateur
  useEffect(() => {
    api.get(`/users/${userId}`).then((res) => {
      setFormData(res.data);
    });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${userId}`, formData);
      onSuccess(); // pour recharger la liste ou fermer la modale
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Modifier l'utilisateur</h2>

      {['nom', 'prenom', 'email', 'quartier', 'date_naissance'].map((field) => (
        <div key={field} className="mb-3">
          <label className="block mb-1 capitalize">{field.replace('_', ' ')}</label>
          <input
            type={field === 'date_naissance' ? 'date' : 'text'}
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors[field] && <p className="text-red-500 text-sm">{errors[field][0]}</p>}
        </div>
      ))}

      <div className="mb-3">
        <label className="block mb-1">Rôle</label>
        <select name="role" value={formData.role} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="">Sélectionner un rôle</option>
          <option value="admin">Administrateur</option>
          <option value="formateur">Formateur</option>
          <option value="apprenant">Apprenant</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role[0]}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Statut</label>
        <select name="statut" value={formData.statut} onChange={handleChange} className="w-full border px-3 py-2 rounded">
          <option value="">Sélectionner un statut</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
        {errors.statut && <p className="text-red-500 text-sm">{errors.statut[0]}</p>}
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default AdminUserEditForm;
