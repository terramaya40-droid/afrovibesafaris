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

const FALLBACK_PACKAGES: PackageData[] = [
  {
    _id: 'fallback-1',
    title: 'Luxury Safari Experience',
    country: 'Tanzania',
    description: 'Witness the Great Migration from five-star tented camps. Private game drives with expert guides and sunset sundowners over the Serengeti plains.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1600',
    rating: 5.0, reviewCount: 84, packageType: 'Luxury',
    pricing: { nonRes: '$8,500', res: 'TZS 12,000,000', cit: 'TZS 8,500,000' }
  },
  {
    _id: 'fallback-2',
    title: 'Maasai Mara Safari',
    country: 'Kenya',
    description: 'Adventure meets comfort across Kenya\'s most iconic parks. From the red elephants of Tsavo to the big cats of the Maasai Mara.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1600',
    rating: 4.8, reviewCount: 156, packageType: 'Classic',
    pricing: { nonRes: '$3,800', res: 'KES 145,000', cit: 'KES 95,000' }
  },
  {
    _id: 'fallback-3',
    title: 'Gorilla Trekking Adventure',
    country: 'Uganda',
    description: 'An intimate encounter with mountain gorillas in Bwindi Impenetrable Forest, guided by expert conservationists.',
    image: 'https://images.unsplash.com/photo-1711198583409-b3dba6a7e144?auto=format&fit=crop&q=80&w=1600',
    rating: 4.9, reviewCount: 42, packageType: 'Classic',
    pricing: { nonRes: '$4,200', res: 'UGX 5.5M', cit: 'UGX 4M' }
  },
  {
    _id: 'fallback-4',
    title: 'Rwanda Golden Gorillas',
    country: 'Rwanda',
    description: 'Luxury lodge accommodation combined with exclusive morning gorilla permits in the misty volcanic highlands.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1600',
    rating: 4.9, reviewCount: 28, packageType: 'Luxury',
    pricing: { nonRes: '$5,800', res: 'RWF 3.8M', cit: 'RWF 2.5M' }
  }
];

const defaultHeroSlides = [
  { image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000', title: 'Beyond Journeys, Into Memories' },
  { image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000', title: 'Experience the Soul of Africa' },
  { image: 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=2000', title: 'Your African Adventure Awaits' }
];


const Home: React.FC = () => {
  const { userType, setUserType, openQuoteModal } = useStore();
  const [featuredPackages, setFeaturedPackages] = useState<PackageData[]>(FALLBACK_PACKAGES);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [settings, setSettings] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  const activeSlides = settings?.home?.heroSlides?.length > 0 ? settings.home.heroSlides : defaultHeroSlides;


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/packages`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFeaturedPackages(data.slice(0, 3));
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);

    fetch(`${API_BASE_URL}/testimonials`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(console.error);
  }, []);

  const services = [
    { id: 'safaris', title: 'Safaris & Tours', icon: <Compass size={32} />, link: '/destinations', desc: 'Curated wildlife adventures.' },
    { id: 'virtual', title: 'Virtual Safaris', icon: <Globe size={32} />, link: '/virtual-safari', desc: 'Remote African experiences.' },
    { id: 'wellness', title: 'Wellness Experiences', icon: <Heart size={32} />, link: '/wellness', desc: 'Reconnect with nature and self.' },
    { id: 'flights', title: 'Flight Booking', icon: <Compass size={32} />, link: '/travel-services', desc: 'Domestic & international flights.' },
    { id: 'visa', title: 'Visa Assistance', icon: <Globe size={32} />, link: '/travel-services', desc: 'Expert guidance for your journey.' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Slider */}
      <section className="hero-slider">
        {activeSlides.map((slide: any, index: number) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="hero-overlay"></div>
            <div className="container hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{settings?.home?.heroSubtitle || 'Discover Africa through curated safaris, wellness experiences, and complete travel solutions — from flights to unforgettable adventures.'}</p>
              
              <div className="hero-actions">
                <Link to="/destinations" className="btn-primary hero-btn">Explore Packages</Link>
                <button className="btn-outline hero-btn-outline" onClick={() => openQuoteModal()}>Request a Quote</button>
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
          </div>
        ))}

        {/* Slider Navigation Dots */}
        <div className="hero-dots">
          {activeSlides.map((_: any, index: number) => (
            <button
              key={index}
              className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="services-section section container">
        <div className="section-header text-center">
          <h2>{settings?.home?.servicesTitle || 'Our Services'}</h2>
          <p>{settings?.home?.servicesSubtitle || 'Complete travel solutions for your African journey.'}</p>
        </div>
        <div className="services-grid">
          {services.map(service => (
            <Link key={service.id} to={service.link} className="service-block">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="features section container">
        <div className="section-header text-center">
          <h2>Why Journey With AfriVibe Safaris?</h2>
          <p>We are a connection platform bridging Africa and the world.</p>
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
            ) : (
              featuredPackages.map((dest) => (
                <DestinationCard
                  key={dest._id}
                  _id={dest._id}
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
          {reviews.slice(0, 3).map(review => (
            <div key={review._id} className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < review.rating ? "#E3B23C" : "none"} color="#E3B23C" />)}
              </div>
              <p className="testimonial-text">"{review.reviewText}"</p>
              <p className="testimonial-author">- {review.userName}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section text-center">
        <div className="container cta-content">
          <h2>{settings?.home?.ctaTitle || 'Ready to answer the call of the wild?'}</h2>
          <p>{settings?.home?.ctaSubtitle || 'Let our safari experts craft your perfect, personalized itinerary today.'}</p>
          <button className="btn-primary mt-lg" onClick={() => openQuoteModal()}>Plan My Custom Trip</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
