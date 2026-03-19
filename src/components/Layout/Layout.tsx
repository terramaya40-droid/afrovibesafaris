import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteModal from '../Shared/QuoteModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <QuoteModal />
    </div>
  );
};

export default Layout;
