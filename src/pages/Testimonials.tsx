import React, { useState, useEffect } from 'react';
import { Star, Globe, Users } from 'lucide-react';
import TestimonialCard from '../components/Shared/TestimonialCard';
import TestimonialFormModal from '../components/Shared/TestimonialFormModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { API_BASE_URL } from '../config';
import './Testimonials.css';

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const heroRef = useScrollReveal<HTMLElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`);
      const data = await res.json();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <section className="testimonials-hero reveal" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="container hero-content text-center parallax-content">
          <span className="hero-label">VOICES OF THE WILD</span>
          <h1 className="hero-title mt-xs">Journeys that<br />Change Perspectives</h1>
          <p className="hero-subtitle mt-md mx-auto" style={{maxWidth: '600px'}}>
            Read the stories of adventurers who trusted AfriVibe Safaris to guide them through the heart of Africa.
          </p>
          <button 
            className="btn-primary mt-lg" 
            onClick={() => setIsModalOpen(true)}
          >
            Share Your Story
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar-container reveal" ref={statsRef}>
        <div className="container">
          <div className="stats-bar">
            <div className="stat-item">
              <Star size={32} className="stat-icon" />
              <div>
                <span className="stat-value">4.9/5</span>
                <span className="stat-label">Average Rating</span>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <Users size={32} className="stat-icon" />
              <div>
                <span className="stat-value">180+</span>
                <span className="stat-label">Happy Adventurers</span>
              </div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <Globe size={32} className="stat-icon" />
              <div>
                <span className="stat-value">23</span>
                <span className="stat-label">Countries Represented</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <section className="section bg-light py-2xl">
        <div className="container reveal" ref={gridRef}>
          <div className="section-header text-center mb-xl">
            <h2 className="section-label">Community Reviews</h2>
            <h3 className="mt-xs">Real Experiences</h3>
          </div>

          {isLoading ? (
            <div className="text-center py-xl text-muted">Loading stories...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-xl text-muted">
              <p>No reviews have been published yet.</p>
              <button 
                className="btn-primary mt-md" 
                onClick={() => setIsModalOpen(true)}
              >
                Be the first to share!
              </button>
            </div>
          ) : (
            <div className="testimonials-masonry">
              {testimonials.map((t) => (
                <TestimonialCard 
                  key={t._id}
                  _id={t._id}
                  userName={t.userName}
                  userLocation={t.userLocation}
                  packageTitle={t.packageTitle}
                  rating={t.rating}
                  reviewText={t.reviewText}
                  sharedPhotos={t.sharedPhotos}
                  createdAt={t.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Upload Modal */}
      {isModalOpen && (
        <TestimonialFormModal 
          onClose={() => {
            setIsModalOpen(false);
            fetchTestimonials();
          }} 
        />
      )}
    </div>
  );
};

export default Testimonials;
