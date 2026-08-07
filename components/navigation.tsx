"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import ARGISLOGO from '@/public/ARGIS-DARK.png';
import { LogOut, Pen, Table2, Menu, X } from 'lucide-react';

interface NavbarAdvancedProps {
  title?: string;
  location?: string;
  onLogout?: () => void;
  onDrawBoundary?: () => void;
  onEnableTabularForm?: () => void;
  onSidebarToggle?: (isOpen: boolean) => void;
}

export default function NavbarAdvanced({
  title = 'ARGIS',
  location = 'CSD Handlers',
  onLogout,
  onDrawBoundary,
  onEnableTabularForm,
  onSidebarToggle,
}: NavbarAdvancedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    onSidebarToggle?.(!isOpen);
  };

  const handleLogout = () => {
    setIsLoading(true);
    onLogout?.();
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Left Section - Logo and Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-gray-600" />
              ) : (
                <Menu size={24} className="text-gray-600" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center w-12 h-12 overflow-hidden flex-shrink-0 ">
              <Image src={ARGISLOGO} alt="ARGIS" width={40} height={40} className="object-contain" />
            </div>

            {/* Title - Hidden on mobile, shown on tablet and up */}
            <div className="hidden sm:flex flex-col min-w-0">
              <h1 className="text-sm font-semibold text-slate-700 truncate">
                {title}
              </h1>
              <p className="text-xs text-slate-500 truncate">
                {title} · {location}
              </p>
            </div>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Enable Tabular Form Button - Hidden on mobile */}
            <button
              onClick={onEnableTabularForm}
              className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-colors whitespace-nowrap"
              title="Enable Tabular Form"
            >
              <Table2 size={18} className="flex-shrink-0" />
              <span className="hidden md:inline">Enable Tabular Form</span>
            </button>

            {/* Draw Boundary Button - Icon only on mobile */}
            <button
              onClick={onDrawBoundary}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-colors whitespace-nowrap"
              title="Draw boundary"
            >
              <Pen size={18} className="flex-shrink-0" />
              <span className="hidden md:inline">Draw boundary</span>
            </button>

            {/* Logout Button - Icon only on mobile */}
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-50 border border-transparent rounded-2xl hover:bg-[#D4AF37] hover:text-black hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              title="Logout"
            >
              <LogOut size={18} className="flex-shrink-0" />
              <span className="hidden md:inline">{isLoading ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shown when isOpen is true */}
        {isOpen && (
          <div className="lg:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-3">
            {/* Mobile Title */}
            <div className="sm:hidden px-2 py-2 border-b border-gray-200">
              <h1 className="text-sm font-semibold text-gray-900">
                {title}
              </h1>
              <p className="text-xs text-gray-600">
                {title} · {location}
              </p>
            </div>

            {/* Mobile Buttons */}
            <button
              onClick={onEnableTabularForm}
              className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              <Table2 size={18} />
              <span>Enable Tabular Form</span>
            </button>
            <button
              onClick={onDrawBoundary}
              className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              <Pen size={18} />
              <span>Draw boundary</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-2xl hover:bg-[#D4AF37] hover:text-black hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut size={18} />
              <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
