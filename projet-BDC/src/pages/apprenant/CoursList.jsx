import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';

function CoursList() {
  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const { user } = useAuth();

  // Extraire les catégories uniques des cours
  const categories = [...new Set(cours.map(c => c.categorie).filter(Boolean))];
  
  // Niveaux de difficulté prédéfinis
  const niveaux = ['debutant', 'intermediaire', 'avance'];
  
  useEffect(() => {
    const fetchCours = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Vous devez être connecté');
        }
        
        // Utilisation du bon endpoint avec le préfixe /api
        const response = await axios.get('http://127.0.0.1:8000/api/cours-apprenant', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // S'assurer que nous avons des données dans le bon format
        const coursData = response.data.data || response.data || [];
        console.log('Cours récupérés pour apprenant:', coursData);
        
        // Filtrer uniquement les cours publiés
        const coursPublies = coursData.filter(c => c.statut === 'publie');
        
        setCours(coursPublies);
        setFilteredCours(coursPublies);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des cours:', err);
        setError('Impossible de récupérer les cours. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };
    
    fetchCours();
  }, []);
  
  // Appliquer les filtres à chaque changement des critères
  useEffect(() => {
    let result = cours;
    
    // Filtre par terme de recherche
    if (searchTerm) {
      result = result.filter(c => 
        c.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filtre par catégorie
    if (selectedCategorie) {
      result = result.filter(c => c.categorie === selectedCategorie);
    }
    
    // Filtre par niveau
    if (selectedNiveau) {
      result = result.filter(c => c.niveau === selectedNiveau);
    }
    
    setFilteredCours(result);
  }, [searchTerm, selectedCategorie, selectedNiveau, cours]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategorieChange = (e) => {
    setSelectedCategorie(e.target.value);
  };
  
  const handleNiveauChange = (e) => {
    setSelectedNiveau(e.target.value);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategorie('');
    setSelectedNiveau('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Catalogue de cours</h1>
      
      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un cours..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-48">
              <select
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                value={selectedCategorie}
                onChange={handleCategorieChange}
              >
                <option value="">Toutes les catégories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full sm:w-48">
              <select
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                value={selectedNiveau}
                onChange={handleNiveauChange}
              >
                <option value="">Tous les niveaux</option>
                {niveaux.map(niv => (
                  <option key={niv} value={niv}>
                    {niv === 'debutant' ? 'Débutant' : 
                     niv === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={resetFilters}
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
      
      {/* Affichage des cours */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a52a2a]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      ) : filteredCours.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">Aucun cours ne correspond à vos critères</p>
          <button
            onClick={resetFilters}
            className="bg-[#a52a2a] hover:bg-[#cc7722] text-white px-6 py-3 rounded-md"
          >
            Afficher tous les cours
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCours.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
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
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{course.titre}</h2>
                </div>
                
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.niveau === 'debutant' ? 'bg-green-100 text-green-800' : 
                    course.niveau === 'intermediaire' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  } mr-2`}>
                    {course.niveau === 'debutant' ? 'Débutant' : 
                     course.niveau === 'intermediaire' ? 'Intermédiaire' : 'Avancé'}
                  </span>
                  
                  {course.categorie && (
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {course.categorie}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      {course.duree_estimee ? `${course.duree_estimee} min` : 'Durée non définie'}
                    </span>
                  </div>
                  
                  <Link 
                    to={`/dashboard/cours/${course.id}`} 
                    className="bg-[#a52a2a] hover:bg-[#cc7722] text-white px-3 py-1 rounded-md"
                  >
                    Voir le cours
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoursList;
