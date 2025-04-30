// src/components/EditUserModal.jsx
import { useState, useEffect } from 'react';

const ROLES = ['apprenant', 'formateur', 'admin'];
const STATUTS = ['actif', 'inactif'];

export default function EditUserModal({ user, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    quartier: '',
    date_naissance: '',
    role: '',
    statut: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-xl p-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Modifier l'utilisateur</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="border p-2 rounded w-full"
          />
          <input
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="border p-2 rounded w-full"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
          />
          <input
            name="quartier"
            value={formData.quartier}
            onChange={handleChange}
            placeholder="Quartier"
            className="border p-2 rounded w-full"
          />
          <input
            name="date_naissance"
            value={formData.date_naissance}
            onChange={handleChange}
            type="date"
            className="border p-2 rounded w-full"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Choisir un rôle</option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Choisir un statut</option>
            {STATUTS.map((statut) => (
              <option key={statut} value={statut}>
                {statut}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Sauvegarder
          </button>
        </div>

        <button
          className="absolute top-2 right-3 text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
