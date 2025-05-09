import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function MesCours() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchMesCours = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Vous devez être connecté');
        }
        
        // Vérifier d'abord le rôle de l'utilisateur
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'formateur' && userRole !== 'admin') {
          setError('Vous devez être un formateur pour accéder à cette page');
          setLoading(false);
          return;
        }
        
        const response = await axios.get('http://127.0.0.1:8000/api/mes-cours', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Mes cours récupérés:', response.data);
        
        // Gérer différents formats possibles de la réponse
        let coursData = [];
        if (Array.isArray(response.data)) {
          coursData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          coursData = response.data.data;
        } else if (response.data && typeof response.data === 'object') {
          // Si aucun des formats ci-dessus, essayer de convertir l'objet en tableau
          coursData = Object.values(response.data);
        }
        
        setCours(coursData);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des cours:', err);
        
        // Message d'erreur spécifique pour 403 Forbidden
        if (err.response && err.response.status === 403) {
          setError('Vous n\'avez pas les autorisations nécessaires pour accéder à cette page. Veuillez vous connecter avec un compte formateur.');
        } else {
          setError('Impossible de récupérer vos cours. Veuillez réessayer plus tard.');
        }
        
        setLoading(false);
      }
    };
    
    fetchMesCours();
  }, []);
  
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce cours?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      await axios.delete(`http://127.0.0.1:8000/api/cours/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Mettre à jour la liste des cours
      setCours(cours.filter(c => c.id !== id));
      
      alert('Cours supprimé avec succès!');
    } catch (err) {
      console.error('Erreur lors de la suppression du cours:', err);
      alert('Impossible de supprimer ce cours. Veuillez réessayer.');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mes Cours</h1>
        <Link 
          to="/dashboard/ajoutcours" 
          className="bg-[#a52a2a] hover:bg-[#cc7722] text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlusCircle className="mr-2" /> Ajouter un cours
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a52a2a]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : cours.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">Vous n'avez pas encore créé de cours</p>
          <Link 
            to="/dashboard/ajoutcours" 
            className="bg-[#a52a2a] hover:bg-[#cc7722] text-white px-6 py-3 rounded-md inline-flex items-center"
          >
            <FaPlusCircle className="mr-2" /> Créer votre premier cours
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cours.map((course, index) => (
            <div key={course.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
              {course.image_couverture ? (
                <img 
                  src={`http://127.0.0.1:8000/storage/${course.image_couverture}`} 
                  alt={course.titre} 
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Pas d'image</span>
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.titre}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.statut === 'publie' ? 'bg-green-100 text-green-800' : 
                    course.statut === 'brouillon' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {course.statut === 'publie' ? 'Publié' : 
                     course.statut === 'brouillon' ? 'Brouillon' : 
                     'Archivé'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    {course.created_at ? new Date(course.created_at).toLocaleDateString('fr-FR') : 'Date inconnue'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Link 
                      to={`/dashboard/cours/${course.id}`} 
                      className="text-blue-600 hover:text-blue-800"
                      title="Voir le cours"
                    >
                      <FaEye />
                    </Link>
                    <Link 
                      to={`/dashboard/cours/${course.id}/edit`} 
                      className="text-green-600 hover:text-green-800"
                      title="Modifier le cours"
                    >
                      <FaEdit />
                    </Link>
                    <button 
                      onClick={() => handleDelete(course.id)} 
                      className="text-red-600 hover:text-red-800"
                      title="Supprimer le cours"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MesCours;
