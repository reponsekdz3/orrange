
export type Page = 'dashboard' | 'my-bookings' | 'bus-tracking' | 'companies' | 'account';

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
  totalPrice: number;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
  userRating?: number;
}

export interface Company {
    name: string;
    logoUrl: string;
    busImageUrl: string;
}
