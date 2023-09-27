import React from 'react';
import logo from '../assets/nubsisito.png';
import config from '../config/config';

function Footer({ className }) {
  return (
    <footer className={`text-white p-4 ${className} bottom-0 left-0 right-0`}>
      <div className="flex justify-between items-center">
        {/* Left section with image and description */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12 mr-2 rounded-lg" />
          <p className="text-xs max-w-xs">Simple react portfolio template, that will automatically sync with your github public data and show the information in here</p>
        </div>
        
        {/* Right section with links and credits */}
        <div className="text-sm">
          {/* Links */}
          <div className="flex space-x-4">
            <a href="/" className="hover:text-indigo-400">Home</a>
            <a href="/about" className="hover:text-indigo-400">About</a>
            <a href="/projects" className="hover:text-indigo-400">Projects</a>
          </div>
          
          {/* Credits */}
          <p className="mt-2 text-xs">
            &copy; {new Date().getFullYear()} {config.siteName} | Designed with 💖 by <a href="https://github.com/IMXNOOBX" className="text-indigo-400 font font-medium">IMXNOOBX</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
