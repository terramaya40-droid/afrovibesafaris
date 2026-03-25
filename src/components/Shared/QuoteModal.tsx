import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { X } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import './QuoteModal.css';

const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, closeQuoteModal, quoteContext, userType } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '2',
    arrivalDate: '',
    departureDate: '',
    destination: '',
    safariType: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isQuoteModalOpen) {
      setFormData(prev => ({
        ...prev,
        destination: quoteContext.destination || '',
        safariType: quoteContext.safariType || '',
      }));
      setSubmitSuccess(false); // Reset success state when modal opens
    }
  }, [isQuoteModalOpen, quoteContext]);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          closeQuoteModal();
        }, 2000);
      } else {
        alert('Failed to submit quote request. Please check the network.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('An error occurred submitting the quote.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitSuccess) {
    return (
      <div className="modal-overlay" onClick={closeQuoteModal}>
        <div className="modal-content success" onClick={(e) => e.stopPropagation()}>
          <h2>Quote Request Sent!</h2>
          <p>We'll be in touch with a custom itinerary shortly.</p>
          <button className="btn-primary" onClick={closeQuoteModal}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={closeQuoteModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeQuoteModal}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <h2>Request a Custom Quote</h2>
          <p>Let us plan your dream African safari.</p>
        </div>

        <form onSubmit={handleSubmit} className="quote-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group-row">
            <div className="form-group">
              <label>Number of Travelers</label>
              <input type="number" name="travelers" min="1" required value={formData.travelers} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Arrival Date</label>
              <input type="date" name="arrivalDate" required value={formData.arrivalDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Departure Date</label>
              <input type="date" name="departureDate" required value={formData.departureDate} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Destination / Package</label>
            <input type="text" name="destination" placeholder="Where do you want to go?" value={formData.destination} onChange={handleChange} />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Type of Safari</label>
              <select name="safariType" value={formData.safariType} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Family">Family</option>
                <option value="Couple">Couple</option>
                <option value="Inclusive">Inclusive (Disabilities, Virtual, Therapy)</option>
                <option value="Classical">Classical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pricing Target</label>
              <input type="text" disabled value={userType} className="disabled-input" />
            </div>
          </div>

          <div className="form-group">
            <label>Special Requests / Notes</label>
            <textarea name="specialRequests" rows={4} value={formData.specialRequests} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn-primary w-full mt-md" disabled={isSubmitting}>
            {isSubmitting ? 'Sending Request...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
