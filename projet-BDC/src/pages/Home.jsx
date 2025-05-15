import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { WiDirectionRight } from "react-icons/wi";
import { LuLaptop } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoIosCode } from "react-icons/io";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CountUp from 'react-countup';
import { motion } from "framer-motion";




function Home() {
  return (
    <>
      <Navbar />
      {/* Hero */}
      <div className="bg-gray-100">
        <div className="p-10">
          <div className="flex items-center grid grid-cols-1 md:grid-cols-2 gap-6  ">

            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#a52a2a] to-[#cc7722] bg-clip-text  text-transparent" >Bienvenue au Centre <br /> Digital de Bamena </h1>
              <p className="text-gray-700  mb-4" > Découvrez nos formations en ligne en multimédia, <br /> développement web, design et langue NDA'A NDA'A. </p>
              <div className="hidden md:flex items-center space-x-4 mt-5">
                <a href="/courses" className="flex items-center text-white bg-gradient-to-r from-[#a52a2a] to-[#cc7722] text-l text-center rounded-md px-3 py-1 font-medium transition-transform transform hover:scale-105">
                  Découvrir les cours <WiDirectionRight className="size-8" /></a>
                <a href="/about" className=" text-[#a52a2a] border border-[#a52a2a] text-center rounded-md px-3 py-1.5 font-medium transition-transform transform hover:scale-105">
                  En savoir plus   </a>
              </div>
            </div>

            <div className="flex-col justify-items-center">
              <img className="rounded-xl object-contain w-auto h-80 shadow:lg shadow-[#a52a2a]" src="hero.png" alt="image de motif bamileke" />
            </div>
          </div>

        </div>

      </div>
      <div>
        <img className="w-full h-auto" src="motif.png" alt="" />
      </div>


      {/* Formations */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="justify-items-center">
          <h6 className="text-[#a52a2a] mt-10 mb-1">Nos Formations</h6>
          <h3 className="text-4xl font-bold bg-gradient-to-r from-[#a52a2a] to-[#cc7722] bg-clip-text  text-transparent justify-center" >Explorez Nos Domaines d'Expertise </h3>
          <p className="text-gray-700  mb-4 text-center mt-2 mb-10  mb-10" > Découvrez nos formations complètes conçues pour vous aider à développer<br />vos compétences numériques. </p>
        </div>

        <div className="flex items-center grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10">
          <div className="p-4 bg-white border border-[#f2ddd1] rounded-lg shadow-md transition-transform transform hover:-translate-y-3 hover:shadow-md hover:border-[#a52a2a] ">
            <div className="rounded-full bg-[#F2DDD4] p-2 h-10 w-10 justify-items-center "><LuLaptop className="text-[#a52a2a] h-auto w-6" /></div>
            <div>
              <h3 className="text-[#a52a2a] font-semibold text-2xl mt-5 mb-3 ">Multimédia</h3>
              <p className="text-gray-500 text-sm mb-4">Maîtrisez les outils de création multimédia pour produire des contenus professionnels.</p>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Montage vidéo</div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Animation 2D/3D</div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Production audio</div>
              <div className="mt-7 mb-7 justify-items-center transition-transform transform hover:scale-105">
                <a href="/courses" className="text-[#a52a2a] border border-[#a52a2a] text-center rounded-md px-3 py-1.5 font-medium ">
                  Voir les cours </a>
              </div>
            </div>
          </div>


          <div className="p-4 bg-white border border-[#f2ddd1] rounded-lg shadow-md transition-transform transform hover:-translate-y-3 hover:shadow-md hover:border-[#a52a2a] ">
            <div className="rounded-full bg-[#F2DDD4] p-2 h-10 w-10 justify-items-center "><IoIosCode className="text-[#a52a2a] h-auto w-6" /></div>
            <div>
              <h3 className="text-[#a52a2a] font-semibold text-2xl mt-5 mb-3 ">Developpement Web</h3>
              <p className="text-gray-500 text-sm mb-4">Apprenez à créer des sites web et des applications modernes et performants.</p>
              <div className="text-gray-500 text-sm flex items-center mt-2">
                <span className="rounded-full bg-[#a52a2a] p-1 mr-3"><FaCheck className="text-white" /></span> HTML, CSS, JavaScript
              </div>
              <div className="text-gray-500 text-sm flex items-center mt-2">
                <span className="rounded-full bg-[#a52a2a] p-1 mr-3"><FaCheck className="text-white" /></span> Frameworks modernes
              </div>
              <div className="text-gray-500 text-sm flex items-center mt-2">
                <span className="rounded-full bg-[#a52a2a] p-1 mr-3"><FaCheck className="text-white" /></span> Bases de données
              </div>
              <div className="mt-7  flex justify-end  transition-transform transform hover:scale-105">
                <a href="/courses" className="text-white border bg-[#a52a2a] text-center rounded-md  px-3 py-1.5 font-medium ">
                  Voir les cours </a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#f2ddd1] rounded-lg shadow-md transition-transform transform hover:-translate-y-3 hover:shadow-md hover:border-[#a52a2a] ">
            <div className="rounded-full bg-[#F2DDD4] p-2 h-10 w-10 justify-items-center "><LuLaptop className="text-[#a52a2a] h-auto w-6" /></div>
            <div>
              <h3 className="text-[#a52a2a] font-semibold text-2xl mt-5 mb-3 ">Design Web</h3>
              <p className="text-gray-500 text-sm mb-4">Développez vos compétences en design pour créer des interfaces attrayantes .</p>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Graphic Dessign</div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> UI/UX Design </div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Outils et Principes de design</div>
              <div className="mt-7 mb-7 justify-items-center transition-transform transform hover:scale-105">
                <a href="/courses" className="text-[#a52a2a] border border-[#a52a2a] text-center rounded-md px-3 py-1.5 font-medium ">
                  Voir les cours </a>
              </div>
            </div>
          </div>
        </div>


        <div className="flex items-center grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-10">
          <div className="p-4 bg-white border border-[#f2ddd1] rounded-lg shadow-md transition-transform transform hover:-translate-y-3 hover:shadow-md hover:border-[#a52a2a] ">
            <div className="rounded-full bg-[#F2DDD4] p-2 h-10 w-10 justify-items-center "><LuLaptop className="text-[#a52a2a] h-auto w-6" /></div>
            <div>
              <h3 className="text-[#a52a2a] font-semibold text-2xl mt-5 mb-3 ">Digital & Marketing</h3>
              <p className="text-gray-500 text-sm mb-4">Maîtrisez les stratégies digitales pour promouvoir efficacement vos produits et services.</p>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Marketing des médias sociaux  </div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> SEO et SEM</div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Analyses de données</div>
              <div className="mt-7 mb-7 justify-items-center transition-transform transform hover:scale-105">
                <a href="/courses" className="text-[#a52a2a] border border-[#a52a2a] text-center rounded-md px-3 py-1.5 font-medium ">
                  Voir les cours </a>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border border-[#f2ddd1] rounded-lg shadow-md transition-transform transform hover:-translate-y-3 hover:shadow-md hover:border-[#a52a2a] ">
            <div className="rounded-full bg-[#F2DDD4] p-2 h-10 w-10 justify-items-center "><LuLaptop className="text-[#a52a2a] h-auto w-6" /></div>
            <div>
              <h3 className="text-[#a52a2a] font-semibold text-2xl mt-5 mb-3 ">Langue NDA'A NDA'A </h3>
              <p className="text-gray-500 text-sm mb-4">Découvrez et apprenez la langue maternelle NDA'A NDA'A, un patrimoine culturel important.</p>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Bases de la langue</div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Conversation courante</div>
              <div className="text-gray-500 text-sm flex items-center mt-2"><FaCheck className="text-[#a52a2a] mr-3" /> Culture et traditions</div>
              <div className="mt-7 mb-7 justify-items-center transition-transform transform hover:scale-105">
                <a href="/courses" className="text-[#a52a2a] border border-[#a52a2a] text-center rounded-md px-3 py-1.5 font-medium ">
                  Voir les cours </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cours Populaires */}
      <div className="p-10">
        <div className="justify-items-center">
          <h3 className="text-4xl font-bold  text-[#6B4226] justify-center mt-15" >Cours Populaires</h3>
          <p className="text-gray-700  mb-4 text-center mt-2 mb-10" > Découvrez nos cours les plus appréciés par nos étudiants</p>
        </div>

        <div>
          <CourseSection />
        </div>
      </div>
      <div>
        <img className="w-md h-auto mb-0" src="motif.png" alt="" />
      </div>

      <div>
        <Preservation />
      </div>



      {/* notre Impact */}
      <section className="py-16 px-6 bg-[#F8F1ED]">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#A22E2E]">Notre Impact</h2>
          <p className="text-gray-700 mt-2 text-lg">Rejoignez notre communauté grandissante d'apprenants</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
          <div>
            <p className="text-3xl font-bold text-[#5D2F13]">
              <CountUp end={1500} duration={2} />+
            </p>
            <p className="text-sm text-gray-700">Étudiants</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-[#5D2F13]">
              <CountUp end={25} duration={2} />
            </p>
            <p className="text-sm text-gray-700">Cours</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-[#5D2F13]">
              <CountUp end={12} duration={2} />
            </p>
            <p className="text-sm text-gray-700">Formateurs</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-[#5D2F13]">
              <CountUp end={98} duration={2} suffix="%" />
            </p>
            <p className="text-sm text-gray-700">Satisfaction</p>
          </div>
        </div>
      </section>

      <div>
        <FormationProjectSection />
      </div>

      <div>
        <img className="w-full h-auto" src="motif.png" alt="" />
      </div>
      <div>
        <CallToAction/>
      </div>

<div>
  <Footer/>
</div>


    </>
  )
}


export default Home

//  DIV COURS POPULAIRE 
const CourseSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 1000;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative py-10 px-4 md:px-10 bg-[#fdf8f5]">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Flèche gauche */}
        <button
          onClick={() => scroll("left")}
          className="p-3 bg-white rounded-full shadow hover:scale-105 transition"
        >
          <ChevronLeft className="text-[#d0771a]" />
        </button>

        {/* Conteneur scrollable */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-4"
        >
          {/* Carte 1 */}
          <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-start gap-4 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] flex-shrink-0">
            <div className="w-full flex justify-center">
              <img src="/logo.png" alt="" className="h-40 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-[#9f3e1c]">Introduction au montage vidéo</h2>
            <p className="text-gray-600">Apprenez les bases du montage vidéo professionnel</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm rounded px-2 py-1 bg-[#fce4e4] text-[#9f3e1c]">Multimédia</span>
              <span className="text-sm rounded px-2 py-1 bg-[#fbe8d4] text-[#9f3e1c]">Débutant</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>8 heures de contenu</li>
              <li>12 leçons</li>
              <li>Accès illimité</li>
            </ul>
            <button className="mt-4 w-full bg-gradient-to-r from-[#b3212b] to-[#d0771a] text-white py-2 rounded hover:opacity-90">
              Voir le cours
            </button>
          </div>


          {/* Carte 2 */}
          <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-start gap-4 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] flex-shrink-0">
            <div className="w-full flex justify-center">
              <img src="/chevre.png"  alt="" className="h-40 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-[#9f3e1c]">Introduction au NDA'A NDA'A</h2>
            <p className="text-gray-600">Découvrez les bases notre langue maternelle</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm rounded px-2 py-1 bg-[#fce4e4] text-[#9f3e1c]">Langue NDA'A NDA'A</span>
              <span className="text-sm rounded px-2 py-1 bg-[#fbe8d4] text-[#9f3e1c]">Débutant</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>10 heures de contenu</li>
              <li>15 leçons</li>
              <li>Accès illimité</li>
            </ul>
            <button className="mt-4 w-full bg-gradient-to-r from-[#b3212b] to-[#d0771a] text-white py-2 rounded hover:opacity-90">
              Voir le cours
            </button>
          </div>

          {/* Carte 3 */}
          <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-start gap-4 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] flex-shrink-0">
            <div className="w-full flex justify-center">
              <img src="/ligne.png" alt="" className="h-40 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-[#9f3e1c]">Principes de l'UI/UX Design</h2>
            <p className="text-gray-600">Créez des interfaces utilisateur attrayantes</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm rounded px-2 py-1 bg-[#fce4e4] text-[#9f3e1c]">Design Web</span>
              <span className="text-sm rounded px-2 py-1 bg-[#fdeacc] text-[#9f3e1c]">Intermédiaire</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>12 heures de contenu</li>
              <li>18 leçons</li>
              <li>Accès illimité</li>
            </ul>
            <button className="mt-4 w-full bg-gradient-to-r from-[#b3212b] to-[#d0771a] text-white py-2 rounded hover:opacity-90">
              Voir le cours
            </button>
          </div>
          {/* Carte 4 */}
          <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-start gap-4 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] flex-shrink-0">
            <div className="w-full flex justify-center">
              <img src="/code.png" alt="" className="h-40 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-[#9f3e1c]">HTML & CSS pour débutants</h2>
            <h2 className="text-xl font-bold text-[#9f3e1c]"></h2>
            <p className="text-gray-600">Créez votre premier site web de A à Z</p>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm rounded px-2 py-1 bg-[#fce4e4] text-[#9f3e1c]">Développement Web</span>
              <span className="text-sm rounded px-2 py-1 bg-[#fbe8d4] text-[#9f3e1c]">Débutant</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>10 heures de contenu</li>
              <li>15 leçons</li>
              <li>Accès illimité</li>
            </ul>
            <button className="mt-4 w-full bg-gradient-to-r from-[#b3212b] to-[#d0771a] text-white py-2 rounded hover:opacity-90">
              Voir le cours
            </button>
          </div>
        </div>

        {/* Flèche droite */}
        <button
          onClick={() => scroll("right")}
          className="p-3 bg-white rounded-full shadow hover:scale-105 transition"
        >
          <ChevronRight className="text-[#d0771a]" />
        </button>
      </div>

    </div>
  );
};



const Preservation = () => {
  return (
    <section
      className="w-full min-h-screen bg-repeat bg-center px-6 py-16 md:py-24 flex items-center justify-center"
      style={{
        backgroundImage: "public/motif-03.png')",
      }}
    >

      <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-7xl gap-10">
        {/* Texte */}
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#a52a2a] to-[#cc7722] bg-clip-text  text-transparent leading-tight">
            Préservation de la langue  <span>NDA'A NDA'A</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-xl">
            Notre mission est de préserver et promouvoir la langue maternelle NDA'A NDA'A, un élément essentiel du patrimoine culturel Bamena.
          </p>

          {/* Bouton stylisé */}
          <div className="mt-8 relative inline-block group ">
            <div className="absolute inset-0 clip-zigzag bg-[#821C1C] group-hover:bg-[#9D4F00] transition-all duration-300"></div>
            <a
              href="/courses"
              className="relative z-10 text-white font-semibold px-6 py-3 inline-block"
            >
              Découvrir les cours de langue
            </a>
          </div>

        </div>

        {/* Ligne verticale à droite */}
        <div className="w-[3px] bg-gradient-to-b from-[#9D4F00] to-transparent h-80"></div>
      </div>

      {/* Zigzag clip-path style
      <style>{`
        .clip-zigzag {
          clip-path: polygon(
            0% 50%, 5% 0%, 10% 50%, 15% 0%, 20% 50%, 
            25% 0%, 30% 50%, 35% 0%, 40% 50%, 45% 0%, 
            50% 50%, 55% 0%, 60% 50%, 65% 0%, 70% 50%, 
            75% 0%, 80% 50%, 85% 0%, 90% 50%, 95% 0%, 
            100% 50%, 100% 100%, 0% 100%
          );
        }
      `}</style> */}
    </section>
  );
};




const FormationProjectSection = () => {
  // Définition des différentes phases du projet
  const phases = [
    {
      title: "Phase 1: Site Web et Cours en Ligne",
      desc: "Lancement de notre plateforme en ligne pour offrir des cours de qualité en attendant la construction du centre physique."
    },
    {
      title: "Phase 2: Financement",
      desc: "Recherche de partenaires et de financements pour la construction du centre de formation."
    },
    {
      title: "Phase 3: Construction",
      desc: "Construction du centre de formation multimédia à Bamena."
    },
    {
      title: "Phase 4: Ouverture et Expansion",
      desc: "Ouverture du centre et expansion des programmes de formation."
    }
  ];

  return (
    <section className="bg-white bg-[url('/pattern.svg')] bg-repeat py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Titre principal avec animation d'apparition */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#a52a2a] to-[#cc7722] bg-clip-text  text-transparent"
        >
          Notre projet de <span>centre de formation</span>
        </motion.h2>

        {/* Texte introductif animé */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-gray-700 mb-5"
        >
          Nous travaillons actuellement sur la construction d'un centre de formation multimédia physique à  <br /> Bamena.

        </motion.p>

        {/* Localisation animée */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl font-medium text-gray-800"
        >

        </motion.p>

        <div className="mt-5 flex flex-col lg:flex-row items-center justify-center gap-12"
        >
          {/* Bloc de gauche : vidéo intégrée avec bouton play stylisé */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 h-72 md:h-96 aspect-video relative rounded-xl shadow-md overflow-hidden group"
          >
            <iframe
              className="w-full h-full object-cover"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vidéo du projet"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>

          {/* Bloc de droite : liste des phases avec animation d'entrée latérale */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-left"
          >
            {phases.map((item, index) => (
              // Chaque bloc phase est animé : translation vers la droite au survol
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                key={index}
                className="mb-4 flex items-start"
              >
                {/* Numéro de phase avec effet au survol */}
                <div className="min-w-10 min-h-10 w-10 h-10 flex items-center justify-center text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#AF2E26] to-[#C98316] mr-4 transform transition-transform duration-300 hover:scale-110">
                  {index + 1}
                </div>
                {/* Détail de la phase */}
                <div>
                  <h3 className="text-md md:text-lg font-semibold text-[#A5381E]">{item.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Bouton CTA animé */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 px-6 py-2 text-white rounded-md font-semibold bg-gradient-to-r from-[#AF2E26] to-[#C98316] shadow-md transition-all"
            >
              En savoir plus sur notre projet
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );

}
