import React from 'react';
import { NavLink } from "react-router-dom"; // NavLink for internal pages
import { Facebook, Twitter, Instagram, Lock, Linkedin, Github } from "lucide-react"; // Icons for social media and logo

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-10 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        
        {/* Left Section: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center mb-2">
            <Lock className="text-purple-400 h-8 w-8" />
            <span className="ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              PassVault
            </span>
          </div>
          <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} PassVault by <span className='font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg transition-all duration-300 ease-in-out hover:from-purple-500 hover:to-pink-700'>Pravesh Yadav</span>. All rights reserved.</p>
        </div>
        
        {/* Middle Section: Quick Links with NavLink */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl font-bold mb-4 text-white">Quick Links</h4>
          <nav className="flex flex-col space-y-2 text-center md:text-left">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-white transition-colors duration-200 ${isActive ? 'text-purple-400' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-white transition-colors duration-200 ${isActive ? 'text-purple-400' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-white transition-colors duration-200 ${isActive ? 'text-purple-400' : ''}`
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>
        
        {/* Right Section: Social Icons */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl font-bold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://github.com/PM36coder" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gray-600 hover:border-transparent transition-all duration-300 ease-in-out transform hover:scale-125 hover:bg-gradient-to-br hover:from-slate-700 hover:to-gray-800 hover:shadow-xl hover:-rotate-360">
    <Github size={24} />
</a>
            <a href="https://www.linkedin.com/in/pravesh-yadav-25bb5233a/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gray-600 hover:border-transparent transition-all duration-300 ease-in-out transform hover:scale-125 hover:bg-gradient-to-br hover:from-slate-700 hover:to-gray-800 hover:shadow-xl hover:-rotate-360">
              <Linkedin size={24} />
            </a>
            <a href="https://www.instagram.com/its_pm36/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-gray-600 hover:border-transparent transition-all duration-300 ease-in-out transform hover:scale-125 hover:bg-gradient-to-br hover:from-slate-700 hover:to-gray-800 hover:shadow-xl hover:-rotate-90">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}