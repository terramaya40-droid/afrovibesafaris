import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DestinationCard from '../components/Shared/DestinationCard';
import { API_BASE_URL } from '../config';
import { getImageUrl } from '../lib/cloudinary';
import './Country.css';

// Mock data specific to a country
const Country: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  const [destInfo, setDestInfo] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [dbPackages, setDbPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [dRes, pRes] = await Promise.all([
          fetch(`${API_BASE_URL}/destinations/${country || 'kenya'}`),
          fetch(`${API_BASE_URL}/packages/${country || 'kenya'}`)
        ]);
        const [dData, pData] = await Promise.all([dRes.json(), pRes.json()]);
        setDestInfo(dData);
        setDbPackages(pData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);

  if (!loading && !destInfo) {
    return (
      <div className="container section text-center">
        <h2>Destination Not Found</h2>
        <Link to="/destinations" className="btn-primary mt-md">Back to Destinations</Link>
      </div>
    );
  }

  const filteredPackages = Array.isArray(dbPackages) ? dbPackages.filter((pkg: any) => {
    // Currently API doesn't have 'category' built in, we can fallback or skip category filter.
    // For demo map all active categories if available
    const matchCategory = activeCategory === 'All' || pkg.category === activeCategory;
    const matchType = activeType === 'All' || pkg.packageType === activeType;
    return matchCategory && matchType;
  }) : [];

  return (
    <div className="country-page">
      {/* Dynamic Banner */}
      <div className="country-banner" style={{ backgroundImage: `url(${getImageUrl(destInfo.image)})` }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <h1 className="capitalize">Welcome to {destInfo.name}</h1>
          <p>{destInfo.description}</p>
        </div>
      </div>

      <div className="container section">
        {/* Tabs / Filters */}
        <div className="country-filters">
          <div className="filter-group">
            <span className="filter-label">Category:</span>
            <div className="tabs">
              {['All', 'Safari', 'Hiking', 'Beach', 'Nature', 'Experiences'].map(cat => (
                <button 
                  key={cat} 
                  className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Safari Type:</span>
            <div className="tabs">
              {['All', 'Family', 'Couple', 'Inclusive', 'Classical'].map(type => (
                <button 
                  key={type} 
                  className={`tab-btn ${activeType === type ? 'active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="packages-header">
          <h2 className="capitalize">Experiences in {destInfo.name}</h2>
          <p>Showing {filteredPackages.length} packages tailored to your interests.</p>
        </div>

        {loading ? (
          <p className="text-center w-full">Loading packages...</p>
        ) : filteredPackages.length > 0 ? (
          <div className="country-packages-grid">
            {filteredPackages.map((pkg: any) => (
              <DestinationCard 
                key={pkg._id} 
                _id={pkg._id}
                title={pkg.title}
                country={pkg.country}
                description={pkg.description}
                image={pkg.image}
                rating={pkg.rating}
                reviewCount={pkg.reviewCount}
                pricing={pkg.pricing}
                packageType={pkg.packageType}
              />
            ))}
          </div>
        ) : (
          <div className="no-results text-center">
            <h3>No packages found</h3>
            <p>Try adjusting your category or safari type filters.</p>
            <button className="btn-outline mt-sm" onClick={() => { setActiveCategory('All'); setActiveType('All'); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
