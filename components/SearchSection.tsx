
import React, { useState } from 'react';
import { RWANDA_CITIES } from '../constants';
import type { SearchParams } from '../types';
import { ArrowRightLeftIcon, BusIcon, CalendarIcon, MapPinIcon } from './icons';

interface SearchSectionProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('Kigali');
  const [to, setTo] = useState('Huye');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, date });
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 -mt-16 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Book Your Journey in Rwanda</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 items-end">
            
            <div className="lg:col-span-3">
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <div className="relative">
                    <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    <select id="from" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition">
                        {RWANDA_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
            </div>

            <div className="lg:col-span-1 flex justify-center items-center pt-5">
                <button type="button" onClick={handleSwap} className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition">
                    <ArrowRightLeftIcon className="w-6 h-6"/>
                </button>
            </div>
            
            <div className="lg:col-span-3">
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <div className="relative">
                    <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    <select id="to" value={to} onChange={(e) => setTo(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition">
                        {RWANDA_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="relative">
                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition"/>
                </div>
            </div>

            <div className="lg:col-span-2">
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2 text-lg">
                    <BusIcon className="w-6 h-6"/>
                    <span>Search</span>
                </button>
            </div>

        </form>
    </section>
  );
};
