import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Veuillez entrer votre adresse email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }
    
    // Ici, vous pourriez envoyer l'email à votre API
    console.log('Email souscrit:', email);
    setSubscribed(true);
    setError('');
    setEmail('');
    
    // Réinitialiser après 5 secondes
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Section principale du footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Bamena Digital Center" className="h-10 w-auto mr-2" />
              <h3 className="text-xl font-bold">Bamena Digital Center</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Le Bamena Digital Center est un centre de formation numérique dédié à l'excellence et à l'innovation dans l'enseignement des compétences digitales.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> À propos
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> Cours
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                  <FaArrowRight className="mr-2 text-xs" /> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-[#a52a2a] mt-1 mr-3" />
                <span className="text-gray-400">Bamena, Cameroun</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-[#a52a2a] mr-3" />
                <span className="text-gray-400">+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-[#a52a2a] mr-3" />
                <span className="text-gray-400">contact@bdc.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles et mises à jour.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#a52a2a]"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {subscribed && (
                  <p className="text-green-500 text-sm">
                    Merci pour votre inscription!
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#a52a2a] to-[#cc7722] text-white px-4 py-2 rounded-md hover:from-[#cc7722] hover:to-[#a52a2a] transition-all duration-300"
                >
                  S'abonner
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {currentYear} Bamena Digital Center. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Politique de confidentialité
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
