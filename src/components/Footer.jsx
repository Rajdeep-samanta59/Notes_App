import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">© {new Date().getFullYear()} Notes App @Rajdeep Samanta</div>
        {/* <div className="text-sm text-gray-600">Built with React + Vite</div> */}
      </div>
    </footer>
  )
}

export default Footer
