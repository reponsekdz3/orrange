
import React from 'react';

interface SearchSectionProps {
    onSearch: () => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-1">
                    <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">Aho Uva</label>
                    <input type="text" id="from" defaultValue="Kigali" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">Aho Ujya</label>
                    <input type="text" id="to" defaultValue="Musanze" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Itariki</label>
                    <input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="md:col-span-1">
                    <button onClick={onSearch} className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                        Shakisha Ingendo
                    </button>
                </div>
            </div>
        </div>
    );
};
