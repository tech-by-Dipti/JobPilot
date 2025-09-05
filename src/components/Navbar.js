'use client';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Upload' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/saved', label: 'Saved' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-sky-600 tracking-tight">JobPilot</h1>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-8 font-medium text-slate-700">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative hover:text-sky-600 transition ${
                pathname === l.href ? 'text-sky-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-sky-600 after:rounded-full' : ''
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md hover:bg-slate-100 transition"
          >
            {open ? <XMarkIcon className="w-7 h-7 text-slate-700" /> : <Bars3Icon className="w-7 h-7 text-slate-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg rounded-b-2xl mx-4 p-4 space-y-3 animate-fadeIn">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg transition ${
                pathname === l.href ? 'bg-sky-50 text-sky-600 font-semibold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
