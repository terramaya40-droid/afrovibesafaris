import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Phone, Mail, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Footer: React.FC = () => {
  const footerRef = useScrollReveal<HTMLElement>(0.1);
  const col1Ref = useScrollReveal<HTMLDivElement>(0.1);
  const col2Ref = useScrollReveal<HTMLDivElement>(0.1);
  const col3Ref = useScrollReveal<HTMLDivElement>(0.1);
  const col4Ref = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <footer className="footer reveal" ref={footerRef}>
      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand reveal" ref={col1Ref}>
          <Link to="/" className="footer-logo-link">
            <img src="/logo.jpg" alt="AfriVibe Safaris" className="footer-logo-img" />
          </Link>
          <p className="footer-tagline">Authentic African Experiences,<br />Curated With Care</p>
          <div className="social-links">
            <a href="https://instagram.com/afrovibesafaris" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://facebook.com/afrovibesafaris" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="TripAdvisor" className="text-sm font-bold px-1">TA</a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-col reveal" ref={col2Ref} style={{ transitionDelay: '0.1s' }}>
          <h4>EXPLORE</h4>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/destinations">Safari Packages</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/trip-planner">Book Now</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col reveal" ref={col3Ref} style={{ transitionDelay: '0.2s' }}>
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
        <div className="footer-col reveal" ref={col4Ref} style={{ transitionDelay: '0.3s' }}>
          <h4>GET IN TOUCH</h4>
          <ul className="contact-list">
            <li><Phone size={14} /><a href="tel:+254742009497">+254 742 009 497</a></li>
            <li><Mail size={14} /><a href="mailto:info@afrivibesafaris.com">info@afrivibesafaris.com</a></li>
          </ul>
          <a
            href="https://wa.me/254742009497?text=Hello%20AfriVibe%20Safaris!"
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
