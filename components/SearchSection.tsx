import React, { useState } from 'react';
import { RWANDA_CITIES, TRANSPORT_COMPANIES } from '../constants';
import type { SearchParams } from '../types';
import { ArrowRightLeftIcon, BusIcon, CalendarIcon, MapPinIcon } from './icons';

interface SearchSectionProps {
  onSearch: (params: SearchParams) => void;
}

const CompaniesSection: React.FC = () => {
    return (
        <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Ibifatanyabikorwa byacu mu gutwara abantu</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {TRANSPORT_COMPANIES.map(company => (
                    <div key={company.name} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                        <div className="relative h-24 md:h-32">
                           <img src={company.busImageUrl} alt={`${company.name} bus`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        </div>
                        <div className="p-4 flex items-center space-x-3">
                           <img src={company.logoUrl} alt={`${company.name} logo`} className="h-10 w-10 object-contain" />
                           <h3 className="font-bold text-gray-700 text-sm md:text-base">{company.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [from, setFrom] = useState('Kigali');
  const [to, setTo] = useState('Huye');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLocating, setIsLocating] = useState(false);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition((position) => {
      // For this mock app, we'll just set it to Kigali as an example.
      // A real app would use a reverse geocoding service.
      setFrom('Kigali');
      setIsLocating(false);
      alert("Aho uherereye habonetse nka Kigali (simulation).");
    }, () => {
      alert("Unable to retrieve your location.");
      setIsLocating(false);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, date });
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 -mt-24 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Fata Itike y'urugendo rwawe mu Rwanda</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 items-end">
            
            <div className="lg:col-span-3">
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">Uva</label>
                <div className="relative flex items-center">
                    <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 z-10"/>
                    <select id="from" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition">
                        {RWANDA_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                     <button type="button" onClick={handleGeolocate} disabled={isLocating} className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-800 disabled:opacity-50 p-1" title="Koresha aho ndi">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </button>
                </div>
            </div>

            <div className="lg:col-span-1 flex justify-center items-center pt-5">
                <button type="button" onClick={handleSwap} className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition">
                    <ArrowRightLeftIcon className="w-6 h-6"/>
                </button>
            </div>
            
            <div className="lg:col-span-3">
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">Ujya</label>
                <div className="relative">
                    <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    <select id="to" value={to} onChange={(e) => setTo(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition">
                        {RWANDA_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="lg:col-span-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Itariki</label>
                <div className="relative">
                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition"/>
                </div>
            </div>

            <div className="lg:col-span-2">
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2 text-lg">
                    <BusIcon className="w-6 h-6"/>
                    <span>Shakisha</span>
                </button>
            </div>

        </form>
        <CompaniesSection />
    </section>
  );
};