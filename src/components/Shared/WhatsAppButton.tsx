import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './WhatsAppButton.css';

const WhatsAppButton: React.FC = () => {
    const { isMobileMenuOpen } = useStore();
    const phoneNumber = '254742009497';
    
    if (isMobileMenuOpen) return null;
    const message = encodeURIComponent("Hi AfriVibe Safaris! I'm interested in planning a safari and would like to learn more.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a 
            href={whatsappUrl} 
            className="whatsapp-float-btn" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
        >
            <div className="whatsapp-icon-wrapper">
                <MessageCircle size={28} />
                <span className="whatsapp-tooltip">Chat with us</span>
            </div>
        </a>
    );
};

export default WhatsAppButton;
