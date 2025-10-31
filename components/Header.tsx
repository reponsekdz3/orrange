
import React from 'react';
import type { Page } from '../types';
import { BusIcon } from './icons';

interface HeaderProps {
    activePage: Page;
    onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{ text: string; isActive: boolean; onClick: () => void }> = ({ text, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${isActive ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-orange-100'}`}>
        {text}
    </button>
);

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
    return (
        <header className="bg-white shadow-md mb-8">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-orange-600 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                    <BusIcon className="w-8 h-8"/>
                    <span className="text-2xl font-bold">Twende</span>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                    <NavItem text="Dashboard" isActive={activePage === 'dashboard'} onClick={() => onNavigate('dashboard')} />
                    <NavItem text="Amatike Yanjye" isActive={activePage === 'my-bookings'} onClick={() => onNavigate('my-bookings')} />
                    <NavItem text="Ibigo" isActive={activePage === 'companies'} onClick={() => onNavigate('companies')} />
                    <NavItem text="Konti" isActive={activePage === 'account'} onClick={() => onNavigate('account')} />
                </div>
            </nav>
        </header>
    );
};
