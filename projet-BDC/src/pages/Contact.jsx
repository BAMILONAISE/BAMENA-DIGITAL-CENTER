import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown, FaPaperPlane, FaQuestionCircle } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });

  const [accordionOpen, setAccordionOpen] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi du formulaire
    setTimeout(() => {
      console.log('Formulaire soumis:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          prenom: '',
          nom: '',
          email: '',
          sujet: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const toggleAccordion = (index) => {
    if (accordionOpen === index) {
      setAccordionOpen(null);
    } else {
      setAccordionOpen(index);
    }
  };

  const faqItems = [
    {
      question: "Comment puis-je m'inscrire aux cours?",
      answer: "Pour vous inscrire aux cours, créez un compte sur notre plateforme et naviguez vers la section 'Cours'. Sélectionnez le cours qui vous intéresse et cliquez sur 'S'inscrire'."
    },
    {
      question: "Les cours sont-ils accessibles à vie?",
      answer: "Oui, une fois inscrit à un cours, vous y avez accès sans limite de temps. Vous pouvez suivre le cours à votre rythme et y revenir quand vous le souhaitez."
    },
    {
      question: "Proposez-vous des certificats?",
      answer: "Oui, nous délivrons des certificats de réussite à tous les apprenants qui terminent avec succès leurs cours. Ces certificats peuvent être téléchargés depuis votre espace personnel."
    },
    {
      question: "Comment puis-je soutenir le projet de construction du centre?",
      answer: "Vous pouvez soutenir notre projet par des dons, du partenariat ou du bénévolat. Contactez-nous pour plus d'informations sur les différentes façons de contribuer."
    },
    {
      question: "Proposez-vous des formations en présentiel?",
      answer: "Actuellement, nos formations sont principalement en ligne. Cependant, nous prévoyons d'offrir des formations en présentiel dès la construction de notre centre physique à Bamena."
    },
    {
      question: "Puis-je devenir formateur pour le Bamena Digital Center?",
      answer: "Nous sommes toujours à la recherche de formateurs qualifiés et passionnés. Envoyez-nous votre CV et une lettre de motivation à notre adresse email et nous vous contacterons."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* En-tête de la page avec fond d'image stylisé */}
        <div className="relative bg-gradient-to-r from-[#a52a2a] to-[#cc7722] py-20">
          <div className="absolute inset-0 bg-black opacity-10 pattern-dots-lg"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">Contactez-nous</h1>
              <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
                Nous sommes là pour répondre à vos questions et vous aider dans 
                votre parcours d'apprentissage.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Informations de contact - Carte stylisée */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#a52a2a] mb-6 flex items-center">
                <span className="w-10 h-1 bg-[#a52a2a] mr-3 rounded-full"></span>
                Informations de contact
              </h2>
              <p className="text-gray-700 mb-8">
                N'hésitez pas à nous contacter pour toute question ou demande 
                d'informations. Notre équipe est là pour vous aider.
              </p>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start group">
                  <div className="text-white bg-[#a52a2a] p-3 rounded-full mr-4 shadow-md group-hover:bg-[#cc7722] transition-colors duration-300">
                    <FaEnvelope size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Email</h3>
                    <a href="mailto:info@bamenadigital.center" className="text-gray-600 hover:text-[#a52a2a] transition-colors">
                      infos@bdc.com
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start group">
                  <div className="text-white bg-[#a52a2a] p-3 rounded-full mr-4 shadow-md group-hover:bg-[#cc7722] transition-colors duration-300">
                    <FaPhone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Téléphone</h3>
                    <a href="tel:+237680994956" className="text-gray-600 hover:text-[#a52a2a] transition-colors">
                      +237 680 994 956
                    </a>
                  </div>
                </div>

                {/* Adresse */}
                <div className="flex items-start group">
                  <div className="text-white bg-[#a52a2a] p-3 rounded-full mr-4 shadow-md group-hover:bg-[#cc7722] transition-colors duration-300">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Bamena, Ouest Cameroun
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Carte ou image stylisée */}
              <div className="mt-10 h-48 bg-gray-200 rounded-lg overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                <img src="carte.png" alt="ici la carte" />
                <div className="w-full h-full flex items-center justify-center bg-[#a52a2a] bg-opacity-10">
                  <p className="text-gray-600 font-medium">Carte de localisation</p>
                </div>
              </div>
            </div>

            {/* Formulaire de contact - Avec effets et feedback */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#a52a2a] mb-6 flex items-center">
                <span className="w-10 h-1 bg-[#a52a2a] mr-3 rounded-full"></span>
                Envoyez-nous un message
              </h2>
              <p className="text-gray-700 mb-6">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus
                brefs délais.
              </p>

              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-6 rounded-lg text-center animate-fade-in">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Message envoyé avec succès!</h3>
                  <p>Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    {/* Prénom */}
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-transparent transition-all duration-200"
                        placeholder="Entrez votre prénom"
                        required
                      />
                    </div>

                    {/* Nom */}
                    <div>
                      <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-transparent transition-all duration-200"
                        placeholder="Entrez votre nom"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-transparent transition-all duration-200"
                      placeholder="Entrez votre adresse email"
                      required
                    />
                  </div>

                  {/* Sujet */}
                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet
                    </label>
                    <select
                      id="sujet"
                      name="sujet"
                      value={formData.sujet}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="">Sélectionnez le sujet de votre message</option>
                      <option value="question_cours">Question sur les cours</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a52a2a] focus:border-transparent transition-all duration-200"
                      placeholder="Écrivez votre message"
                      required
                    ></textarea>
                  </div>

                  {/* Bouton d'envoi */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#a52a2a] text-white py-3 px-6 rounded-lg hover:bg-[#cc7722] transition-colors flex items-center justify-center space-x-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a52a2a] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Section FAQ - Améliorée */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <FaQuestionCircle className="text-3xl text-[#a52a2a] mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">Foire aux questions</h2>
                </div>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                  Trouvez des réponses aux questions fréquemment posées sur nos services et notre centre.
                </p>
              </div>

              <div className="space-y-4 max-w-3xl mx-auto">
                {faqItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <button
                      className={`w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none transition-colors duration-300 ${
                        accordionOpen === index ? 'bg-[#a52a2a] text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-medium">{item.question}</span>
                      <FaChevronDown
                        className={`transform transition-transform duration-300 ${
                          accordionOpen === index ? 'rotate-180 text-white' : 'text-[#a52a2a]'
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out bg-white ${
                        accordionOpen === index 
                          ? 'max-h-96 opacity-100 py-6 px-6' 
                          : 'max-h-0 opacity-0 overflow-hidden py-0 px-6'
                      }`}
                    >
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
