import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Star, MapPin } from 'lucide-react';
import { getImageUrl } from '../../lib/cloudinary';
import './DestinationCard.css';

interface DestinationCardProps {
  _id: string;
  title: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  packageType: string;
  pricing: { nonRes: string; res: string; cit: string };
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  _id, title, country, description, image, rating, reviewCount, packageType, pricing 
}) => {
  const { userType, openQuoteModal } = useStore();

  const getPrice = () => {
    switch(userType) {
      case 'Resident': return pricing.res;
      case 'Citizen': return pricing.cit;
      default: return pricing.nonRes;
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuoteModal({
      destination: `${title}, ${country}`,
      safariType: packageType || ''
    });
  };

  return (
    <Link to={`/destinations/${country.toLowerCase()}/${_id}`} className="destination-card">
      <div className="card-image-wrapper">
        <img src={getImageUrl(image, 600)} alt={title} className="card-image" loading="lazy" />
        {packageType && <span className="card-badge">{packageType}</span>}
      </div>
      <div className="card-content">
        <div className="card-header">
          <span className="card-location"><MapPin size={12} /> {country}</span>
          <div className="card-rating">
            <Star size={12} fill="currentColor" />
            <span>{rating} ({reviewCount})</span>
          </div>
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-excerpt">{description}</p>
        
        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">From</span>
            <span className="price-value">{getPrice()}</span>
            <span className="price-type">/ {userType}</span>
          </div>
          <button className="btn-primary btn-sm" onClick={handleRequestQuote}>Quote</button>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
