/**
 * Configuration et fonctions d'API pour la communication avec le backend
 * Ce fichier contient toutes les fonctions nécessaires pour interagir avec l'API Laravel
 * Utilise axios pour les requêtes HTTP avec gestion des cookies pour l'authentification
 */

import axios from 'axios';

// URL de base de l'API Laravel
const API_URL = 'http://127.0.0.1:8000/api';

// Configuration globale d'axios
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

// Instance axios configurée avec les paramètres par défaut
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
      // Rediriger vers la page de login si nécessaire
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Authentification de l'utilisateur
 * @param {Object} credentials - Objet contenant email et password
 * @returns {Promise} - Données de l'utilisateur connecté
 */
export async function login(credentials) {
  // Récupération du token CSRF pour la sécurité
  await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });

  // Authentification avec les identifiants
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  });
  
  return response.data;
}

/**
 * Récupère les informations de l'utilisateur connecté
 * @returns {Promise} - Données de l'utilisateur
 */
export async function fetchMe() {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Récupère tous les cours (pour l'admin)
 * @returns {Promise} - Liste des cours
 */
export async function fetchCours() {
  const response = await axios.get(`${API_URL}/cours`, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Récupère les cours du formateur connecté
 * @returns {Promise} - Liste des cours du formateur
 */
export async function fetchMesCours() {
  const response = await axios.get(`${API_URL}/mes-cours`, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Récupère les cours disponibles pour l'apprenant
 * @returns {Promise} - Liste des cours accessibles
 */
export async function fetchCoursApprenant() {
  const response = await axios.get(`${API_URL}/cours-apprenant`, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Récupère les détails d'un cours spécifique
 * @param {number} id - ID du cours
 * @returns {Promise} - Détails du cours
 */
export async function fetchCoursByID(id) {
  const response = await axios.get(`${API_URL}/cours/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Crée un nouveau cours
 * @param {FormData} coursData - Données du cours (incluant les fichiers)
 * @returns {Promise} - Données du cours créé
 */
export async function createCours(coursData) {
  const response = await axios.post(`${API_URL}/cours`, coursData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Met à jour un cours existant
 * @param {number} id - ID du cours à modifier
 * @param {Object} coursData - Nouvelles données du cours
 * @returns {Promise} - Données du cours mis à jour
 */
export async function updateCours(id, coursData) {
  const response = await axios.put(`${API_URL}/cours/${id}`, coursData, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Supprime un cours
 * @param {number} id - ID du cours à supprimer
 * @returns {Promise} - Résultat de la suppression
 */
export async function deleteCours(id) {
  const response = await axios.delete(`${API_URL}/cours/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Récupère tous les cours publics (sans authentification)
 * @returns {Promise} - Liste des cours publics
 */
export async function fetchPublicCours() {
  const response = await axios.get(`${API_URL}/public/cours`);
  return response.data;
}

export default api;
