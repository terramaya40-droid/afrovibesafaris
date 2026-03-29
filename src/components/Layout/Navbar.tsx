import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import type { UserType } from '../../store/useStore';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { userType, setUserType, isMobileMenuOpen, setIsMobileMenuOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  
  const isHeroPage = location.pathname === '/' || location.pathname === '/testimonials';
  const shouldBeSolid = !isHeroPage || isScrolled;

  return (
    <nav className={`navbar ${shouldBeSolid ? 'nav-scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <img src="/logo.jpg" alt="AfriVibe Safaris Logo" className="logo-img" />
          <span className="logo-text">AfriVibe <span className="text-secondary">Safaris</span></span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/destinations" className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}>Destinations</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
          <Link to="/wellness" className={`nav-link ${isActive('/wellness') ? 'active' : ''}`}>Wellness</Link>
          <Link to="/travel-services" className={`nav-link ${isActive('/travel-services') ? 'active' : ''}`}>Services</Link>
          <Link to="/trip-planner" className={`nav-link ${isActive('/trip-planner') ? 'active' : ''}`}>Trip Planner</Link>
          <Link to="/virtual-safari" className={`nav-link ${isActive('/virtual-safari') ? 'active' : ''}`}>Virtual Safari</Link>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>Blog</Link>
          <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>Gallery</Link>
          
          
          <select 
            value={userType} 
            onChange={(e) => setUserType(e.target.value as UserType)}
            className="user-type-selector"
          >
            <option value="Non-Resident">Non-Resident</option>
            <option value="Resident">Resident</option>
            <option value="Citizen">Citizen</option>
          </select>
        </div>

        {/* Mobile menu toggle */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/destinations" onClick={toggleMenu}>Destinations</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/wellness" onClick={toggleMenu}>Wellness</Link>
          <Link to="/travel-services" onClick={toggleMenu}>Services</Link>
          <Link to="/trip-planner" onClick={toggleMenu}>Trip Planner</Link>
          <Link to="/virtual-safari" onClick={toggleMenu}>Virtual Safari</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/gallery" onClick={toggleMenu}>Gallery</Link>
          <div className="mobile-user-type">
            <label>Pricing For:</label>
            <select 
              value={userType} 
              onChange={(e) => setUserType(e.target.value as UserType)}
              className="user-type-selector"
            >
              <option value="Non-Resident">Non-Resident</option>
              <option value="Resident">Resident</option>
              <option value="Citizen">Citizen</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
