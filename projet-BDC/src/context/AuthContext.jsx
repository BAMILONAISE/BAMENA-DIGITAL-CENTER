import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout } from "../services/api";

// Création du contexte
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Chargement initial

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('AuthContext: Tentative de récupération des données utilisateur');
        const userData = await getMe();
        console.log('AuthContext: Données utilisateur récupérées', userData);
        setUser(userData);
      } catch (err) {
        console.log('AuthContext: Erreur lors de la récupération des données utilisateur', err);
        setUser(null); // Pas connecté
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);
  
  // Fonction pour mettre à jour l'utilisateur après connexion
  const updateUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
      return null;
    }
  };
  
  // Fonction pour déconnecter l'utilisateur
  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      return true;
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, updateUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique pour accéder au contexte
export function useAuth() {
  return useContext(AuthContext);
}
