import React from 'react';
import type { Bus } from '../types';
import { ClockIcon, StarIcon, WifiIcon, SnowflakeIcon, ZapIcon } from './icons';

interface BusCardProps {
  bus: Bus;
  isExpanded: boolean;
  onToggleSeats: () => void;
}

const Amenities: React.FC<{ amenities: Bus['amenities'] }> = ({ amenities }) => (
    <div className="flex items-center space-x-2 text-gray-500 mt-1">
        {amenities.wifi && <WifiIcon className="w-4 h-4" title="WiFi available"/>}
        {amenities.ac && <SnowflakeIcon className="w-4 h-4" title="Air Conditioning"/>}
        {amenities.power && <ZapIcon className="w-4 h-4" title="Power Outlets"/>}
    </div>
);


export const BusCard: React.FC<BusCardProps> = ({ bus, isExpanded, onToggleSeats }) => {
  const availableSeats = bus.seats.filter(s => !s.isBooked).length;

  return (
    <div className={`bg-white p-4 md:p-6 shadow-md transition-all duration-300 ${isExpanded ? 'rounded-t-lg' : 'rounded-lg'}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
          <h3 className="font-bold text-lg text-gray-800">{bus.operator}</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-yellow-500">
              <StarIcon className="w-4 h-4 mr-1 fill-current" />
              <span>{bus.rating}</span>
            </div>
            <Amenities amenities={bus.amenities} />
          </div>
        </div>
        
        <div className="md:col-span-5 flex items-center justify-between md:justify-center space-x-2 text-center">
            <div>
                <p className="font-bold text-xl">{bus.departureTime}</p>
                <p className="text-gray-600 text-sm">{bus.from}</p>
            </div>
            <div className="flex-grow text-center text-gray-500 px-2">
                <ClockIcon className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs">{bus.duration}</p>
                <div className="w-full h-px bg-gray-300 mt-1"></div>
            </div>
            <div>
                <p className="font-bold text-xl">{bus.arrivalTime}</p>
                <p className="text-gray-600 text-sm">{bus.to}</p>
            </div>
        </div>
        
        <div className="md:col-span-2 text-center">
          <p className="font-bold text-xl text-orange-600">{bus.price} RWF</p>
          <p className="text-sm text-gray-500">ku mwanya</p>
        </div>

        <div className="md:col-span-2 text-center md:text-right">
          <button
            onClick={onToggleSeats}
            className="w-full md:w-auto bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            {isExpanded ? 'Hisha Imyanya' : 'Reba Imyanya'}
          </button>
          <p className="text-sm text-green-600 mt-2">{availableSeats} imyanya irahari</p>
        </div>
      </div>
    </div>
  );
};