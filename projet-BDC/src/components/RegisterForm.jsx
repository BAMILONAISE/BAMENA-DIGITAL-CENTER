import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuartierSelector from "./QuartierSelector";
import axios from "axios";
import { FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaLock, FaInfoCircle, FaPhone } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

// Définir l'URL de base de l'API
const API_URL = 'http://127.0.0.1:8000';

const Register = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [quartier, setQuartier] = useState("");
  const [quartierAutre, setQuartierAutre] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    setSuccess("");

    const finalQuartier = quartier === "autre" ? quartierAutre : quartier;

    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        prenom,
        nom,
        email,
        contact,
        password,
        password_confirmation: passwordConfirmation,
        date_naissance: dateNaissance,
        quartier: finalQuartier,
      });

      console.log("Inscription réussie", response.data);
      
      // Stocker le token d'authentification
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        
        // Mettre à jour les informations de l'utilisateur dans le contexte
        await updateUser();
        
        // Rediriger immédiatement vers la page d'accueil
        navigate('/');
      } else {
        // Si pas de token, rediriger vers la page de connexion
        setSuccess("Inscription réussie ! Veuillez vous connecter.");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: ["Une erreur s'est produite lors de l'inscription."] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto">
      {/* En-tête simplifié */}
      <div className="bg-[#a52a2a] px-4 py-3">
        <h2 className="text-xl font-semibold text-white text-center">Créer un compte</h2>
      </div>
      
      {/* Formulaire */}
      <div className="px-4 py-5">
        {success && (
          <div className="mb-4 text-green-600 text-sm">
            {success}
          </div>
        )}
        
        {errors.general && (
          <div className="mb-4 text-red-600 text-sm">
            {errors.general[0]}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Prénom et Nom */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex items-center mb-1">
                <FaUser className="text-gray-400 mr-2" size={14} />
                <span className="text-sm text-gray-600">Prénom</span>
              </div>
              <input
                type="text"
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                required
              />
              {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom[0]}</p>}
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <FaUser className="text-gray-400 mr-2" size={14} />
                <span className="text-sm text-gray-600">Nom</span>
              </div>
              <input
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                required
              />
              {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom[0]}</p>}
            </div>
          </div>
          
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
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>
          
          {/* Numéro de téléphone */}
          <div>
            <div className="flex items-center mb-1">
              <FaPhone className="text-gray-400 mr-2" size={14} />
              <span className="text-sm text-gray-600">Numéro de téléphone</span>
            </div>
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact[0]}</p>}
          </div>
          
          {/* Date de naissance */}
          <div>
            <div className="flex items-center mb-1">
              <FaCalendarAlt className="text-gray-400 mr-2" size={14} />
              <span className="text-sm text-gray-600">Date de naissance</span>
            </div>
            <input
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
              required
            />
            {errors.date_naissance && <p className="text-red-500 text-xs mt-1">{errors.date_naissance[0]}</p>}
          </div>
          
          {/* Quartier */}
          <div>
            <div className="flex items-center mb-1">
              <FaMapMarkerAlt className="text-gray-400 mr-2" size={14} />
              <span className="text-sm text-gray-600">Quartier</span>
            </div>
            <QuartierSelector
              quartier={quartier}
              setQuartier={setQuartier}
              quartierAutre={quartierAutre}
              setQuartierAutre={setQuartierAutre}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
            />
            {errors.quartier && <p className="text-red-500 text-xs mt-1">{errors.quartier[0]}</p>}
          </div>
          
          {/* Mot de passe et confirmation */}
          <div className="grid grid-cols-2 gap-3">
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
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <FaLock className="text-gray-400 mr-2" size={14} />
                <span className="text-sm text-gray-600">Confirmation</span>
              </div>
              <input
                type="password"
                placeholder="Confirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a52a2a] focus:border-[#a52a2a]"
                required
              />
            </div>
          </div>
          
          {/* Bouton d'inscription */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-3 py-2 bg-[#a52a2a] text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a52a2a] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
          
          {/* Lien vers la connexion */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Déjà inscrit ?{' '}
              <Link to="/login" className="text-[#a52a2a] hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
          
          {/* Texte informatif */}
          <div className="mt-4 text-xs text-gray-500 flex items-start">
            <FaInfoCircle className="text-[#a52a2a] mr-2 mt-0.5 flex-shrink-0" />
            <p>
              En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité. 
              Vos données personnelles seront traitées conformément à la législation en vigueur.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
