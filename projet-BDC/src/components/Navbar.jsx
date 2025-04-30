import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/Logo.png" alt="logo BDC" className="h-8 rounded-full mr-3" />
            <span className="text-xl font-bold bg-gradient-to-r from-[#a52a2a] to-[#cc7722] bg-clip-text  text-transparent ">BAMENA DIGITAL CENTER</span>
          </div>
          
          {/* Liens principaux - Version desktop */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-[#a52a2a] px-3 py-2 font-medium">Accueil</a>
            <a href="/courses" className="text-gray-700 hover:text-[#a52a2a]  px-3 py-2 font-medium">Cours</a>
            <a href="/about" className="text-gray-700 hover:text-[#a52a2a]  px-3 py-2 font-medium">À propos</a>
            <a href="contact" className="text-gray-700 hover:text-[#a52a2a]  px-3 py-2 font-medium">Contact</a>
          </div>
          
          {/* Boutons de connexion - Version desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="text-gray-700 hover:text-[#a52a2a] border border-[#a52a2a] text-center rounded-md px-3 py-2 font-medium">Se connecter</a>
            <a href="/register" className="bg-[#a52a2a] text-white px-4 py-2 rounded-md hover:border text-center hover:border-[#a52a2a] hover:bg-white hover:text-[#a52a2a] transition duration-300 font-medium"> S'inscrire   </a>
          </div>
          
          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#a52a2a] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 px-4">
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-gray-700 hover:text-[#a52a2a] px-3 py-2 font-medium border-b border-gray-100 text-center">Accueil</a>
            <a href="/courses" className="text-gray-700 hover:text-[#a52a2a] px-3 py-2 font-medium border-b border-gray-100 text-center">Cours</a>
            <a href="/about" className="text-gray-700 hover:text-[#a52a2a] px-3 py-2 font-medium border-b border-gray-100 text-center">À propos</a>
            <a href="/contact" className="text-gray-700 hover:text-[#a52a2a] px-3 py-2 font-medium border-b border-gray-100 text-center">Contact</a>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a href="/login" className="block text-gray-700 hover:text-[#a52a2a] hover:bg-[#a52a2a] hover:text-white border border-[#a52a2a] rounded-md px-3 py-2 font-medium text-center">Se connecter</a>
            <a href="/register" className="block mt-2 bg-[#a52a2a] text-white px-4 py-2 rounded-md hover:bg-white hover:text-gray-700  hover:border hover:border-[#a52a2a] transition duration-300 text-center font-medium">S'inscrire</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;