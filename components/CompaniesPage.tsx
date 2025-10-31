
import React from 'react';
import { COMPANIES } from '../constants';
import type { Company } from '../types';
import { StarFullIcon } from './icons';

interface CompaniesPageProps {
    onSelectCompany: (company: Company) => void;
}

const CompanyCard: React.FC<{ company: Company, onSelect: () => void }> = ({ company, onSelect }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={onSelect}>
        <img src={company.logo} alt={`${company.name} logo`} className="h-16 w-32 object-contain mb-4"/>
        <h3 className="font-bold text-lg">{company.name}</h3>
        <div className="flex items-center text-yellow-500 my-1">
            <StarFullIcon className="w-4 h-4 mr-1"/>
            <span>{company.rating}</span>
        </div>
        <p className="text-sm text-gray-500">{company.totalBuses} Bisi</p>
    </div>
);

export const CompaniesPage: React.FC<CompaniesPageProps> = ({ onSelectCompany }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Ibigo By'Ingendo</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {COMPANIES.map(company => (
                    <CompanyCard key={company.id} company={company} onSelect={() => onSelectCompany(company)} />
                ))}
            </div>
        </div>
    );
};
