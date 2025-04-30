// <!DOCTYPE html>
// <html lang="fr">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Bamena Digital Center</title>
//   <script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.development.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.development.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7.22.5/babel.min.js"></script>
//   <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
// </head>
// <body>
//   <div id="root"></div>
//   <script type="text/babel">
//     const { useState, useEffect } = React;

//     // Composant Header
//     const Header = () => (
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <div className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center">BD</div>
//           <h1 className="text-lg font-bold text-gray-800">BAMENA DIGITAL CENTER</h1>
//         </div>
//         <nav className="hidden md:flex space-x-4">
//           <a href="#" className="text-gray-600 hover:text-red-700">Accueil</a>
//           <a href="#" className="text-gray-600 hover:text-red-700">Cours</a>
//           <a href="#" className="text-gray-600 hover:text-red-700">À propos</a>
//           <a href="#" className="text-gray-600 hover:text-red-700">Contact</a>
//           <a href="#" className="text-gray-600 hover:text-red-700">Profil apprenant</a>
//           <a href="#" className="text-gray-600 hover:text-red-700">Espace formateur</a>
//           <a href="#" className="text-gray-600 hover:text-red-700">Se connecter</a>
//           <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">S'inscrire</button>
//         </nav>
//         <button className="md:hidden text-gray-600">☰</button>
//       </header>
//     );

//     // Composant Footer
//     const Footer = () => (
//       <footer className="bg-gray-100 py-8 px-4">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center space-x-2">
//               <div className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center">BD</div>
//               <h2 className="text-lg font-bold text-gray-800">BAMENA DIGITAL CENTER</h2>
//             </div>
//             <p className="text-gray-600 mt-2">Centre de formation multimédia et préservation de la langue Nda’a Nda’a au cœur des pays Bamileke.</p>
//             <div className="flex space-x-4 mt-4">
//               <a href="#" className="text-gray-600 hover:text-red-700">f</a>
//               <a href="#" className="text-gray-600 hover:text-red-700">t</a>
//               <a href="#" className="text-gray-600 hover:text-red-700">i</a>
//               <a href="#" className="text-gray-600 hover:text-red-700">y</a>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Liens rapides</h3>
//             <ul className="mt-2 space-y-2">
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Accueil</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Cours</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-red-700">À propos</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Contact</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Catégories</h3>
//             <ul className="mt-2 space-y-2">
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Multimédia</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Développement Web</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Design Web</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Digital & Marketing</a></li>
//               <li><a href="#" className="text-gray-600 hover:text-red-700">Langue Nda’a Nda’a</a></li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
//             <ul className="mt-2 space-y-2">
//               <li className="text-gray-600">Bamena, Ouest Cameroun</li>
//               <li className="text-gray-600">info@bamenadigitalcenter.com</li>
//               <li className="text-gray-600">+237 XXX XXX XXX</li>
//             </ul>
//           </div>
//         </div>
//         <div className="max-w-6xl mx-auto mt-8 flex justify-between text-gray-600 text-sm">
//           <p>© 2025 Bamena Digital Center. Tous droits réservés.</p>
//           <div className="space-x-4">
//             <a href="#" className="hover:text-red-700">Conditions d'utilisation</a>
//             <a href="#" className="hover:text-red-700">Politique de confidentialité</a>
//           </div>
//         </div>
//       </footer>
//     );

//     // Page d'accueil (Mon Espace d'Apprentissage)
//     const HomePage = () => (
//       <div className="min-h-screen bg-gray-50">
//         <div className="bg-[url('https://via.placeholder.com/1500x300')] bg-cover bg-center py-16 text-center">
//           <h1 className="text-4xl font-bold text-red-700">Mon Espace d'Apprentissage</h1>
//           <p className="text-gray-600 mt-2">Continuez votre parcours d'apprentissage et suivez votre progression</p>
//           <input type="text" placeholder="Rechercher dans mes cours..." className="mt-4 p-2 rounded border border-gray-300 w-1/2" />
//         </div>
//         <div className="max-w-6xl mx-auto py-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cours en cours (2)</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-lg rounded-lg p-6">
//               <h3 className="text-xl font-semibold text-gray-800">Introduction au montage vidéo</h3>
//               <p className="text-gray-600">Multimédia</p>
//               <div className="mt-2">
//                 <p className="text-gray-600">Progression</p>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div className="bg-red-700 h-2.5 rounded-full" style={{ width: '35%' }}></div>
//                 </div>
//                 <p className="text-gray-600 mt-1">35%</p>
//               </div>
//               <p className="text-gray-600 mt-2">Dernière leçon suivie : Importation et organisation des médias</p>
//               <p className="text-gray-600">4 / 12 leçons complétées</p>
//               <button className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Continuer</button>
//             </div>
//             <div className="bg-white shadow-lg rounded-lg p-6">
//               <h3 className="text-xl font-semibold text-gray-800">HTML & CSS pour débutants</h3>
//               <p className="text-gray-600">Développement Web</p>
//               <div className="mt-2">
//                 <p className="text-gray-600">Progression</p>
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div className="bg-red-700 h-2.5 rounded-full" style={{ width: '15%' }}></div>
//                 </div>
//                 <p className="text-gray-600 mt-1">15%</p>
//               </div>
//               <p className="text-gray-600 mt-2">Dernière leçon suivie : Structure d'une page HTML</p>
//               <p className="text-gray-600">2 / 15 leçons complétées</p>
//               <button className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Continuer</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );

//     // Page Nos Cours
//     const CoursesPage = () => {
//       const [category, setCategory] = useState('');
//       const courses = [
//         { title: "Introduction au montage vidéo", category: "Multimédia", level: "Débutant", duration: "8 heures", lessons: 12 },
//         { title: "HTML & CSS pour débutants", category: "Développement Web", level: "Débutant", duration: "10 heures", lessons: 15 },
//         { title: "Principes de l'UI/UX Design", category: "Design Web", level: "Débutant", duration: "12 heures", lessons: 18 },
//         { title: "Marketing des médias sociaux", category: "Digital & Marketing", level: "Intermédiaires", duration: "9 heures", lessons: 14 },
//         { title: "Introduction à la langue Nda’a Nda’a", category: "Langue Nda’a Nda’a", level: "Débutant", duration: "6 heures", lessons: 10 },
//         { title: "Animation 3D pour débutants", category: "Multimédia", level: "Débutant", duration: "15 heures", lessons: 20 },
//       ];

//       const filteredCourses = category ? courses.filter(course => course.category === category) : courses;

//       return (
//         <div className="min-h-screen bg-gray-50">
//           <div className="bg-[url('https://via.placeholder.com/1500x300')] bg-cover bg-center py-16 text-center">
//             <h1 className="text-4xl font-bold text-red-700">Nos Cours</h1>
//             <p className="text-gray-600 mt-2">Explorez notre catalogue de cours et commencez votre parcours d’apprentissage dès aujourd’hui.</p>
//             <input type="text" placeholder="Rechercher des cours..." className="mt-4 p-2 rounded border border-gray-300 w-1/2" />
//           </div>
//           <div className="max-w-6xl mx-auto py-8 flex">
//             <div className="w-1/4 pr-4">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtres</h2>
//               <div className="mb-4">
//                 <label className="block text-gray-600 mb-2">Catégorie</label>
//                 <select className="w-full p-2 rounded border border-gray-300" onChange={(e) => setCategory(e.target.value)}>
//                   <option value="">Toutes les catégories</option>
//                   <option value="Multimédia">Multimédia</option>
//                   <option value="Développement Web">Développement Web</option>
//                   <option value="Design Web">Design Web</option>
//                   <option value="Digital & Marketing">Digital & Marketing</option>
//                   <option value="Langue Nda’a Nda’a">Langue Nda’a Nda’a</option>
//                 </select>
//               </div>
//               <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Réinitialiser filtres</button>
//             </div>
//             <div className="w-3/4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {filteredCourses.map((course, index) => (
//                   <div key={index} className="bg-white shadow-lg rounded-lg p-6">
//                     <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
//                     <p className="text-gray-600">{course.category}</p>
//                     <p className="text-gray-600">{course.level}</p>
//                     <p className="text-gray-600">{course.duration}</p>
//                     <p className="text-gray-600">{course.lessons} leçons</p>
//                     <button className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Voir le cours</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     };

//     // Page Détails d'un cours
//     const CourseDetailPage = () => (
//       <div className="min-h-screen bg-gray-50">
//         <div className="max-w-6xl mx-auto py-8">
//           <h1 className="text-3xl font-bold text-gray-800">Introduction au montage vidéo</h1>
//           <p className="text-gray-600 mt-2">Apprenez les bases du montage vidéo professionnel et créez vos vidéos de qualité.</p>
//           <div className="flex space-x-4 mt-4">
//             <p className="text-gray-600">8 heures</p>
//             <p className="text-gray-600">12 leçons</p>
//             <p className="text-gray-600">Accès illimité</p>
//             <p className="text-gray-600">156 étudiants</p>
//             <p className="text-gray-600">⭐ 4.8/5</p>
//           </div>
//           <div className="flex space-x-4 mt-4">
//             <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Commencer le cours</button>
//             <button className="border border-red-700 text-red-700 px-4 py-2 rounded hover:bg-red-700 hover:text-white">Ajouter au panier</button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//             <div className="col-span-2">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Programme du cours</h2>
//               <ul className="space-y-4">
//                 <li className="bg-gray-100 p-4 rounded">
//                   <h3 className="text-lg font-semibold text-gray-800">Qu’est-ce que le montage vidéo ?</h3>
//                 </li>
//                 <li className="bg-gray-100 p-4 rounded">
//                   <h3 className="text-lg font-semibold text-gray-800">Les différents types de montage</h3>
//                 </li>
//                 <li className="bg-gray-100 p-4 rounded">
//                   <h3 className="text-lg font-semibold text-gray-800">Les outils nécessaires</h3>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h3 className="text-xl font-semibold text-gray-800">25000 FCFA</h3>
//                 <button className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 w-full">Commencer le cours</button>
//                 <button className="mt-2 border border-red-700 text-red-700 px-4 py-2 rounded hover:bg-red-700 hover:text-white w-full">Ajouter au panier</button>
//                 <ul className="mt-4 space-y-2">
//                   <li className="text-gray-600">8 heures de contenu vidéo</li>
//                   <li className="text-gray-600">12 leçons</li>
//                   <li className="text-gray-600">Ressources téléchargeables</li>
//                   <li className="text-gray-600">Accès sur mobile et TV</li>
//                   <li className="text-gray-600">Certificat d’achèvement</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );

//     // Page À propos (avec onglets)
//     const AboutPage = () => {
//       const [activeTab, setActiveTab] = useState('histoire');

//       return (
//         <div className="min-h-screen bg-gray-50">
//           <div className="bg-[url('https://via.placeholder.com/1500x300')] bg-cover bg-center py-16 text-center">
//             <h1 className="text-4xl font-bold text-red-700">À propos de Bamena Digital Center</h1>
//             <p className="text-gray-600 mt-2">Notre mission est de fournir une éducation numérique de qualité et de préserver la langue maternelle Nda’a Nda’a.</p>
//           </div>
//           <div className="max-w-6xl mx-auto py-8">
//             <div className="flex space-x-4 border-b">
//               <button className={`py-2 px-4 ${activeTab === 'histoire' ? 'border-b-2 border-red-700 text-red-700' : 'text-gray-600'}`} onClick={() => setActiveTab('histoire')}>Notre histoire</button>
//               <button className={`py-2 px-4 ${activeTab === 'vision' ? 'border-b-2 border-red-700 text-red-700' : 'text-gray-600'}`} onClick={() => setActiveTab('vision')}>Notre vision</button>
//               <button className={`py-2 px-4 ${activeTab === 'valeurs' ? 'border-b-2 border-red-700 text-red-700' : 'text-gray-600'}`} onClick={() => setActiveTab('valeurs')}>Nos valeurs</button>
//               <button className={`py-2 px-4 ${activeTab === 'projet' ? 'border-b-2 border-red-700 text-red-700' : 'text-gray-600'}`} onClick={() => setActiveTab('projet')}>Notre projet</button>
//               <button className={`py-2 px-4 ${activeTab === 'equipe' ? 'border-b-2 border-red-700 text-red-700' : 'text-gray-600'}`} onClick={() => setActiveTab('equipe')}>Notre équipe</button>
//             </div>
//             <div className="mt-8">
//               {activeTab === 'histoire' && <p className="text-gray-600">Bamena Digital Center est fondé avec la vision de créer un espace d’apprentissage numérique accessible à tous, tout en préservant notre patrimoine culturel bamileke.</p>}
//               {activeTab === 'vision' && <p className="text-gray-600">Notre vision est de promouvoir une éducation numérique de qualité pour tous, en intégrant les valeurs culturelles bamileke.</p>}
//               {activeTab === 'valeurs' && <p className="text-gray-600">Excellence, innovation, accessibilité, préservation culturelle et communauté.</p>}
//               {activeTab === 'projet' && <p className="text-gray-600">Nous travaillons actuellement sur la construction d’un centre de formation multimédia à Bamena, au cœur des pays bamileke.</p>}
//               {activeTab === 'equipe' && (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//                     <h3 className="text-lg font-semibold text-gray-800">Fondatrice</h3>
//                     <p className="text-gray-600">Mme Bamena</p>
//                   </div>
//                   <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//                     <h3 className="text-lg font-semibold text-gray-800">Directeur Technique</h3>
//                     <p className="text-gray-600">Expert en développement web</p>
//                   </div>
//                   <div className="bg-white shadow-lg rounded-lg p-6 text-center">
//                     <h3 className="text-lg font-semibold text-gray-800">Responsable Pédagogique</h3>
//                     <p className="text-gray-600">Spécialiste en éducation numérique</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       );
//     };

//     // Page Contact
//     const ContactPage = () => (
//       <div className="min-h-screen bg-gray-50">
//         <div className="bg-[url('https://via.placeholder.com/1500x300')] bg-cover bg-center py-16 text-center">
//           <h1 className="text-4xl font-bold text-red-700">Contactez-nous</h1>
//           <p className="text-gray-600 mt-2">Nous sommes là pour répondre à vos questions et vous aider dans votre parcours d’apprentissage.</p>
//         </div>
//         <div className="max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informations de contact</h2>
//             <p className="text-gray-600">N’hésitez pas à nous contacter pour toute question ou demande d’information. Notre équipe est là pour vous aider.</p>
//             <ul className="mt-4 space-y-4">
//               <li className="text-gray-600">📧 info@bamenadigitalcenter.com</li>
//               <li className="text-gray-600">📞 +237 XXX XXX XXX</li>
//               <li className="text-gray-600">📍 Bamena, Ouest Cameroun</li>
//             </ul>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Envoyez-nous un message</h2>
//             <p className="text-gray-600 mb-4">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
//             <div className="space-y-4">
//               <div className="flex space-x-4">
//                 <input type="text" placeholder="Prénom" className="w-1/2 p-2 rounded border border-gray-300" />
//                 <input type="text" placeholder="Nom" className="w-1/2 p-2 rounded border border-gray-300" />
//               </div>
//               <input type="email" placeholder="Entrez votre adresse email" className="w-full p-2 rounded border border-gray-300" />
//               <input type="text" placeholder="Sujet" className="w-full p-2 rounded border border-gray-300" />
//               <textarea placeholder="Entrez votre message" className="w-full p-2 rounded border border-gray-300 h-32"></textarea>
//               <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">Envoyer le message</button>
//             </div>
//           </div>
//         </div>
//         <div className="max-w-6xl mx-auto py-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Foire aux questions</h2>
//           <ul className="space-y-4">
//             <li className="bg-gray-100 p-4 rounded">
//               <h3 className="text-lg font-semibold text-gray-800">Comment puis-je m’inscrire aux cours ?</h3>
//             </li>
//             <li className="bg-gray-100 p-4 rounded">
//               <h3 className="text-lg font-semibold text-gray-800">Les cours sont-ils accessibles à vie ?</h3>
//             </li>
//             <li className="bg-gray-100 p-4 rounded">
//               <h3 className="text-lg font-semibold text-gray-800">Proposez-vous des certificats ?</h3>
//             </li>
//           </ul>
//         </div>
//       </div>
//     );

//     // Composant principal
//     const App = () => {
//       const [currentPage, setCurrentPage] = useState('home');

//       return (
//         <div>
//           <Header />
//           {currentPage === 'home' && <HomePage />}
//           {currentPage === 'courses' && <CoursesPage />}
//           {currentPage === 'course-detail' && <CourseDetailPage />}
//           {currentPage === 'about' && <AboutPage />}
//           {currentPage === 'contact' && <ContactPage />}
//           <Footer />
//           {/* Navigation temporaire pour tester les pages */}
//           <div className="fixed bottom-4 right-4 flex space-x-2">
//             <button onClick={() => setCurrentPage('home')} className="bg-red-700 text-white px-4 py-2 rounded">Accueil</button>
//             <button onClick={() => setCurrentPage('courses')} className="bg-red-700 text-white px-4 py-2 rounded">Cours</button>
//             <button onClick={() => setCurrentPage('course-detail')} className="bg-red-700 text-white px-4 py-2 rounded">Détail Cours</button>
//             <button onClick={() => setCurrentPage('about')} className="bg-red-700 text-white px-4 py-2 rounded">À propos</button>
//             <button onClick={() => setCurrentPage('contact')} className="bg-red-700 text-white px-4 py-2 rounded">Contact</button>
//           </div>
//         </div>
//       );
//     };

//     ReactDOM.render(<App />, document.getElementById('root'));
//   </script>
// </body>
// </html>