import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiConqueror } from "react-icons/gi";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="text-3xl bg-teal-500">
              <GiConqueror />
            </div>
            <div className="text-lg font-semibold text-gray-800">Notes</div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" end className={({ isActive }) => isActive ? "text-teal-600 font-medium" : "text-gray-700"
}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-teal-600 font-medium" : "text-gray-700"
}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-teal-600 font-medium" : "text-gray-700"
}>
              Contact
            </NavLink>
            <NavLink to="/notes/new" className="ml-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500 text-white hover:bg-teal-600
">
              + Create
            </NavLink>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setOpen(s => !s)} aria-label="Toggle menu" className="p-2 rounded-md border">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden py-2">
            <nav className="flex flex-col gap-2">
              <NavLink to="/" end onClick={() => setOpen(false)} className="px-3 py-2 rounded">Home</NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded">About</NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded">Contact</NavLink>
              <NavLink to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded">Login</NavLink>
              <NavLink to="/signup" onClick={() => setOpen(false)} className="px-3 py-2 rounded">SignUp</NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
