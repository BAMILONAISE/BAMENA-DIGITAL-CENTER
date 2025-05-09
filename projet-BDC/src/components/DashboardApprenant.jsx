import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBook, FaUserGraduate, FaSignOutAlt, FaCertificate, FaChartLine, FaSearch, FaFilter, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { getImageUrl, handleImageError } from '../utils/imageUtils';

// Définir l'URL de base de l'API
const API_URL = 'http://127.0.0.1:8000';

function DashboardApprenant() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'progress', 'certificates'
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    averageProgress: 0,
    certificatesEarned: 0
  });
  
  // Récupérer les cours de l'apprenant depuis l'API
  useEffect(() => {
    loadCourses();
  }, []);

  // Filtrer les cours en fonction du terme de recherche
  useEffect(() => {
    if (courses.length > 0) {
      const filtered = courses.filter(course => 
        course.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courses]);
  
  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    
    // Récupérer le token d'authentification
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Vous devez être connecté pour accéder à vos cours');
      setLoading(false);
      return;
    }
    try {
      // Faire la requête API avec le token d'authentification
      const response = await axios.get(`${API_URL}/api/cours-apprenant`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Vérifier si la réponse contient des données
      if (response.data && Array.isArray(response.data.data)) {
        const coursesData = response.data.data;
        setCourses(coursesData);
        setFilteredCourses(coursesData);
        
        // Calculer les statistiques
        const completed = coursesData.filter(course => course.progression === 100).length;
        const avgProgress = coursesData.length > 0 
          ? coursesData.reduce((acc, course) => acc + (course.progression || 0), 0) / coursesData.length 
          : 0;
        
        setStats({
          totalCourses: coursesData.length,
          completedCourses: completed,
          averageProgress: Math.round(avgProgress),
          certificatesEarned: completed // Supposons que chaque cours complété donne un certificat
        });
      } else {
        setCourses([]);
        setFilteredCourses([]);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des cours:', err);
      
      // Gestion améliorée des erreurs
      if (err.response) {
      // Le serveur a répondu avec un code d'erreur
      if (err.response.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
        // Rediriger vers la page de connexion après un délai
        setTimeout(() => {
          logoutUser();
          navigate('/login');
        }, 2000);
      } else {
        setError(`Erreur ${err.response.status}: ${err.response.data.message || 'Une erreur est survenue'}`);
      }
    } else if (err.request) {
      // La requête a été faite mais pas de réponse
      setError('Impossible de se connecter au serveur. Vérifiez votre connexion internet.');
    } else {
      // Erreur lors de la configuration de la requête
      setError('Une erreur est survenue lors de la préparation de la requête.');
    }
  } finally {
    setLoading(false);
  }
  };
  
  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Obtenir le prénom de l'utilisateur
  const getUserFirstName = () => {
    if (user && user.prenom) return user.prenom;
    if (user && user.name) {
      const nameParts = user.name.split(' ');
      return nameParts[0];
    }
    if (user && user.email) {
      return user.email.split('@')[0];
    }
    return 'Utilisateur';
  };

  const userFirstName = getUserFirstName();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* En-tête du tableau de bord */}
      <div className="bg-gradient-to-r from-[#a52a2a] to-[#cc7722] text-white py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Bienvenue, {userFirstName}</h1>
              <p className="text-white/80 mt-1">Votre espace d'apprentissage personnel</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-[#a52a2a] rounded-md hover:bg-gray-100 transition-colors flex items-center shadow-sm"
            >
              <FaSignOutAlt className="mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-4 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="p-3 border-r border-gray-100 last:border-r-0">
            <p className="text-gray-500 text-sm">Cours inscrits</p>
            <p className="text-2xl font-bold text-[#a52a2a]">{stats.totalCourses}</p>
          </div>
          <div className="p-3 border-r border-gray-100 last:border-r-0">
            <p className="text-gray-500 text-sm">Cours terminés</p>
            <p className="text-2xl font-bold text-[#a52a2a]">{stats.completedCourses}</p>
          </div>
          <div className="p-3 border-r border-gray-100 last:border-r-0">
            <p className="text-gray-500 text-sm">Progression moyenne</p>
            <p className="text-2xl font-bold text-[#a52a2a]">{stats.averageProgress}%</p>
          </div>
          <div className="p-3">
            <p className="text-gray-500 text-sm">Certificats obtenus</p>
            <p className="text-2xl font-bold text-[#a52a2a]">{stats.certificatesEarned}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
        {/* Navigation par onglets */}
        <div className="flex overflow-x-auto border-b border-gray-200 mb-6 pb-1 scrollbar-hide">
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'courses' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('courses')}
          >
            <span className="flex items-center"><FaBook className="mr-2" /> Mes cours</span>
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'progress' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('progress')}
          >
            <span className="flex items-center"><FaChartLine className="mr-2" /> Ma progression</span>
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === 'certificates' ? 'text-[#a52a2a] border-b-2 border-[#a52a2a]' : 'text-gray-500 hover:text-[#a52a2a]'}`}
            onClick={() => setActiveTab('certificates')}
          >
            <span className="flex items-center"><FaCertificate className="mr-2" /> Mes certificats</span>
          </button>
        </div>
        
        {/* Barre de recherche */}
        {activeTab === 'courses' && (
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Contenu des onglets */}
        {activeTab === 'courses' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaBook className="mr-2" />
              Mes cours
              {searchTerm && <span className="ml-2 text-sm font-normal text-gray-500">Résultats pour "{searchTerm}"</span>}
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-10 h-10 border-4 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Chargement de vos cours...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <button 
                    onClick={loadCourses}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-700">
                  {searchTerm 
                    ? `Aucun cours ne correspond à "${searchTerm}".` 
                    : "Vous n'êtes inscrit à aucun cours pour le moment."}
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-sm text-yellow-700 underline"
                  >
                    Effacer la recherche
                  </button>
                )}
                {!searchTerm && (
                  <Link 
                    to="/courses" 
                    className="mt-2 inline-block px-4 py-2 bg-[#a52a2a] text-white rounded-md text-sm hover:bg-opacity-90"
                  >
                    Découvrir les cours
                  </Link>
                )}
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCourses.map((course) => (
                  <motion.div 
                    key={course.id} 
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {course.image_couverture ? (
                      <div className="h-40 bg-gray-200 relative">
                        <img 
                          src={getImageUrl(course.image_couverture)} 
                          alt={course.titre} 
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <div className="flex items-center text-white">
                            <FaBook className="mr-2" size={16} />
                            <span className="text-sm font-medium">{course.titre}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-r from-[#a52a2a]/80 to-[#cc7722]/80 flex items-center justify-center text-white p-4">
                        <FaBook className="mr-2" size={24} />
                        <span className="text-lg font-medium">{course.titre}</span>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{course.titre}</h3>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                        {course.description || 'Aucune description disponible'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {course.apprenants_count || 0} apprenants
                        </span>
                        <Link 
                          to={`/cours/${course.id}`}
                          className="text-[#a52a2a] hover:text-[#cc7722] text-sm font-medium"
                        >
                          Continuer le cours
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
        
        {activeTab === 'progress' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaChartLine className="mr-2" />
              Ma progression
            </h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-10 h-10 border-4 border-[#a52a2a] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Chargement de votre progression...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-700">{error}</p>
                <button 
                  onClick={loadCourses}
                  className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                >
                  Réessayer
                </button>
              </div>
            ) : courses.length === 0 ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-700">Vous n'avez pas encore commencé de cours.</p>
                <Link 
                  to="/courses" 
                  className="mt-2 inline-block px-4 py-2 bg-[#a52a2a] text-white rounded-md text-sm hover:bg-opacity-90"
                >
                  Découvrir les cours
                </Link>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div key={course.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex flex-col sm:flex-row justify-between mb-1 gap-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#a52a2a]/10 rounded-full flex items-center justify-center mr-3">
                            <FaBook className="text-[#a52a2a]" />
                          </div>
                          <span className="font-medium">{course.titre}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">{course.progression || 0}% terminé</span>
                          {course.progression === 100 && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              Complété
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <motion.div 
                          className="bg-[#a52a2a] h-2.5 rounded-full" 
                          style={{ width: '0%' }}
                          animate={{ width: `${course.progression || 0}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Link 
                          to={`/cours/${course.id}`}
                          className="text-[#a52a2a] text-sm hover:underline"
                        >
                          Continuer l'apprentissage
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
        
        {activeTab === 'certificates' && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaCertificate className="mr-2" />
              Mes certificats
            </h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {stats.certificatesEarned > 0 ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Félicitations ! Vous avez obtenu {stats.certificatesEarned} certificat{stats.certificatesEarned > 1 ? 's' : ''}.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses
                      .filter(course => course.progression === 100)
                      .map((course) => (
                        <motion.div 
                          key={course.id}
                          whileHover={{ scale: 1.02 }}
                          className="border border-gray-200 rounded-lg p-6 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20">
                            <div className="absolute transform rotate-45 bg-[#a52a2a] text-white text-xs font-bold py-1 right-[-35px] top-[15px] w-[130px] text-center">
                              Obtenu
                            </div>
                          </div>
                          <div className="flex items-center mb-4">
                            <FaCertificate className="text-[#cc7722] text-3xl mr-3" />
                            <div>
                              <h3 className="font-bold text-lg">{course.titre}</h3>
                              <p className="text-gray-500 text-sm">Certificat d'accomplissement</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                            <span>Date d'obtention:</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          <button className="w-full px-4 py-2 bg-[#a52a2a] text-white rounded-md hover:bg-opacity-90 transition-colors">
                            Télécharger
                          </button>
                        </motion.div>
                      ))
                    }
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">
                    Les certificats seront disponibles une fois que vous aurez terminé vos cours.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">Certificat à venir</h3>
                        <FaCertificate className="text-gray-300 text-2xl" />
                      </div>
                      <p className="text-gray-500 text-sm mb-4">Terminez vos cours pour obtenir des certificats.</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-300 h-2 rounded-full w-1/3"></div>
                      </div>
                      <div className="mt-4 text-center">
                        <Link 
                          to="/courses" 
                          className="text-[#a52a2a] text-sm hover:underline"
                        >
                          Découvrir plus de cours
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardApprenant;