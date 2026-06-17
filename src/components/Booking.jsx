import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Car, Bike, ShieldAlert, Sparkles, Check, 
  User, Phone, Info, MessageSquareCode
} from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { db, isMock } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const SERVICES_PRESET = [
  { id: 'premium_wash', title: 'Premium Wash', detail: 'High-pressure wash & micro-fiber dry' },
  { id: 'foam_wash', title: 'Foam Wash', detail: 'Snow foam soak & hydrophobic rinse' },
  { id: 'interior_cleaning', title: 'Interior Cleaning', detail: 'Carpet vacuum & glass sanitizer' },
  { id: 'dashboard_polish', title: 'Dashboard Polish', detail: 'UV protectant matte dressing' },
  { id: 'tyre_polish', title: 'Tyre Polish', detail: 'Rim wash & wet-look tyre gel' },
  { id: 'chain_clean', title: 'Chain Clean', detail: 'Drive chain degreasing (bikes)' },
  { id: 'chain_spray', title: 'Chain Spray', detail: 'Synthetic friction lubrication' }
];

export default function Booking({ preselectedServiceId, onClearPreselectedService, onAuthRequired }) {
  const { user } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleType, setVehicleType] = useState('car'); // car, bike, premium
  const [selectedService, setSelectedService] = useState('premium_wash');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto fill name if user logs in
  useEffect(() => {
    if (user && user.displayName) {
      setName(user.displayName);
    }
  }, [user]);

  // Handle service preselection from specialties section
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedService(preselectedServiceId);
      onClearPreselectedService();
      // Scroll to booking section
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedServiceId]);

  const checkAuthGate = () => {
    if (!user) {
      onAuthRequired('Please login or register to book a detailing slot.');
      return false;
    }
    return true;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!checkAuthGate()) return;

    if (!name || !phone || !vehicleModel) {
      alert('Please fill in all details.');
      return;
    }

    setIsSubmitting(true);
    
    const serviceObj = SERVICES_PRESET.find(s => s.id === selectedService) || SERVICES_PRESET[0];

    const payload = {
      appointmentId: 'AS-' + Math.floor(Math.random() * 900000 + 100000),
      userUid: user.uid,
      userEmail: user.email,
      userName: name,
      userPhone: phone,
      vehicle: {
        model: vehicleModel,
        type: vehicleType,
        name: vehicleType === 'car' ? 'Standard Sedan/Hatchback' : vehicleType === 'bike' ? 'Superbike/Cruiser' : 'Premium SUV/Sedan'
      },
      service: {
        id: serviceObj.id,
        title: serviceObj.title
      },
      createdAt: new Date().toISOString()
    };

    console.log("📅 [BOOKING PAYLOAD]:", JSON.stringify(payload, null, 2));

    // Save to Firestore DB
    if (!isMock && db) {
      try {
        await addDoc(collection(db, "appointments"), payload);
        console.log("🔥 Appointment successfully written to Firestore collection.");
      } catch (err) {
        console.error("❌ Firestore save failed:", err);
      }
    }

    // Construct custom WhatsApp Message
    const vehicleLabel = vehicleType === 'car' ? 'Standard Car' : vehicleType === 'bike' ? 'Motorbike' : 'Premium / SUV';
    const msg = `🔥 *A.S. Shine Detail Booking Request* 🔥

👤 *Name*: ${name}
📞 *Phone*: ${phone}
🚗 *Vehicle Model*: ${vehicleModel} (${vehicleLabel})
🛠️ *Service Selected*: ${serviceObj.title}
🆔 *Booking ID*: ${payload.appointmentId}

Please confirm my detailing slot!`;

    // Redirect to WhatsApp
    const waUrl = `https://wa.me/918668966918?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    setIsSubmitting(false);
  };

  return (
    <section className="booking-section" id="booking">
      <div className="booking-glow-blur"></div>
      
      <div className="booking-container">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="booking-header">
            <span className="booking-tag text-gradient-blue">RESERVE A SLOT</span>
            <h2 className="booking-title">BOOK YOUR DETAILING SLOT</h2>
            <p className="booking-subtitle">
              Enter your vehicle details, select your service, and click "Book Slot" to send a direct booking request to A.S. Shine on WhatsApp.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="booking-terminal-wrapper glass-card">
            <form onSubmit={handleBookingSubmit} className="booking-simple-form">
              
              <div className="form-grid-layout">
                
                {/* Left Side Inputs */}
                <div className="form-inputs-group">
                  <div className="input-field-wrapper">
                    <label>Full Name</label>
                    <div className="form-input-container">
                      <User size={18} className="form-input-icon" />
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="input-field-wrapper">
                    <label>Phone Number</label>
                    <div className="form-input-container">
                      <Phone size={18} className="form-input-icon" />
                      <input 
                        type="tel" 
                        placeholder="e.g. +91 9876543210" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="input-field-wrapper">
                    <label>Vehicle Model / Name</label>
                    <div className="form-input-container">
                      <Car size={18} className="form-input-icon" />
                      <input 
                        type="text" 
                        placeholder="e.g. Tata Harrier, KTM Duke 390" 
                        value={vehicleModel} 
                        onChange={(e) => setVehicleModel(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side Selectors */}
                <div className="form-selectors-group">
                  <div className="input-field-wrapper">
                    <label>Vehicle Category</label>
                    <div className="vehicle-class-pills">
                      <button 
                        type="button" 
                        className={`class-pill-btn ${vehicleType === 'bike' ? 'selected' : ''}`}
                        onClick={() => setVehicleType('bike')}
                      >
                        <Bike size={16} /> Motorbike
                      </button>
                      <button 
                        type="button" 
                        className={`class-pill-btn ${vehicleType === 'car' ? 'selected' : ''}`}
                        onClick={() => setVehicleType('car')}
                      >
                        <Car size={16} /> Standard Car
                      </button>
                      <button 
                        type="button" 
                        className={`class-pill-btn ${vehicleType === 'premium' ? 'selected' : ''}`}
                        onClick={() => setVehicleType('premium')}
                      >
                        <Sparkles size={14} /> Premium / SUV
                      </button>
                    </div>
                  </div>

                  <div className="input-field-wrapper">
                    <label>Detailing Service Required</label>
                    <div className="form-select-container">
                      <select 
                        value={selectedService} 
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="service-form-select"
                      >
                        {SERVICES_PRESET.map(srv => (
                          <option key={srv.id} value={srv.id}>
                            {srv.title} — {srv.detail}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="form-submit-footer">
                <button type="submit" className="booking-whatsapp-btn glow-btn" disabled={isSubmitting}>
                  <MessageSquareCode size={18} />
                  {isSubmitting ? 'Processing...' : 'Book Detailing Slot via WhatsApp'}
                </button>
                <div className="booking-info-notice">
                  <Info size={14} />
                  <span>Your booking will open WhatsApp to send slot details directly to A.S. Shine detailing master.</span>
                </div>
              </div>

            </form>
          </div>
        </RevealOnScroll>
        
      </div>

      <style>{`
        .booking-section {
          position: relative;
          width: 100%;
          padding: 100px 6%;
          background: #050508;
          overflow: hidden;
          z-index: 10;
        }

        .booking-glow-blur {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(234, 179, 8, 0.05) 0%, transparent 70%);
          filter: blur(120px);
          pointer-events: none;
          z-index: 1;
        }

        .booking-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .booking-header {
          text-align: center;
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .booking-tag {
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
        }

        .booking-title {
          font-size: 2.8rem;
          font-weight: 800;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 16px;
        }

        .booking-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.5;
        }

        .booking-terminal-wrapper {
          background: rgba(13, 13, 17, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(234, 179, 8, 0.15);
          border-radius: 24px;
          padding: 45px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8),
                      0 0 20px rgba(234, 179, 8, 0.08);
        }

        .booking-simple-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .form-grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .form-inputs-group, .form-selectors-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-field-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-field-wrapper label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input-icon {
          position: absolute;
          left: 16px;
          color: var(--text-muted);
        }

        .form-input-container input {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          padding: 14px 16px 14px 48px;
          border-radius: 12px;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-fast);
        }

        .form-input-container input:focus {
          border-color: #EAB308;
          background: rgba(234, 179, 8, 0.02);
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.15);
        }

        /* Category pills style */
        .vehicle-class-pills {
          display: flex;
          gap: 10px;
        }

        .class-pill-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 14px 10px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: var(--transition-fast);
        }

        .class-pill-btn:hover {
          background: rgba(234, 179, 8, 0.03);
          border-color: rgba(234, 179, 8, 0.2);
        }

        .class-pill-btn.selected {
          background: rgba(234, 179, 8, 0.06);
          border-color: #EAB308;
          color: #EAB308;
          box-shadow: 0 4px 15px rgba(234, 179, 8, 0.15);
        }

        /* Select box styles */
        .form-select-container {
          width: 100%;
        }

        .service-form-select {
          width: 100%;
          background: rgba(13, 13, 17, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          padding: 14px 16px;
          border-radius: 12px;
          font-size: 0.95rem;
          outline: none;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .service-form-select:focus {
          border-color: #EAB308;
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.15);
        }

        /* Footer submit notice */
        .form-submit-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 30px;
          margin-top: 10px;
        }

        .booking-whatsapp-btn {
          width: 100%;
          max-width: 400px;
          padding: 16px;
          border-radius: 14px;
          font-size: 1rem;
          font-family: var(--font-display);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .booking-info-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.8rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .booking-title {
            font-size: 2.2rem;
          }
          .form-grid-layout {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .booking-terminal-wrapper {
            padding: 24px 20px;
            border-radius: 16px;
          }
          .vehicle-class-pills {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .booking-section {
            padding: 80px 4%;
          }
          .booking-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}
