
import React from 'react';
import type { Seat } from '../types';

interface SeatLayoutProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

const SeatComponent: React.FC<{ seat: Seat; isSelected: boolean; onSelect: () => void }> = ({ seat, isSelected, onSelect }) => {
  const baseClasses = "w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center font-bold text-sm transition-colors duration-200";
  const bookedClasses = "bg-gray-300 text-gray-500 cursor-not-allowed";
  const availableClasses = "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer";
  const selectedClasses = "bg-orange-500 text-white ring-2 ring-orange-500 ring-offset-2";
  
  let seatClass = '';
  if (seat.isBooked) seatClass = bookedClasses;
  else if (isSelected) seatClass = selectedClasses;
  else seatClass = availableClasses;

  return (
    <div
      className={`${baseClasses} ${seatClass}`}
      onClick={() => !seat.isBooked && onSelect()}
    >
      {seat.number.slice(0, -1)}<span className="opacity-70">{seat.number.slice(-1)}</span>
    </div>
  );
};


export const SeatLayout: React.FC<SeatLayoutProps> = ({ seats, selectedSeats, onSeatSelect }) => {
  // Assuming a 4-column layout with an aisle (A, C, D)
  const seatGrid: (Seat | null)[][] = [];
  const rows = Math.max(...seats.map(s => parseInt(s.number.slice(0, -1))));
  
  for (let i = 0; i < rows; i++) {
    seatGrid.push([null, null, null, null]);
  }

  seats.forEach(seat => {
      const row = parseInt(seat.number.slice(0, -1)) - 1;
      const colChar = seat.number.slice(-1);
      let col = -1;
      if (colChar === 'A') col = 0;
      if (colChar === 'C') col = 2;
      if (colChar === 'D') col = 3;
      
      if(row >= 0 && row < seatGrid.length && col !== -1) {
        seatGrid[row][col] = seat;
      }
  });

  return (
    <div className="bg-gray-50 p-4 md:p-6 rounded-b-lg">
      <h4 className="font-bold text-lg mb-4 text-center">Hitamo Umwanya</h4>
      <div className="flex justify-center items-center space-x-6 mb-4 text-sm">
        <div className="flex items-center"><div className="w-4 h-4 bg-green-100 border border-green-300 rounded mr-2"></div><span>Uhari</span></div>
        <div className="flex items-center"><div className="w-4 h-4 bg-orange-500 rounded mr-2"></div><span>Wahisemo</span></div>
        <div className="flex items-center"><div className="w-4 h-4 bg-gray-300 rounded mr-2"></div><span>Wafashwe</span></div>
      </div>
      <div className="flex justify-center">
        <div className="p-4 bg-white rounded-lg shadow-inner inline-block">
          <div className="flex justify-between mb-4 px-1">
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center font-bold text-xs">Umushoferi</div>
              <div className="w-10 h-10"></div>
          </div>
          <div className="space-y-2">
            {seatGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 md:gap-4 justify-center items-center">
                {row.map((seat, colIndex) => {
                  if (colIndex === 1) return <div key={colIndex} className="w-4 md:w-6"></div> // Aisle
                  if (!seat) return <div key={colIndex} className="w-8 h-8 md:w-10 md:h-10"></div>;
                  return (
                    <SeatComponent 
                      key={seat.id} 
                      seat={seat} 
                      isSelected={selectedSeats.some(s => s.id === seat.id)} 
                      onSelect={() => onSeatSelect(seat)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
