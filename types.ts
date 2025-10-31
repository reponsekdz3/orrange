
export type Page = 'dashboard' | 'my-bookings' | 'companies' | 'account' | 'tracking' | 'company-detail';

export interface Seat {
  id: string;
  number: string;
  isBooked: boolean;
}

export interface Bus {
  id: string;
  operator: string;
  rating: number;
  amenities: {
    wifi: boolean;
    ac: boolean;
    power: boolean;
  };
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  price: number;
  seats: Seat[];
}

export interface Booking {
  id: string;
  bus: Bus;
  seats: Seat[];
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled' | 'Pending';
  userRating?: number;
}

export interface Company {
    id: string;
    name: string;
    logo: string;
    rating: number;
    totalBuses: number;
    description: string;
    routes: { from: string; to: string }[];
}
