
import axios from 'axios';

// URL de base de ton API
const API_URL = 'http://localhost:8000/api'; // ton API
const BASE_URL = 'http://localhost:8000';     // sans /api

// Fonction pour se connecter
export async function login(credentials) {
  // D'abord on récupère le CSRF COOKIE de Sanctum
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });

  // Ensuite seulement on peut envoyer la connexion
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  });
  
  return response.data;
}

// Fonction pour récupérer l'utilisateur connecté
export async function fetchMe() {
  const response = await axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


export default api;
