import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { API_BASE_URL } from '../config';
import { Heart, Sun, Ghost, Coffee } from 'lucide-react';
import PageHeader from '../components/Shared/PageHeader';
import './Wellness.css';

const Wellness: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data.wellness))
      .catch(console.error);
  }, []);

  return (
    <div className="wellness-page">
      <PageHeader 
        title={settings?.title || 'Wellness Safaris'}
        subtitle={settings?.subtitle || 'Experience the healing power of the African wilderness.'}
        backgroundImage={settings?.bannerImage || 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=2000'}
      />
      
      {/* Action Button positioned after header if needed, but PageHeader is just for visual hero */}
      <div className="container text-center mt-lg">
         <Link to="/trip-planner?destination=Wellness" className="btn-primary">Request This Experience</Link>
      </div>

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
          <Link to="/trip-planner?destination=Wellness" className="btn-secondary">Plan My Wellness Safari</Link>
        </div>
      </section>
    </div>
  );
};

export default Wellness;
