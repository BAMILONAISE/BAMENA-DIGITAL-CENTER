import { useEffect, useState } from 'react';
import api from '../../api'; // Fichier Axios avec withCredentials configuré
import { FaUserEdit, FaSearch } from 'react-icons/fa';
// import EditUserModal from '../components/EditUserModal'; 
import AdminUserEditForm from '../../components/AdminUserEditForm';


function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🎯 Chargement initial des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users'); // ✅ Laravel route protégée
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des utilisateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Filtrage dynamique en fonction de la recherche et des filtres
  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter === '' || user.role === roleFilter) &&
    (statusFilter === '' || user.statut === statusFilter)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Gestion des utilisateurs</h1>

      {/* 🔎 Barre de recherche + filtres */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center border rounded w-full md:w-1/3 bg-white">
          <FaSearch className="ml-2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par nom..."
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

      {/* 📊 Tableau dynamique des utilisateurs */}
      {loading ? (
        <p className="text-gray-600">Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-red-600 text-white">
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
                <tr key={user.id} className="border-b hover:bg-yellow-50">
                  <td className="p-3">{user.nom}</td>
                  <td className="p-3">{user.prenom}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.quartier}</td>
                  <td className="p-3">{user.date_naissance}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-red-200 text-red-700' :
                      user.role === 'formateur' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.statut === 'actif' ? 'bg-green-200 text-green-700' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {user.statut}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      className="flex items-center text-sm text-blue-600 hover:underline"
                      onClick={() => console.log('Ouvrir modale modification')}
                    >
                      <FaUserEdit className="mr-1" /> Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  {editingUserId && (
    <AdminUserEditForm
      userId={editingUserId}
      onSuccess={() => {
        fetchUsers(); // pour recharger la liste
        setEditingUserId(null);
      }}
      onCancel={() => setEditingUserId(null)}
    />
  )}
  
}

export default AdminUsers;



