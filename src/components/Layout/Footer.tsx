import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Phone, Mail, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer reveal">
      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand reveal">
          <Link to="/" className="footer-logo-link">
            <img src="/logo.jpg" alt="AfriVibe Safaris" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">Authentic African Experiences,<br />Curated With Care</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="TripAdvisor" className="text-sm font-bold px-1">TA</a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-col reveal" style={{ animationDelay: '0.1s' }}>
          <h4>EXPLORE</h4>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/destinations?type=Safari">Safari Packages</Link></li>
            <li><Link to="/destinations?type=Trekking">Trekking</Link></li>
            <li><Link to="/wellness">Experiences</Link></li>
            <li><Link to="/trip-planner">Trip Planner</Link></li>
            <li><Link to="/virtual-safari">Virtual Safari</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col reveal" style={{ animationDelay: '0.2s' }}>
          <h4>COMPANY</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/about#how-it-works">How It Works</Link></li>
            <li><Link to="/testimonials">Community</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact & Trust */}
        <div className="footer-col reveal" style={{ animationDelay: '0.3s' }}>
          <h4>GET IN TOUCH</h4>
          <ul className="contact-list">
            <li><Phone size={14} /><a href="tel:+254700000000">+254 XXX XXX XXX</a></li>
            <li><Mail size={14} /><a href="mailto:info@afrovibesafaris.com">info@afrovibesafaris.com</a></li>
          </ul>
          <a
            href="https://wa.me/254700000000?text=Hello%20AfriVibe%20Safaris!"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-cta-btn mt-xs mb-lg inline-block"
          >
            Chat on WhatsApp
          </a>
          <br />
          <div className="trust-badges-row">
            <span className="trust-badge">IATA Member</span>
            <span className="trust-badge">Eco Certified</span>
            <span className="trust-badge">TripAdvisor 5★</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner text-sm flex-between">
          <p>© {new Date().getFullYear()} AfriVibe Safaris. All rights reserved.</p>
          <div className="footer-flags text-center">
            <span title="Kenya" className="mx-1">🇰🇪</span>
            <span title="Tanzania" className="mx-1">🇹🇿</span>
            <span title="Uganda" className="mx-1">🇺🇬</span>
            <span title="Rwanda" className="mx-1">🇷🇼</span>
            <span title="Zanzibar" className="mx-1">🇹🇿</span>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="mx-2 text-gray-500">|</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
