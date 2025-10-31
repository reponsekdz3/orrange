
import React from 'react';
import type { Bus, Seat } from '../types';

interface BookingModalProps {
  bus: Bus;
  selectedSeats: Seat[];
  onConfirm: () => void;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ bus, selectedSeats, onConfirm, onClose }) => {
  const totalPrice = bus.price * selectedSeats.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">Emeza Itike Yawe</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-semibold">{bus.operator}</h4>
            <p className="text-sm text-gray-600">{bus.from} &rarr; {bus.to}</p>
            <p className="text-sm text-gray-600">{bus.departureTime} - {bus.arrivalTime}</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p><span className="font-semibold">Imyanya:</span> {selectedSeats.map(s => s.number).join(', ')} ({selectedSeats.length})</p>
            <p><span className="font-semibold">Igiciro Cyose:</span> <span className="text-orange-600 font-bold">{totalPrice.toLocaleString()} RWF</span></p>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Numero ya Terefone</label>
            <input type="tel" id="phone" placeholder="078..." className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>
        <div className="p-6 bg-gray-50 rounded-b-lg flex gap-4">
          <button onClick={onClose} className="w-full py-2 px-4 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300">Hagarika</button>
          <button onClick={onConfirm} className="w-full py-2 px-4 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600">Emeza</button>
        </div>
      </div>
    </div>
  );
};
