import React, { useState } from 'react';
import type { Seat } from '../types';
import { ArmchairIcon } from './icons';

interface SeatLayoutProps {
  seats: Seat[];
  onBookNow: (selectedSeats: Seat[]) => void;
}

export const SeatLayout: React.FC<SeatLayoutProps> = ({ seats, onBookNow }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSelectSeat = (seat: Seat) => {
    if (seat.isBooked) return;

    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        if (prev.length < 5) { // Limit to 5 seats per booking
            return [...prev, seat];
        }
        alert("You can select a maximum of 5 seats.");
        return prev;
      }
    });
  };

  const getSeatClass = (seat: Seat) => {
    if (seat.isBooked) return 'text-gray-400 cursor-not-allowed';
    if (selectedSeats.some(s => s.id === seat.id)) return 'text-orange-500';
    return 'text-gray-600 hover:text-orange-400 cursor-pointer';
  };

  return (
    <div className="border-t md:border-t-0 border-gray-200 mt-4 pt-4 md:mt-0 md:pt-0">
      <h4 className="font-bold text-lg mb-4 text-center">Select Your Seats</h4>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow grid grid-cols-5 gap-2 justify-center max-w-xs mx-auto">
          {/* Driver seat placeholder */}
          <div className="col-span-1"></div>
          <div className="col-span-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-700">
                <path fill="currentColor" d="M18,18.5a1.5,1.5 0 0,1 -1.5,1.5a1.5,1.5 0 0,1 -1.5,-1.5a1.5,1.5 0 0,1 1.5,-1.5a1.5,1.5 0 0,1 1.5,1.5M12.89,3.5l-3.39,3.39c-0.39,0.39 -0.39,1.02 0,1.41l2.5,2.5l-2.89,2.89l-4.11,-4.11c-0.39,-0.39 -1.02,-0.39 -1.41,0l-2.09,2.09c-0.39,0.39 -0.39,1.02 0,1.41l6.29,6.29c0.39,0.39 1.02,0.39 1.41,0l2.09,-2.09c0.39,-0.39 0.39,-1.02 0,-1.41l-4.11,-4.11l2.89,-2.89l2.5,2.5c0.39,0.39 1.02,0.39 1.41,0l3.39,-3.39c0.39,-0.39 0.39,-1.02 0,-1.41l-2.09,-2.09c-0.38,-0.39 -1.02,-0.39 -1.4,0z" />
            </svg>
          </div>
          
          {seats.map((seat, index) => (
            <div
              key={seat.id}
              onClick={() => handleSelectSeat(seat)}
              className={`flex flex-col items-center justify-center ${index % 4 === 1 ? 'mr-4' : ''}`}
            >
              <ArmchairIcon className={`w-8 h-8 transition-colors ${getSeatClass(seat)}`} />
              <span className="text-xs">{seat.number}</span>
            </div>
          ))}
        </div>
        <div className="md:w-1/3 space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <h5 className="font-bold mb-2">Booking Summary</h5>
            <p>Selected Seats: <span className="font-semibold">{selectedSeats.map(s => s.number).join(', ') || 'None'}</span></p>
            <p>Total Seats: <span className="font-semibold text-orange-600">{selectedSeats.length}</span></p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center"><ArmchairIcon className="w-5 h-5 text-gray-600 mr-2" /> Available</div>
            <div className="flex items-center"><ArmchairIcon className="w-5 h-5 text-orange-500 mr-2" /> Selected</div>
            <div className="flex items-center"><ArmchairIcon className="w-5 h-5 text-gray-400 mr-2" /> Booked</div>
          </div>
          <button
            onClick={() => onBookNow(selectedSeats)}
            disabled={selectedSeats.length === 0}
            className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Proceed to Book
          </button>
        </div>
      </div>
    </div>
  );
};