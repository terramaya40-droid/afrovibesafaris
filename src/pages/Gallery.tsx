import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { getImageUrl } from '../lib/cloudinary';
import './Gallery.css';

const FALLBACK_GALLERY = [
  { _id: 'g1', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1200', title: 'King of the Savanna', location: 'Serengeti, Tanzania' },
  { _id: 'g2', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&q=80&w=1200', title: 'Gentle Giants', location: 'Amboseli, Kenya' },
  { _id: 'g3', image: 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=1200', title: 'Zanzibar Sunset', location: 'Nungwi, Zanzibar' },
  { _id: 'g4', image: 'https://images.unsplash.com/photo-1534067783941-51c9c23eeaec?auto=format&fit=crop&q=80&w=1200', title: 'Mount Kilimanjaro', location: 'Amboseli View, Kenya' },
  { _id: 'g5', image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=1200', title: 'Zebra Migration', location: 'Maasai Mara, Kenya' },
  { _id: 'g6', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200', title: 'Safari Morning Light', location: 'Ngorongoro, Tanzania' },
  { _id: 'g7', image: 'https://images.unsplash.com/photo-1535083311013-bc12b80cf166?auto=format&fit=crop&q=80&w=1200', title: 'Mountain Gorilla', location: 'Bwindi, Uganda' },
  { _id: 'g8', image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&q=80&w=1200', title: 'Cheetah on the Prowl', location: 'Maasai Mara, Kenya' },
  { _id: 'g9', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1200', title: 'African Sunset', location: 'Serengeti, Tanzania' },
  { _id: 'g10', image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=1200', title: 'Flamingos at Nakuru', location: 'Lake Nakuru, Kenya' },
  { _id: 'g11', image: 'https://images.unsplash.com/photo-1565802133413-e5e7b5e3c86b?auto=format&fit=crop&q=80&w=1200', title: 'Zanzibar Beach', location: 'Stone Town, Zanzibar' },
  { _id: 'g12', image: 'https://images.unsplash.com/photo-1547736083-eb3f8dea0dcd?auto=format&fit=crop&q=80&w=1200', title: 'Savanna Landscape', location: 'Tsavo, Kenya' },
];

const Gallery: React.FC = () => {
  const [images, setImages] = useState<any[]>(FALLBACK_GALLERY);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setImages(data);
        }
        // else keep fallback
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const getImg = (img: string) => {
    if (!img) return FALLBACK_GALLERY[0].image;
    if (img.startsWith('http')) return img;
    return getImageUrl(img);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header text-center">
        <h1>Our Gallery</h1>
        <p>A glimpse into the magic of AfriVibe Safaris — the wildlife, landscapes, and moments that define Africa.</p>
      </div>

      {isLoading ? (
        <div className="text-center py-20">Loading gallery...</div>
      ) : (
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div key={img._id || idx} className="gallery-item" onClick={() => setSelectedImage(img)}>
              <img src={getImg(img.image)} alt={img.title} loading="lazy" />
              <div className="gallery-item-overlay">
                <h3>{img.title}</h3>
                <p>{img.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
            <img src={getImg(selectedImage.image)} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.location}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
