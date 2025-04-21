import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

const courses = [
  { title: 'HTML & CSS pour débutants', progress: 85 },
  { title: 'Principes de UI/UX Design', progress: 60 },
  { title: 'Marketing sur les médias sociaux', progress: 30 },
  { title: 'Introduction au Ndaa-Ndaa', progress: 45 }
];

const recommendations = [
  { title: "Introduction au montage vidéo", description: "Apprenez les bases du montage vidéo avec des outils professionnels" },
  { title: "Développement web avancé", description: "Maîtrisez JavaScript et les frameworks modernes" }
];

export default function TrainerProfile() {
  const [activeTab, setActiveTab] = useState("mesCours");
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9f8f6] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-white w-full md:w-1/4 p-4 border-r border-gray-200">
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-100 text-green-700 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-2">KN</div>
          <h2 className="font-semibold text-lg">Kouam Nguiffo</h2>
          <p className="text-sm text-gray-500">Apprenant depuis Janvier 2023</p>
          <ul className="text-sm mt-4 space-y-1 text-left">
            <li>📘 4 cours suivis</li>
            <li>⏱️ 32 heures d'apprentissage</li>
            <li>🎓 2 certificats obtenus</li>
          </ul>
          <button
            className="mt-4 text-sm text-green-700 border border-green-600 rounded px-3 py-1"
            onClick={() => setShowSettings(true)}
          >
            Paramètres du compte
          </button>
        </div>

        <nav className="mt-6 text-sm space-y-2">
          <div>📚 Mes cours</div>
          <div>🎖️ Certificats</div>
          <div>📊 Statistiques</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <h1 className="text-xl font-bold text-green-800 mb-4">Tableau de bord</h1>

        {/* Onglets */}
        <div className="flex space-x-2 mb-6">
          {['mesCours', 'progression', 'certificats'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab ? 'bg-white shadow text-black' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {tab === 'mesCours' && 'Mes cours'}
              {tab === 'progression' && 'Progression'}
              {tab === 'certificats' && 'Certificats'}
            </button>
          ))}
        </div>

        {/* Contenu animé selon l’onglet actif */}
        <AnimatePresence mode="wait">
          {activeTab === 'mesCours' && (
            <motion.div
              key="mesCours"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {courses.map((course, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-md font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>Progression: {course.progress}%</span>
                    <span className="text-green-700">En cours</span>
                  </div>
                  <Progress value={course.progress} className="h-2 mt-2 bg-orange-100 [&>*]:bg-gradient-to-r [&>*]:from-[#8A2C02] [&>*]:to-[#F6C94A]" />
                  <button className="mt-3 w-full bg-green-700 text-white text-sm py-1 rounded">Continuer →</button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'progression' && (
            <motion.div
              key="progression"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-lg p-4 shadow mb-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Votre progression globale</h2>
              <p className="text-sm text-gray-500 mb-4">Suivez votre évolution dans tous vos cours</p>
              <div className="space-y-4">
                {courses.map((course, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>{course.title}</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 bg-orange-100 [&>*]:bg-gradient-to-r [&>*]:from-[#8A2C02] [&>*]:to-[#F6C94A]" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'certificats' && (
            <motion.div
              key="certificats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-lg p-4 shadow mb-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Vos certificats</h2>
              <p className="text-sm text-gray-500 mb-4">Voici les certificats que vous avez obtenus</p>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                <li>Certificat en HTML & CSS</li>
                <li>Certificat en UI/UX Design</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recommandations */}
        <div className="bg-[#f1f4ec] p-4 rounded-xl">
          <h2 className="font-semibold text-lg text-gray-700 mb-1">Recommandations pour vous</h2>
          <p className="text-sm text-gray-500 mb-4">Basées sur vos cours actuels et vos centres d'intérêt</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-md">{rec.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <button className="text-sm border border-gray-400 rounded px-3 py-1">Découvrir ce cours</button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal des paramètres du compte */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">Paramètres du compte</h3>
              <ul className="text-sm space-y-2">
                <li>👤 Modifier les informations personnelles</li>
                <li>🔒 Changer le mot de passe</li>
                <li>🌐 Préférences linguistiques</li>
                <li>🎨 Thème de l'interface</li>
                <li>🔔 Notifications</li>
                <li>🗑️ Supprimer le compte</li>
              </ul>
              <button
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded text-sm"
                onClick={() => setShowSettings(false)}
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
