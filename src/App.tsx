import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Country from './pages/Country';
import DestinationDetail from './pages/DestinationDetail';
import TripPlanner from './pages/TripPlanner';
import VirtualSafari from './pages/VirtualSafari';
import Blog from './pages/Blog';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:country" element={<Country />} />
          <Route path="/destinations/:country/:destinationId" element={<DestinationDetail />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/virtual-safari" element={<VirtualSafari />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
