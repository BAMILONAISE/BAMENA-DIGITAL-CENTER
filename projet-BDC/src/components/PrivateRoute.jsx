import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth();
  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = user || localStorage.getItem("token");

  // Si pas authentifié, redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, affiche les routes enfants via Outlet
  return <Outlet />;
};

export default PrivateRoute;
