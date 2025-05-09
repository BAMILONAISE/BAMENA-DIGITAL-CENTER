import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Configuration globale d'axios
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

// Créer une instance axios avec la configuration appropriée
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.log('Session expirée ou non authentifié');
      // Vous pouvez rediriger vers la page de login ici si nécessaire
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tester la connexion CORS
export async function testCors() {
  try {
    const response = await axios.get(`${API_URL}/api/test-cors`);
    console.log('CORS test successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('CORS test failed:', error);
    throw error;
  }
}

// Fonction pour se connecter
export async function login(credentials) {
  try {
    console.log('Tentative de connexion avec les identifiants:', credentials.email);
    
    // Récupérer d'abord le CSRF cookie (nécessaire pour Sanctum)
    try {
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });
      console.log('CSRF cookie récupéré');
    } catch (csrfError) {
      console.warn('Erreur lors de la récupération du CSRF cookie, tentative de connexion directe:', csrfError);
    }
    
    // Tentative de connexion
    const response = await axios.post(`${API_URL}/api/login`, credentials, { 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true // Important pour gérer les cookies de session
    });
    
    console.log('Login successful:', response.data);
    
    // Stocker le token dans localStorage si présent
    if (response.data && response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      // Stocker également le rôle de l'utilisateur si disponible
      if (response.data.user && response.data.user.role) {
        localStorage.setItem('userRole', response.data.user.role);
      }
      console.log('Token stored in localStorage');
      
      // Configurer l'en-tête d'autorisation pour les futures requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    } else {
      console.error('Pas de token reçu dans la réponse');
      throw new Error('Pas de token d\'authentification reçu');
    }
    
    return response.data;
  } catch (error) {
    console.error("Erreur login:", error);
    
    // Message d'erreur spécifique
    if (error.response && error.response.status === 401) {
      throw new Error('Email ou mot de passe incorrect.');
    }
    
    // Nettoyer le localStorage en cas d'échec
    localStorage.removeItem('token');
    throw error;
  }
}

// Fonction pour récupérer les données de l'utilisateur
export async function getMe() {
  try {
    // Récupérer le token depuis localStorage s'il existe
    const token = localStorage.getItem('token');
    console.log('Token pour getMe:', token);

    if (!token) {
      console.log('Aucun token trouvé, utilisateur non connecté');
      return null;
    }

    // Utiliser axios directement avec le token dans l'en-tête - Correction du chemin API
    const response = await axios.get(`${API_URL}/api/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('User data fetched:', response.data);
    
    // Stocker le rôle de l'utilisateur si disponible
    if (response.data && response.data.role) {
      localStorage.setItem('userRole', response.data.role);
    }
    
    return response.data;
  } catch (error) {
    console.error("Erreur getMe:", error);
    
    // Si erreur 401 (non autorisé), on nettoie le localStorage
    if (error.response && error.response.status === 401) {
      console.log('Token invalide ou expiré, suppression du token');
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }
    
    return null;
  }
}

// Fonction pour se deconnecter
export async function logout() {
  try {
    // Récupérer le token depuis localStorage s'il existe
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('Aucun token trouvé, l\'utilisateur est déjà déconnecté');
      return { message: 'Déconnecté' };
    }
    
    // Correction du chemin API
    const response = await axios.post(`${API_URL}/api/logout`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Supprimer le token et le rôle du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    console.log('Token removed from localStorage');
    
    console.log('Logout successful:', response.data);
    return response.data;
  } catch (error) {
    // Supprimer le token même en cas d'erreur
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    console.error("Erreur logout:", error);
    throw error;
  }
}
