import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserEdit, FaSearch, FaTrash, FaUserPlus } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import AdminUserAddForm from '../../components/AdminUserAddForm';

const API_URL = 'http://127.0.0.1:8000';

function AdminUsers({ embedded = false }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // Récupérer l'ID depuis l'URL si présent
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Chargement initial des utilisateurs
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour accéder à cette page');
        setLoading(false);
        return;
      }
      
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Utilisateurs récupérés:', response.data);
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('AxiosError', err);
      setError("Erreur lors du chargement des utilisateurs: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Recharger la liste des utilisateurs
      fetchUsers();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  // Filtrage dynamique en fonction de la recherche et des filtres
  const filteredUsers = users.filter((user) =>
    (user.nom?.toLowerCase().includes(search.toLowerCase()) || 
     user.prenom?.toLowerCase().includes(search.toLowerCase()) ||
     user.email?.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === '' || user.role === roleFilter) &&
    (statusFilter === '' || user.statut === statusFilter)
  );

  const editUser = (userId) => {
    if (embedded) {
      // En mode intégré, ouvrez l'édition directement dans le tableau de bord
      navigate(`/dashboard/users/${userId}/edit`);
    } else {
      // En mode page complète, redirigez vers la page d'édition
      navigate(`/dashboard/users/${userId}/edit`);
    }
  };

  // Contenu principal à rendre
  const renderContent = () => (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center border rounded w-full md:w-1/3 bg-white">
          <FaSearch className="ml-2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou email..."
            className="w-full p-2 rounded outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="p-2 border rounded w-full md:w-1/4 bg-white"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Tous les rôles</option>
          <option value="admin">Admin</option>
          <option value="formateur">Formateur</option>
          <option value="apprenant">Apprenant</option>
        </select>

        <select
          className="p-2 border rounded w-full md:w-1/4 bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>
      </div>

      {/* Bouton pour ajouter un nouvel utilisateur */}
      <div className="mb-6">
        <button 
          className="flex items-center bg-[#a52a2a] hover:bg-[#cc7722] text-white px-4 py-2 rounded-md transition-colors shadow-md"
          onClick={() => setShowAddForm(true)}
        >
          <FaUserPlus className="mr-2" /> Nouvel utilisateur
        </button>
      </div>

      {/* Tableau dynamique des utilisateurs */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a52a2a]"></div>
          <span className="ml-4 text-lg text-gray-600">Chargement des utilisateurs...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">Aucun utilisateur trouvé avec les critères de recherche actuels.</span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-[#a52a2a] text-white">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Prénom</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Quartier</th>
                <th className="p-3 text-left">Date de naissance</th>
                <th className="p-3 text-left">Rôle</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.nom || '-'}</td>
                  <td className="p-3">{user.prenom || '-'}</td>
                  <td className="p-3">{user.email || '-'}</td>
                  <td className="p-3">{user.quartier || '-'}</td>
                  <td className="p-3">{user.date_naissance || '-'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-purple-200 text-purple-700' :
                      user.role === 'formateur' ? 'bg-blue-200 text-blue-700' :
                      'bg-green-200 text-green-700'
                    }`}>
                      {user.role === 'admin' ? 'Administrateur' :
                       user.role === 'formateur' ? 'Formateur' : 'Apprenant'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.statut === 'actif' ? 'bg-green-200 text-green-700' :
                      'bg-red-200 text-red-700'
                    }`}>
                      {user.statut === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={() => navigate(`/dashboard/users/${user.id}/edit`)}
                        title="Modifier l'utilisateur"
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Supprimer l'utilisateur"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulaire d'ajout d'utilisateur */}
      {showAddForm && (
        <AdminUserAddForm
          onSuccess={() => {
            setShowAddForm(false);
            fetchUsers();
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </>
  );

  // Si le composant est intégré dans un autre, ne pas ajouter de conteneur
  if (embedded) {
    return renderContent();
  }

  // Sinon, ajouter un conteneur pour la page complète
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#a52a2a] mb-6">Gestion des utilisateurs</h1>
      {renderContent()}
    </div>
  );
}

export default AdminUsers;
