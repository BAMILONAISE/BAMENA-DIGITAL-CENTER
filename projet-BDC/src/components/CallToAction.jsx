import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-[#fdf9f5] py-20 px-4 text-center relative">
      <div className="max-w-4xl mx-auto border border-[#a52a2a]   p-10 rounded-lg bg-white shadow-md mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug bg-gradient-to-r from-[#a52a2a] to-[#cc7722] bg-clip-text  text-transparent ">
          Prêt à commencer votre parcours d'apprentissage?
          
        </h2>
        <p className="mt-6 text-gray-700 text-lg sm:text-l">
          Rejoignez notre communauté d'apprenants et développez vos
          compétences numériques dès aujourd'hui.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 ">
          <button className="bg-[#a72f2f] text-white text-lg font-semibold px-6 py-4 rounded-none relative hover:scale-105 transition " >
          S'inscrire maintenant
          </button>

          <button className="border border-[#a72f2f] text-[#a72f2f] text-lg font-semibold px-6 py-4 rounded-md hover:bg-[#f7e8e8] transition">
            Voir tous les cours
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
