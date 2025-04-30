import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export async function login(credentials) {
  try {
    // 1. Appel au cookie CSRF pour que Laravel prépare la session
    await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true, // Important pour transmettre les cookies
    });

    // 2. Ensuite on peut appeler /login
    const response = await axios.post(`${API_URL}/api/login`, credentials, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Erreur login:", error);
    throw error;
  }
}
