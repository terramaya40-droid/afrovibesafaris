import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DestinationCard from '../components/Shared/DestinationCard';
import { API_BASE_URL } from '../config';
import './Country.css';

// Mock data specific to a country
const countryData: Record<string, any> = {
  kenya: {
    name: 'Kenya',
    image: 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    description: 'The undisputed heart of safari. From the iconic Maasai Mara to the pristine beaches of Diani.',
    packages: [
      {
        id: 'mara-migration',
        country: 'Kenya',
        title: 'Maasai Mara Migration',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3',
        description: 'Experience the great wildebeest migration in the world-famous Maasai Mara reserve.',
        pricing: { 'Resident': 'KES 45,000', 'Citizen': 'KES 35,000', 'Non-Resident': '$1,200' },
        rating: 4.9,
        reviewCount: 128,
        packageType: 'Classical',
        category: 'Safari'
      },
      {
        id: ' Amboseli-elephants',
        country: 'Kenya',
        title: 'Amboseli Elephant Safaris',
        image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?ixlib=rb-4.0.3',
        description: 'Large herds of elephants with the majestic Mount Kilimanjaro as your backdrop.',
        pricing: { 'Resident': 'KES 38,000', 'Citizen': 'KES 28,000', 'Non-Resident': '$950' },
        rating: 4.8,
        reviewCount: 84,
        packageType: 'Family',
        category: 'Safari'
      },
      {
        id: 'diani-beach',
        country: 'Kenya',
        title: 'Diani Beach Retreat',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3',
        description: 'Relax on the white sandy beaches of the Indian Ocean after your safari adventure.',
        pricing: { 'Resident': 'KES 25,000', 'Citizen': 'KES 20,000', 'Non-Resident': '$600' },
        rating: 4.7,
        reviewCount: 200,
        packageType: 'Couple',
        category: 'Beach'
      },
      {
        id: 'inclusive-nairobi',
        country: 'Kenya',
        title: 'Accessible Nairobi Park',
        image: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3',
        description: 'A fully guided, wheelchair-accessible game drive in Nairobi National Park.',
        pricing: { 'Resident': 'KES 15,000', 'Citizen': 'KES 10,000', 'Non-Resident': '$300' },
        rating: 4.9,
        reviewCount: 45,
        packageType: 'Inclusive',
        category: 'Safari'
      }
    ]
  }
};

const Country: React.FC = () => {
  const { country } = useParams<{ country: string }>();
  // Keep static banner info
  const data = countryData[country?.toLowerCase() || 'kenya'] || {
    name: country,
    image: 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?ixlib=rb-4.0.3',
    description: `Explore the beautiful wildlife and sceneries of ${country}.`
  };

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All');
  const [dbPackages, setDbPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/packages/${country || 'kenya'}`)
      .then(res => res.json())
      .then(data => {
        setDbPackages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching country packages:', err);
        setLoading(false);
      });
  }, [country]);

  if (!data) {
    return (
      <div className="container section text-center">
        <h2>Country Not Found</h2>
        <Link to="/destinations" className="btn-primary mt-md">Back to Destinations</Link>
      </div>
    );
  }

  const filteredPackages = dbPackages.filter((pkg: any) => {
    // Currently API doesn't have 'category' built in, we can fallback or skip category filter.
    // For demo map all active categories if available
    const matchCategory = activeCategory === 'All' || pkg.category === activeCategory;
    const matchType = activeType === 'All' || pkg.packageType === activeType;
    return matchCategory && matchType;
  });

  return (
    <div className="country-page">
      {/* Dynamic Banner */}
      <div className="country-banner" style={{ backgroundImage: `url(${data.image})` }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <h1>Welcome to {data.name}</h1>
          <p>{data.description}</p>
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
          <h2>Experiences in {data.name}</h2>
          <p>Showing {filteredPackages.length} packages tailored to your interests.</p>
        </div>

        {loading ? (
          <p className="text-center w-full">Loading packages...</p>
        ) : filteredPackages.length > 0 ? (
          <div className="country-packages-grid">
            {filteredPackages.map((pkg: any) => (
              <DestinationCard 
                key={pkg._id} 
                id={pkg._id}
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
