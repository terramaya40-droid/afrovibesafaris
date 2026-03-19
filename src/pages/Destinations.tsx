import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Map, Filter } from 'lucide-react';
import './Destinations.css';

const countries = [
  { id: 'kenya', name: 'Kenya', image: 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'The heart of safari, home to the Maasai Mara.', categories: ['Safari', 'Beach', 'Nature'] },
  { id: 'tanzania', name: 'Tanzania', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'Serengeti plains and the peak of Mount Kilimanjaro.', categories: ['Safari', 'Hiking', 'Nature'] },
  { id: 'uganda', name: 'Uganda', image: 'https://images.unsplash.com/photo-1574709756113-58134eb92404?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'The Pearl of Africa, known for mountain gorillas.', categories: ['Safari', 'Hiking', 'Nature'] },
  { id: 'rwanda', name: 'Rwanda', image: 'https://images.unsplash.com/photo-1580211831872-386d382103f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'Pristine rainforests and rich cultural experiences.', categories: ['Safari', 'Nature', 'Experiences'] },
  { id: 'botswana', name: 'Botswana', image: 'https://images.unsplash.com/photo-1618683526006-25916d801111?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'Okavango Delta and uncrowded luxury wilderness.', categories: ['Safari', 'Nature'] }
];

const Destinations: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSafariType, setActiveSafariType] = useState('All');

  const filteredCountries = countries.filter(c => {
    if (activeCategory === 'All') return true;
    return c.categories.includes(activeCategory);
  });

  return (
    <div className="destinations-page">
      {/* Header Banner */}
      <div className="destinations-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <h1>Explore Africa</h1>
          <p>Discover breath-taking landscapes, diverse wildlife, and rich cultures across our destinations.</p>
        </div>
      </div>

      <div className="container section layout-grid">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-box">
            <h3><Filter size={18} /> Experience Category</h3>
            <ul>
              {['All', 'Safari', 'Hiking', 'Beach', 'Nature', 'Experiences'].map(cat => (
                <li key={cat}>
                  <button 
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-box mt-md">
            <h3><Map size={18} /> Type of Safari</h3>
            <ul>
              {['All', 'Family', 'Couple', 'Inclusive', 'Classical'].map(type => (
                <li key={type}>
                  <button 
                    className={`filter-btn ${activeSafariType === type ? 'active' : ''}`}
                    onClick={() => setActiveSafariType(type)}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-content-area">
          {/* Interactive Map Placeholder */}
          <div className="interactive-map-container">
            <div className="map-placeholder">
              <h3>Interactive Africa Map</h3>
              <p>Click on a highlighted country to explore.</p>
              <div className="map-dots">
                {countries.map(c => (
                  <Link key={c.id} to={`/destinations/${c.id}`} className="map-dot" title={c.name}>
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="countries-header flex-between">
            <h2>Showing {filteredCountries.length} Destinations</h2>
            <button className="btn-outline" onClick={() => openQuoteModal()}>
              Request Custom Quote
            </button>
          </div>

          <div className="country-grid">
            {filteredCountries.map(country => (
              <div key={country.id} className="country-card">
                <div className="cc-image-wrapper">
                  <img src={country.image} alt={country.name} className="cc-image" />
                </div>
                <div className="cc-content">
                  <h3>{country.name}</h3>
                  <p>{country.desc}</p>
                  <div className="cc-tags">
                    {country.categories.map(cat => (
                      <span key={cat} className="cc-tag">{cat}</span>
                    ))}
                  </div>
                  <Link to={`/destinations/${country.id}`} className="btn-primary cc-btn">Explore {country.name}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
