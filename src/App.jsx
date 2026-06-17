import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import EntryAnimation from './components/EntryAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CylinderScroll from './components/CylinderScroll';
import Booking from './components/Booking';
import Brands from './components/Brands';
import Footer from './components/Footer';
import Auth from './components/Auth';

function MainAppLayout() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authAlertMessage, setAuthAlertMessage] = useState('');
  const [preselectedServiceId, setPreselectedServiceId] = useState(null);

  const handleAuthRequired = (message) => {
    setAuthAlertMessage(message);
    setAuthModalOpen(true);
  };

  const handleSelectService = (serviceId) => {
    setPreselectedServiceId(serviceId);
  };

  const handleAuthTrigger = () => {
    setAuthAlertMessage('');
    setAuthModalOpen(true);
  };

  return (
    <div className="app-root-container">
      {/* Ambient background glows */}
      <div className="app-ambient-glow ambient-glow-1"></div>
      <div className="app-ambient-glow ambient-glow-2"></div>
      <div className="app-ambient-glow ambient-glow-3"></div>

      {/* 1. Cinematic Entry Animation */}
      {showAnimation && (
        <EntryAnimation onComplete={() => setShowAnimation(false)} />
      )}

      {/* 2. Main Page Layout (fades in once loaded, but stays structured) */}
      <div className={`main-website-wrapper ${!showAnimation ? 'fade-in-active' : 'hidden-layout'}`}>
        
        {/* Floating Glass Navbar */}
        <Navbar onAuthClick={handleAuthTrigger} />

        {/* Hero Section */}
        <Hero />

        {/* About Us & Paint Protection Section */}
        <About />

        {/* Services Showcase Grid */}
        <Services onSelectService={handleSelectService} />

        {/* 3D Cylinder Scroll Carousel */}
        <CylinderScroll />

        {/* Interactive Slots Booking Panel */}
        <Booking 
          preselectedServiceId={preselectedServiceId}
          onClearPreselectedService={() => setPreselectedServiceId(null)}
          onAuthRequired={handleAuthRequired}
        />

        {/* Brands & User Reviews Section */}
        <Brands />

        {/* Localized Footer Map & Info */}
        <Footer />

        {/* Sliding Firebase Auth Portal */}
        <Auth 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          messageAlert={authAlertMessage}
        />

      </div>

      <style>{`
        .app-root-container {
          min-height: 100vh;
          background-color: #050508;
          position: relative;
          overflow: hidden;
        }

        .app-ambient-glow {
          position: fixed;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          filter: blur(150px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.1;
          animation: ambientFloatKey 25s ease-in-out infinite alternate;
        }

        .ambient-glow-1 {
          background: radial-gradient(circle, #8B5CF6 0%, transparent 70%);
          top: -10%;
          left: -15%;
        }

        .ambient-glow-2 {
          background: radial-gradient(circle, #EAB308 0%, transparent 70%);
          top: 35%;
          right: -15%;
          animation-delay: -5s;
          animation-duration: 30s;
        }

        .ambient-glow-3 {
          background: radial-gradient(circle, #78350f 0%, transparent 70%);
          bottom: -15%;
          left: 10%;
          animation-delay: -10s;
          animation-duration: 20s;
        }

        @keyframes ambientFloatKey {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6%, 4%) scale(1.08); }
          100% { transform: translate(-4%, -6%) scale(0.96); }
        }

        .main-website-wrapper {
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 5;
        }

        .main-website-wrapper.fade-in-active {
          opacity: 1;
        }

        .hidden-layout {
          height: 100vh;
          overflow: hidden;
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppLayout />
    </AuthProvider>
  );
}
