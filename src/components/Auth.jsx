import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Sparkles, LogIn, AlertCircle } from 'lucide-react';

export default function Auth({ isOpen, onClose, messageAlert }) {
  const { loginWithEmail, signupWithEmail, loginWithGoogle, isMock } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!email || !password || (isSignUp && !name)) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await signupWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
      onClose(); // Close modal on success
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check details.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay-backdrop">
      <div className="auth-modal-card glass-card">
        
        {/* Close Button */}
        <button className="auth-close-btn" onClick={onClose} disabled={loading}>
          <X size={20} />
        </button>

        {/* Dynamic Auth Gated Alert Message */}
        {messageAlert && (
          <div className="auth-gate-alert">
            <AlertCircle size={16} />
            <span>{messageAlert}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <Sparkles className="logo-sparkle" />
            <h2>{isSignUp ? 'JOIN THE SHINE CLUB' : 'WELCOME BACK'}</h2>
          </div>
          <p className="auth-subtitle">
            {isSignUp ? 'Create a profile to book premium detailing slots.' : 'Sign in to access your dashboard & schedules.'}
          </p>
        </div>

        {/* Developer Mock Warning Info */}
        {isMock && (
          <div className="mock-auth-badge">
            ⚡ Simulated Sandbox Auth Active (No credentials required)
          </div>
        )}

        {/* Error Message Box */}
        {error && (
          <div className="auth-error-box">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="Alex Rider"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="rider@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn glow-btn" disabled={loading}>
            {loading ? 'Processing...' : (
              <>
                <LogIn size={18} /> {isSignUp ? 'Create Account' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">OR CONTINUE WITH</span>
          <div className="divider-line"></div>
        </div>

        {/* Google sign-in */}
        <button 
          onClick={handleGoogleSignIn} 
          className="google-signin-btn" 
          disabled={loading}
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.7 0 3.2.58 4.4 1.71l3.28-3.28C17.7 1.58 15 .75 12 .75 7.37.75 3.39 3.42 1.48 7.3l3.88 3c.92-2.74 3.48-4.26 6.64-4.26z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.47-1.11 2.72-2.35 3.56l3.66 2.84c2.14-1.98 3.74-4.88 3.74-8.56z"
            />
            <path
              fill="#FBBC05"
              d="M5.36 14.7c-.24-.7-.38-1.46-.38-2.25s.14-1.55.38-2.25L1.48 7.2C.54 9.09 0 11.2 0 13.45c0 2.25.54 4.36 1.48 6.25l3.88-3z"
            />
            <path
              fill="#34A853"
              d="M12 23.25c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.02.68-2.33 1.09-4.3 1.09-3.16 0-5.72-1.52-6.64-4.26L1.48 17.3c1.91 3.88 5.89 6.55 10.52 6.55z"
            />
          </svg>
          Google Account
        </button>

        {/* Toggle Footer */}
        <div className="auth-footer-toggle">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <span onClick={() => setIsSignUp(false)}>Sign In</span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span onClick={() => setIsSignUp(true)}>Sign Up</span>
            </>
          )}
        </div>

      </div>

      <style>{`
        .auth-overlay-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(5, 5, 8, 0.85);
          backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-modal-card {
          width: 100%;
          max-width: 440px;
          border-radius: 24px;
          padding: 32px;
          position: relative;
          background: #0D0D11;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(234, 179, 8, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          animation: modalReveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalReveal {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .auth-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .auth-close-btn:hover {
          color: var(--text-primary);
          background: rgba(234, 179, 8, 0.1);
          border-color: rgba(234, 179, 8, 0.3);
        }

        .auth-gate-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #F87171;
          padding: 10px 14px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .logo-sparkle {
          color: #EAB308;
          filter: drop-shadow(0 0 5px #F59E0B);
        }

        .auth-logo h2 {
          font-size: 1.4rem;
          letter-spacing: 0.05em;
          background: var(--metallic-silver);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .auth-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .mock-auth-badge {
          background: rgba(234, 179, 8, 0.08);
          border: 1px solid rgba(234, 179, 8, 0.25);
          color: #EAB308;
          font-size: 0.75rem;
          font-weight: 600;
          text-align: center;
          padding: 6px 12px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .auth-error-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.2);
          color: #F87171;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 0.85rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
        }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
        }

        .input-wrapper input {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
          padding: 12px 16px 12px 42px;
          border-radius: 12px;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition-fast);
        }

        .input-wrapper input:focus {
          border-color: #EAB308;
          background: rgba(234, 179, 8, 0.02);
          box-shadow: 0 0 10px rgba(234, 179, 8, 0.15);
        }

        .auth-submit-btn {
          margin-top: 10px;
          padding: 14px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .auth-divider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 24px 0 16px 0;
        }

        .divider-line {
          flex-grow: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
        }

        .divider-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .google-signin-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .google-signin-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .google-icon {
          width: 18px;
          height: 18px;
        }

        .auth-footer-toggle {
          margin-top: 24px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: center;
        }

        .auth-footer-toggle span {
          color: #EAB308;
          font-weight: 600;
          cursor: pointer;
        }

        .auth-footer-toggle span:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
