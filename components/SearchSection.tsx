
import React, { useState } from 'react';
import { DESTINATIONS } from '../constants';

interface SearchSectionProps {
    onSearch: (from: string, to: string, date: string) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
    const [from, setFrom] = useState('Kigali');
    const [to, setTo] = useState('Musanze');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(from, to, date);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 items-end">
                <div className="lg:col-span-3">
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">Uva</label>
                    <select id="from" value={from} onChange={e => setFrom(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div className="lg:col-span-3">
                     <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">Ujya</label>
                    <select id="to" value={to} onChange={e => setTo(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        {DESTINATIONS.filter(d => d !== from).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2 lg:col-span-2">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Itariki</label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                </div>
                <div className="md:col-span-2 lg:col-span-2">
                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                        Shaka Bisi
                    </button>
                </div>
            </form>
        </div>
    );
};
