import { useState, useEffect } from 'react';
import { login, getMe, testCors } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEnvelope, FaLock, FaInfoCircle } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [corsStatus, setCorsStatus] = useState('Non testé');
  
  // Test CORS au chargement du composant
  useEffect(() => {
    const checkCors = async () => {
      try {
        await testCors();
        setCorsStatus('OK');
      } catch (err) {
        setCorsStatus('Erreur');
        console.error('Erreur CORS:', err);
      }
    };
    
    checkCors();
  }, []);

  // Fonction appelée à la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Tentative de connexion avec:', { email, password });
      
      // 1. Connexion (Appel à la fonction login() du service)
      const loginResponse = await login({ email, password });
      console.log('Login response:', loginResponse);

      if (!loginResponse || !loginResponse.access_token) {
        setError('Erreur de connexion: Pas de token reçu');
        setLoading(false);
        return;
      }

      // Mettre à jour les informations de l'utilisateur dans le contexte
      try {
        // Si succès, on utilise updateUser du contexte pour mettre à jour l'utilisateur
        const userData = await updateUser();
        console.log('User data from context:', userData);

        if (!userData) {
          setError('Connexion réussie mais impossible de récupérer vos informations.');
          setLoading(false);
          return;
        }

        // Rediriger immédiatement vers la page d'accueil
        navigate('/');
      } catch (userError) {
        console.error('Erreur lors de la récupération des données utilisateur:', userError);
        setError('Connexion réussie mais impossible de récupérer vos informations.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      console.log('Détails de l\'erreur:', err.response ? err.response.data : err.message);
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erreur de connexion. Vérifiez vos identifiants ou réessayez plus tard.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* En-tête simplifié */}
            <div className="bg-[#a52a2a] px-4 py-3">
              <h2 className="text-xl font-semibold text-white text-center">Connexion</h2>
            </div>
            
            {/* Formulaire */}
            <div className="px-4 py-5">
              {error && (
                <div className="mb-4 text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <div className="flex items-center mb-1">
                    <FaEnvelope className="text-gray-400 mr-2" size={14} />
                    <span className="text-sm text-gray-600">Email</span>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                    required
                  />
                </div>
                
                {/* Mot de passe */}
                <div>
                  <div className="flex items-center mb-1">
                    <FaLock className="text-gray-400 mr-2" size={14} />
                    <span className="text-sm text-gray-600">Mot de passe</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                    required
                  />
                </div>
                
                {/* Bouton de connexion */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-3 py-2 bg-[#a52a2a] text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a52a2a] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
                
                {/* Lien vers l'inscription */}
                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Pas de compte ?{' '}
                    <Link to="/register" className="text-[#a52a2a] hover:underline">
                      S'inscrire
                    </Link>
                  </p>
                </div>
                
                {/* Texte informatif */}
                <div className="mt-4 text-xs text-gray-500 flex items-start">
                  <FaInfoCircle className="text-[#a52a2a] mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    En vous connectant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Login;
