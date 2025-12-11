import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Event, Ticket } from '../types';
import { MOCK_EVENTS, MOCK_USERS } from '../data/mockData';

interface AppContextType {
  user: User | null;
  events: Event[];
  tickets: Ticket[];
  login: (email: string, role: 'admin' | 'user') => void;
  logout: () => void;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  rsvpEvent: (eventId: string, amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const login = (email: string, role: 'admin' | 'user') => {
    // Simulating login
    const foundUser = MOCK_USERS.find(u => u.role === role) || {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role
    };
    setUser(foundUser);
  };

  const logout = () => setUser(null);

  const addEvent = (event: Event) => {
    setEvents([...events, { ...event, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const rsvpEvent = (eventId: string, amount: number) => {
    if (!user) return;
    const newTicket: Ticket = {
      id: Math.random().toString(36).substr(2, 9),
      eventId,
      userId: user.id,
      purchaseDate: new Date().toISOString(),
      amountPaid: amount,
      status: 'confirmed',
      qrCodeData: JSON.stringify({ eventId, userId: user.id, timestamp: Date.now() })
    };
    setTickets([...tickets, newTicket]);
    
    // Update attendee count
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e
    ));
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      events, 
      tickets, 
      login, 
      logout, 
      addEvent, 
      updateEvent, 
      deleteEvent, 
      rsvpEvent 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
