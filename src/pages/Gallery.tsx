import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery`)
      .then(res => res.json())
      .then(data => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-header py-xl text-center">
        <div className="container">
          <h1>Capturing the Wild</h1>
          <p>A glimpse into the breathtaking moments captured on our safaris.</p>
        </div>
      </div>

      <div className="container section">
        {loading ? (
          <p className="text-center py-xl">Loading gallery...</p>
        ) : images.length > 0 ? (
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div key={img._id || i} className="gallery-item">
                <img src={img.image} alt={img.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <p>{img.title}</p>
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
