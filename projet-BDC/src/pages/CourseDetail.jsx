import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft, FaEdit, FaCalendarAlt, FaUser, FaThList, FaChartLine, FaBook, FaClock, FaPlay } from 'react-icons/fa';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Vous devez être connecté');
        }
        
        const response = await axios.get(`http://127.0.0.1:8000/api/cours/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Détails du cours récupérés:', response.data);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des détails du cours:', err);
        setError('Impossible de récupérer les détails du cours. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [id]);
  
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Déterminer si l'utilisateur peut modifier ce cours
  const canEdit = user && course && (user.id === course.user_id || user.role === 'admin');

  // Fallback image pour les cours sans image de couverture
  const fallbackImageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjYTUyYTJhIiBmaWxsLW9wYWNpdHk9IjAuOCIvPgogICAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkF1Y3VuZSBpbWFnZSBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4=';
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Bouton de retour */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-[#a52a2a] hover:text-[#cc7722] mb-6 font-medium"
      >
        <FaArrowLeft className="mr-2" /> Retour au tableau de bord
      </button>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#a52a2a]"></div>
          <span className="ml-4 text-lg text-gray-600">Chargement du cours...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md" role="alert">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-lg">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Réessayer
          </button>
        </div>
      ) : course ? (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* En-tête du cours avec image de couverture */}
          <div className="relative">
            <div className="h-64 md:h-80 overflow-hidden">
              <img 
                src={course.image_couverture ? 
                  (course.image_couverture.startsWith('http') ? 
                    course.image_couverture : 
                    `http://127.0.0.1:8000/storage/${course.image_couverture}`
                  ) : fallbackImageUrl} 
                alt={course.titre || "Image du cours"} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImageUrl;
                }}
              />
            </div>
            
            {/* Overlay avec le titre */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{course.titre}</h1>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="p-6 md:p-8">
            {/* Métadonnées et actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {course.user && (
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                    <FaUser className="mr-2 text-[#a52a2a]" />
                    <span className="font-medium">Formateur: {course.user.prenom} {course.user.nom}</span>
                  </div>
                )}
                
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                  <FaCalendarAlt className="mr-2 text-[#a52a2a]" />
                  <span>Publié le {formatDate(course.created_at)}</span>
                </div>
                
                {course.categorie && (
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                    <FaThList className="mr-2 text-[#a52a2a]" />
                    <span>Catégorie: {course.categorie}</span>
                  </div>
                )}
                
                <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                  <FaChartLine className="mr-2 text-[#a52a2a]" />
                  <span>Niveau: {
                    course.niveau === 'debutant' ? 'Débutant' : 
                    course.niveau === 'intermediaire' ? 'Intermédiaire' : 'Avancé'
                  }</span>
                </div>
                
                {course.duree_estimee && (
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
                    <FaClock className="mr-2 text-[#a52a2a]" />
                    <span>Durée: {course.duree_estimee} min</span>
                  </div>
                )}
              </div>
              
              {canEdit && (
                <Link 
                  to={`/dashboard/cours/${course.id}/edit`} 
                  className="flex items-center bg-[#a52a2a] hover:bg-[#cc7722] text-white px-4 py-2 rounded-md transition-colors shadow-md"
                >
                  <FaEdit className="mr-2" /> Modifier ce cours
                </Link>
              )}
            </div>
            
            {/* Vidéo du cours - Affiché en priorité si disponible */}
            {course.video_url && (
              <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaPlay className="mr-2 text-[#a52a2a]" />
                  Vidéo du cours
                </h2>
                <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-lg">
                  <iframe 
                    src={course.video_url} 
                    title={course.titre}
                    className="w-full h-[450px] rounded-lg"
                    allowFullScreen
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>
            )}
            
            {/* Description */}
            {course.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaBook className="mr-2 text-[#a52a2a]" />
                  À propos de ce cours
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
              </div>
            )}
            
            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(course.tags) ? course.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1.5 bg-[#a52a2a] bg-opacity-10 text-[#a52a2a] rounded-full font-medium">
                      {tag}
                    </span>
                  )) : typeof course.tags === 'string' ? (
                    <span className="px-3 py-1.5 bg-[#a52a2a] bg-opacity-10 text-[#a52a2a] rounded-full font-medium">
                      {course.tags}
                    </span>
                  ) : null}
                </div>
              </div>
            )}
            
            {/* Contenu du cours */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contenu du cours</h2>
              <div 
                className="prose max-w-none bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
                dangerouslySetInnerHTML={{ __html: course.contenu || '<p class="text-gray-500 italic">Aucun contenu textuel supplémentaire disponible pour ce cours.</p>' }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow-md">
          <svg className="mx-auto h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-700">Cours introuvable</h3>
          <p className="mt-2 text-gray-500">Le cours que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to="/dashboard/apprenant" className="mt-6 inline-block bg-[#a52a2a] hover:bg-[#cc7722] text-white font-medium py-2 px-4 rounded-md transition-colors">
            Retour aux cours
          </Link>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;
