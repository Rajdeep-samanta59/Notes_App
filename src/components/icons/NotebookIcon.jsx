import React from 'react';

export default function NotebookIcon({ width = 40, height = 41, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Notebook background */}
      <rect x="3" y="3" width="14" height="18" rx="2" ry="2" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />

      {/* Notebook lines */}
      <line x1="6" y1="7" x2="15" y2="7" stroke="#0284C7" strokeWidth="1.2" />
      <line x1="6" y1="11" x2="15" y2="11" stroke="#0284C7" strokeWidth="1.2" />
      <line x1="6" y1="15" x2="15" y2="15" stroke="#0284C7" strokeWidth="1.2" />

      {/* Pencil */}
      <path d="M17 7L21 11L14 18H10V14L17 7Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.2" />
    </svg>
  );
}
