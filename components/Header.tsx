
import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  const linkStyle = "text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors";
  const activeLinkStyle = "text-primary dark:text-primary font-semibold";

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="text-2xl font-bold text-primary">
            Bookify
          </NavLink>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
              Home
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
              Explore
            </NavLink>
            <NavLink to="/planner" className={({ isActive }) => (isActive ? `${activeLinkStyle} flex items-center` : `${linkStyle} flex items-center`)}>
              <SparklesIcon className="w-5 h-5 mr-1 text-yellow-500"/> AI Planner
            </NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Login</button>
            <button className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">Sign Up</button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
