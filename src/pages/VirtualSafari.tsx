import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Globe, Video, Users, CheckCircle } from 'lucide-react';
import './VirtualSafari.css';

const virtualPackages = [
  { id: 1, title: 'Live Waterhole Cam', location: 'Tsavo West, Kenya', duration: '60 mins', nonRes: '$150', res: 'KES 5,000', cit: 'KES 3,000' },
  { id: 2, title: 'Gorilla Trek VR', location: 'Bwindi, Uganda', duration: '90 mins', nonRes: '$200', res: 'UGX 100,000', cit: 'UGX 50,000' },
  { id: 3, title: 'Serengeti Migration Stream', location: 'Tanzania', duration: '120 mins', nonRes: '$300', res: 'TSH 150,000', cit: 'TSH 80,000' }
];

const VirtualSafari: React.FC = () => {
  const { userType } = useStore();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Submit to mock API
  };

  return (
    <div className="virtual-safari-page">
      <div className="vs-hero">
        <div className="container text-center text-white relative z-10">
          <Globe size={48} className="mx-auto mb-md text-accent" />
          <h1 className="hero-title">Virtual Safaris</h1>
          <p className="hero-subtitle">Bring the magic of Africa directly to your classroom, living room, or office.</p>
        </div>
        <div className="vs-overlay"></div>
      </div>

      <div className="container section layout-vs">
        
        {/* Packages List */}
        <div className="vs-packages">
          <div className="vs-header mb-lg">
            <h2>Available Experiences</h2>
            <p>Our interactive, live-streamed experiences guided by expert rangers.</p>
          </div>
          
          <div className="table-wrapper">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Experience</th>
                  <th>Location</th>
                  <th>Duration</th>
                  <th>Price ({userType})</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {virtualPackages.map(pkg => {
                  let displayedPrice = '';
                  if (userType === 'Non-Resident') displayedPrice = pkg.nonRes;
                  if (userType === 'Resident') displayedPrice = pkg.res;
                  if (userType === 'Citizen') displayedPrice = pkg.cit;

                  return (
                    <tr key={pkg.id}>
                      <td><strong>{pkg.title}</strong></td>
                      <td>{pkg.location}</td>
                      <td>{pkg.duration}</td>
                      <td className="text-primary font-bold">{displayedPrice}</td>
                      <td>
                        <button 
                          className="btn-outline btn-sm"
                          onClick={() => {
                            setFormData({ ...formData, packageId: pkg.id.toString() });
                            document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Book This
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="vs-highlights mt-xl">
            <h3>Why Virtual?</h3>
            <div className="vs-features-grid mt-md">
              <div className="vs-feature">
                <Video size={32} className="text-primary" />
                <h4>4K Live Streams</h4>
                <p>Crystal clear video straight from the bush.</p>
              </div>
              <div className="vs-feature">
                <Users size={32} className="text-secondary" />
                <h4>Interactive Q&A</h4>
                <p>Talk directly with our rangers and experts in real-time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div id="booking-form" className="vs-booking-form-container">
          {submitted ? (
            <div className="success-message text-center">
              <CheckCircle size={48} className="text-secondary mx-auto mb-md" />
              <h3>Request Received!</h3>
              <p>Our team will contact you shortly to confirm your virtual safari booking.</p>
              <button className="btn-primary mt-md" onClick={() => setSubmitted(false)}>Book Another</button>
            </div>
          ) : (
            <form className="vs-form" onSubmit={handleSubmit}>
              <h3>Book Your Virtual Safari</h3>
              <p className="mb-md text-sm text-gray">Ideal for schools, corporate teams, and private groups.</p>
              
              <div className="form-group mb-sm">
                <label>Selected Package</label>
                <select name="packageId" required value={formData.packageId} onChange={handleChange}>
                  <option value="">-- Choose an experience --</option>
                  {virtualPackages.map(p => (
                    <option key={p.id} value={p.id}>{p.title} - {p.location}</option>
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

              <button type="submit" className="btn-secondary w-full">Submit Request</button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default VirtualSafari;
