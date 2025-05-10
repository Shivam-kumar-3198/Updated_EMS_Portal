import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LogOut, User as UserIcon, Bell, Settings, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ title }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-gradient-to-r from-red-400 to-blue-500 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-wider">{title}</h1>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
                <Bell size={20} />
              </button>
              
              {/* Settings */}
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200">
                <Settings size={20} />
              </button>
              
              {/* User Profile & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="hidden md:flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <UserIcon size={20} />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs opacity-75">{user.role}</div>
                    </div>
                  </div>
                  <Menu size={20} className="md:hidden" />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 md:hidden">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.role}</div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;