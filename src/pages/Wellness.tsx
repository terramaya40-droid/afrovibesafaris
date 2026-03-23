import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { API_BASE_URL } from '../config';
import { Heart, Sun, Ghost, Coffee } from 'lucide-react';
import './Wellness.css';

const Wellness: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data.wellness))
      .catch(console.error);
  }, []);

  return (
    <div className="wellness-page">
      <section className="wellness-hero" style={{ backgroundImage: `url(${settings?.bannerImage || 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=2000'})` }}>
        <div className="hero-overlay"></div>
        <div className="container wellness-hero-content text-center">
          <h1>{settings?.title || 'AfriVibe Wellness Safari'}</h1>
          <p className="max-w-2xl mx-auto">
            {settings?.subtitle || 'Experience the healing power of the African wilderness. Designed for relaxation and reconnection, combining wildlife experiences with calm, mindful moments in nature.'}
          </p>
          <button className="btn-primary mt-lg" onClick={() => openQuoteModal()}>Request This Experience</button>
        </div>
      </section>

      <section className="wellness-intro container py-xl text-center">
        <h2 className="mb-md">Reconnect with Nature and Self</h2>
        <p className="max-w-2xl mx-auto text-gray-500">
          {settings?.body || 'Our wellness safaris go beyond traditional game viewing. We create space for reflection, silence, and deep connection with the vast African landscape.'}
        </p>
      </section>

      <section className="wellness-features bg-light py-xl">
        <div className="container">
          <div className="wellness-grid">
            <div className="well-feature">
              <Sun className="well-icon" size={40} />
              <h3>Nature Walks</h3>
              <p>Grounded exploration of the bush, feeling the earth and learning about the small wonders of the savanna.</p>
            </div>
            <div className="well-feature">
              <Ghost className="well-icon" size={40} />
              <h3>Quiet Time</h3>
              <p>Intentional moments of silence in breathtaking locations to allow for internal reflection and peace.</p>
            </div>
            <div className="well-feature">
              <Coffee className="well-icon" size={40} />
              <h3>Campfire Evenings</h3>
              <p>Authentic storytelling and connection under the vast African starlight, centered around a crackling fire.</p>
            </div>
            <div className="well-feature">
              <Heart className="well-icon" size={40} />
              <h3>Optional Meditation</h3>
              <p>Guided or self-paced meditation sessions at sunrise or sunset in serene wilderness settings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wellness-cta section text-white text-center" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container">
          <h2 className="mb-md">Start Your Journey of Healing</h2>
          <p className="max-w-2xl mx-auto mb-lg">
            Let us craft a wellness experience that leaves you feeling grounded, restored, and inspired.
          </p>
          <button className="btn-secondary" onClick={() => openQuoteModal()}>Plan My Wellness Safari</button>
        </div>
      </section>
    </div>
  );
};

export default Wellness;
