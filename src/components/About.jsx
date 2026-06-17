import React, { useState, useEffect } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Shield, Sparkles, Award, AlertTriangle, ShieldCheck } from 'lucide-react';

// Import local assets
import bgBanner from '../assets/bg_banner.jpg';
import infographic from '../assets/infographic.jpg';

const HAZARDS_DATA = [
  {
    id: 'sap',
    name: '🌳 Tree Sap',
    desc: 'Sticky organic acids bake under Pune sun, creating permanent paint craters.',
    shield: 'Silica-ceramic coatings prevent bonding, letting sticky sap slide off with a light wipe.',
    color: '#F59E0B'
  },
  {
    id: 'birds',
    name: '🐦 Bird Droppings',
    desc: 'Corrosive uric compounds etch and corrode clear coats within hours of contact.',
    shield: 'A hydrophobic seal blocks acid absorption, preventing deep chemical etching.',
    color: '#EF4444'
  },
  {
    id: 'fallout',
    name: '🏭 Industrial Fallout',
    desc: 'Floating iron particles and brake dust embed in clear coat, creating micro-rust.',
    shield: 'Clay bar processes and chemical iron-decontaminants extract embedded particulates.',
    color: '#8B5CF6'
  },
  {
    id: 'road_debris',
    name: '🪨 Road Debris',
    desc: 'Loose gravel and stone chips flung by highway traffic chip clear coats and expose metal.',
    shield: 'Thick silica coatings absorb impact friction, deflecting minor stones and gravel scratches.',
    color: '#64748B'
  },
  {
    id: 'wash',
    name: '☀️ Weathering & Dust',
    desc: 'Abrasive Pune road grit grinds paint during standard washes, leaving swirl marks.',
    shield: 'Our soft-water pre-wash snow foam lifts dirt off the clear coat before sponges touch it.',
    color: '#EC4899'
  },
  {
    id: 'uv',
    name: '🕶️ UV Rays',
    desc: 'Solar radiation breaks down paint pigment, causing fading and chalky oxidation.',
    shield: 'UV-blocking silica barriers reflect solar rays, preserving deep showroom gloss.',
    color: '#FBBF24'
  }
];

export default function About() {
  const [activeHazard, setActiveHazard] = useState(0);
  const [deflecting, setDeflecting] = useState(false);

  // Trigger shield deflection flash when active hazard changes
  useEffect(() => {
    setDeflecting(true);
    const timer = setTimeout(() => setDeflecting(false), 900);
    return () => clearTimeout(timer);
  }, [activeHazard]);

  return (
    <section className="about-section" id="about">
      {/* Dynamic Background Glow Blobs for Color */}
      <div className="about-bg-glow glow-1"></div>
      <div className="about-bg-glow glow-2"></div>
      
      {/* 1. Unorthodox Asymmetrical About Us Layout */}
      <div className="about-container">
        <div className="about-grid">
          
          {/* Left Column: Story (Tilted & Glassmorphic) */}
          <RevealOnScroll>
            <div className="about-unorthodox-card glass-card">
              <div className="unorthodox-skew-accent"></div>
              <span className="about-tag text-gradient-blue">WHO WE ARE</span>
              <h2 className="about-title">PUNE'S ELITE PAINT RESTORATION WORKSHOP</h2>
              <p className="about-story">
                Founded by detailing specialist Aniket, <strong>A.S. Shine</strong> was established to fill a major gap in the Pune automotive scene: high-end, zero-compromise detailing that treats every car like a supercar.
              </p>
              
              <div className="about-features">
                <div className="feature-row">
                  <div className="feature-icon-wrapper">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4>Certified Detailing Experts</h4>
                    <p>Certified paint correction masters applying high-grade ceramic coatings.</p>
                  </div>
                </div>

                <div className="feature-row">
                  <div className="feature-icon-wrapper">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4>Advanced Hydro-Foam Tech</h4>
                    <p>We use filtered, soft water and pH-neutral snow shampoos to prevent swirl marks.</p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Visual Board (Floating overlap with custom rotation) */}
          <RevealOnScroll delay={150}>
            <div className="about-image-wrapper unorthodox-image-layout">
              <div className="about-glass-border float-image-animation">
                <img 
                  src={bgBanner} 
                  alt="A.S. Shine Washing Centre Board" 
                  className="about-board-img animated-glow-image"
                />
              </div>
              <div className="about-image-glow-behind"></div>
            </div>
          </RevealOnScroll>

        </div>
      </div>

      {/* 2. Protection & Interactive Shield Simulator */}
      <div className="protection-container">
        <div className="protection-grid">
          
          {/* Left Column: Infographic Image (Tilted with shadow) */}
          <RevealOnScroll>
            <div className="infographic-wrapper unorthodox-infographic-layout">
              <div className="infographic-glass-border rotate-image-animation">
                <img 
                  src={infographic} 
                  alt="Car Paint Hazards Infographic" 
                  className="infographic-img animated-glow-image"
                />
              </div>
              <div className="infographic-glow-behind"></div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Explanatory & Interactive Simulator */}
          <RevealOnScroll delay={150}>
            <div className="protection-content interactive-shield-card glass-card">
              <span className="protection-tag text-gradient-blue">PAINT SAFEGUARD</span>
              <h2 className="protection-title">THE 6 THREATS TO YOUR PAINT</h2>
              <p className="protection-desc">
                Your vehicle is constantly assaulted by environmental elements that slowly eat away at the clear coat. Hover or click below to test the A.S. Shine Protective Shield.
              </p>

              {/* Hazard Selection Pills */}
              <div className="hazards-list-unorthodox">
                {HAZARDS_DATA.map((hazard, index) => (
                  <button
                    key={hazard.id}
                    className={`hazard-pill-interactive ${activeHazard === index ? 'active' : ''}`}
                    style={{ 
                      '--pill-color': hazard.color,
                      '--pill-bg': `${hazard.color}15`,
                      '--pill-border': `${hazard.color}40`
                    }}
                    onMouseEnter={() => setActiveHazard(index)}
                    onClick={() => setActiveHazard(index)}
                  >
                    {hazard.name}
                  </button>
                ))}
              </div>

              {/* Interactive SVG force field simulator */}
              <div className="shield-simulator-console">
                <div className="console-hud">
                  <span className="hud-light animate-hud"></span>
                  <span className="hud-title">SHIELD STATUS: ACTIVE</span>
                </div>
                
                <div className="simulator-stage">
                  {/* Car SVG Wireframe */}
                  <svg viewBox="0 0 240 100" className="simulator-car-svg">
                    <defs>
                      <linearGradient id="carGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#78350f" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#b45309" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    {/* Car outline */}
                    <path 
                      d="M20 70 L40 70 A 15 15 0 0 1 70 70 L170 70 A 15 15 0 0 1 200 70 L220 70 C 228 70 228 65 220 62 L200 55 L160 35 L90 35 C 75 35 65 38 52 48 L22 L58 C 15 60 15 70 20 70 Z" 
                      fill="url(#carGlow)" 
                      stroke="#d97706" 
                      strokeWidth="1.5"
                      className="car-wireframe-path"
                    />
                    <circle cx="55" cy="70" r="10" fill="#0D0D11" stroke="#d97706" strokeWidth="2"/>
                    <circle cx="185" cy="70" r="10" fill="#0D0D11" stroke="#d97706" strokeWidth="2"/>
                    
                    {/* Force field shield arch */}
                    <path
                      d="M 10,75 A 110,110 0 0,1 230,75"
                      fill="none"
                      stroke={deflecting ? '#EAB308' : 'rgba(234, 179, 8, 0.35)'}
                      strokeWidth={deflecting ? '5' : '2'}
                      className={`shield-forcefield ${deflecting ? 'pulse-shield' : ''}`}
                      style={{ 
                        filter: deflecting ? 'drop-shadow(0 0 12px #EAB308)' : 'none',
                        transition: 'stroke-width 0.2s, stroke 0.2s'
                      }}
                    />

                    {/* Hazard projectile particle */}
                    {deflecting && (
                      <circle
                        cx="120"
                        cy="22"
                        r="5"
                        fill={HAZARDS_DATA[activeHazard].color}
                        className="hazard-projectile"
                        style={{
                          filter: `drop-shadow(0 0 6px ${HAZARDS_DATA[activeHazard].color})`
                        }}
                      />
                    )}

                    {/* Deflection splash sparks */}
                    {deflecting && (
                      <g className="deflection-sparks">
                        <line x1="120" y1="22" x2="105" y2="10" stroke="#EAB308" strokeWidth="1.5" />
                        <line x1="120" y1="22" x2="135" y2="10" stroke="#EAB308" strokeWidth="1.5" />
                        <line x1="120" y1="22" x2="120" y2="2" stroke="#EAB308" strokeWidth="1.5" />
                      </g>
                    )}
                  </svg>
                </div>

                {/* HUD detailing output box */}
                <div className="hud-details-box">
                  <div className="hud-row">
                    <span className="hud-label"><AlertTriangle size={14} color="#EAB308" /> HAZARD:</span>
                    <span className="hud-value" style={{ color: '#EAB308' }}>{HAZARDS_DATA[activeHazard].name}</span>
                  </div>
                  <p className="hud-desc">{HAZARDS_DATA[activeHazard].desc}</p>
                  
                  <div className="hud-divider"></div>

                  <div className="hud-row">
                    <span className="hud-label"><ShieldCheck size={14} color="#EAB308" /> SHIELD DEFENSE:</span>
                    <span className="hud-value text-gradient-blue">A.S. Shine Polymer Armor</span>
                  </div>
                  <p className="hud-desc">{HAZARDS_DATA[activeHazard].shield}</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>

      <style>{`
        .about-section {
          position: relative;
          width: 100%;
          padding: 120px 6% 100px 6%;
          background: #09090D;
          overflow: hidden;
          z-index: 10;
        }

        /* Color infusion mesh gradients */
        .about-bg-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          opacity: 0.15;
          z-index: 1;
        }
        
        .about-bg-glow.glow-1 {
          top: 10%;
          left: -10%;
          background: radial-gradient(circle, #8B5CF6 0%, transparent 70%);
        }

        .about-bg-glow.glow-2 {
          bottom: 15%;
          right: -10%;
          background: radial-gradient(circle, #EAB308 0%, transparent 70%);
        }

        .about-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto 140px auto;
          position: relative;
          z-index: 5;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        /* Unorthodox Zooming Story Card (No Tilt) */
        .about-unorthodox-card {
          position: relative;
          border-radius: 24px;
          padding: 45px 40px;
          background: rgba(19, 19, 26, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transform: scale(0.98);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s;
        }

        .about-unorthodox-card:hover {
          transform: scale(1.02);
          border-color: rgba(234, 179, 8, 0.35);
          box-shadow: 0 15px 35px rgba(234, 179, 8, 0.1);
        }

        .unorthodox-skew-accent {
          position: absolute;
          top: -2px;
          left: 40px;
          width: 120px;
          height: 4px;
          background: var(--blue-gradient);
          box-shadow: 0 0 10px #EAB308;
          border-radius: 2px;
        }

        .about-tag, .protection-tag {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
          display: block;
        }

        .about-title, .protection-title {
          font-size: 2.6rem;
          font-weight: 800;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
          line-height: 1.15;
        }

        .about-story, .protection-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 30px;
        }

        .about-features {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .feature-icon-wrapper {
          width: 42px;
          height: 42px;
          background: rgba(234, 179, 8, 0.08);
          border: 1px solid rgba(234, 179, 8, 0.25);
          color: #EAB308;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(234, 179, 8, 0.15);
        }

        .feature-row h4 {
          font-size: 1.05rem;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .feature-row p {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        /* Image layouts and custom animations */
        .unorthodox-image-layout {
          position: relative;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .unorthodox-image-layout:hover {
          transform: translateY(-8px);
        }

        .float-image-animation {
          animation: floatImgKey 6s ease-in-out infinite;
        }

        @keyframes floatImgKey {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        .about-glass-border, .infographic-glass-border {
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
          position: relative;
          z-index: 2;
          transition: border-color 0.4s, box-shadow 0.4s;
        }

        .about-glass-border::after, .infographic-glass-border::after {
          content: '';
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-25deg);
          transition: 0.75s;
          z-index: 5;
          pointer-events: none;
        }

        .about-glass-border:hover::after, .infographic-glass-border:hover::after {
          left: 125%;
        }

        .about-glass-border:hover, .infographic-glass-border:hover {
          border-color: rgba(234, 179, 8, 0.45);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(234, 179, 8, 0.2);
        }

        .about-board-img, .infographic-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.8s ease, filter 0.8s ease;
        }

        .animated-glow-image:hover {
          transform: scale(1.04);
          filter: brightness(1.08);
        }

        .about-image-glow-behind, .infographic-glow-behind {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 15px;
          left: 15px;
          border-radius: 24px;
          border: 1.5px dashed rgba(234, 179, 8, 0.25);
          pointer-events: none;
          z-index: 1;
        }

        /* Protection and Infographic structure */
        .protection-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        .protection-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 60px;
          align-items: center;
        }

        .unorthodox-infographic-layout {
          position: relative;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .unorthodox-infographic-layout:hover {
          transform: translateY(-8px);
        }

        .rotate-image-animation {
          animation: floatImgKey 8s ease-in-out infinite;
        }

        /* Interactive Simulator Card */
        .interactive-shield-card {
          border-radius: 24px;
          padding: 40px;
          background: rgba(19, 19, 26, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }

        .hazards-list-unorthodox {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 30px;
        }

        .hazard-pill-interactive {
          background: var(--pill-bg);
          border: 1px solid var(--pill-border);
          color: var(--pill-color);
          padding: 10px 8px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
        }

        .hazard-pill-interactive:hover, .hazard-pill-interactive.active {
          background: var(--pill-color);
          color: #050508;
          border-color: transparent;
          box-shadow: 0 0 15px var(--pill-color);
          transform: translateY(-2px);
        }

        /* HUD Simulator Stage */
        .shield-simulator-console {
          border-radius: 16px;
          background: #09090D;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
        }

        .console-hud {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
        }

        .hud-light {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #EAB308;
          box-shadow: 0 0 8px #EAB308;
        }

        .hud-light.animate-hud {
          animation: hudPulse 1.5s infinite;
        }

        @keyframes hudPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .hud-title {
          font-size: 0.75rem;
          font-family: var(--font-display);
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .simulator-stage {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 10px;
          margin-bottom: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .simulator-car-svg {
          width: 100%;
          max-width: 280px;
          height: auto;
          overflow: visible;
        }

        .car-wireframe-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 0;
          animation: wireframeDraw 4s linear infinite;
        }

        @keyframes wireframeDraw {
          0% { stroke-dashoffset: 800; }
          100% { stroke-dashoffset: 0; }
        }

        .shield-forcefield {
          stroke-dasharray: 8;
          animation: forcefieldSpin 15s linear infinite;
        }

        @keyframes forcefieldSpin {
          to { stroke-dashoffset: -160; }
        }

        .pulse-shield {
          animation: shieldFlash 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes shieldFlash {
          0% { stroke: #EAB308; stroke-width: 6; }
          30% { stroke: #FFF; stroke-width: 8; }
          100% { stroke: rgba(234, 179, 8, 0.35); stroke-width: 2; }
        }

        .hazard-projectile {
          animation: projectileFly 0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
        }

        @keyframes projectileFly {
          0% { cx: 200; cy: -10; opacity: 1; }
          95% { opacity: 1; }
          100% { cx: 120; cy: 22; opacity: 0; }
        }

        .deflection-sparks g, .deflection-sparks line {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: sparkBurst 0.3s 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes sparkBurst {
          to { stroke-dashoffset: 0; }
        }

        /* HUD description styles */
        .hud-details-box {
          background: rgba(13, 13, 17, 0.8);
          border-radius: 8px;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .hud-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .hud-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .hud-value {
          font-size: 0.85rem;
          font-weight: 700;
          font-family: var(--font-display);
        }

        .hud-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 10px;
        }

        .hud-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.04);
          margin: 10px 0;
        }

        @media (max-width: 1024px) {
          .about-grid, .protection-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .about-unorthodox-card {
            transform: none !important;
          }
          .unorthodox-image-layout {
            transform: none !important;
            order: 2;
          }
          .unorthodox-infographic-layout {
            transform: none !important;
            order: 2;
          }
        }

        @media (max-width: 768px) {
          .about-title, .protection-title {
            font-size: 2.1rem;
          }
          .hazards-list-unorthodox {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .about-section {
            padding: 80px 4% 60px 4%;
          }
          .about-unorthodox-card {
            padding: 30px 20px;
          }
          .about-title, .protection-title {
            font-size: 1.8rem;
          }
          .hazards-list-unorthodox {
            grid-template-columns: 1fr;
          }
          .interactive-shield-card {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
}
