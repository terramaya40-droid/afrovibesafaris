import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteModal from '../Shared/QuoteModal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  // Pages with a full-bleed hero that should go under the navbar
  const isHeroPage = pathname === '/' || pathname === '/testimonials';

  return (
    <div className="layout">
      <ScrollToTop />
      <Navbar />
      <main className="main-content" style={{ paddingTop: isHeroPage ? '0' : '80px', minHeight: 'calc(100vh - 400px)' }}>
        {children}
      </main>
      <Footer />
      <QuoteModal />
    </div>
  );
};

export default Layout;
