import React from 'react';
import { useStore } from '../store/useStore';
import { Plane, FileCheck, HelpCircle } from 'lucide-react';
import './TravelServices.css';

const TravelServices: React.FC = () => {
  const { openQuoteModal } = useStore();

  return (
    <div className="travel-services-page">
      <section className="services-hero" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000)` }}>
        <div className="hero-overlay"></div>
        <div className="container services-hero-content text-center">
          <h1>Complete Travel Solutions</h1>
          <p className="max-w-2xl mx-auto">
            From your ticket to your visa, we've got you covered. AfriVibe Safaris provides end-to-end support for a seamless journey.
          </p>
          <button className="btn-primary mt-lg" onClick={() => openQuoteModal()}>Request Consultation</button>
        </div>
      </section>

      <section className="services-list section container py-xl">
        <h2 className="text-center mb-xl">Our Core Travel Services</h2>
        <div className="services-layout">
          <div className="service-detail-card">
            <Plane size={48} className="service-detail-icon" />
            <h3>Flight Booking</h3>
            <p>
              Whether you're traveling from across the globe or flying between African capitals, 
              we source domestic and international flights tailored to your schedule and budget.
            </p>
          </div>

          <div className="service-detail-card">
            <FileCheck size={48} className="service-detail-icon" />
            <h3>Visa Assistance</h3>
            <p>
              Navigating travel requirements can be complex. We provide detailed guidance and support 
              for visa applications to ensure you have all the necessary documentation for your destination.
            </p>
          </div>

          <div className="service-detail-card">
            <HelpCircle size={48} className="service-detail-icon" />
            <h3>Travel Consultancy</h3>
            <p>
              Looking for expert advice? Our travel specialists provide personalized planning, 
              budgeting, and logistical support to make your dream African adventure a reality.
            </p>
          </div>
        </div>
      </section>

      <section className="services-cta section container text-center bg-light">
        <div className="cta-box py-xxl">
          <h2 className="mb-md">Ready to Simplify Your Travel?</h2>
          <p className="max-w-2xl mx-auto mb-lg text-gray-500">
            Our team is here to manage the details, so you can focus on the memories. 
            Contact us today for a full consultation on your upcoming trip.
          </p>
          <button className="btn-primary" onClick={() => openQuoteModal()}>Speak with an Expert</button>
        </div>
      </section>
    </div>
  );
};

export default TravelServices;
