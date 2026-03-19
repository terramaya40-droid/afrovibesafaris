import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery`)
      .then(res => res.json())
      .then(data => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(images.map(img => img.category))];
  const filteredImages = filter === 'All' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div className="gallery-page">
      <div className="gallery-header py-xl text-center">
        <div className="container">
          <h1>Capturing the Wild</h1>
          <p>A glimpse into the breathtaking moments captured on our safaris.</p>
        </div>
      </div>

      <div className="container section">
        <div className="gallery-filters mb-lg">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center py-xl">Loading gallery...</p>
        ) : filteredImages.length > 0 ? (
          <div className="gallery-grid">
            {filteredImages.map((img, i) => (
              <div key={img._id || i} className="gallery-item">
                <img src={img.url} alt={img.caption} loading="lazy" />
                <div className="gallery-item-overlay">
                  <p>{img.caption}</p>
                  <span>{img.location}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-xl">No images found in the gallery.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
