import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const Footer = ({ theme }) => {
  return (
    <section
      className={`w-full py-16 px-6 md:px-20 ${
        theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <footer
        className={`py-10 px-6 rounded-xl shadow-lg ${
          theme === "dark"
            ? "bg-gradient-to-r from-black via-gray-900 to-black text-white"
            : "bg-gradient-to-r from-gray-400 via-gray-300 to-gray-300 text-black"
        }`}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/movies" className="hover:underline">All Movies</Link></li>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="hover:underline">Register</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/bishal.roy.213382"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-circle btn-outline ${
                  theme === "dark" ? "text-white border-white" : "text-black border-black"
                }`}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://linkedin.com/in/bishalroy20"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-circle btn-outline ${
                  theme === "dark" ? "text-white border-white" : "text-black border-black"
                }`}
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-circle btn-outline ${
                  theme === "dark" ? "text-white border-white" : "text-black border-black"
                }`}
              >
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
    </section>
  );
};

export default Footer;
