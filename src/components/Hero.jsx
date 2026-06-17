import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

// Import local slideshow images
import slide1 from '../assets/hero_slide_1.jpg';
import slide2 from '../assets/hero_slide_2.jpg';
import slide3 from '../assets/hero_slide_3.jpg';

const SLIDESHOW_IMAGES = [slide1, slide2, slide3];

export default function Hero() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % SLIDESHOW_IMAGES.length);
    }, 5500); // Cycle backgrounds every 5.5s
    return () => clearInterval(interval);
  }, []);

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="hero-section" id="home">
      {/* 1. Full-Screen Background Image Slideshow with Breathe Animation */}
      <div className="hero-slideshow-container">
        {SLIDESHOW_IMAGES.map((imgUrl, index) => (
          <div
            key={index}
            className={`hero-slide-img ${index === slideIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${imgUrl})` }}
          />
        ))}
        {/* Dark contrast gradient filter */}
        <div className="hero-slideshow-overlay"></div>
      </div>

      {/* 2. Centered & Staggered Hero Content */}
      <div className="hero-center-content">
        <div className="hero-badge reveal-item">
          <span className="badge-pulse"></span>
          PUNE'S AUTOMOTIVE SPA
        </div>
        
        <h1 className="hero-headline reveal-item">
          PRECISION WASH & <span className="text-gradient-blue">ELITE GLOSS</span>
        </h1>

        <p className="hero-tagline reveal-item">
          Experience the pinnacle of detailing at <span className="hero-brand-highlight">A.S. Shine - Wash & Detailing</span>. We combine pH-neutral foam washes and expert paint correction to deliver a breathtaking showroom glow.
        </p>

        <button className="hero-cta-btn glow-btn reveal-item" onClick={scrollToBooking}>
          <Calendar size={16} />
          SECURE YOUR SHINE SLOT
          <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        .hero-brand-highlight {
          font-weight: 700;
          background: linear-gradient(90deg, #FDE047, #EAB308, #FFF, #FDE047);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: brandShineKey 4s linear infinite;
          display: inline-block;
          text-shadow: 0 0 10px rgba(234, 179, 8, 0.2);
        }

        @keyframes brandShineKey {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          overflow: hidden;
          background: #050508;
        }

        /* Full-Screen Slideshow Backing */
        .hero-slideshow-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-slide-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transform: scale(1.0);
          z-index: 1;
        }

        .hero-slide-img.active {
          opacity: 0.92; /* Faded to maintain visibility of white text overlay */
          z-index: 2;
          animation: breatheEffect 14s ease-in-out infinite;
        }

        /* Breathe scale zoom effect */
        @keyframes breatheEffect {
          0% {
            transform: scale(1.0);
            opacity: 0;
          }
          8% {
            opacity: 0.92;
          }
          50% {
            transform: scale(1.08);
          }
          92% {
            opacity: 0.92;
          }
          100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        .hero-slideshow-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(5, 5, 8, 0.2) 0%, rgba(5, 5, 8, 0.65) 100%);
          z-index: 3;
          pointer-events: none;
        }

        /* Centered content overlay */
        .hero-center-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 720px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(13, 13, 17, 0.88);
          border: 1px solid rgba(234, 179, 8, 0.35);
          color: #FBBF24;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
        }

        .badge-pulse {
          width: 6px;
          height: 6px;
          background-color: #EAB308;
          border-radius: 50%;
          animation: badgePulseKey 2s infinite;
        }

        @keyframes badgePulseKey {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 8px #EAB308; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }

        .hero-headline {
          font-size: 2.8rem;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.95)); /* Robust shadow for high contrast */
        }

        .hero-tagline {
          font-size: 1.05rem;
          line-height: 1.5;
          color: #E2E8F0;
          margin-bottom: 30px;
          max-width: 580px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.98);
        }

        .hero-cta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          font-size: 0.9rem;
          border-radius: 24px;
          font-family: var(--font-display);
        }

        /* Staggered Content Reveal Animations triggered by .fade-in-active wrapper */
        .reveal-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1.0s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in-active .hero-center-content > .hero-badge {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.15s;
        }

        .fade-in-active .hero-center-content > .hero-headline {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.35s;
        }

        .fade-in-active .hero-center-content > .hero-tagline {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.55s;
        }

        .fade-in-active .hero-center-content > .hero-cta-btn {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.75s;
        }

        @media (max-width: 768px) {
          .hero-headline {
            font-size: 2rem;
            line-height: 1.2;
          }
          .hero-tagline {
            font-size: 0.9rem;
          }
          .hero-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </header>
  );
}
