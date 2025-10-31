
import React, { useState } from 'react';
import type { Bus, Seat } from '../types';
import { BusCard } from './BusCard';
import { SeatLayout } from './SeatLayout';

interface BusListProps {
  buses: Bus[];
  onBookNow: (bus: Bus, selectedSeats: Seat[]) => void;
}

export const BusList: React.FC<BusListProps> = ({ buses, onBookNow }) => {
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);

  const toggleSeats = (busId: string) => {
    setExpandedBusId(prevId => (prevId === busId ? null : busId));
  };
  
  const handleBookNow = (selectedSeats: Seat[]) => {
    if (expandedBusId) {
        const bus = buses.find(b => b.id === expandedBusId);
        if (bus) {
            onBookNow(bus, selectedSeats);
        }
    }
  };

  return (
    <div className="mt-8 space-y-4">
      {buses.map(bus => (
        <div key={bus.id}>
          <BusCard 
            bus={bus} 
            isExpanded={expandedBusId === bus.id}
            onToggleSeats={() => toggleSeats(bus.id)} 
          />
          {expandedBusId === bus.id && (
            <div className="bg-white p-4 md:p-6 shadow-md rounded-b-lg">
                <SeatLayout seats={bus.seats} onBookNow={handleBookNow} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
