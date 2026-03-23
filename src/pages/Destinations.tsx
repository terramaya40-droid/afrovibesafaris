import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Filter } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './Destinations.css';

const FALLBACK_COUNTRIES = [
  {
    id: 'kenya',
    name: 'Kenya',
    subtitle: 'The Pride of Africa',
    description: 'Home to the Maasai Mara, Amboseli, and Tsavo — Kenya offers year-round safaris with some of the most diverse wildlife on the continent.',
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eeaec?auto=format&fit=crop&q=80&w=1600',
    categories: ['Safari', 'Hiking', 'Nature'],
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    subtitle: 'Home of Kilimanjaro & the Serengeti',
    description: 'Witness the Great Migration in the Serengeti and encounter the wildlife-rich Ngorongoro Crater in the most majestic destination in Africa.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1600',
    categories: ['Safari', 'Hiking', 'Beach'],
  },
  {
    id: 'uganda',
    name: 'Uganda',
    subtitle: 'The Pearl of Africa',
    description: 'Uganda is home to nearly half of the world\'s mountain gorilla population in Bwindi Impenetrable Forest and offers stunning rafting on the Nile.',
    image: 'https://images.unsplash.com/photo-1535083311013-bc12b80cf166?auto=format&fit=crop&q=80&w=1600',
    categories: ['Experiences', 'Nature'],
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    subtitle: 'Africa\'s Land of a Thousand Hills',
    description: 'Rwanda combines luxury lodges, world-class gorilla trekking in Volcanoes National Park, and a remarkable story of resilience and growth.',
    image: 'https://images.unsplash.com/photo-1547736083-eb3f8dea0dcd?auto=format&fit=crop&q=80&w=1600',
    categories: ['Experiences', 'Nature'],
  },
  {
    id: 'botswana',
    name: 'Botswana',
    subtitle: 'Africa\'s Last Untouched Wilderness',
    description: 'Botswana offers pristine, uncrowded wildlife experiences in the Okavango Delta and Moremi Game Reserve, a true last wilderness.',
    image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=1600',
    categories: ['Safari', 'Nature'],
  },
];

// SVG Africa map clickable hotspots
const MAP_PINS: Record<string, { x: number; y: number }> = {
  kenya: { x: 340, y: 315 },
  tanzania: { x: 320, y: 360 },
  uganda: { x: 305, y: 295 },
  rwanda: { x: 295, y: 330 },
  botswana: { x: 295, y: 435 },
};

const AfricaMap: React.FC<{ countries: any[]; onSelect: (id: string) => void; activeId: string }> = ({ countries, onSelect, activeId }) => {
  return (
    <div className="africa-map-container">
      <h3 className="map-title">Click a PIN to explore</h3>
      <svg viewBox="0 0 550 600" className="africa-svg" aria-label="Interactive Africa Map">
        {/* Africa silhouette - simplified continent shape */}
        <path
          d="M190,30 L230,25 L270,20 L320,22 L360,30 L400,45 L430,70 L450,100 L460,130 L455,160 L445,185 L460,210 L475,240 L480,270 L475,300 L460,325 L450,350 L445,375 L440,400 L430,425 L415,445 L395,465 L370,480 L345,495 L320,510 L295,520 L270,515 L245,500 L220,490 L200,475 L180,455 L165,430 L150,405 L140,375 L135,345 L140,315 L145,285 L140,260 L130,235 L125,205 L130,178 L135,150 L128,120 L130,90 L150,65 L170,45 Z"
          fill="#e8f5e9"
          stroke="#4caf50"
          strokeWidth="2"
          className="africa-continent"
        />

        {/* Country highlight regions (simplified) */}
        {countries.map(country => {
          const pin = MAP_PINS[country.id];
          if (!pin) return null;
          const isActive = activeId === country.id;
          return (
            <g key={country.id} onClick={() => onSelect(country.id)} style={{ cursor: 'pointer' }}>
              {/* Pulse ring for active */}
              {isActive && (
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="22"
                  fill="none"
                  stroke="var(--color-secondary)"
                  strokeWidth="3"
                  opacity="0.6"
                  className="map-pulse"
                />
              )}
              {/* Country pin */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r="12"
                fill={isActive ? 'var(--color-secondary)' : 'var(--color-primary)'}
                stroke="white"
                strokeWidth="2"
                className="map-pin-circle"
              />
              {/* Country label */}
              <text
                x={pin.x}
                y={pin.y + 28}
                textAnchor="middle"
                fontSize="11"
                fill={isActive ? 'var(--color-secondary)' : 'var(--color-primary)'}
                fontWeight={isActive ? 700 : 500}
                fontFamily="inherit"
              >
                {country.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const Destinations: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [countries, setCountries] = useState<any[]>(FALLBACK_COUNTRIES);
  const [loading, setLoading] = useState(true);
  const [selectedMapCountry, setSelectedMapCountry] = useState('kenya');

  useEffect(() => {
    fetch(`${API_BASE_URL}/destinations`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCountries(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCountries = countries.filter(c => {
    if (activeCategory === 'All') return true;
    return c.categories?.includes(activeCategory) || c.category === activeCategory;
  });

  const selectedCountry = countries.find(c => c.id === selectedMapCountry);

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

      {/* Interactive Map Section */}
      <section className="map-section container section">
        <div className="map-section-layout">
          <AfricaMap countries={countries} onSelect={setSelectedMapCountry} activeId={selectedMapCountry} />
          {selectedCountry && (
            <div className="map-country-preview">
              <img src={selectedCountry.image} alt={selectedCountry.name} className="map-preview-img" />
              <div className="map-preview-info">
                <span className="map-preview-subtitle">{selectedCountry.subtitle}</span>
                <h2>{selectedCountry.name}</h2>
                <p>{selectedCountry.description}</p>
                <div className="map-preview-tags">
                  {selectedCountry.categories?.map((cat: string) => (
                    <span key={cat} className="cc-tag">{cat}</span>
                  ))}
                </div>
                <Link to={`/destinations/${selectedCountry.id}`} className="btn-primary mt-md inline-block">
                  Explore {selectedCountry.name} →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

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
        </aside>

        {/* Main Content */}
        <div className="main-content-area">
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
                <div key={country.id} className="country-card" onClick={() => setSelectedMapCountry(country.id)}>
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
