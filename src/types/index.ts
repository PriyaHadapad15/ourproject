export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Coordinator {
  name: string;
  phone: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  category: string;
  image: string;
  coordinators: Coordinator[];
  offer?: string;
  attendees: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  purchaseDate: string;
  amountPaid: number;
  status: 'confirmed' | 'checked-in';
  qrCodeData: string;
}
