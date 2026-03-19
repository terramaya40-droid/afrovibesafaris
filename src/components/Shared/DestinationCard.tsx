import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import type { UserType } from '../../store/useStore';
import { Star } from 'lucide-react';
import './DestinationCard.css';

interface DestinationCardProps {
  id: string;
  country: string;
  title: string;
  image: string;
  description: string;
  pricing: Record<UserType, string>;
  rating: number;
  reviewCount: number;
  packageType?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  country,
  title,
  image,
  description,
  pricing,
  rating,
  reviewCount,
  packageType
}) => {
  const { userType, openQuoteModal } = useStore();
  const price = pricing[userType];

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuoteModal({
      destination: `${title}, ${country}`,
      safariType: packageType || ''
    });
  };

  return (
    <Link to={`/destinations/${country.toLowerCase()}/${id}`} className="destination-card">
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" />
        {packageType && <span className="card-badge">{packageType}</span>}
      </div>
      <div className="card-content">
        <div className="card-header">
          <span className="card-country">{country}</span>
          <div className="card-rating">
            <Star size={14} fill="#E3B23C" color="#E3B23C" />
            <span>{rating} ({reviewCount})</span>
          </div>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        
        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">From</span>
            <span className="price-amount">{price}</span>
            <span className="price-type">/ person ({userType})</span>
          </div>
          <button className="btn-primary card-cta" onClick={handleRequestQuote}>
            Request Quote
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
