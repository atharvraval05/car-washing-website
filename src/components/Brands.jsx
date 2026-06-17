import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Star, MessageSquareQuote } from 'lucide-react';

const BRANDS_LIST = [
  { name: "Meguiar's", detail: "Premium Wax & Dressings" },
  { name: "3M Automotive", detail: "Pro Paint Protection" },
  { name: "Koch-Chemie", detail: "German Paint Correction" },
  { name: "Chemical Guys", detail: "Snow Foams & Polishes" },
  { name: "Rupes Italy", detail: "Dual-Action Polishers" },
  { name: "Sonax", detail: "Ceramic Sealants" }
];

const REVIEWS_DATA = [
  {
    name: "Amit Deshmukh",
    location: "Hinjewadi, Pune",
    rating: 5,
    text: "My Harrier's paint correction was done flawlessly. The hydrophobic ceramic coat works like magic. Water just beads off immediately. Best detailing center in Pune!",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Amit"
  },
  {
    name: "Saurabh K.",
    location: "Baner, Pune",
    rating: 5,
    text: "Brought my KTM Duke in for a foam wash and chain care. The degreasing, clean, and lubrication spray was super thorough. Quick slots and very reasonable pricing.",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Saurabh"
  },
  {
    name: "Neha Patil",
    location: "Sus Road, Pune",
    rating: 5,
    text: "Excellent interior cleaning and dashboard polish! Every corner of my cabin is spotless, dust-free, and has a premium new-car scent. Will definitely return.",
    avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Neha"
  }
];

export default function Brands() {
  return (
    <section className="brands-reviews-section" id="reviews">
      <div className="brands-reviews-glow"></div>
      
      {/* 1. Brands We Use Section */}
      <div className="brands-container">
        <RevealOnScroll>
          <div className="brands-header">
            <span className="brands-tag text-gradient-blue">PREMIUM PRODUCTS ONLY</span>
            <h3 className="brands-title">WORLD-CLASS BRANDS WE TRUST</h3>
          </div>
        </RevealOnScroll>

        <div className="brands-marquee-viewport">
          <div className="brands-marquee-track">
            {/* Double copy for seamless infinite scrolling */}
            {[...BRANDS_LIST, ...BRANDS_LIST].map((brand, idx) => (
              <div key={`${brand.name}-${idx}`} className="brand-card glass-card">
                <h4>{brand.name}</h4>
                <p>{brand.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Client Testimonials Section */}
      <div className="reviews-container">
        <RevealOnScroll>
          <div className="reviews-header">
            <span className="reviews-tag text-gradient-blue">TESTIMONIALS</span>
            <h2 className="reviews-title">WHAT PUNE IS SAYING</h2>
          </div>
        </RevealOnScroll>

        <div className="reviews-grid">
          {REVIEWS_DATA.map((review, idx) => (
            <RevealOnScroll key={review.name} delay={idx * 100}>
              <div className="glass-card review-card">
                <MessageSquareQuote className="quote-icon" size={32} />
                
                <div className="rating-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>

                <p className="review-text">"{review.text}"</p>

                <div className="review-user-info">
                  <img src={review.avatar} alt={review.name} className="user-avatar" />
                  <div>
                    <h4>{review.name}</h4>
                    <span>{review.location}</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        .brands-reviews-section {
          position: relative;
          width: 100%;
          padding: 80px 6% 120px 6%;
          background: #0D0D11;
          overflow: hidden;
          z-index: 10;
        }

        .brands-reviews-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(234, 179, 8, 0.04) 0%, transparent 70%);
          filter: blur(100px);
          pointer-events: none;
        }

        /* Brands container styles */
        .brands-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto 100px auto;
        }

        .brands-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .brands-tag, .reviews-tag {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
          display: block;
        }

        .brands-title, .reviews-title {
          font-size: 2.2rem;
          font-weight: 800;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brands-marquee-viewport {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 10px 0;
          mask-image: linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%);
        }

        .brands-marquee-track {
          display: flex;
          width: max-content;
          gap: 20px;
          animation: scrollLeftToRight 28s linear infinite;
        }

        .brands-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes scrollLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .brand-card {
          width: 210px;
          flex-shrink: 0;
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: var(--transition-smooth);
        }

        .brand-card:hover {
          border-color: rgba(234, 179, 8, 0.4);
          box-shadow: 0 8px 25px rgba(234, 179, 8, 0.12);
          transform: translateY(-4px);
        }

        .brand-card h4 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .brand-card p {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Reviews container styles */
        .reviews-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .reviews-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .review-card {
          border-radius: 24px;
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          background: var(--bg-card);
        }

        .quote-icon {
          position: absolute;
          top: 24px;
          right: 24px;
          color: rgba(234, 179, 8, 0.08);
          pointer-events: none;
        }

        .rating-stars {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }

        .star-filled {
          color: #F59E0B;
          fill: #F59E0B;
        }

        .review-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 28px;
          flex-grow: 1;
          font-style: italic;
        }

        .review-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 18px;
        }

        .user-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid #EAB308;
          background: #1e1e24;
        }

        .review-user-info h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .review-user-info span {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .reviews-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 480px) {
          .brands-reviews-section {
            padding: 60px 4% 80px 4%;
          }
          .brands-title, .reviews-title {
            font-size: 1.8rem;
          }
          .review-card {
            padding: 24px 20px;
          }
          .review-text {
            font-size: 0.85rem;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
