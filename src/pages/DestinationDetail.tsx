import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Star, MapPin, Calendar, Users, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import './DestinationDetail.css';

const mockDetailData = {
  id: 'mara-migration',
  title: 'Maasai Mara Migration',
  country: 'Kenya',
  description: 'The Maasai Mara National Reserve is one of the most famous and important wildlife conservation and wilderness areas in Africa, world-renowned for its exceptional populations of lion, African leopard, cheetah and African bush elephant. It is perhaps most famous for the Great Migration, one of the Seven Natural Wonders of Africa.',
  images: [
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618683526006-25916d801111?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ],
  pricingTable: [
    { type: 'Classical', nonRes: '$1,200', res: 'KES 45,000', cit: 'KES 35,000' },
    { type: 'Luxury', nonRes: '$2,500', res: 'KES 120,000', cit: 'KES 90,000' },
    { type: 'Family (4 pax)', nonRes: '$4,000', res: 'KES 150,000', cit: 'KES 110,000' }
  ],
  reviews: [
    { id: 1, user: 'John D.', rating: 5, date: 'Oct 2025', text: 'An absolute dream! The migration was breathtaking.' },
    { id: 2, user: 'Sarah W.', rating: 4, date: 'Sep 2025', text: 'Incredible wildlife viewing, though the camps were a bit crowded.' },
    { id: 3, user: 'Marcus L.', rating: 5, date: 'Aug 2025', text: 'Top notch service from AfriVibe. The hot air balloon ride is a must.' }
  ]
};

const DestinationDetail: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const { userType, openQuoteModal } = useStore();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const data = mockDetailData; // Using mock for all IDs just for prototype

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % data.images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + data.images.length) % data.images.length);
  };

  return (
    <div className="destination-detail-page">
      {/* Breadcrumb */}
      <div className="container breadcrumb">
        <Link to="/destinations">Destinations</Link> &gt; 
        <Link to={`/destinations/${country}`} className="capitalize"> {country}</Link> &gt; 
        <span> {data.title}</span>
      </div>

      <div className="container section layout-detail">
        {/* Main Content (Left) */}
        <div className="detail-main">
          <div className="detail-header">
            <h1>{data.title}</h1>
            <div className="detail-meta">
              <span className="location"><MapPin size={16} /> {data.country}</span>
              <span className="rating"><Star size={16} fill="#E3B23C" color="#E3B23C" /> 4.9 (128 Reviews)</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div id="destination-gallery" className="gallery-slider">
            <button className="slider-btn prev" onClick={prevImage}><ChevronLeft size={32} /></button>
            <img src={data.images[currentImageIdx]} alt={`${data.title} - ${currentImageIdx + 1}`} className="gallery-main-img" />
            <button className="slider-btn next" onClick={nextImage}><ChevronRight size={32} /></button>
            <div className="gallery-thumbs">
              {data.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  className={`thumb ${idx === currentImageIdx ? 'active' : ''}`}
                  onClick={() => setCurrentImageIdx(idx)}
                  alt="Thumbnail"
                />
              ))}
            </div>
          </div>

          <div className="detail-description mt-lg">
            <h2>Overview</h2>
            <p>{data.description}</p>
            <p className="mt-sm">Includes daily game drives, full board accommodation, park fees, and airport transfers.</p>
          </div>

          {/* Packages Table */}
          <div id="packages-table" className="packages-section mt-lg">
            <h2>Pricing & Packages</h2>
            <p className="mb-md">Pricing below reflects rates for <strong className="text-primary">{userType}</strong>. Change your user type in the navigation menu to see other rates.</p>
            <div className="table-wrapper">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Package Type</th>
                    <th>Price ({userType})</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pricingTable.map((pkg, idx) => {
                    let displayedPrice = '';
                    if (userType === 'Non-Resident') displayedPrice = pkg.nonRes;
                    if (userType === 'Resident') displayedPrice = pkg.res;
                    if (userType === 'Citizen') displayedPrice = pkg.cit;

                    return (
                      <tr key={idx}>
                        <td><strong>{pkg.type}</strong></td>
                        <td className="text-primary font-bold">{displayedPrice}</td>
                        <td className="table-actions">
                          <button 
                            className="btn-primary" 
                            onClick={() => openQuoteModal({ destination: data.title, safariType: pkg.type })}
                          >
                            Request Quote
                          </button>
                          <a href={`https://wa.me/254742009497?text=I'm interested in the ${pkg.type} package for ${data.title}`} target="_blank" rel="noreferrer" className="btn-outline">
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="trip-planner-cta mt-md text-center">
              <p>Want to combine this with other destinations?</p>
              <Link to="/trip-planner" className="btn-secondary mt-sm">Plan Custom Multi-Country Trip</Link>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="reviews-section mt-xl">
            <h2>Guest Reviews</h2>
            <div className="reviews-list mt-md">
              {data.reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <h4>{review.user}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < review.rating ? "#E3B23C" : "none"} color="#E3B23C" />)}
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <aside className="detail-sidebar">
          <div className="booking-card">
            <h3>Quick Details</h3>
            <ul className="quick-details-list">
              <li><Calendar size={18} /> Best Time: Jul - Oct</li>
              <li><Users size={18} /> Group Size: 2-6 pax</li>
              <li><Camera size={18} /> Focus: Wildlife, Photography</li>
            </ul>
            <div className="booking-card-cta">
              <p className="price-from">From <strong>{data.pricingTable[0].nonRes}</strong></p>
              <button 
                className="btn-primary w-full mt-sm"
                onClick={() => openQuoteModal({ destination: data.title })}
              >
                Request Custom Quote
              </button>
            </div>
          </div>

          <div className="optional-addons mt-lg">
            <h3>Optional Add-ons</h3>
            <ul className="addons-list">
              <li>Hot Air Balloon Safari</li>
              <li>Maasai Village Cultural Visit</li>
              <li>Night Game Drive</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DestinationDetail;
