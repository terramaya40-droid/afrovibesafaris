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
    image: 'https://images.unsplash.com/photo-1711198583409-b3dba6a7e144?auto=format&fit=crop&q=80&w=1600',
    categories: ['Experiences', 'Nature'],
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    subtitle: 'Africa\'s Land of a Thousand Hills',
    description: 'Rwanda combines luxury lodges, world-class gorilla trekking in Volcanoes National Park, and a remarkable story of resilience and growth.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1600',
    categories: ['Experiences', 'Nature'],
  },
  {
    id: 'botswana',
    name: 'Botswana',
    subtitle: 'Africa\'s Last Untouched Wilderness',
    description: 'Botswana offers pristine, uncrowded wildlife experiences in the Okavango Delta and Moremi Game Reserve, a true last wilderness.',
    image: 'https://images.unsplash.com/photo-1619025005045-c91b0f7d879d?auto=format&fit=crop&q=80&w=1600',
    categories: ['Safari', 'Nature'],
  },
];

// High-fidelity Africa SVG paths (1000x1000 coordinate system)
const MAP_PATHS: Record<string, string> = {
  continent: "M479.5 86.8c10.3 3.5 19.3 11 26.3 19.5 8.9 10.7 13.9 24.3 18.2 37.3 4.8 14.8 8.6 30 15.1 43.5 6 12.4 15 22.9 25 31.7 13.2 11.6 27.5 21.6 42.6 29.8 17.6 9.6 36.3 16.5 55.4 21.3 16.9 4.3 34.1 6.8 51.5 7.6 15.1.7 30.3.3 45.4-.5 18.1-1 36.2-2.7 54.3-3.6 10.3-.5 20.7-.7 31-.9 11.5-.2 23.1-.3 34.6.4 12.3.7 24.6 2.4 36.7 5.2 10.3 2.4 20.4 6 29.8 10.8 10.8 5.6 20.8 12.8 28.7 21.8 15.3 17.4 23.3 40.5 25.1 63.5 1.5 19 1.1 38.2 2 57.2.9 17.9 2.5 35.8 4.2 53.6 2.4 24.8 4.7 49.7 7.7 74.4 3.7 30.5 8.4 60.8 15.2 90.6 6.5 28.6 14.7 56.6 26.3 82.9 11.1 25.1 25.4 48.6 41.7 70.4 10.2 13.7 21.6 26.3 34.3 37.4 11.8 10.3 24.5 19.4 38 27.1 11.6 6.6 23.7 12 36.1 16.4 10.5 3.7 21.3 6.1 32.2 7.7 17.7 2.6 35.6 3.6 53.5 3.7 12.9 0 25.8-.2 38.7-.6 18.5-.5 37.1-1.3 55.5-2.9 13.6-1.2 27.2-2.7 40.7-4.6 12.8-1.8 25.6-4.1 38.3-6.8 14.6-3 29.2-6.5 43.6-10.7-6 16.5-12.7 32.7-20.2 48.3-9.5 19.7-20.4 38.4-33.3 55.4-14.8 19.5-31.5 37.1-50.5 51.6-17.7 13.6-36.9 24.8-57.1 33.7-24 10.5-49 17.9-74.7 22.1-23.7 3.8-47.8 5.4-71.8 5.8-21.6.4-43.2 0-64.8-.8-24.1-.9-48.2-2.7-72.2-5.7-27.1-3.4-53.9-8.5-80.4-15.6-26.6-7.2-52.6-16.1-77.5-27-23.8-10.5-46.3-23.2-67.4-37.7-19.1-13-36.3-28.1-51.5-45.1-14.3-16-26.1-33.8-35.3-52.7-8.9-18.1-15.2-37-18.8-56.3-4.2-22.3-5.2-44.9-5.1-67.4.1-14.7.7-29.4 1.5-44.1 1-18.3 2.5-36.6 4.7-54.7 2.7-21.8 6.1-43.5 10.7-64.8 5.2-23.9 11.5-47.4 19.3-70.3 8-23.5 17.3-46.3 28-68.2 12.3-24.9 26.2-48.5 42.1-70.6 11.2-15.7 23.6-30.3 37.2-43.7 13.3-13.1 27.6-25 42.9-35.4 14-9.5 28.7-17.8 44.1-24.7 15.6-7 31.7-12.6 48.1-16.8 14.2-3.6 28.6-6 43.1-7.2 14.8-1.2 29.6-1.2 44.4 0z",
  kenya: "m 807.2,463.1 -8.4,0 -4.9,-4.7 -11.1,5.8 -3.5,5.8 -8.2,-1.1 -2.7,-1.6 -2.9,0.4 -3.8,-0.2 -15.7,-11.7 -8.5,0 -4.2,-4.6 -0.1,-7.7 -6.4,-2.4 -8.1,9.1 -7.4,8.3 5.9,9.6 1.5,7 5.5,15.8 -4.4,10.1 -5.9,9.2 -3.5,5.6 0,0.7 2.9,5.2 -0.8,10.3 44.1,28.2 0.7,8 17.3,13.8 5,-4.6 2.5,-9.2 4,-5.5 1.9,-9.8 4.6,-1 3.1,-5.8 8.6,-5.5 -7.2,-11.4 -0.4,-50.4 10.5,-15.7 z",
  tanzania: "m 672.2,531.3 -4.3,1.7 4.8,7.8 -0.8,8.1 -3.5,1.8 0,0 0.6,5.4 2.6,3.2 0.1,4.5 -3,2.9 -4.9,7.2 -4.5,5 -1.2,0.2 -0.7,5.9 2.3,2 -0.5,5.9 2.3,5.5 -2.9,5.3 9.7,9.4 0.8,8.5 5.9,14.2 0,0 0.6,0.4 4.8,2.3 7.7,2.4 6.8,4.1 11.9,2.6 2.3,3.8 0,0 0.8,-2.7 6.2,7.4 0.6,14.5 3.9,5.3 -0.1,0.2 4.7,-0.5 14.4,3.9 3.3,-1.8 8.4,-0.3 4.5,-4.2 7.3,0.2 13.4,-5.3 10,-8.1 0,0 -4.4,-3 -4.7,-13.6 -4,-8.7 1,-6.6 -0.6,-4.2 3.5,-8.4 -0.3,-3.6 -7.7,-5 -0.6,-7.8 5.9,-17.1 -17.3,-13.8 -0.7,-8 -44.1,-28.2 0,0 -6,6.1 -4.1,6.3 4.8,4.7 -7,3.4 -1.5,-1.6 -7.1,0.9 -5.5,3.1 -3.3,-5.4 2.3,-9.7 0.5,-8.3 0,0 0,0 -13.4,-0.2 z",
  uganda: "m 711.3,458.5 -7.4,6.4 -8.6,-0.1 -9.8,3.3 -7.8,-3.1 -5,3.8 0,0 -0.6,16.1 4.9,1.9 -3.9,4.9 -4.7,3.7 -4.6,7.2 -2.6,6.4 -0.6,11.1 -2.9,5.3 -0.1,10.5 2.9,1.4 7.4,-4.3 4.3,-1.7 13.4,0.2 0,0 -0.7,-5.3 5.7,-8.1 7.7,-2 5.2,-3.3 6.3,2.7 0.6,1 0,-0.7 3.5,-5.6 5.9,-9.2 4.4,-10.1 -5.5,-15.8 -1.5,-7 -5.9,-9.6 z",
  rwanda: "m 667.9,533 -7.4,4.3 -2.9,-1.4 -3.5,3.8 -0.5,8.3 -1.7,1 -1.2,7.6 7.4,1.1 3.8,-7.9 6.5,0.9 0,0 3.5,-1.8 0.8,-8.1 -4.8,-7.8 z",
  botswana: "m 600.6,762.7 -2.2,-1 -6.9,3.1 -3.6,0 -7.9,5.4 -4.4,-5.7 -18.7,4.9 -9,0.4 -1.9,49.3 -11.8,0.5 -1.4,40.4 3.2,2 6.5,13.2 -1.5,8.4 2.5,4.9 8.5,-1.4 6.2,-6.2 5.8,-4.2 3.2,-6.6 6,-3.2 4.9,1.7 5.5,3.9 9.6,0.6 7.8,-3.2 1.4,-4.3 2.4,-6.6 6.5,-1.1 3.9,-5.2 4.4,-9.3 11.2,-10.3 17.3,-10.2 -7.3,-6.2 -9.2,-2.1 -3.1,-8.8 0.2,-4.9 -5.1,-1.5 -13,-15.2 -3.5,-8 -2.3,-2.4 -4.2,-11.1 z",
};

const AfricaMap: React.FC<{ countries: any[]; onSelect: (id: string) => void; activeId: string }> = ({ countries, onSelect, activeId }) => {
  return (
    <div className="africa-map-container">
      <h3 className="map-title">Interactive Destination Map</h3>
      <svg viewBox="0 0 1000 1000" className="africa-svg" aria-label="Detailed Africa Map">
        {/* Main Continent Path */}
        <path
          d={MAP_PATHS.continent}
          fill="#f1f8e9"
          stroke="#81c784"
          strokeWidth="1.5"
          className="africa-continent"
        />

        {/* Individual Countries */}
        {countries.map(country => {
          const path = MAP_PATHS[country.id];
          if (!path) return null;
          const isActive = activeId === country.id;
          return (
            <path
              key={country.id}
              d={path}
              fill={isActive ? 'var(--color-secondary)' : '#33691e'}
              stroke="#ffffff"
              strokeWidth={isActive ? '3' : '1'}
              onClick={() => onSelect(country.id)}
              className={`country-path ${isActive ? 'active' : ''}`}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <title>{country.name}</title>
            </path>
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
