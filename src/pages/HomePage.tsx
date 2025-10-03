import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import logoImage from '../assets/images/homepagelogo.png';
import logoBgd from '../assets/images/homepagebgd.jpeg';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Background music for homepage
  // EDIT THIS PATH: Change '/homepage-music.mp3' to your desired music file
  useBackgroundMusic('/homepage-music.mp3', { volume: 0.2 });

  {/* const handleImageClick = () => {
    navigate('/links');
  };*/}
  
  
  const handleImageClick = () => {
    window.open('https://taap.it/UNSeRh', '_self');
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat h-full w-full"
        style={{
          backgroundImage: `url(${logoBgd})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 h-full w-full"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div 
          onClick={handleImageClick}
          className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <div className="relative">
            {/* Logo Image with Pulse Animation */}
            <div className="w-full max-w-[32rem] aspect-square flex items-center justify-center mx-auto">
              <img
                src={logoImage}
                alt="Soulmates Desires"
                className="object-contain max-w-full max-h-full rounded-full animate-smooth-pulse"
              />
            </div>

            {/* Pulse Rings
            <div className="absolute inset-0 rounded-full border-4 border-[#895503] animate-ping opacity-75"></div>
            <div className="absolute inset-0 rounded-full border-4 border-[#895503] animate-ping opacity-50 animation-delay-1000"></div>*/}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes smoothPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .animate-smooth-pulse {
          animation: smoothPulse 2.5s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default HomePage;