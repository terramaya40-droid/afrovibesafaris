import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      <div className="icon-container">
        {theme === 'light' ? (
          <Moon size={20} className="moon-icon" />
        ) : (
          <Sun size={20} className="sun-icon" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
