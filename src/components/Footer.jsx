import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-glow-blur"></div>
      
      <div className="footer-grid">
        
        {/* Left Column: Brand Info */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <Sparkles size={20} className="logo-sparkle" />
            <h3>A.S. SHINE</h3>
          </div>
          <p className="footer-tagline">
            Professional hydro-foam washing, deep machine polishing, and protective coating applications. Bringing Pune vehicles back to showroom grade.
          </p>
          <div className="security-tag">
            <ShieldCheck size={16} />
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>

        {/* Middle Column: Quick Location & Contacts */}
        <div className="footer-contacts-col">
          <h4>LOCATE & REACH US</h4>
          <div className="footer-contacts-list">
            <div className="contact-item">
              <MapPin size={24} className="contact-icon" />
              <div>
                <h5>Workshop Address</h5>
                <p>Nande-Sus Road, near Indian Petrol Pump, Pune.</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <h5>Call Support</h5>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <div>
                <h5>Email Detailing</h5>
                <p>support@asshine.com</p>
              </div>
            </div>

            <div className="contact-item">
              <Clock size={18} className="contact-icon" />
              <div>
                <h5>Business Hours</h5>
                <p>Mon - Sun: 09:00 AM - 08:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Unorthodox Geographic Frame (Custom Dark Map) */}
        <div className="footer-map-col">
          <div className="unorthodox-map-wrapper">
            <div className="map-frame-border">
              {/* Google Maps iframe centered near Nande-Sus Road Pune, filtered in dark theme via CSS */}
              <iframe
                title="A.S. Shine Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15129.805562547144!2d73.7431289!3d18.5525791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2becbe1cfb5c3%3A0xe53c076df3d85bc3!2sNande%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="dark-filtered-map"
              ></iframe>
            </div>
            <div className="map-glow-underlay"></div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} A.S. Shine - Wash & Detailing. All Rights Reserved.</p>
        <p className="developer-tag">Pune Automotive Detailing Hub</p>
      </div>

      <style>{`
        .footer-section {
          position: relative;
          width: 100%;
          background: #050508;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 80px 6% 30px 6%;
          overflow: hidden;
          z-index: 10;
        }

        .footer-glow-blur {
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
        }

        .footer-grid {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .logo-sparkle {
          color: #EAB308;
          filter: drop-shadow(0 0 4px #F59E0B);
        }

        .footer-logo h3 {
          font-size: 1.3rem;
          font-family: var(--font-display);
          letter-spacing: 0.05em;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-tagline {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .security-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(34, 197, 94, 0.06);
          border: 1px solid rgba(34, 197, 94, 0.2);
          color: #4ADE80;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 12px;
        }

        /* Contacts Column */
        .footer-contacts-col h4 {
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .footer-contacts-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .contact-icon {
          color: #F59E0B;
          margin-top: 2px;
          filter: drop-shadow(0 0 3px rgba(234, 179, 8, 0.4));
        }

        .contact-item h5 {
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 3px;
        }

        .contact-item p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Map Column */
        .footer-map-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .unorthodox-map-wrapper {
          position: relative;
          width: 100%;
          height: 240px;
        }

        .map-frame-border {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #000;
          z-index: 2;
          position: relative;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
          /* Unorthodox angled clip path or frame layout */
          clip-path: polygon(0 4%, 100% 0, 100% 96%, 0 100%);
        }

        /* Premium Dark Filter overlay on Standard Google Map */
        .dark-filtered-map {
          filter: invert(90%) hue-rotate(190deg) contrast(1.1) brightness(0.9) saturate(0.6) grayscale(0.85);
          opacity: 0.8;
          transition: var(--transition-smooth);
        }

        .unorthodox-map-wrapper:hover .dark-filtered-map {
          filter: invert(90%) hue-rotate(190deg) contrast(1.15) brightness(0.95) saturate(0.8) grayscale(0.5);
          opacity: 0.95;
        }

        .map-glow-underlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 20px;
          border: 1px dashed rgba(234, 179, 8, 0.25);
          transform: rotate(1.5deg) scale(1.02);
          z-index: 1;
        }

        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 30px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .developer-tag {
          font-weight: 500;
          color: var(--text-secondary);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-map-col {
            grid-column: span 2;
          }
          .unorthodox-map-wrapper {
            height: 280px;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-map-col {
            grid-column: span 1;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
