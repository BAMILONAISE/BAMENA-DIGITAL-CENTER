import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  // Vérifie si le token est présent dans localStorage
  const token = localStorage.getItem("token");

  // Si pas de token, redirige vers la page de connexion
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Sinon, affiche la page demandée
  return children;
};

export default PrivateRoute;
