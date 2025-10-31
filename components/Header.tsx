
import React from 'react';
import type { Page } from '../types';

interface HeaderProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    const navItems: { page: Page, label: string }[] = [
        { page: 'dashboard', label: 'Ahabanza' },
        { page: 'my-bookings', label: 'Amatike Yanjye' },
        { page: 'companies', label: 'Amakompanyi' },
        { page: 'account', label: 'Konti Yanjye' },
    ];

    return (
        <header className="bg-white shadow-md mb-8">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="font-bold text-2xl text-orange-600">Twende</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                           {navItems.map(item => (
                               <button 
                                 key={item.page}
                                 onClick={() => onNavigate(item.page)}
                                 className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === item.page ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-100'}`}
                               >
                                 {item.label}
                               </button>
                           ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
