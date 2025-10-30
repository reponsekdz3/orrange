
import React, { useState } from 'react';
import type { Bus, Seat } from '../types';
import { BusCard } from './BusCard';
import { SeatLayout } from './SeatLayout';

interface BusListProps {
  buses: Bus[];
  onBookNow: (bus: Bus, seats: Seat[]) => void;
}

export const BusList: React.FC<BusListProps> = ({ buses, onBookNow }) => {
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);

  const handleToggleSeats = (busId: string) => {
    setExpandedBusId(prev => (prev === busId ? null : busId));
  };

  if (buses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No buses found for this route. Try another search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {buses.map(bus => (
        <div key={bus.id}>
          <BusCard
            bus={bus}
            isExpanded={expandedBusId === bus.id}
            onToggleSeats={() => handleToggleSeats(bus.id)}
          />
          {expandedBusId === bus.id && (
            <div className="bg-white p-4 md:p-6 rounded-b-lg shadow-md">
              <SeatLayout
                seats={bus.seats}
                onBookNow={(seats) => onBookNow(bus, seats)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
