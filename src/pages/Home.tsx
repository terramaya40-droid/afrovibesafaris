import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { API_BASE_URL } from '../config';
import type { UserType } from '../store/useStore';
import DestinationCard from '../components/Shared/DestinationCard';
import './Home.css';
import { Compass, Camera, Globe, Heart, ArrowRight, Star } from 'lucide-react';

interface PackageData {
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

const mockReviews = [
  { id: 1, name: "Sarah Jenkins", text: "AfriVibe Safaris organized the most magical honeymoon for us in Tanzania. Every detail was perfect!", rating: 5 },
  { id: 2, name: "The Patel Family", text: "Our family safari in Kenya was unforgettable. The inclusive package catered to my father's mobility needs flawlessly.", rating: 5 },
  { id: 3, name: "Mark T.", text: "Gorilla trekking in Uganda was a life-changing experience. Highly recommend their knowledgeable guides.", rating: 5 }
];

const Home: React.FC = () => {
  const { userType, setUserType, openQuoteModal } = useStore();
  const [featuredPackages, setFeaturedPackages] = useState<PackageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/packages`)
      .then(res => res.json())
      .then(data => {
        // Just take the first 3 for the featured section
        setFeaturedPackages(data.slice(0, 3));
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching packages:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">Experience the Soul of Africa</h1>
          <p className="hero-subtitle">Authentic, inclusive, and unforgettable safari adventures tailored just for you.</p>
          
          <div className="hero-actions">
            <Link to="/destinations" className="btn-primary hero-btn">Explore Destinations</Link>
            <button className="btn-outline hero-btn-outline" onClick={() => openQuoteModal()}>Request a Custom Quote</button>
          </div>

          <div className="hero-user-selector">
            <p>Show me pricing for:</p>
            <div className="selector-group">
              {(['Non-Resident', 'Resident', 'Citizen'] as UserType[]).map(type => (
                <button 
                  key={type}
                  className={`selector-btn ${userType === type ? 'active' : ''}`}
                  onClick={() => setUserType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="features section container">
        <div className="section-header text-center">
          <h2>Why Journey With AfriVibe Safaris?</h2>
          <p>We believe the magic of Africa should be accessible to everyone.</p>
        </div>
        <div className="features-grid">
          <Link to="/destinations" className="feature-card">
            <Compass size={40} className="feature-icon" />
            <h3>Multi-Country Safaris</h3>
            <p>Seamlessly border-hop between Kenya, Tanzania, Uganda, Rwanda, and Botswana.</p>
          </Link>
          <Link to="/trip-planner" className="feature-card">
            <Heart size={40} className="feature-icon" />
            <h3>Inclusive Travel</h3>
            <p>Fully accessible safaris designed for disabilities, seniors, and therapy needs.</p>
          </Link>
          <Link to="/virtual-safari" className="feature-card">
            <Globe size={40} className="feature-icon" />
            <h3>Virtual Safaris</h3>
            <p>Experience the wild from your living room or classroom with our remote safaris.</p>
          </Link>
          <Link to="/blog" className="feature-card">
            <Camera size={40} className="feature-icon" />
            <h3>Expert Guides</h3>
            <p>Learn from local experts about rich wildlife, conservation, and vibrant cultures.</p>
          </Link>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-destinations section">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <h2>Featured Adventures</h2>
              <p>Hand-picked experiences across the continent.</p>
            </div>
            <Link to="/destinations" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="destinations-grid">
          {isLoading ? (
            <p style={{ textAlign: 'center', width: '100%' }}>Loading packages...</p>
          ) : featuredPackages.length > 0 ? (
            featuredPackages.map((dest) => (
              <DestinationCard
                key={dest._id}
                id={dest._id}
                title={dest.title}
                country={dest.country}
                description={dest.description}
                image={dest.image}
                rating={dest.rating}
                reviewCount={dest.reviewCount}
                pricing={dest.pricing as any}
                packageType={dest.packageType}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%' }}>No packages found. Please check your database connection.</p>
          )}
        </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section bg-light container">
        <div className="section-header text-center">
          <h2>Voices of the Wild</h2>
          <p>Read what our adventurers have to say.</p>
        </div>
        <div className="testimonials-grid">
          {mockReviews.map(review => (
            <div key={review.id} className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.rating ? "#E3B23C" : "none"} color="#E3B23C" />)}
              </div>
              <p className="testimonial-text">"{review.text}"</p>
              <p className="testimonial-author">- {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section text-center">
        <div className="container cta-content">
          <h2>Ready to answer the call of the wild?</h2>
          <p>Let our safari experts craft your perfect, personalized itinerary today.</p>
          <button className="btn-primary mt-lg" onClick={() => openQuoteModal()}>Plan My Custom Trip</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
