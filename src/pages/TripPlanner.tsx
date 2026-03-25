import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Check, ChevronRight, ChevronLeft, MapPin, Plus } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './TripPlanner.css';

// Configuration for static categories
const COUNTRIES = ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Botswana'];
const CATEGORIES = ['Safari', 'Hiking', 'Beach', 'Nature', 'Experiences'];
const SAFARI_TYPES = ['Family', 'Couple', 'Inclusive', 'Classical'];

const TripPlanner: React.FC = () => {
  const { openQuoteModal } = useStore();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  
  // Builder State
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [customDestination, setCustomDestination] = useState('');
  const [allPackages, setAllPackages] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/packages`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllPackages(data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const dest = searchParams.get('destination');
    if (dest && COUNTRIES.includes(dest)) {
      setSelectedCountries([dest]);
      setStep(2); // Jump to interests if destination is pre-filled
    }
  }, [searchParams]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedSafariType, setSelectedSafariType] = useState<string>('');

  const handleToggle = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const currentAvailablePackages = allPackages
    .filter(p => selectedCountries.includes(p.country))
    .map(p => p.title);

  const handleFinish = () => {
    const finalCountries = [...selectedCountries];
    if (customDestination) finalCountries.push(`Custom: ${customDestination}`);
    
    const summary = `Countries: ${finalCountries.join(', ')} | Packages: ${selectedPackages.join(', ')}`;
    openQuoteModal({
      destination: summary,
      safariType: selectedSafariType
    });
  };

  return (
    <div className="trip-planner-page bg-light">
      <div className="planner-header">
        <div className="container text-center">
          <h1>Plan Your Dream African Journey</h1>
          <p>Build a custom multi-country itinerary in 4 easy steps.</p>
        </div>
      </div>

      <div className="container section">
        <div className="planner-container">
          
          {/* Progress Sidebar/TopBar */}
          <div className="planner-progress">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className={`progress-step ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                <div className="step-circle">{step > s ? <Check size={14} /> : s}</div>
                <span className="step-label">
                  {s === 1 && 'Countries'}
                  {s === 2 && 'Interests'}
                  {s === 3 && 'Experiences'}
                  {s === 4 && 'Details'}
                  {s === 5 && 'Summary'}
                </span>
              </div>
            ))}
          </div>

          {/* Wizard Content */}
          <div className="planner-content">
            
            {step === 1 && (
              <div className="wizard-step animation-fade">
                <h2>Where do you want to go?</h2>
                <p className="step-desc">Select one or more countries for your trip.</p>
                <div className="selection-grid">
                  {COUNTRIES.map(country => (
                    <button 
                      key={country}
                      className={`select-card ${selectedCountries.includes(country) ? 'selected' : ''}`}
                      onClick={() => handleToggle(country, selectedCountries, setSelectedCountries)}
                    >
                      <MapPin className="card-icon" />
                      <span>{country}</span>
                    </button>
                  ))}
                  <div className="select-card custom-dest-card" style={{ gridColumn: '1 / -1', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(112, 130, 91, 0.05)', border: '1px dashed var(--color-primary)' }}>
                    <Plus size={20} className="text-primary" />
                    <input 
                      type="text" 
                      placeholder="Add another destination of your own..." 
                      value={customDestination}
                      onChange={(e) => setCustomDestination(e.target.value)}
                      style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.8rem', fontSize: '1rem', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="wizard-step animation-fade">
                <h2>What are your interests?</h2>
                <p className="step-desc">This helps us tailor the experience.</p>
                <div className="selection-grid">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      className={`select-card ${selectedCategories.includes(cat) ? 'selected' : ''}`}
                      onClick={() => handleToggle(cat, selectedCategories, setSelectedCategories)}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="wizard-step animation-fade">
                <h2>Select Specific Experiences</h2>
                <p className="step-desc">Based on your country selection.</p>
                {currentAvailablePackages.length === 0 ? (
                  <p className="text-secondary">Please go back and select a country first.</p>
                ) : (
                  <div className="selection-grid packages-grid">
                    {currentAvailablePackages.map(pkg => (
                      <button 
                        key={pkg}
                        className={`select-card package-card ${selectedPackages.includes(pkg) ? 'selected' : ''}`}
                        onClick={() => handleToggle(pkg, selectedPackages, setSelectedPackages)}
                      >
                        <span>{pkg}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="wizard-step animation-fade">
                <h2>Who are you traveling with?</h2>
                <p className="step-desc">Select the type of safari to help us price and arrange accommodations.</p>
                <div className="selection-grid">
                  {SAFARI_TYPES.map(type => (
                    <button 
                      key={type}
                      className={`select-card ${selectedSafariType === type ? 'selected' : ''}`}
                      onClick={() => setSelectedSafariType(type)}
                    >
                      <span>{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="wizard-step animation-fade" id="trip-summary">
                <h2>Your Trip Summary</h2>
                <p className="step-desc">Review your selections before requesting a quote.</p>
                
                <div className="summary-box">
                  <div className="summary-item">
                    <h4>Destinations</h4>
                    <p>
                      {selectedCountries.join(', ')}
                      {customDestination && (selectedCountries.length > 0 ? `, ${customDestination}` : customDestination)}
                      {selectedCountries.length === 0 && !customDestination && 'None selected'}
                    </p>
                  </div>
                  <div className="summary-item">
                    <h4>Interests</h4>
                    <p>{selectedCategories.length > 0 ? selectedCategories.join(', ') : 'None selected'}</p>
                  </div>
                  <div className="summary-item">
                    <h4>Experiences</h4>
                    <p>{selectedPackages.length > 0 ? selectedPackages.join(', ') : 'None selected'}</p>
                  </div>
                  <div className="summary-item">
                    <h4>Travel Style</h4>
                    <p>{selectedSafariType || 'None selected'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Actions */}
            <div className="wizard-actions">
              {step > 1 ? (
                <button className="btn-outline step-btn" onClick={() => setStep(step - 1)}>
                  <ChevronLeft size={18} /> Back
                </button>
              ) : <div></div>}

              {step < 5 ? (
                <button 
                  className="btn-primary step-btn" 
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && selectedCountries.length === 0 && !customDestination) ||
                    (step === 4 && !selectedSafariType)
                  }
                >
                  <span className={((step === 1 && selectedCountries.length === 0 && !customDestination) || (step === 4 && !selectedSafariType)) ? 'disabled-text' : ''}>Next</span> <ChevronRight size={18} />
                </button>
              ) : (
                <button className="btn-primary step-btn" onClick={handleFinish}>
                  Request Formal Quote
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
