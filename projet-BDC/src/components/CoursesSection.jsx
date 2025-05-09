import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchPublicCours } from "../api";
import { getImageUrl, handleImageError } from '../utils/imageUtils';

const CoursesSection = () => {
  const scrollRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchPublicCours();
        setCourses(data);
      } catch (err) {
        setError("Erreur lors du chargement des cours");
        console.error("Erreur de chargement des cours:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 1000;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d0771a]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Aucun cours disponible pour le moment.</p>
      </div>
    );
  }

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
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow rounded-2xl p-6 flex flex-col items-start gap-4 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] flex-shrink-0"
            >
              <div className="w-full flex justify-center">
                <img
                  src={getImageUrl(course.image_couverture) || "/default-course-thumbnail.svg"}
                  alt={course.titre}
                  className="h-40 object-contain"
                  onError={handleImageError}
                />
              </div>
              <h2 className="text-xl font-bold text-[#9f3e1c]">{course.titre}</h2>
              <p className="text-gray-600">{course.description}</p>
              <div className="flex gap-2 flex-wrap">
                {course.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm rounded px-2 py-1 bg-[#fce4e4] text-[#9f3e1c]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>{course.duree || "Durée non spécifiée"}</li>
                <li>{course.nombre_lecons || "Nombre de leçons non spécifié"}</li>
                <li>Accès illimité</li>
              </ul>
              <Link
                to={`/cours/${course.id}`}
                className="mt-4 w-full bg-gradient-to-r from-[#b3212b] to-[#d0771a] text-white py-2 rounded hover:opacity-90 text-center"
              >
                Voir le cours
              </Link>
            </div>
          ))}
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

export default CoursesSection;
  
  