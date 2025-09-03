import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiConqueror } from "react-icons/gi";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-yellow-100 text-black shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-14">
          <NavLink to="/" className="text-lg font-bold">

            <div className="text-3xl ">
              <GiConqueror />
            </div>
            Notes
          </NavLink>

          {/* desktop nav */}
          <nav className="hidden md:flex gap-4">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Contact
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              SignUp
            </NavLink>
          </nav>

          {/* mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* mobile nav panel */}
        {open && (
          <div className="md:hidden py-2">
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "underline" : "")}
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "underline" : "")}
                onClick={() => setOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "underline" : "")}
                onClick={() => setOpen(false)}
              >
                Contact
              </NavLink>
               <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              SignUp
            </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
