import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-3">
          {/* <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">N</div> */}
          <div className="hidden sm:block">Notes App</div>
        </div>

        <div className="text-center flex-1">
          © {new Date().getFullYear()} Notes App — All rights reserved
        </div>

        {/* <div>
          <a href="/about" className="hover:underline">About</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
