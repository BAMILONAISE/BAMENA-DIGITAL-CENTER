// src/pages/admin/AdminUserEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminUserEditForm from '../../components/AdminUserEditForm';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

function AdminUserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(true);
  const [error, setError] = useState('');

  // Vérifier que l'utilisateur existe au chargement
  useEffect(() => {
    const checkUser = async () => {
      if (!id) {
        setError('Identifiant d\'utilisateur invalide');
        setUserExists(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Vous devez être connecté pour accéder à cette page');
          setUserExists(false);
          return;
        }
        
        // Vérifier si l'utilisateur existe
        await axios.get(`${API_URL}/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
      } catch (err) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', err);
        setError('Utilisateur non trouvé ou accès non autorisé');
        setUserExists(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [id]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/dashboard/users')}
          className="mr-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center"
        >
          <FaArrowLeft className="mr-1" /> Retour
        </button>
        <h1 className="text-3xl font-bold text-[#a52a2a]">Modifier l'utilisateur</h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a52a2a]"></div>
          <span className="ml-4 text-lg text-gray-600">Chargement...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
          <div className="mt-3">
            <button
              onClick={() => navigate('/dashboard/users')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Retour à la liste des utilisateurs
            </button>
          </div>
        </div>
      ) : userExists && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AdminUserEditForm
            userId={parseInt(id)}
            onSuccess={() => {
              // Rediriger vers la liste des utilisateurs après success
              navigate('/dashboard/users');
            }}
            onCancel={() => navigate('/dashboard/users')}
          />
        </div>
      )}
    </div>
  );
}

export default AdminUserEdit;
