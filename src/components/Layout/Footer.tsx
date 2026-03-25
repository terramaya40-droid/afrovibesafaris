import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Phone, Mail, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { API_BASE_URL } from '../../config';
import './Footer.css';

const Footer: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    contact: {
      phone: '+254 742 009 497',
      email: 'info@afrivibesafaris.com',
      address: 'Nairobi, Kenya',
      socialLinks: {
        instagram: 'https://instagram.com/afrovibesafaris',
        facebook: 'https://facebook.com/afrovibesafaris',
        youtube: 'https://youtube.com/@afrovibesafaris',
        tripadvisor: '#'
      },
      whatsapp: {
        phone: '254742009497',
        message: 'Hello AfriVibe Safaris!'
      }
    }
  });
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(err => console.error('Error loading footer settings:', err));
  }, []);

  const footerRef = useScrollReveal<HTMLElement>(0.1);
  const col1Ref = useScrollReveal<HTMLDivElement>(0.1);
  const col2Ref = useScrollReveal<HTMLDivElement>(0.1);
  const col3Ref = useScrollReveal<HTMLDivElement>(0.1);
  const col4Ref = useScrollReveal<HTMLDivElement>(0.1);

  const contact = settings?.contact || {};
  const social = {
    instagram: contact.socialLinks?.instagram || 'https://instagram.com/afrovibesafaris',
    facebook: contact.socialLinks?.facebook || 'https://facebook.com/afrovibesafaris',
    youtube: contact.socialLinks?.youtube || 'https://youtube.com/@afrovibesafaris',
    tripadvisor: contact.socialLinks?.tripadvisor || '#'
  };
  const whatsapp = {
    phone: contact.whatsapp?.phone || '254742009497',
    message: contact.whatsapp?.message || 'Hello AfriVibe Safaris!'
  };

  return (
    <footer className="footer reveal" ref={footerRef}>
      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="footer-brand reveal" ref={col1Ref}>
          <div className="footer-logo-row flex items-center gap-md mb-md">
            <Link to="/" className="footer-logo-link mb-0">
              <img src="/logo.jpg" alt="AfriVibe Safaris" className="footer-logo-img" />
            </Link>
            <div className="brand-text">
              <h2 className="text-xl font-bold tracking-wider text-white">AfriVibe</h2>
              <p className="text-xs tracking-widest text-[#d4a373] font-bold">SAFARIS</p>
            </div>
          </div>
          <p className="footer-tagline">
            AfriVibe Safaris connects people to Africa through authentic, inclusive, and unforgettable safari experiences.
          </p>
          <div className="social-links mt-lg">
            <a href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={`https://wa.me/${whatsapp.phone}`} target="_blank" rel="noreferrer" className="whatsapp-icon-link"><Phone size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col reveal" ref={col2Ref} style={{ transitionDelay: '0.1s' }}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/trip-planner">Trip Planner</Link></li>
            <li><Link to="/virtual-safari">Virtual Safaris</Link></li>
            <li><Link to="/blog">Blog & Learning</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-col reveal" ref={col3Ref} style={{ transitionDelay: '0.2s' }}>
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>
              <Mail size={14} className="opacity-60" />
              <a href={`mailto:${contact.email || 'info@afrivibesafaris.com'}`}>{contact.email || 'info@afrivibesafaris.com'}</a>
            </li>
            <li>
              <Phone size={14} className="opacity-60" />
              <a href={`tel:${contact.phone || '+254742009497'}`}>{contact.phone || '+254 742 009 497'}</a>
            </li>
            <li className="flex items-start">
              <span className="text-sm">{contact.address || 'Nairobi, Kenya'}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col reveal" ref={col4Ref} style={{ transitionDelay: '0.3s' }}>
          <h4>Newsletter</h4>
          <p className="text-sm text-gray-400 mb-md">Subscribe for updates and exclusive offers.</p>
          <div className="newsletter-form flex flex-col gap-sm">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white text-gray-800 p-sm rounded-sm outline-none"
            />
            <button className="bg-[#d4a373] text-white py-sm font-bold uppercase tracking-widest text-xs hover:bg-[#c49262] transition-colors rounded-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom mt-2xl border-t border-white/5 pt-lg">
        <div className="container flex-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AfriVibe Safaris. All rights reserved. | <Link to="/privacy">Privacy Policy</Link></p>
          <div className="footer-legal flex gap-md">
            <span className="footer-flags text-lg">🇰🇪 🇹🇿 🇺🇬 🇷🇼</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
