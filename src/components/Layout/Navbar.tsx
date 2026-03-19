import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import type { UserType } from '../../store/useStore';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { userType, setUserType } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <img src="/logo.jpg" alt="AfriVibe Safaris Logo" className="logo-img" />
          <span className="logo-text">AfriVibe <span className="text-secondary">Safaris</span></span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/destinations" className="nav-link">Destinations</Link>
          <Link to="/trip-planner" className="nav-link">Trip Planner</Link>
          <Link to="/virtual-safari" className="nav-link">Virtual Safari</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          
          
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
          <Link to="/trip-planner" onClick={toggleMenu}>Trip Planner</Link>
          <Link to="/virtual-safari" onClick={toggleMenu}>Virtual Safari</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
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
