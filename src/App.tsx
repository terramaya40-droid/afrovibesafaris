import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Country from './pages/Country';
import DestinationDetail from './pages/DestinationDetail';
import TripPlanner from './pages/TripPlanner';
import VirtualSafari from './pages/VirtualSafari';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Wellness from './pages/Wellness';
import TravelServices from './pages/TravelServices';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Admin login — outside Layout (full-screen) */}
        <Route path="/001/admin/login" element={<AdminLogin />} />

        {/* Protected admin dashboard — outside Layout */}
        <Route
          path="/001/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* All public pages inside the main Layout (Navbar + Footer) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/destinations" element={<Layout><Destinations /></Layout>} />
        <Route path="/destinations/:country" element={<Layout><Country /></Layout>} />
        <Route path="/destinations/:country/:destinationId" element={<Layout><DestinationDetail /></Layout>} />
        <Route path="/trip-planner" element={<Layout><TripPlanner /></Layout>} />
        <Route path="/virtual-safari" element={<Layout><VirtualSafari /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/blog/:slug" element={<Layout><Blog /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/wellness" element={<Layout><Wellness /></Layout>} />
        <Route path="/travel-services" element={<Layout><TravelServices /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
