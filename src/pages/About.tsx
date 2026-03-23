import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-hero" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000)` }}>
        <div className="hero-overlay"></div>
        <div className="container about-hero-content">
          <h1>AfriVibe Safaris — About Us</h1>
          <p>A bridge between Africa and the world.</p>
        </div>
      </section>

      <section className="about-section container py-xl">
        <div className="about-grid">
          <div className="about-content">
            <h2 className="section-title">Who We Are</h2>
            <p>
              AfriVibe Safaris is an African-led travel and wellbeing platform acting as a bridge between Africa and the world. 
              We connect global communities to Africa through nature, culture, and human-centered experiences, both physically and virtually. 
              Our goal is to make Africa more accessible, better understood, and meaningfully experienced.
            </p>
            <p className="mt-md">
              We go beyond traditional tourism by integrating mental wellbeing, inclusive access, and authentic African storytelling into every experience. 
              Our services are designed for people across all life stages, including young individuals, working adults, and retirees seeking meaningful and enriching travel.
            </p>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000" alt="Who We Are" className="rounded shadow-lg" />
          </div>
        </div>
      </section>

      <section className="our-story section bg-light">
        <div className="container">
          <div className="about-grid reverse">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&q=80&w=2000" alt="Our Story" className="rounded shadow-lg" />
            </div>
            <div className="about-content">
              <h2 className="section-title">Our Story</h2>
              <p>AfriVibe was born from lived experience.</p>
              <p className="mt-md">
                As founders, we went through moments of pressure, stress, and uncertainty. What changed us was not comfort, but nature. 
                Through hiking mountains like Mount Kenya and Kilimanjaro, we discovered that true strength is not physical, but mental. 
                Nature challenged us, grounded us, and helped us reconnect with ourselves.
              </p>
              <p className="mt-md">
                That experience inspired us to build AfriVibe — a platform that allows people from around the world to experience Africa not just as a destination, 
                but as a place of connection, healing, and discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mission-vision container py-xl">
        <div className="mv-grid">
          <div className="mv-card">
            <h3>Our Mission</h3>
            <p>To bridge Africa with the world through meaningful travel experiences that connect people to nature, culture, and themselves.</p>
          </div>
          <div className="mv-card">
            <h3>Our Vision</h3>
            <p>To position Africa as a global destination not only for travel, but for connection, wellbeing, education, and transformative human experiences.</p>
          </div>
        </div>
      </section>

      <section className="our-team section container">
        <h2 className="text-center mb-xl">Our Team and Expertise</h2>
        <p className="text-center max-w-2xl mx-auto mb-lg">
          AfriVibe is built by a team of professionally trained travel specialists, experienced guides, and wellness-focused facilitators.
        </p>
        <div className="team-stats">
          <div className="stat-item">
            <h4>Certified</h4>
            <p>Travel & tourism professionals</p>
          </div>
          <div className="stat-item">
            <h4>Expert</h4>
            <p>Safari guides with deep destination knowledge</p>
          </div>
          <div className="stat-item">
            <h4>Safety First</h4>
            <p>Mountain and adventure guides (Mt Kenya, Kilimanjaro)</p>
          </div>
          <div className="stat-item">
            <h4>Wellness</h4>
            <p>Trauma-sensitive & mental health trained</p>
          </div>
        </div>
      </section>

      <section className="why-us section bg-dark text-white text-center">
        <div className="container">
          <h2 className="mb-md">Why AfriVibe?</h2>
          <p className="max-w-2xl mx-auto mb-lg">
            We are not just a tour company. We are a connection platform. 
            We bring together Africa and the global community through physical and virtual experiences, 
            combining travel, mental wellbeing, inclusion, and cultural understanding.
          </p>
          <div className="cta-group">
            <p className="font-semibold">Authentic | Responsible | Accessible | Meaningful</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
