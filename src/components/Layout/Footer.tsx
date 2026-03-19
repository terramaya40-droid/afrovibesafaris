import React from 'react';
import './Footer.css';
import { Facebook, Instagram, Twitter, Phone, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <h3 className="footer-logo">Afri<span className="text-accent">Vibe</span></h3>
          <p className="footer-desc">
            Connecting people to Africa through authentic, inclusive, and unforgettable safari experiences.
          </p>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="https://wa.me/254742009497" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ color: "var(--color-primary)" }}><Phone size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/trip-planner">Trip Planner</a></li>
            <li><a href="/virtual-safari">Virtual Safaris</a></li>
            <li><a href="/blog">Blog & Learning</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li>Email: <a href="mailto:info@afrivibesafaris.com">info@afrivibesafaris.com</a></li>
            <li>Phone: <a href="tel:+254742009497">+254 742 009 497</a></li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4>Newsletter</h4>
          <p>Subscribe for updates and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn-secondary">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AfriVibe Safaris. All rights reserved. | <a href="#">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
