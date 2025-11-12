import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/allmovies" className="hover:underline">All Movies</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline text-white">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline text-white">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-outline text-white">
              <FaXTwitter />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-sm">
          <p>© {new Date().getFullYear()} MovieHub. All rights reserved.</p>
          <p className="text-xs mt-1">Crafted with ❤️ by Bishal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;