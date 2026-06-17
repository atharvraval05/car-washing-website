import React, { useState } from 'react';
import { 
  Droplets, Sparkles, Compass, Shield, Disc, Wrench, SprayCan, 
  ArrowUpRight, Clock, ShieldCheck, CheckCircle2, ChevronRight 
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

// Import local assets
import workshopImg from '../assets/workshop.jpg';
import workshopAltImg from '../assets/workshop_alt.jpg';
import interiorImg from '../assets/interior_vacuum.jpg';
import dashboardImg from '../assets/dashboard_polish.jpg';

const SERVICES_DATA = [
  {
    id: 'premium_wash',
    title: 'Premium Wash',
    duration: '45 mins',
    description: 'High-pressure wash, dual-bucket hand scrub, deep grime extraction, and micro-fiber dry.',
    icon: Droplets,
    image: workshopImg,
    highlights: [
      'Soft water scratch-free rinse',
      'Dual-bucket grit-guard hand scrub',
      'Full body micro-fiber dry down',
      'Streak-free glass cleaning'
    ]
  },
  {
    id: 'foam_wash',
    title: 'Foam Wash',
    duration: '60 mins',
    description: 'Snow foam wash pre-soak, pH-neutral shampoo, wheel barrel scrubbing, and hydrophobic rinse.',
    icon: Sparkles,
    image: workshopAltImg,
    highlights: [
      'Thick clinging snow foam pre-soak',
      'pH-neutral safe shampoo treatment',
      'Underbody mud & grime blast',
      'Hydrophobic coating rinse protection'
    ]
  },
  {
    id: 'interior_cleaning',
    title: 'Interior Cleaning',
    duration: '90 mins',
    description: 'Deep carpet vacuuming, dashboard sanitization, glass cleaning, upholstery stain spot removal.',
    icon: Compass,
    image: interiorImg,
    highlights: [
      'Deep fiber carpet vacuuming',
      'Dashboard, door panels, console scrub',
      'Premium leather conditioning treatment',
      'Odor eliminator & luxury car scent'
    ]
  },
  {
    id: 'dashboard_polish',
    title: 'Dashboard Polish',
    duration: '30 mins',
    description: 'Anti-static matte UV protectant treatment, restoring depth, dust repulsion, and leather scent.',
    icon: Shield,
    image: dashboardImg,
    highlights: [
      'Anti-static dust-repellent coating',
      'UV-blocking solar fading defense',
      'Non-greasy natural satin matte finish',
      'Restores deep vinyl & leather tones'
    ]
  },
  {
    id: 'tyre_polish',
    title: 'Tyre Polish',
    duration: '20 mins',
    description: 'Deep rim cleaning, break dust removal, and application of wet-look black tyre gel.',
    icon: Disc,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=600', // Close up of soapy tyre rim cleaning
    highlights: [
      'Rim iron brake dust extraction',
      'Wheel arch mud scrubbing',
      'Premium wet-look silicone tyre gel',
      'Cracking & dry rot prevention barrier'
    ]
  },
  {
    id: 'chain_clean',
    title: 'Chain Clean',
    duration: '20 mins',
    description: 'Heavy degreasing of drive chains (bikes), removal of accumulated gunk and metal dust.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600', // Focused bike chain and sprockets
    highlights: [
      'High-pressure grit removal',
      'O-ring / X-ring safe deep solvent clean',
      'Sprocket teeth gunk scraping',
      'Prepares surface for chain spray bonding'
    ]
  },
  {
    id: 'chain_spray',
    title: 'Chain Spray',
    duration: '10 mins',
    description: 'High-performance synthetic chain lube application to reduce friction and rust.',
    icon: SprayCan,
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600', // Motorcycle drive gears and chains closeup
    highlights: [
      'Synthetic high-speed anti-fling lube',
      'Drastically reduces link friction',
      'Waterproof rust & corrosion shield',
      'Prolongs sprocket and chain life'
    ]
  }
];

export default function Services({ onSelectService }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleServiceSelect = (id) => {
    if (onSelectService) {
      onSelectService(id);
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeService = SERVICES_DATA[activeTab];
  const IconComp = activeService.icon;

  return (
    <section className="services-section" id="services">
      {/* Background color glows */}
      <div className="services-bg-glow"></div>

      <RevealOnScroll>
        <div className="services-header">
          <span className="services-tag text-gradient-blue">OUR SPECIALTIES</span>
          <h2 className="services-title">ELITE WASH & TREATMENT</h2>
          <p className="services-subtitle">
            Explore our price-free bespoke treatment catalog. Select an option to configure in your booking terminal.
          </p>
        </div>
      </RevealOnScroll>

      {/* Unorthodox Interactive Split Portal */}
      <div className="services-portal">
        {/* Left column: High-Tech Navigation Tabs */}
        <div className="services-tabs-panel">
          {SERVICES_DATA.map((service, index) => {
            const TabIcon = service.icon;
            return (
              <button
                key={service.id}
                className={`service-tab-btn ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <div className="tab-btn-content">
                  <TabIcon size={18} className="tab-icon" />
                  <span className="tab-title">{service.title}</span>
                </div>
                <ChevronRight size={16} className="tab-chevron" />
              </button>
            );
          })}
        </div>

        {/* Right column: Large Detailed Showcase Board */}
        <div className="services-detail-board glass-card">
          <div className="board-image-panel">
            <img 
              src={activeService.image} 
              alt={activeService.title} 
              className="board-main-img" 
            />
            <div className="board-img-overlay"></div>
            <div className="board-duration-badge">
              <Clock size={14} /> {activeService.duration}
            </div>
          </div>

          <div className="board-info-panel">
            <div className="board-info-header">
              <div className="board-icon-badge">
                <IconComp size={22} />
              </div>
              <h3 className="board-title-text">{activeService.title}</h3>
            </div>
            
            <p className="board-description">{activeService.description}</p>
            
            <div className="board-divider"></div>
            
            <h4 className="highlights-header">Includes Detailing Specs:</h4>
            <ul className="board-highlights-list">
              {activeService.highlights.map((highlight, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} color="#EAB308" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <button 
              className="board-action-btn glow-btn"
              onClick={() => handleServiceSelect(activeService.id)}
            >
              Configure Service in Terminal <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .services-section {
          position: relative;
          width: 100%;
          padding: 120px 6%;
          background: #0D0D11;
          overflow: hidden;
          z-index: 10;
        }

        .services-bg-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(234, 179, 8, 0.04) 0%, transparent 70%);
          filter: blur(120px);
          pointer-events: none;
          z-index: 1;
        }

        .services-header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 5;
        }

        .services-tag {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }

        .services-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }

        .services-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.5;
        }

        /* Unorthodox Portal Layout */
        .services-portal {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 40px;
          align-items: start;
          position: relative;
          z-index: 5;
        }

        /* Tabs list styling */
        .services-tabs-panel {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .service-tab-btn {
          width: 100%;
          background: rgba(19, 19, 26, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-tab-btn:hover {
          background: rgba(19, 19, 26, 0.8);
          border-color: rgba(234, 179, 8, 0.2);
          transform: translateX(6px);
          color: var(--text-primary);
        }

        .service-tab-btn.active {
          background: rgba(234, 179, 8, 0.08);
          border-color: #EAB308;
          color: #EAB308;
          box-shadow: 0 4px 20px rgba(234, 179, 8, 0.15);
        }

        .tab-btn-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .tab-icon {
          transition: transform 0.4s;
        }

        .service-tab-btn.active .tab-icon {
          transform: scale(1.15);
          filter: drop-shadow(0 0 5px #EAB308);
        }

        .tab-title {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
        }

        .tab-chevron {
          opacity: 0.3;
          transition: all 0.4s;
        }

        .service-tab-btn:hover .tab-chevron, 
        .service-tab-btn.active .tab-chevron {
          opacity: 1;
          transform: translateX(4px);
        }

        /* Detail board styling */
        .services-detail-board {
          background: rgba(19, 19, 26, 0.7);
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          display: flex;
          flex-direction: column;
        }

        .board-image-panel {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
        }

        .board-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: boardImgBreathe 12s ease-in-out infinite;
        }

        @keyframes boardImgBreathe {
          0%, 100% { transform: scale(1.0); }
          50% { transform: scale(1.05); }
        }

        .board-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 30%, rgba(19, 19, 26, 0.98) 100%);
        }

        .board-duration-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(13, 13, 17, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .board-info-panel {
          padding: 40px;
          background: rgba(19, 19, 26, 0.95);
        }

        .board-info-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .board-icon-badge {
          width: 46px;
          height: 46px;
          background: var(--blue-gradient);
          color: #050508;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(234, 179, 8, 0.35);
        }

        .board-title-text {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .board-description {
          font-size: 1.02rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .board-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin-bottom: 24px;
        }

        .highlights-header {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .board-highlights-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 32px;
        }

        .board-highlights-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .board-action-btn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (max-width: 1024px) {
          .services-portal {
            grid-template-columns: 1fr;
          }
          .services-tabs-panel {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 10px;
            scroll-snap-type: x mandatory;
          }
          .service-tab-btn {
            flex-shrink: 0;
            width: auto;
            scroll-snap-align: start;
          }
          .tab-chevron {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .services-title {
            font-size: 2.2rem;
          }
          .board-highlights-list {
            grid-template-columns: 1fr;
          }
          .board-info-panel {
            padding: 24px;
          }
          .board-title-text {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .services-section {
            padding: 80px 4%;
          }
          .services-title {
            font-size: 1.8rem;
          }
          .board-info-panel {
            padding: 20px 16px;
          }
          .board-title-text {
            font-size: 1.3rem;
          }
          .service-tab-btn {
            padding: 12px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
