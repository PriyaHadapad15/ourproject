import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/Button';
import { Event, Coordinator } from '../../types';
import { Plus, Trash2, Edit2, Users, DollarSign, Tag, MapPin, Calendar, Phone, Mail } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { format } from 'date-fns';

export function AdminDashboard() {
  const { events, deleteEvent, addEvent, updateEvent } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const openModal = (event?: Event) => {
    setEditingEvent(event || null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage events, coordinators, and track RSVPs.</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" /> Create Event
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <p className="text-2xl font-semibold text-gray-900">{events.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full text-green-600">
              <Users className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Attendees</p>
              <p className="text-2xl font-semibold text-gray-900">
                {events.reduce((acc, curr) => acc + curr.attendees, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue (Est.)</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(events.reduce((acc, curr) => acc + (curr.price * curr.attendees), 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Events</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 truncate">{event.title}</h4>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.price > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {event.price > 0 ? formatCurrency(event.price) : 'Free'}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6 text-sm text-gray-500 mb-2">
                    <div className="flex items-center mt-1">
                      <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {format(new Date(event.date), 'PPP p')}
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {event.location}
                    </div>
                    <div className="flex items-center mt-1">
                      <Users className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {event.attendees} Registered
                    </div>
                  </div>
                  {event.offer && (
                    <div className="flex items-center text-sm text-indigo-600 font-medium mt-1">
                      <Tag className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {event.offer}
                    </div>
                  )}
                  
                  {/* Coordinators Info */}
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Coordinators</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {event.coordinators.map((coord, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex flex-col">
                          <span className="font-medium text-gray-900">{coord.name}</span>
                          <span className="flex items-center text-xs"><Phone className="w-3 h-3 mr-1"/> {coord.phone}</span>
                          <span className="flex items-center text-xs"><Mail className="w-3 h-3 mr-1"/> {coord.email}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ml-6 flex items-center space-x-3">
                  <Button variant="outline" size="sm" onClick={() => openModal(event)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <EventModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          event={editingEvent}
          onSave={(data) => {
            if (editingEvent) {
              updateEvent({ ...editingEvent, ...data });
            } else {
              addEvent({ ...data, id: '', attendees: 0 } as Event);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

// Simple Modal Component for Event Form
function EventModal({ isOpen, onClose, event, onSave }: { isOpen: boolean; onClose: () => void; event: Event | null; onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || '',
    location: event?.location || '',
    price: event?.price || 0,
    category: event?.category || '',
    offer: event?.offer || '',
    image: event?.image || '',
    coordinators: event?.coordinators || [{ name: '', phone: '', email: '' }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit} className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {event ? 'Edit Event' : 'Create New Event'}
            </h3>
            <div className="space-y-4">
              <input 
                placeholder="Event Title" 
                className="w-full border rounded p-2" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                required 
              />
              <textarea 
                placeholder="Description" 
                className="w-full border rounded p-2" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                required 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="datetime-local" 
                  className="w-full border rounded p-2" 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})} 
                  required 
                />
                <input 
                  type="number" 
                  placeholder="Price ($)" 
                  className="w-full border rounded p-2" 
                  value={formData.price} 
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})} 
                  required 
                />
              </div>
              <input 
                placeholder="Location" 
                className="w-full border rounded p-2" 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
                required 
              />
              <input 
                placeholder="Category" 
                className="w-full border rounded p-2" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                required 
              />
              <input 
                placeholder="Special Offer (Optional)" 
                className="w-full border rounded p-2" 
                value={formData.offer} 
                onChange={e => setFormData({...formData, offer: e.target.value})} 
              />
              <input 
                placeholder="Image URL" 
                className="w-full border rounded p-2" 
                value={formData.image} 
                onChange={e => setFormData({...formData, image: e.target.value})} 
              />
              
              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Coordinator Details</p>
                <input 
                  placeholder="Name" 
                  className="w-full border rounded p-2 mb-2" 
                  value={formData.coordinators[0].name} 
                  onChange={e => {
                    const newCoords = [...formData.coordinators];
                    newCoords[0].name = e.target.value;
                    setFormData({...formData, coordinators: newCoords});
                  }} 
                  required 
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    placeholder="Phone" 
                    className="w-full border rounded p-2" 
                    value={formData.coordinators[0].phone} 
                    onChange={e => {
                      const newCoords = [...formData.coordinators];
                      newCoords[0].phone = e.target.value;
                      setFormData({...formData, coordinators: newCoords});
                    }} 
                    required 
                  />
                  <input 
                    placeholder="Email" 
                    className="w-full border rounded p-2" 
                    value={formData.coordinators[0].email} 
                    onChange={e => {
                      const newCoords = [...formData.coordinators];
                      newCoords[0].email = e.target.value;
                      setFormData({...formData, coordinators: newCoords});
                    }} 
                    required 
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Save Event</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
