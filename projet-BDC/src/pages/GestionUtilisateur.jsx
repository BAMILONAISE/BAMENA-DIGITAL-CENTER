// src/pages/GestionUtilisateurs.jsx

import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

function GestionUtilisateurs() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await api.get('/admin/utilisateurs');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h2>
      <table className="w-full bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.nom}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GestionUtilisateurs;
