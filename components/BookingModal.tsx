import React, { useState } from 'react';
import type { Bus, Seat } from '../types';
import { XIcon } from './icons';

interface BookingModalProps {
  bus: Bus;
  selectedSeats: Seat[];
  onClose: () => void;
  onConfirmBooking: (passengerName: string, passengerContact: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ bus, selectedSeats, onClose, onConfirmBooking }) => {
  const [passengerName, setPassengerName] = useState('');
  const [passengerContact, setPassengerContact] = useState('');

  const totalPrice = selectedSeats.length * bus.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passengerName.trim() && passengerContact.trim()) {
      onConfirmBooking(passengerName, passengerContact);
    } else {
      alert('Uzuza amakuru y\'umugenzi yose.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Emeza Itike Yawe</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <p><span className="font-semibold">{bus.operator}</span>: {bus.from} &rarr; {bus.to}</p>
            <p className="text-sm text-gray-500">{bus.departureTime} - {bus.arrivalTime}</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-md">
            <p>Imyanya: <span className="font-bold">{selectedSeats.map(s => s.number).join(', ')}</span></p>
            <p>Igiciro Cyose: <span className="font-bold text-orange-600 text-lg">{totalPrice} RWF</span></p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="passengerName" className="block text-sm font-medium text-gray-700">Izina ry'Umugenzi</label>
              <input 
                type="text" 
                id="passengerName" 
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="passengerContact" className="block text-sm font-medium text-gray-700">Nimero ya Terefone</label>
              <input 
                type="tel" 
                id="passengerContact" 
                value={passengerContact}
                onChange={(e) => setPassengerContact(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Emeza Wishyure
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};