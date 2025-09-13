import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
// Using inline SVG for the logo to avoid import resolution issues with react-icons
import AuthContext from "../context/AuthContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logout, refreshToken } = useContext(AuthContext) || {};

  const handleLogout = async () => {
    try {
      const API = import.meta.env.VITE_API_URL || '';
      await fetch(`${API}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
      });
    } catch (err) {
      console.warn('logout failed', err);
    } finally {
      logout();
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="text-3xl bg-teal-500 p-1 rounded">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2L15 8H9L12 2Z" fill="#064E3B" />
                <circle cx="12" cy="14" r="6" fill="#0EA5A4" />
              </svg>
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
            {user ? (
              <div className="flex items-center gap-4">
                <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
              </div>
            ) : null}
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
              {user ? (
                <>
                  <div className="px-3 py-2">Hello {user.name}</div>
                  <button onClick={() => { setOpen(false); handleLogout(); }} className="px-3 py-2 rounded text-left">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setOpen(false)} className="px-3 py-2 rounded">Login</NavLink>
                  <NavLink to="/signup" onClick={() => setOpen(false)} className="px-3 py-2 rounded">SignUp</NavLink>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
