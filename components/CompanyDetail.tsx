
import React from 'react';
import type { Company } from '../types';
import { StarFullIcon } from './icons';

interface CompanyDetailProps {
    company: Company;
    onBack: () => void;
}

export const CompanyDetail: React.FC<CompanyDetailProps> = ({ company, onBack }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} className="text-orange-600 font-semibold hover:underline">
                    &larr; Subira ku bigo byose
                </button>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                     <img src={company.logo} alt={`${company.name} logo`} className="h-24 w-48 object-contain p-4 bg-gray-100 rounded-lg"/>
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{company.name}</h2>
                    <div className="flex items-center text-yellow-500 my-2">
                        <StarFullIcon className="w-5 h-5 mr-1"/>
                        <span className="font-bold text-lg">{company.rating}</span>
                        <span className="text-gray-500 ml-2">({company.totalBuses} Bisi)</span>
                    </div>
                    <p className="text-gray-600 max-w-prose">{company.description}</p>
                </div>
            </div>
            <div className="border-t my-8"></div>
            <div>
                <h3 className="text-xl font-bold mb-4">Inzira Zikunze</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {company.routes.map((route, index) => (
                        <div key={index} className="bg-orange-50 p-4 rounded-lg">
                            <p className="font-semibold">{route.from} &rarr; {route.to}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
