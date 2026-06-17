import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Droplet, Brush, Eye, Layers, Compass } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

const STEPS_DATA = [
  {
    num: '01',
    title: 'Deep Hydro Wash',
    desc: 'pH-neutral double-bucket snow foam pre-soak and scratch-free wash.',
    icon: Droplet,
  },
  {
    num: '02',
    title: 'Clay Bar Care',
    desc: 'Deep decontamination, lifting embedded iron filings and tree sap.',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Paint Correction',
    desc: 'Machine compound polishing to eliminate swirl marks and scratches.',
    icon: Brush,
  },
  {
    num: '04',
    title: 'Ceramic Coating',
    desc: 'Applying a nano-technological silica layer for a hydrophobic shell.',
    icon: Layers,
  },
  {
    num: '05',
    title: 'Cabin Detail',
    desc: 'Premium interior sanitization, leather conditioning, and vacuuming.',
    icon: ShieldCheck,
  },
  {
    num: '06',
    title: 'Gloss Audit',
    desc: 'Final inspection under LED grid lighting for flawless reflection.',
    icon: Eye,
  }
];

export default function CylinderScroll() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [tiltX, setTiltX] = useState(0); // Vertical view angle tilt

  const startXRef = useRef(0);
  const rotationStartRef = useRef(0);

  // Auto-rotation animation loop when not interacting
  useEffect(() => {
    let frameId;
    const animate = () => {
      if (!isDragging && !isHovered) {
        setRotation((prev) => (prev + 0.15) % 360);
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, isHovered]);

  // Mouse Drag Events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    rotationStartRef.current = rotation;
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (isDragging) {
      const deltaX = e.clientX - startXRef.current;
      setRotation(rotationStartRef.current - deltaX * 0.4);
    } else {
      // 3D Parallax Tilt based on cursor position relative to center of stage
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const tiltXVal = -(y / (rect.height / 2)) * 12; // tilt vertical perspective
      setTiltX(tiltXVal);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
    setTiltX(0); // reset tilt
  };

  // Mobile Touch Events
  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      startXRef.current = e.touches[0].clientX;
      rotationStartRef.current = rotation;
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length > 0) {
      const deltaX = e.touches[0].clientX - startXRef.current;
      setRotation(rotationStartRef.current - deltaX * 0.45);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="cylinder-section" id="workflow">
      {/* Background color glow backdrop */}
      <div className="cylinder-bg-glow glow-gold"></div>
      <div className="cylinder-bg-glow glow-violet"></div>

      <RevealOnScroll>
        <div className="cylinder-header">
          <span className="cylinder-tag text-gradient-blue">OUR WORKFLOW</span>
          <h2 className="cylinder-title">6 PHASES OF GLOSS</h2>
          <p className="cylinder-subtitle">
            Click & drag or move your cursor horizontally to rotate the detailing cylinder. Hover to inspect a step.
          </p>
        </div>
      </RevealOnScroll>

      {/* 3D Scene Viewport Container */}
      <div className="scene-container">
        <div 
          className={`cylinder-carousel ${isDragging ? 'grabbing' : ''}`}
          style={{ 
            transform: `rotateX(${tiltX}deg) rotateY(${-rotation}deg)` 
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {STEPS_DATA.map((step, index) => {
            const IconComp = step.icon;
            const angle = index * (360 / STEPS_DATA.length);
            return (
              <div 
                key={step.num}
                className="cylinder-card glass-card"
                style={{ 
                  transform: `rotateY(${angle}deg) translateZ(var(--translate-z))`
                }}
              >
                <div className="card-top">
                  <span className="card-num">{step.num}</span>
                  <IconComp className="card-icon" size={26} />
                </div>
                
                <h4 className="card-title">{step.title}</h4>
                <p className="card-desc">{step.desc}</p>
                <div className="card-glow-bar"></div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .cylinder-section {
          position: relative;
          width: 100%;
          padding: 120px 6% 140px 6%;
          background: #050508;
          overflow: hidden;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Ambient colored background lights */
        .cylinder-bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.1;
          pointer-events: none;
          z-index: 1;
        }

        .cylinder-bg-glow.glow-gold {
          top: -10%;
          right: -10%;
          background: radial-gradient(circle, #EAB308 0%, transparent 70%);
        }

        .cylinder-bg-glow.glow-violet {
          bottom: -10%;
          left: -10%;
          background: radial-gradient(circle, #78350f 0%, transparent 70%);
        }

        .cylinder-header {
          text-align: center;
          margin-bottom: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 5;
        }

        .cylinder-tag {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }

        .cylinder-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }

        .cylinder-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.5;
        }

        /* 3D Scene Viewport container */
        .scene-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 420px;
          perspective: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          --translate-z: 280px; /* Increased cards translation radius slightly */
        }

        /* Rotational Cylinder */
        .cylinder-carousel {
          position: relative;
          width: 220px; /* Increased card width slightly */
          height: 310px; /* Increased card height slightly */
          transform-style: preserve-3d;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          user-select: none;
        }

        .cylinder-carousel.grabbing {
          cursor: grabbing;
          transition: none; /* Instant drag response */
        }

        /* 3D Cylindrical Cards styling */
        .cylinder-card {
          position: absolute;
          width: 220px; /* Increased card width slightly */
          height: 310px; /* Increased card height slightly */
          background: rgba(19, 19, 26, 0.82);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backface-visibility: visible;
          transition: border-color 0.4s, box-shadow 0.4s, background 0.4s;
          pointer-events: auto;
        }

        .cylinder-card:hover {
          border-color: #EAB308;
          background: rgba(24, 24, 34, 0.95);
          box-shadow: 0 0 30px rgba(234, 179, 8, 0.25);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .card-num {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: #EAB308;
          opacity: 0.6;
        }

        .card-icon {
          color: #F59E0B;
          filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4));
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 24px;
        }

        .card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-top: 10px;
          flex-grow: 1;
        }

        .card-glow-bar {
          width: 50px;
          height: 3px;
          background: var(--blue-gradient);
          border-radius: 2px;
          margin-top: 18px;
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.6);
        }

        @media (max-width: 768px) {
          .cylinder-title {
            font-size: 2.2rem;
          }
          .scene-container {
            --translate-z: 200px;
            height: 360px;
          }
          /* Shrink translation radius for mobile screens */
          .cylinder-carousel {
            width: 170px;
            height: 260px;
          }
          .cylinder-card {
            width: 170px;
            height: 260px;
            padding: 18px;
          }
        }

        @media (max-width: 480px) {
          .cylinder-section {
            padding: 80px 4% 100px 4%;
          }
          .cylinder-title {
            font-size: 1.8rem;
          }
          .scene-container {
            --translate-z: 140px;
            height: 280px;
          }
          .cylinder-carousel {
            width: 130px;
            height: 210px;
          }
          .cylinder-card {
            width: 130px;
            height: 210px;
            padding: 12px;
            border-radius: 16px;
          }
          .card-title {
            font-size: 0.95rem;
            margin-top: 10px;
          }
          .card-desc {
            font-size: 0.72rem;
            line-height: 1.35;
            margin-top: 6px;
          }
          .card-num {
            font-size: 1.1rem;
          }
          .card-glow-bar {
            margin-top: 10px;
            width: 30px;
          }
        }
      `}</style>
    </section>
  );
}
