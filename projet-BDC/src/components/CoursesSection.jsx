import React from "react";
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
                <img src="/video-thumbnail.svg" alt="" className="h-40 object-contain" />
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
                <img src="/html-css-thumbnail.svg" alt="" className="h-40 object-contain" />
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
                <img src="/uiux-thumbnail.svg" alt="" className="h-40 object-contain" />
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
                <img src="/html-css-thumbnail.svg" alt="" className="h-40 object-contain" />
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
  
  