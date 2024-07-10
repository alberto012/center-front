import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { CiPlay1 } from "react-icons/ci";
import data from './dataChapters.json'; // Asegúrate de que tu archivo JSON tenga la estructura adecuada
import backgroundImage from './assets/fondoBotton.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoTools } from "react-icons/go";
const ResumePage = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    let isMounted = true; // Bandera para verificar si el componente está montado

    const fetchData = async () => {
      try {
        // Simulando un retraso por motivos de demostración
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (isMounted) {
          // Reemplazar con la lógica de obtención real
          setEpisodes(data.episodes); // Asegúrate de que la estructura de datos coincida con el JSON
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData(); // Obtiene datos en el montaje del componente

    // Función de limpieza
    return () => {
      isMounted = false; // Cambia la bandera a false cuando el componente se desmonte
    };
  }, []); // El array de dependencias vacío asegura que useEffect se ejecute una vez después del renderizado inicial

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="flex flex-col  justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto px-4 py-12 text-white text-start">
        <h1 className="text-6xl font-bold mb-4">RESUME PAGE</h1>
        <p className="text-2xl mb-8">Description:</p>
        <p className="text-lg mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac dignissim tellus, ac condimentum magna. Nulla eu tellus sed dolor elementum lobortis.</p>
        <div className="flex justify-start items-center mb-8">
          <button className={`mr-4 bg-gradient-to-b from-blue-700 to-blue-400 text-white font-bold py-2 px-8 transform -skew-x-12 shadow-md border flex items-center`}>
            <CiPlay1 className="inline-block mr-2" /> Play
          </button>
          <button className={`mr-4 text-white font-bold py-2 px-2 transform rounded-full shadow-md border flex items-center`}>
            <GoTools />
          </button>
        </div>
        <div className="w-full">
          <Slider {...sliderSettings}>
            {episodes.map((episode, index) => (
              <div key={index} className="px-2">
                <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg">
                  <img src={episode.image} alt={episode.title} className="w-full h-32 object-cover mb-2 rounded-lg"/>
                  <p className="text-lg font-bold mb-2">{episode.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

// Componente para la flecha siguiente
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center text-white z-10 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    >
      &gt;
    </div>
  );
};

// Componente para la flecha anterior
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center text-white z-10 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    >
      &lt;
    </div>
  );
};

export default ResumePage;
