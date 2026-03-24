import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Filter } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { getImageUrl } from '../lib/cloudinary';
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



const Destinations: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [countries, setCountries] = useState<any[]>(FALLBACK_COUNTRIES);
  const [loading, setLoading] = useState(true);

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
                <div key={country.id} className="country-card">
                  <div className="cc-image-wrapper">
                    <img src={getImageUrl(country.image, 800)} alt={country.name} className="cc-image" loading="lazy" />
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
