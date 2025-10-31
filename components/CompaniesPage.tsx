import React from 'react';

interface Company {
    name: string;
    logoUrl: string;
    busImageUrl: string;
}

interface CompaniesPageProps {
  companies: Company[];
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({ companies }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Amakompanyi y'Ingendo</h2>
      <p className="text-lg text-gray-600 mb-8">Bona urutonde rw'ibifatanyabikorwa byacu byizewe bitanga serivisi z'ingendo mu gihugu hose.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {companies.map(company => (
          <div 
            key={company.name} 
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
          >
            <div className="relative h-40">
              <img src={company.busImageUrl} alt={`${company.name} bus`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <img src={company.logoUrl} alt={`${company.name} logo`} className="h-12 w-auto max-w-[100px] object-contain bg-white/80 p-1 rounded-md" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">{company.name}</h3>
              <p className="text-sm text-orange-600 font-semibold mt-1">Reba ingendo zose</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};