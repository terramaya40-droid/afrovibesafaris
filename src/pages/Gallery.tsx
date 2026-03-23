import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { getImageUrl } from '../lib/cloudinary';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery`)
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching gallery:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="gallery-page p-3 sm:p-5">
      <div className="gallery-header text-center mb-5">
        <h1>Our Gallery</h1>
        <p>A glimpse into the magic of AfriVibe Safaris.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-20">Loading magic...</div>
      ) : (
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div key={idx} className="gallery-item">
              <img src={getImageUrl(img.image)} alt={img.title} />
              <div className="gallery-info">
                <h3>{img.title}</h3>
                <p>{img.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
