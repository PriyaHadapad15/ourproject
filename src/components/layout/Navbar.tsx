import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Calendar, LogOut, User as UserIcon, LayoutDashboard, Ticket } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">EventFlow</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-4 mr-4">
                  {user.role === 'admin' ? (
                    <Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center">
                      <LayoutDashboard className="w-4 h-4 mr-1" /> Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium">Events</Link>
                      <Link to="/my-tickets" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center">
                        <Ticket className="w-4 h-4 mr-1" /> My Tickets
                      </Link>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-3 border-l pl-4 border-gray-200">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
