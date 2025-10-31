
import React, { useState } from 'react';
import type { Bus, Seat } from '../types';
import { BusCard } from './BusCard';
import { SeatLayout } from './SeatLayout';
import { BookingModal } from './BookingModal';

interface BusListProps {
  buses: Bus[];
  onBook: (bus: Bus, seats: Seat[]) => void;
}

export const BusList: React.FC<BusListProps> = ({ buses, onBook }) => {
  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Map<string, Seat[]>>(new Map());
  const [bookingBus, setBookingBus] = useState<Bus | null>(null);

  const toggleExpand = (busId: string) => {
    setExpandedBusId(prev => (prev === busId ? null : busId));
  };
  
  const handleSeatSelect = (busId: string, seat: Seat) => {
    const currentSelected = selectedSeats.get(busId) || [];
    const isSelected = currentSelected.some(s => s.id === seat.id);
    const newSelected = isSelected
      ? currentSelected.filter(s => s.id !== seat.id)
      : [...currentSelected, seat];
    setSelectedSeats(new Map(selectedSeats.set(busId, newSelected)));
  };

  const handleConfirmBooking = () => {
    if (bookingBus) {
        const seatsToBook = selectedSeats.get(bookingBus.id) || [];
        if (seatsToBook.length > 0) {
            onBook(bookingBus, seatsToBook);
        }
        setBookingBus(null);
    }
  };

  if (buses.length === 0) {
    return (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700">Nta Bisi Zibonetse</h3>
            <p className="text-gray-500 mt-2">Gerageza gushaka indi nzira cyangwa itariki.</p>
        </div>
    );
  }

  return (
    <div className="space-y-4">
      {buses.map(bus => {
        const isExpanded = expandedBusId === bus.id;
        const currentSelectedSeats = selectedSeats.get(bus.id) || [];
        return (
          <div key={bus.id}>
            <BusCard
              bus={bus}
              isExpanded={isExpanded}
              onToggleSeats={() => toggleExpand(bus.id)}
            />
            {isExpanded && (
              <>
                <SeatLayout 
                  seats={bus.seats} 
                  selectedSeats={currentSelectedSeats} 
                  onSeatSelect={(seat) => handleSeatSelect(bus.id, seat)}
                />
                <div className="bg-white p-4 rounded-b-lg shadow-md flex justify-end items-center">
                    <div className="text-right mr-4">
                        <p className="font-bold text-lg">{ (bus.price * currentSelectedSeats.length).toLocaleString() } RWF</p>
                        <p className="text-sm text-gray-500">{currentSelectedSeats.length} umwanya(imyanya) wahisemo</p>
                    </div>
                    <button 
                        onClick={() => setBookingBus(bus)}
                        disabled={currentSelectedSeats.length === 0}
                        className="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300 disabled:bg-orange-300 disabled:cursor-not-allowed"
                    >
                        Komeza
                    </button>
                </div>
              </>
            )}
          </div>
        );
      })}
      {bookingBus && (
        <BookingModal 
            bus={bookingBus}
            selectedSeats={selectedSeats.get(bookingBus.id) || []}
            onConfirm={handleConfirmBooking}
            onClose={() => setBookingBus(null)}
        />
      )}
    </div>
  );
};
