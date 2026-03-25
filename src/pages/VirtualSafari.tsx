import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Globe, Video, Users, CheckCircle, MapPin } from 'lucide-react';
import { API_BASE_URL } from '../config';
import * as LucideIcons from 'lucide-react';
import PageHeader from '../components/Shared/PageHeader';
import './VirtualSafari.css';

const VirtualSafari: React.FC = () => {
  const { userType } = useStore();
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    participants: '',
    date: '',
    packageId: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Submit to mock API
  };

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name] || Globe;
    return <Icon size={40} className="step-icon" />;
  };

  const vsContent = settings?.virtualSafari;
  const experiences = vsContent?.experiences || [
    { title: 'Live Waterhole Cam', location: 'Tsavo West, Kenya', duration: '60 mins', image: 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?auto=format&fit=crop&w=800', pricing: { nonRes: '$150', res: 'KES 5,000', cit: 'KES 3,000' } },
    { title: 'Gorilla Trek VR', location: 'Bwindi, Uganda', duration: '90 mins', image: 'https://images.unsplash.com/photo-1503918232442-118111139b51?auto=format&fit=crop&w=800', pricing: { nonRes: '$200', res: 'UGX 100,000', cit: 'UGX 50,000' } }
  ];

  return (
    <div className="virtual-safari-page">
      <PageHeader 
        title={vsContent?.title || 'Virtual Safaris'} 
        subtitle={vsContent?.subtitle || 'Bring the magic of Africa directly to your classroom, living room, or office.'}
        backgroundImage={vsContent?.bannerImage || 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'}
      />

      {/* How it Works */}
      <section className="vs-how section container">
        <div className="section-header text-center mb-xl">
          <h2 className="section-label">The Process</h2>
          <h3 className="mt-xs">How it Works</h3>
        </div>
        <div className="vs-steps">
          {(vsContent?.howItWorks || [
            { title: 'Choose Experience', description: 'Select from our curated live or VR experiences.', icon: 'Globe' },
            { title: 'Book Session', description: 'Pick a date and time that works for your group.', icon: 'Video' },
            { title: 'Connect Live', description: 'Join our expert rangers via secure high-speed link.', icon: 'Users' }
          ]).map((step: any, i: number) => (
            <div key={i} className="vs-step-card">
              <div className="step-icon-wrapper">{getIcon(step.icon)}</div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
              {i < 2 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Experiences Grid */}
      <section id="experiences" className="vs-experiences section bg-light">
        <div className="container">
          <div className="section-header text-center mb-xl">
            <h2 className="section-label">Experiences</h2>
            <h3 className="mt-xs">Remote Adventures</h3>
            <p>Our interactive, live-streamed experiences guided by expert rangers.</p>
          </div>

          <div className="experiences-grid">
            {experiences.map((exp: any, i: number) => {
              let displayedPrice = '';
              if (userType === 'Non-Resident') displayedPrice = exp.pricing?.nonRes;
              else if (userType === 'Resident') displayedPrice = exp.pricing?.res;
              else displayedPrice = exp.pricing?.cit;

              return (
                <div key={i} className="vs-experience-card">
                  <div className="exp-image" style={{ backgroundImage: `url('${exp.image}')` }}>
                    <div className="exp-badge">{exp.duration}</div>
                  </div>
                  <div className="exp-info">
                    <div className="exp-meta">
                      <span className="flex items-center gap-1 text-sm text-secondary">
                        <MapPin size={14} /> {exp.location}
                      </span>
                    </div>
                    <h3>{exp.title}</h3>
                    <div className="exp-footer">
                      <div className="exp-price">
                        <span className="text-xs text-gray-500 block">From</span>
                        <span className="price-val">{displayedPrice}</span>
                      </div>
                      <button 
                        className="btn-outline btn-sm"
                        onClick={() => {
                          setFormData({ ...formData, packageId: exp.title });
                          document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form + Visuals */}
      <div className="container section">
        <div className="layout-vs">
          {/* Visual Side */}
          <div className="vs-info-graphics">
            <div className="info-card">
              <Video size={32} className="text-primary mb-sm" />
              <h3>Crystal Clear 4K</h3>
              <p>Experience the bush in stunning high definition with professional audio gear.</p>
            </div>
            <div className="info-card">
              <Users size={32} className="text-secondary mb-sm" />
              <h3>Interactive Q&A</h3>
              <p>Talk directly with our rangers. Ask questions about animal behavior and conservation in real-time.</p>
            </div>
            <div className="vs-image-stack mt-lg">
              <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=600" alt="Safari" className="img-1" />
              <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=600" alt="Wildlife" className="img-2" />
            </div>
          </div>

          {/* Booking Form */}
          <div id="booking-form" className="vs-booking-form-container">
            {submitted ? (
              <div className="success-message text-center">
                <CheckCircle size={64} className="text-secondary mx-auto mb-md animate-bounce" />
                <h3>Request Received!</h3>
                <p>Our team will contact you shortly to confirm your virtual safari booking.</p>
                <button className="btn-primary mt-md" onClick={() => setSubmitted(false)}>Book Another</button>
              </div>
            ) : (
              <form className="vs-form" onSubmit={handleSubmit}>
                <h3>Reserve Your Session</h3>
                <p className="mb-md text-sm text-gray">Ideal for schools, corporate teams, and private groups.</p>
                
                <div className="form-group mb-sm">
                  <label>Selected Experience</label>
                  <select name="packageId" required value={formData.packageId} onChange={handleChange}>
                    <option value="">-- Choose an experience --</option>
                    {experiences.map((p: any) => (
                      <option key={p.title} value={p.title}>{p.title} - {p.location}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-sm">
                  <label>Contact Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group mb-sm">
                  <label>Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group mb-sm">
                  <label>School / Organization Name <span className="text-gray text-sm">(optional)</span></label>
                  <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
                </div>

                <div className="form-group-row mb-sm">
                  <div className="form-group">
                    <label>No. of Participants</label>
                    <input type="number" name="participants" required min="1" value={formData.participants} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input type="date" name="date" required value={formData.date} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group mb-md">
                  <label>Special Notes / Focus Topics</label>
                  <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} placeholder="E.g., Please focus on big cats, for 5th grade students."></textarea>
                </div>

                <button type="submit" className="btn-secondary w-full py-md">Submit Request</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualSafari;
