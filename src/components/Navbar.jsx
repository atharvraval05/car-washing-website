import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, LogOut, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onAuthClick }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar-floating">
      <div className="navbar-container">
        
        {/* Left Side: Brand Logo */}
        <div className="navbar-logo" onClick={() => scrollToSection('home')}>
          <Logo width="160px" />
        </div>

        {/* Desktop Links */}
        <ul className="navbar-links">
          <li onClick={() => scrollToSection('home')}>Home</li>
          <li onClick={() => scrollToSection('about')}>About</li>
          <li onClick={() => scrollToSection('services')}>Services</li>
          <li onClick={() => scrollToSection('workflow')}>Workflow</li>
          <li onClick={() => scrollToSection('reviews')}>Reviews</li>
          <li onClick={() => scrollToSection('booking')} className="nav-booking-link">
            <Calendar size={15} /> Book Slot
          </li>
        </ul>

        {/* Right Side: Auth Action */}
        <div className="navbar-auth-action">
          {user ? (
            <div className="profile-capsule">
              <img 
                src={user.photoURL} 
                alt={user.displayName} 
                className="profile-avatar" 
              />
              <span className="profile-name">{user.displayName}</span>
              <button onClick={logout} className="logout-btn" title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="signin-btn-glow" onClick={onAuthClick}>
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          <li onClick={() => scrollToSection('home')}>Home</li>
          <li onClick={() => scrollToSection('about')}>About</li>
          <li onClick={() => scrollToSection('services')}>Services</li>
          <li onClick={() => scrollToSection('workflow')}>Workflow</li>
          <li onClick={() => scrollToSection('reviews')}>Reviews</li>
          <li onClick={() => scrollToSection('booking')}>Book Slot</li>
          <li className="mobile-auth-li">
            {user ? (
              <div className="mobile-profile-wrapper">
                <div className="mobile-profile-info">
                  <img src={user.photoURL} alt={user.displayName} />
                  <span>{user.displayName}</span>
                </div>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="mobile-logout-btn">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <button 
                className="signin-btn-glow mobile-w-full" 
                onClick={() => { onAuthClick(); setMobileMenuOpen(false); }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>

      <style>{`
        .navbar-floating {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          height: 64px;
          z-index: 1000;
          background: rgba(13, 13, 17, 0.45);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 32px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }

        .navbar-floating:hover {
          border-color: rgba(234, 179, 8, 0.25);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 15px rgba(234, 179, 8, 0.05);
        }

        .navbar-container {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .logo-icon-glow {
          color: #00D2FF;
          filter: drop-shadow(0 0 5px #1A8CFF);
          animation: logoRotate 6s linear infinite;
        }

        .logo-text {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 32px;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .navbar-links li {
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .navbar-links li:hover {
          color: #EAB308;
          text-shadow: 0 0 8px rgba(234, 179, 8, 0.4);
        }

        .nav-booking-link {
          color: var(--text-primary);
          padding: 4px 12px;
          border-radius: 12px;
          background: rgba(234, 179, 8, 0.08);
          border: 1px solid rgba(234, 179, 8, 0.2);
        }

        .nav-booking-link:hover {
          background: rgba(234, 179, 8, 0.15) !important;
          border-color: #EAB308 !important;
        }

        .navbar-auth-action {
          display: flex;
          align-items: center;
        }

        .signin-btn-glow {
          background: var(--blue-gradient);
          color: #050508;
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          transition: var(--transition-smooth);
        }

        .signin-btn-glow:hover {
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.6);
          transform: translateY(-1px);
        }

        .profile-capsule {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 12px;
          border-radius: 24px;
        }

        .profile-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1e1e24;
          border: 1.5px solid #EAB308;
        }

        .profile-name {
          font-size: 0.85rem;
          font-weight: 500;
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-primary);
        }

        .logout-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
          padding: 2px;
        }

        .logout-btn:hover {
          color: #EF4444;
          transform: scale(1.1);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-nav-drawer {
          position: fixed;
          top: -100vh;
          left: 0;
          width: 100vw;
          background: #0D0D11;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 999;
          transition: var(--transition-smooth);
          padding: 96px 24px 32px 24px;
        }

        .mobile-nav-drawer.open {
          top: 0;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          list-style: none;
          font-size: 1.15rem;
          font-weight: 600;
        }

        .mobile-links li {
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
        }

        .mobile-links li:hover {
          color: #EAB308;
        }

        .mobile-auth-li {
          border-bottom: none !important;
          padding-top: 15px !important;
        }

        .mobile-profile-wrapper {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .mobile-profile-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-profile-info img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #EAB308;
        }

        .mobile-logout-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #EF4444;
          font-weight: 600;
          padding: 10px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .mobile-w-full {
          width: 100%;
          padding: 12px;
          text-align: center;
        }

        @keyframes logoRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
          .navbar-auth-action {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
          .navbar-floating {
            width: 92%;
            padding: 0 16px;
          }
        }
      `}</style>
    </nav>
  );
}
