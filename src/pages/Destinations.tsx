import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Map, Filter } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './Destinations.css';

const Destinations: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSafariType, setActiveSafariType] = useState('All');
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/destinations`)
      .then(res => res.json())
      .then(data => {
        setCountries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCountries = countries.filter(c => {
    if (activeCategory === 'All') return true;
    // Map backend categories if they exist, or fallback
    return c.categories?.includes(activeCategory) || c.category === activeCategory;
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

          {loading ? (
            <div className="loading-state text-center py-xl">
              <p>Loading amazing destinations...</p>
            </div>
          ) : (
            <div className="country-grid">
              {filteredCountries.map(country => (
                <div key={country.id} className="country-card">
                  <div className="cc-image-wrapper">
                    <img src={country.image} alt={country.name} className="cc-image" />
                  </div>
                  <div className="cc-content">
                    <h3>{country.name}</h3>
                    <p>{country.description}</p>
                    <div className="cc-tags">
                      {country.categories?.map((cat: string) => (
                        <span key={cat} className="cc-tag">{cat}</span>
                      ))}
                    </div>
                    <Link to={`/destinations/${country.id}`} className="btn-primary cc-btn">Explore {country.name}</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
