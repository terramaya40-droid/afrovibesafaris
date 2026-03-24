import React, { useState } from 'react';
import { X, Star, Upload, Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import './TestimonialFormModal.css';

interface TestimonialFormModalProps {
  onClose: () => void;
}

const COUNTRIES = [
  'Global', 'USA', 'UK', 'Germany', 'Australia', 'Canada', 
  'South Africa', 'Kenya', 'Tanzania', 'France', 'UAE', 'Other'
];

const TestimonialFormModal: React.FC<TestimonialFormModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    userName: '',
    userLocation: 'Global',
    packageTitle: '',
    rating: 5,
    reviewText: '',
    sharedPhotos: [] as string[]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to 0.7 quality JPEG
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Max 3 photos
    if (form.sharedPhotos.length + files.length > 3) {
      setErrorMsg('You can only upload up to 3 photos.');
      return;
    }

    setIsCompressing(true);
    setErrorMsg('');

    try {
      const compressedPhotos = await Promise.all(
        files.map(async (file) => {
          if (file.size > 10 * 1024 * 1024) { // 10MB limit for raw
             throw new Error('Photo too large');
          }
          return await compressImage(file);
        })
      );

      setForm(prev => ({
        ...prev,
        sharedPhotos: [...prev.sharedPhotos, ...compressedPhotos]
      }));
    } catch (err) {
      setErrorMsg('Failed to process one or more images.');
    } finally {
      setIsCompressing(false);
    }
  };

  const removePhoto = (index: number) => {
    setForm(prev => ({
      ...prev,
      sharedPhotos: prev.sharedPhotos.filter((_, i) => i !== index)
    }));
  };

  const setRating = (rating: number) => setForm(prev => ({ ...prev, rating }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to submit review');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content text-center py-2xl" onClick={e => e.stopPropagation()}>
          <div className="success-icon mb-md mx-auto" style={{ width: 64, height: 64, background: 'var(--terracotta)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>✓</div>
          <h3 className="mb-sm">Thank You for Sharing!</h3>
          <p className="text-muted mb-lg">Your review has been submitted and is pending moderation. It will appear on our community page shortly.</p>
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content review-form-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Share Your Experience</h3>
          <button onClick={onClose} className="modal-close-btn"><X size={24} /></button>
        </div>
        
        <form className="modal-body" onSubmit={handleSubmit}>
          {errorMsg && <div className="error-banner mb-md" style={{ color: 'red', fontSize: '0.85rem' }}>{errorMsg}</div>}
          
          <div className="form-group-row">
            <div className="form-group">
              <label>Your Name *</label>
              <input 
                required 
                value={form.userName} 
                onChange={e => setForm({...form, userName: e.target.value})} 
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label>Country *</label>
              <select 
                value={form.userLocation} 
                onChange={e => setForm({...form, userLocation: e.target.value})}
              >
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Safari Package (Optional)</label>
            <input 
              value={form.packageTitle} 
              onChange={e => setForm({...form, packageTitle: e.target.value})} 
              placeholder="e.g. 7-Day Masai Mara Explorer"
            />
          </div>

          <div className="form-group">
            <label>Rating *</label>
            <div className="rating-selector">
              {[1,2,3,4,5].map(num => (
                <Star 
                  key={num} 
                  size={28} 
                  fill={num <= form.rating ? "var(--terracotta)" : "transparent"} 
                  stroke={num <= form.rating ? "var(--terracotta)" : "var(--color-gray-300)"}
                  cursor="pointer"
                  onClick={() => setRating(num)}
                  style={{ transition: 'all 0.2s' }}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Your Review *</label>
            <textarea 
              required
              rows={4}
              value={form.reviewText}
              onChange={e => setForm({...form, reviewText: e.target.value})}
              placeholder="Tell us about your trip..."
            />
          </div>

          <div className="form-group">
            <label>Upload Photos (Max 3)</label>
            <div className="photo-upload-area">
              <div className="upload-btn-wrapper">
                <button type="button" className="btn-outline-sm flex-center gap-xs" disabled={isCompressing}>
                  <Upload size={16} /> {isCompressing ? 'Processing...' : 'Choose Images'}
                </button>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={handlePhotoUpload} 
                  disabled={form.sharedPhotos.length >= 3 || isCompressing}
                />
              </div>
              <span className="text-sm text-muted ml-sm">
                {form.sharedPhotos.length}/3 uploaded
              </span>
            </div>
            
            {form.sharedPhotos.length > 0 && (
              <div className="photo-preview-grid mt-sm">
                {form.sharedPhotos.map((photo, idx) => (
                  <div key={idx} className="preview-thumb">
                    <img src={photo} alt="Preview" />
                    <button type="button" className="remove-photo-btn" onClick={() => removePhoto(idx)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-footer mt-lg">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialFormModal;
