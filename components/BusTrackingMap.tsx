
import React, { useEffect, useState } from 'react';
import type { Booking } from '../types';
import { BusIcon } from './icons';

interface BusTrackingMapProps {
    booking: Booking;
    onBack: () => void;
}

export const BusTrackingMap: React.FC<BusTrackingMapProps> = ({ booking, onBack }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const estimatedTime = "15 mins";

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Live Bus Tracking</h2>
                <button onClick={onBack} className="text-orange-600 font-semibold hover:underline">
                    &larr; Back to Bookings
                </button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="font-bold">{booking.bus.operator} - {booking.bus.from} to {booking.bus.to}</p>
                <p className="text-sm text-gray-600">Status: <span className="text-green-600 font-semibold">On Time</span></p>
                <p className="text-sm text-gray-600">Estimated Arrival: <span className="font-semibold">{booking.bus.arrivalTime}</span> ({estimatedTime} remaining)</p>
            </div>

            <div className="relative p-8 overflow-hidden">
                {/* Background Map SVG */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                
                {/* Route Line */}
                <div className="relative flex items-center h-16">
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rounded-full"></div>
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 h-1 bg-orange-500 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>

                    {/* Start and End Points */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 flex flex-col items-center">
                        <div className="w-4 h-4 bg-gray-800 rounded-full border-2 border-white"></div>
                        <span className="text-sm font-semibold mt-2">{booking.bus.from}</span>
                    </div>
                     <div className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-0 flex flex-col items-center">
                        <div className="w-4 h-4 bg-gray-800 rounded-full border-2 border-white"></div>
                        <span className="text-sm font-semibold mt-2">{booking.bus.to}</span>
                    </div>

                    {/* Bus Icon */}
                    <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-linear"
                        style={{ left: `${progress}%` }}
                    >
                       <BusIcon className="w-8 h-8 text-orange-600 -rotate-45" />
                    </div>
                </div>
            </div>
        </div>
    );
};
