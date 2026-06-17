import React from 'react';
import logoImg from '../assets/logo.png';

export default function Logo({ width = "100%", height = "auto", className = "" }) {
  return (
    <img 
      src={logoImg} 
      alt="A.S. Shine Wash & Detailing Logo" 
      style={{ width, height, objectFit: 'contain', display: 'block' }} 
      className={className} 
    />
  );
}
