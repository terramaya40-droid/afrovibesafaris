import React, { useState } from 'react';
import { Star, MapPin, Image as ImageIcon } from 'lucide-react';
import LazyImage from './LazyImage';
import './TestimonialCard.css';

interface TestimonialCardProps {
  _id: string;
  userName: string;
  userLocation: string;
  packageTitle?: string;
  rating: number;
  reviewText: string;
  sharedPhotos?: string[];
  createdAt: string;
}

const getCountryFlag = (location: string) => {
  const flags: Record<string, string> = {
    'Kenya': '🇰🇪',
    'Tanzania': '🇹🇿',
    'Uganda': '🇺🇬',
    'Rwanda': '🇷🇼',
    'USA': '🇺🇸',
    'UK': '🇬🇧',
    'Germany': '🇩🇪',
    'Australia': '🇦🇺',
    'Canada': '🇨🇦',
    'South Africa': '🇿🇦',
  };
  return flags[location] || '🌍';
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  userName, userLocation, packageTitle, rating, reviewText, sharedPhotos, createdAt
}) => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const date = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      <div className="testimonial-card">
        <div className="tc-header">
          <div className="tc-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="tc-meta">
            <h4 className="tc-name">{userName}</h4>
            <span className="tc-location">
              {getCountryFlag(userLocation)} {userLocation}
            </span>
          </div>
          <div className="tc-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < rating ? "var(--terracotta)" : "transparent"} stroke={i < rating ? "var(--terracotta)" : "var(--color-gray-300)"} />
            ))}
          </div>
        </div>

        <div className="tc-content">
          <p className="tc-text">"{reviewText}"</p>
        </div>

        {packageTitle && (
          <div className="tc-safari">
            <MapPin size={12} /> {packageTitle}
          </div>
        )}

        {sharedPhotos && sharedPhotos.length > 0 && (
          <div className="tc-photos">
            {sharedPhotos.slice(0, 3).map((photo, idx) => (
              <div 
                key={idx} 
                className="tc-photo-thumb" 
                onClick={() => setActivePhoto(photo)}
              >
                <LazyImage src={photo} alt={`Safari photo from ${userName}`} />
                {idx === 2 && sharedPhotos.length > 3 && (
                  <div className="tc-photo-overlay">+{sharedPhotos.length - 3}</div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="tc-footer">
          <span className="tc-date">{date}</span>
          {sharedPhotos && sharedPhotos.length > 0 && (
            <span className="tc-photo-count"><ImageIcon size={12} /> {sharedPhotos.length} Photos</span>
          )}
        </div>
      </div>

      {activePhoto && (
        <div className="photo-lightbox" onClick={() => setActivePhoto(null)}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)}>×</button>
          <img src={activePhoto} alt="Review image fullscreen" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};

export default TestimonialCard;
