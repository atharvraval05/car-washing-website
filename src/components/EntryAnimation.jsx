import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function EntryAnimation({ onComplete }) {
  const [phase, setPhase] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Phase 1 -> Phase 2: Sweep beam and show silhouette, then reveal logo
    const timer1 = setTimeout(() => {
      setPhase(2);
    }, 2200);

    // Phase 2 -> Phase 3: Logo pulse, then trigger wipe out
    const timer2 = setTimeout(() => {
      setPhase(3);
    }, 4500);

    // Phase 3 -> Complete: Remove from DOM
    const timer3 = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 5300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={`entry-overlay ${phase === 3 ? 'wipe-out' : ''}`}>
      {/* Cinematic ambient background glow */}
      <div className="entry-ambient-glow"></div>
      
      <div className="entry-container">
        
        {/* Phase 1: Silhouette Tracing */}
        <div className={`silhouette-wrapper ${phase >= 2 ? 'fade-out-silh' : ''}`}>
          <svg viewBox="0 0 600 200" className="car-silhouette">
            {/* The Sports Car Silhouette path */}
            <path
              d="M 50 140 
                 C 100 140, 110 115, 135 115 
                 C 160 115, 170 140, 240 140 
                 L 380 140 
                 C 390 115, 415 115, 440 115 
                 C 465 115, 475 140, 520 140 
                 C 550 140, 560 125, 550 100 
                 C 530 70, 480 60, 410 55 
                 C 350 50, 280 52, 220 62 
                 C 150 72, 100 92, 70 108 
                 C 50 118, 45 130, 50 140 Z"
              className="silhouette-path"
            />
            {/* Ground Line */}
            <line x1="20" y1="141" x2="580" y2="141" className="silhouette-ground" />
          </svg>
          {/* Sweeping Beam Overlay */}
          <div className="sweeping-light-beam"></div>
        </div>

        {/* Phase 2: Logo scaling & illuminating */}
        <div className={`logo-reveal-wrapper ${phase >= 2 ? 'visible' : ''}`}>
          <Logo width="300px" />
        </div>

      </div>

      <style>{`
        .entry-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #050508;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.8s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.8s ease;
        }
        
        .entry-overlay.wipe-out {
          transform: translateY(-100%);
          opacity: 0;
        }

        .entry-ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%);
          filter: blur(100px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .entry-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .silhouette-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          transition: opacity 0.6s ease;
        }

        .fade-out-silh {
          opacity: 0.15;
        }

        .car-silhouette {
          width: 100%;
          height: 100%;
        }

        .silhouette-path {
          fill: none;
          stroke: #EAB308;
          stroke-width: 2.5;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawSilhouette 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          filter: drop-shadow(0 0 8px rgba(234, 179, 8, 0.8));
        }

        .silhouette-ground {
          stroke: rgba(234, 179, 8, 0.5);
          stroke-width: 1.5;
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawGround 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .sweeping-light-beam {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 150px;
          background: linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.25), rgba(255, 255, 255, 0.4), rgba(234, 179, 8, 0.25), transparent);
          transform: skewX(-20deg);
          animation: sweepBeam 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
        }

        .logo-reveal-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          width: 100%;
          pointer-events: none;
        }

        .logo-reveal-wrapper.visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .cinematic-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.15em;
          text-align: center;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          animation: titlePulse 2.5s infinite ease-in-out;
        }

        .brand-shine {
          background: linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #EAB308 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.4));
        }

        .sparkle {
          font-size: 2.2rem;
          animation: rotateSparkle 4s linear infinite;
        }

        .cinematic-subtitle {
          font-size: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #EAB308;
          margin-bottom: 12px;
          font-weight: 500;
          text-shadow: 0 0 8px rgba(234, 179, 8, 0.5);
        }

        .cinematic-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #F59E0B, #EAB308, #F59E0B, transparent);
          margin-bottom: 12px;
        }

        .cinematic-sub-hindi {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.25em;
          color: #94A3B8;
        }

        /* Animations */
        @keyframes drawSilhouette {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawGround {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes sweepBeam {
          0% {
            left: -30%;
          }
          100% {
            left: 120%;
          }
        }

        @keyframes titlePulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.2));
          }
          50% {
            transform: scale(1.03);
            filter: drop-shadow(0 0 25px rgba(234, 179, 8, 0.6));
          }
        }

        @keyframes rotateSparkle {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .cinematic-title {
            font-size: 2.2rem;
            letter-spacing: 0.1em;
            gap: 8px;
          }
          .sparkle {
            font-size: 1.5rem;
          }
          .cinematic-subtitle {
            font-size: 0.95rem;
            letter-spacing: 0.3em;
          }
          .cinematic-sub-hindi {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
