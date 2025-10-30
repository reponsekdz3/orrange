
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
}

export interface Booking {
  id: string;
  bus: Bus;
  seats: Seat[];
  passengerName: string;
  passengerContact: string;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
}

export interface SearchParams {
  from: string;
  to: string;
  date: string;
}

export enum View {
  SEARCH = 'search',
  BOOKINGS = 'bookings',
  DASHBOARD = 'dashboard'
}
