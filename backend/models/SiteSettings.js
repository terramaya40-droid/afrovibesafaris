import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  home: {
    heroSlides: {
      type: [{ image: String, title: String }],
      default: [
        { image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000', title: 'Beyond Journeys, Into Memories' },
        { image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000', title: 'Experience the Soul of Africa' },
        { image: 'https://images.unsplash.com/photo-1523805081730-61444927f07c?auto=format&fit=crop&q=80&w=2000', title: 'Your African Adventure Awaits' }
      ]
    },
    heroSubtitle: { type: String, default: 'Discover Africa through curated safaris, wellness experiences, and complete travel solutions — from flights to unforgettable adventures.' },
    servicesTitle: { type: String, default: 'Our Services' },
    servicesSubtitle: { type: String, default: 'Complete travel solutions for your African journey.' },
    ctaTitle: { type: String, default: 'Ready to answer the call of the wild?' },
    ctaSubtitle: { type: String, default: 'Let our safari experts craft your perfect, personalized itinerary today.' }
  },
  about: {
    bannerImage: { type: String, default: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000' },
    title: { type: String, default: 'Who We Are' },
    subtitle: { type: String, default: 'AfriVibe Safaris is an African-led travel and wellbeing platform acting as a bridge between Africa and the world.' },
    body: { type: String, default: 'We connect global communities to Africa through nature, culture, and human-centered experiences, both physically and virtually. Our goal is to make Africa more accessible, better understood, and meaningfully experienced.' }
  },
  wellness: {
    bannerImage: { type: String, default: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=2000' },
    title: { type: String, default: 'Wellness Experiences' },
    subtitle: { type: String, default: 'Reconnect with nature and self through our curated wellness retreats.' },
    body: { type: String, default: 'Our wellness experiences integrate mental wellbeing, mindful practices, and authentic African healing traditions into your journey.' }
  },
  travelServices: {
    bannerImage: { type: String, default: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000' },
    title: { type: String, default: 'Flight & Visa Services' },
    subtitle: { type: String, default: 'Expert guidance for your journey.' },
    body: { type: String, default: 'We provide comprehensive assistance with domestic and international flight bookings, as well as visa application support.' }
  },
  contact: {
    email: { type: String, default: 'info@afrivibesafaris.com' },
    phone: { type: String, default: '+254 742 009 497' },
    address: { type: String, default: 'Nairobi, Kenya' }
  }
}, { timestamps: true });

export default mongoose.model('SiteSettings', siteSettingsSchema);
