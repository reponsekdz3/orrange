import React from 'react';
import type { View } from '../types';
import { BusIcon } from './icons';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'search', label: 'Ahabanza', view: 'search' as View },
    { id: 'companies', label: 'Amakompanyi', view: 'companies' as View },
    { id: 'bookings', label: 'Amatike Yanjye', view: 'bookings' as View },
    { id: 'account', label: 'Konti Yanjye', view: 'account' as View },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentView('search' as View)}>
          <BusIcon className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-orange-600">Safiri</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.view)}
              className={`text-lg font-medium transition-colors duration-200 pb-1 ${
                currentView === item.view
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </header>
  );
};