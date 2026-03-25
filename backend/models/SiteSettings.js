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
    services: {
      type: [{ 
        title: String, 
        description: String, 
        image: String, 
        link: String 
      }],
      default: [
        { id: 'safaris', title: 'Safaris & Tours', description: 'Curated wildlife adventures.', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800', link: '/destinations' },
        { id: 'virtual', title: 'Virtual Safaris', description: 'Remote African experiences.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', link: '/virtual-safari' },
        { id: 'wellness', title: 'Wellness Experiences', description: 'Reconnect with nature and self.', image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=800', link: '/wellness' },
        { id: 'flights', title: 'Flight Booking', description: 'Domestic & international flights.', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800', link: '/travel-services' },
        { id: 'visa', title: 'Visa Assistance', description: 'Expert guidance for your journey.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800', link: '/travel-services' }
      ]
    },
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
    address: { type: String, default: 'Nairobi, Kenya' },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com/afrovibesafaris' },
      facebook: { type: String, default: 'https://facebook.com/afrovibesafaris' },
      youtube: { type: String, default: 'https://youtube.com/@afrovibesafaris' },
      tripadvisor: { type: String, default: '#' }
    },
    whatsapp: {
      phone: { type: String, default: '254742009497' },
      message: { type: String, default: 'Hello AfriVibe Safaris!' }
    }
  },
  virtualSafari: {
    bannerImage: { type: String, default: 'https://images.unsplash.com/photo-1547471080-7fc2dd0102ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' },
    title: { type: String, default: 'Virtual Safaris' },
    subtitle: { type: String, default: 'Bring the magic of Africa directly to your classroom, living room, or office.' },
    experiences: {
      type: [{
        title: String,
        location: String,
        duration: String,
        image: String,
        pricing: {
          nonRes: String,
          res: String,
          cit: String
        }
      }],
      default: [
        { title: 'Live Waterhole Cam', location: 'Tsavo West, Kenya', duration: '60 mins', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800', pricing: { nonRes: '$150', res: 'KES 5,000', cit: 'KES 3,000' } },
        { title: 'Gorilla Trek VR', location: 'Bwindi, Uganda', duration: '90 mins', image: 'https://images.unsplash.com/photo-1503918232442-118111139b51?auto=format&fit=crop&q=80&w=800', pricing: { nonRes: '$200', res: 'UGX 100,000', cit: 'UGX 50,000' } },
        { title: 'Serengeti Migration Stream', location: 'Tanzania', duration: '120 mins', image: 'https://images.unsplash.com/photo-1534177616072-ef7b14d49435?auto=format&fit=crop&q=80&w=800', pricing: { nonRes: '$300', res: 'TSH 150,000', cit: 'TSH 80,000' } }
      ]
    },
    howItWorks: {
      type: [{ title: String, description: String, icon: String }],
      default: [
        { title: 'Choose Experience', description: 'Select from our curated live or VR experiences.', icon: 'Globe' },
        { title: 'Book Session', description: 'Pick a date and time that works for your group.', icon: 'Video' },
        { title: 'Connect Live', description: 'Join our expert rangers via secure high-speed link.', icon: 'Users' }
      ]
    }
  }
}, { timestamps: true });

export default mongoose.model('SiteSettings', siteSettingsSchema);
