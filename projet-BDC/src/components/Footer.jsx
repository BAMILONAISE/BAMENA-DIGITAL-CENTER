import React, { useState, useEffect } from "react";
import {FaFacebookF, FaTwitter, FaInstagram,FaYoutube,
  FaMapMarkerAlt,FaEnvelope,FaPhone,FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#fdf9f5] text-[#5e4428] pt-16 pb-8 px-6 border-t border-[#eee] font-sans relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#a72f2f] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-shadow">BD</div>
            <h3 className="text-xl font-extrabold text-[#a72f2f]">BAMENA DIGITAL<span className="text-[#c0611d]"> CENTER</span></h3>
          </div>
          <p className="text-sm text-gray-700 mb-5 leading-relaxed">
            Centre de formation multimédia et préservation de la langue NDA'A NDA'A au cœur de Bamena en pays Bamileke.
          </p>
          <div className="flex gap-4 text-[#5e4428] text-xl">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <div
                key={i}
                className="hover:text-[#c0611d] hover:scale-110 hover:drop-shadow-md transition-all duration-300 cursor-pointer"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>

        {/* Liens rapides */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#c0611d]">Liens rapides</h4>
          <ul className="space-y-3 text-sm text-gray-800">
            {["Accueil", "Cours", "À propos", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[#a72f2f] transition-colors duration-300 hover:underline"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Catégories */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#c0611d]">Catégories</h4>
          <ul className="space-y-3 text-sm text-gray-800">
            {["Multimédia", "Développement Web", "Design Web", "Digital & Marketing", "Langue NDA'A NDA'A"].map((cat, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-[#a72f2f] transition-colors duration-300 hover:underline"
                >
                  {cat}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#c0611d]">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-800">
            <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
              <FaMapMarkerAlt className="mt-1 text-[#a72f2f]" /> Bamena, Ouest Cameroun
            </li>
            <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
              <FaEnvelope className="mt-1 text-[#a72f2f]" /> info@bamenadigitalcenter.com
            </li>
            <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
              <FaPhone className="mt-1 text-[#a72f2f]" /> +237 680 994 956
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-10 border-t border-gray-200 pt-5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700">
        <p className="mb-2 md:mb-0">© 2025 Bamena Digital Center. Tous droits réservés.</p>
        <div className="flex gap-5 font-semibold">
          <a href="#" className="hover:text-[#a72f2f] transition-colors duration-300 hover:underline">
            Conditions d'utilisation
          </a>
          <a href="#" className="hover:text-[#a72f2f] transition-colors duration-300 hover:underline">
            Politique de confidentialité
          </a>
        </div>
      </div>

      {/* Scroll to top button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#a72f2f] text-white p-3 rounded-full shadow-lg hover:bg-[#c0611d] transition-all duration-300"
          aria-label="Retour en haut"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
