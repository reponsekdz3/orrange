import React, { useState } from 'react';
import type { Bus, Seat } from '../types';
import { BusCard } from './BusCard';
import { SeatLayout } from './SeatLayout';
import { MapPinIcon } from './icons';

interface BusListProps {
  buses: Bus[];
  onBookNow: (bus: Bus, seats: Seat[]) => void;
}

const RouteStops: React.FC<{ stops: string[] }> = ({ stops }) => (
  <div className="md:w-1/4 pr-8 border-r border-gray-200">
      <h4 className="font-bold text-lg mb-4 text-center">Aho Bisi Ihagarara</h4>
      <ul className="relative">
          {stops.map((stop, index) => (
              <li key={index} className="flex items-start pb-6 last:pb-0">
                  <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full z-10">
                          <MapPinIcon className="w-4 h-4" />
                      </div>
                      {index !== stops.length - 1 && (
                          <div className="w-px h-full bg-gray-300 absolute top-3 left-3"></div>
                      )}
                  </div>
                  <div className="pt-1 font-semibold">{stop}</div>
              </li>
          ))}
      </ul>
  </div>
);

export const BusList: React.FC<BusListProps> = ({ buses, onBookNow }) => {
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);

  const handleToggleSeats = (busId: string) => {
    setExpandedBusId(prev => (prev === busId ? null : busId));
  };

  if (buses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nta bisi zibonetse kuri uyu murongo. Gerageza bundi bushakashatsi.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-12">
      <h2 className="text-3xl font-bold text-gray-800">Ibisubizo by'ishakisha</h2>
      {buses.map(bus => (
        <div key={bus.id}>
          <BusCard
            bus={bus}
            isExpanded={expandedBusId === bus.id}
            onToggleSeats={() => handleToggleSeats(bus.id)}
          />
          {expandedBusId === bus.id && (
            <div className="bg-white p-4 md:p-6 rounded-b-lg shadow-md flex flex-col md:flex-row">
              <RouteStops stops={bus.stops} />
              <div className="flex-grow md:pl-8 mt-6 md:mt-0">
                <SeatLayout
                  seats={bus.seats}
                  onBookNow={(seats) => onBookNow(bus, seats)}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};