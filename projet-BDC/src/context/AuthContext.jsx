import { createContext, useContext, useEffect, useState } from "react";
import { fetchUser } from "../services/api";

// Création du contexte
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Chargement initial

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (err) {
        setUser(null); // Pas connecté
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pratique pour accéder au contexte
export function useAuth() {
  return useContext(AuthContext);
}
