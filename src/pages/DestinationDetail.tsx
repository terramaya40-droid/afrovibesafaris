import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Star, MapPin, Calendar, Users, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { getImageUrl } from '../lib/cloudinary';
import './DestinationDetail.css';

const DestinationDetail: React.FC = () => {
  const { country, destinationId } = useParams<{ country: string; destinationId: string }>();
  const { userType, openQuoteModal } = useStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/packages/id/${destinationId}`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [destinationId]);

  if (loading) return <div className="container section text-center">Loading...</div>;
  if (!data) return <div className="container section text-center">Package not found</div>;

  // Use package images if available, else fallback to main image
  const images = data.images && data.images.length > 0 ? data.images : [data.image];

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
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
            <img 
              src={getImageUrl(images[currentImageIdx], 1200)} 
              alt={`${data.title} - ${currentImageIdx + 1}`} 
              className="gallery-main-img" 
            />
            <button className="slider-btn next" onClick={nextImage}><ChevronRight size={32} /></button>
            <div className="gallery-thumbs">
              {images.map((img: string, idx: number) => (
                <img 
                  key={idx} 
                  src={getImageUrl(img, 200)} 
                  className={`thumb ${idx === currentImageIdx ? 'active' : ''}`}
                  onClick={() => setCurrentImageIdx(idx)}
                  alt="Thumbnail"
                  loading="lazy"
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
                  {(Array.isArray(data.pricingTable) ? data.pricingTable : [{ type: data.packageType, nonRes: data.pricing?.nonRes, res: data.pricing?.res, cit: data.pricing?.cit }]).map((pkg: any, idx: number) => {
                    let displayedPrice = '';
                    if (userType === 'Non-Resident') displayedPrice = pkg.nonRes;
                    else if (userType === 'Resident') displayedPrice = pkg.res;
                    else displayedPrice = pkg.cit;

                    return (
                      <tr key={idx}>
                        <td><strong>{pkg.type}</strong></td>
                        <td className="text-primary font-bold">{displayedPrice}</td>
                        <td className="table-actions">
                          <Link 
                            className="btn-primary" 
                            to={`/trip-planner?destination=${data.country}`}
                          >
                            Request Quote
                          </Link>
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
              {Array.isArray(data.reviews) && data.reviews.map((review: any) => (
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
              <p className="price-from">From <strong>{data.pricingTable?.[0]?.nonRes || data.pricing?.nonRes || 'Inquire'}</strong></p>
              <Link 
                className="btn-primary w-full mt-sm"
                to={`/trip-planner?destination=${data.country}`}
              >
                Request Custom Quote
              </Link>
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
