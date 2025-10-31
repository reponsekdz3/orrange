export interface Seat {
  id: string;
  number: string;
  isBooked: boolean;
}

export interface Bus {
  id: string;
  operator: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  seats: Seat[];
  amenities: {
    wifi: boolean;
    ac: boolean;
    power: boolean;
  };
  stops: string[];
  status: 'On Route' | 'Parked' | 'Maintenance';
  occupancy: number; // as a percentage, e.g., 85 for 85%
}

export interface Booking {
  id: string;
  bus: Bus;
  seats: Seat[];
  passengerName: string;
  passengerContact: string;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
  userRating?: number; // 1-5 stars
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
}

export enum View {
  SEARCH = 'search',
  BOOKINGS = 'bookings',
  COMPANIES = 'companies',
  ACCOUNT = 'account'
}