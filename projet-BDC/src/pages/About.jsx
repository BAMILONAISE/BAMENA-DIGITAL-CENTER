import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUser, FaCheckCircle, FaCog, FaChalkboardTeacher, FaGraduationCap } from 'react-icons/fa';
import { FaBriefcase } from 'react-icons/fa';

function About() {
  return (
    
    <div className="min-h-screen">
      <Navbar />
      {/* Bannière */}
      <div className="relative h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[#a52a2a] overflow-hidden">
        <div className="pattern-dots absolute inset-0 opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-center">
            À propos de Bamena Digital Center
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl text-center">
            Notre mission est de démocratiser l'accès à l'éducation numérique et aux compétences du futur.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-4 sm:p-6 md:p-8">
        {/* Section À propos */}
        <section className="py-6 sm:py-10 md:py-16">
          <div className="container mx-auto">
            <div className="mb-6 sm:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a52a2a]">À propos de Nous</h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 text-center max-w-4xl mx-auto">
              Bamena Digital Center (BDC) est une initiative éducative innovante, créée pour répondre aux besoins
              de formation numérique en Afrique. Nous croyons fermement que l'accès aux compétences
              numériques est essentiel pour l'avenir. Notre mission est de rendre l'éducation numérique accessible à tous,
              particulièrement dans les régions où ces ressources font défaut.
            </p>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-10">
              {/* Profil 1 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="rounded-full bg-[#a52a2a] bg-opacity-20 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                  <FaUser className="text-[#a52a2a] text-lg sm:text-xl" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#a52a2a] mb-1 sm:mb-2">Développement</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Ingénieur en développement web et applications mobiles.
                </p>
              </div>

              {/* Profil 2 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="rounded-full bg-[#a52a2a] bg-opacity-20 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                  <FaBriefcase className="text-[#a52a2a] text-lg sm:text-xl" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#a52a2a] mb-1 sm:mb-2">Management</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  des affaires et développement communautaire.
                </p>
              </div>

              {/* Profil 3 */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="rounded-full bg-[#a52a2a] bg-opacity-20 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center mb-3 sm:mb-4">
                  <FaChalkboardTeacher className="text-[#a52a2a] text-lg sm:text-xl" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#a52a2a] mb-1 sm:mb-2">Formation</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Enseignement et pédagogie adaptée.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Notre Projet */}
        <section className="py-6 sm:py-10 md:py-16 bg-gray-50">
          <div className="container mx-auto">
            <div className="mb-6 sm:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a52a2a]">Notre Projet</h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-8 mx-auto max-w-4xl text-center">
              Notre initiative s'articule autour d'un plan stratégique en plusieurs phases,
              visant à créer un impact durable dans le domaine de l'éducation numérique.
            </p>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#a52a2a] space-y-8 sm:space-y-10 mt-6 sm:mt-7 max-w-3xl mx-auto">
              {/* Phase 1 */}
              <div className="relative">
                <div className="absolute -left-[50px] sm:-left-[70px] flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#a52a2a] flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                </div>
                <div className="ml-4 sm:ml-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Phase 1: Site Web et Logiciel</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700">
                    Développement de la plateforme en ligne et des outils nécessaires à la formation et au suivi des apprenants.
                    Cette phase initiale est cruciale pour établir notre présence numérique.
                  </p>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative">
                <div className="absolute -left-[50px] sm:-left-[70px] flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#a52a2a] flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                </div>
                <div className="ml-4 sm:ml-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Phase 2: Formation en Ligne</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700">
                    Lancement des premiers cours en ligne, avec un accent sur l'accessibilité et la qualité pédagogique.
                    Nous développerons un curriculum complet couvrant le développement web et la conception graphique.
                  </p>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative">
                <div className="absolute -left-[50px] sm:-left-[70px] flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#a52a2a] flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                </div>
                <div className="ml-4 sm:ml-8">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">Phase 3: Construction du Centre</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700">
                    Établissement d'un espace physique à BAMENA pour offrir des formations en présentiel et créer un hub technologique local.
                    Ce centre servira de catalyseur pour l'innovation et le développement des compétences dans la région.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Notre Équipe */}
        <section className="py-6 sm:py-10 md:py-16">
          <div className="container mx-auto">
            <div className="mb-6 sm:mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a52a2a]">Notre Équipe</h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-12 max-w-2xl mx-auto text-center">
              Passionnés par l'éducation et la technologie, nos membres apportent expertise et dévouement à la réalisation de notre mission.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 px-4">
              {/* Membre 1 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#a52a2a] bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-6 border-4 border-[#a52a2a] border-opacity-20">
                  <FaUser className="text-[#a52a2a] text-3xl sm:text-4xl" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#a52a2a] mb-1 sm:mb-2">Fondateurs</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center">Visionnaires et leaders</p>
              </div>

              {/* Membre 2 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#a52a2a] bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-6 border-4 border-[#a52a2a] border-opacity-20">
                  <FaCog className="text-[#a52a2a] text-3xl sm:text-4xl" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#a52a2a] mb-1 sm:mb-2">Directeur Technique</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center">Expert en solutions digitales</p>
              </div>

              {/* Membre 3 */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#a52a2a] bg-opacity-10 rounded-full flex items-center justify-center mb-4 sm:mb-6 border-4 border-[#a52a2a] border-opacity-20">
                  <FaGraduationCap className="text-[#a52a2a] text-3xl sm:text-4xl" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#a52a2a] mb-1 sm:mb-2">Formateurs</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center">Professionnels expérimentés</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Rejoignez-nous */}
        <section className="py-8 sm:py-12 md:py-16 bg-[#a52a2a] text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">Rejoignez-nous dans cette aventure</h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-center max-w-3xl mx-auto">
              Ensemble, nous pouvons faire la différence dans l'éducation numérique en Afrique.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a
                href="/register"
                className="bg-white text-[#a52a2a] px-6 sm:px-8 py-2 sm:py-3 rounded-md font-bold hover:bg-opacity-90 transition duration-300 inline-block shadow-lg w-full sm:w-auto text-center text-sm sm:text-base"
              >
                Créer un compte
              </a>
              <a
                href="/courses"
                className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-bold hover:bg-white hover:text-[#a52a2a] transition duration-300 inline-block shadow-lg w-full sm:w-auto text-center text-sm sm:text-base"
              >
                Voir les cours
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default About;