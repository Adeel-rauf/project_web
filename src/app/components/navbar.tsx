'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaUser, FaUsers, FaBriefcase, FaBook, FaPhoneAlt } from 'react-icons/fa';  // Import icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-lg fixed w-full z-20 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-2xl font-bold z-30">
          <Link to="hero" smooth={true} duration={500}>
            MyWebsite
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="font-heading hidden md:flex space-x-6">
          <Link to="about" smooth={true} duration={500} className="hover:text-yellow-900 font-semibold 
          hover:scale-105 text-gray-700 transition duration-300 ease-in-out cursor-pointer">
            About
          </Link>
          <Link to="team" smooth={true} duration={500} className="hover:text-yellow-900 font-semibold hover:scale-105 text-gray-700  transition duration-300 ease-in-out cursor-pointer">
            Team
          </Link>
          <Link to="expertise" smooth={true} duration={500} className="hover:text-yellow-900 font-semibold hover:scale-105 text-gray-700 transition duration-300 ease-in-out cursor-pointer">
            Expertise
          </Link>
          <Link to="publications" smooth={true} duration={500} className="hover:text-yellow-900 font-semibold hover:scale-105 text-gray-700 transition duration-300 ease-in-out cursor-pointer">
            Publications
          </Link>
          <Link to="contact" smooth={true} duration={500} className="hover:text-yellow-900 font-semibold hover:scale-105 text-gray-700 transition duration-300 ease-in-out cursor-pointer">
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center z-30">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Slide-in Animation */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`fixed inset-0 bg-white/90 backdrop-blur-lg z-20 w-full h-screen flex flex-col 
        items-center justify-center space-y-8 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="text-center font-heading space-y-6">
          <Link
            to="about"
            smooth={true}
            duration={500}
            onClick={toggleMenu}
            className="text-xl text-gray-700 hover:cursor-pointer font-semibold hover:text-black 
            hover:scale-105 transition duration-300 ease-in-out flex items-center space-x-2"
          >
            <FaUser /> <span>About</span>
          </Link>
          <Link
            to="team"
            smooth={true}
            duration={500}
            onClick={toggleMenu}
            className="text-xl text-gray-700 hover:cursor-pointer font-semibold hover:text-black hover:scale-105 transition duration-300 ease-in-out flex items-center space-x-2"
          >
            <FaUsers /> <span>Team</span>
          </Link>
          <Link
            to="expertise"
            smooth={true}
            duration={500}
            onClick={toggleMenu}
            className="text-xl text-gray-700 hover:cursor-pointer font-semibold hover:text-black hover:scale-105 transition duration-300 ease-in-out flex items-center space-x-2"
          >
            <FaBriefcase /> <span>Expertise</span>
          </Link>
          <Link
            to="publications"
            smooth={true}
            duration={500}
            onClick={toggleMenu}
            className="text-xl text-gray-700 hover:cursor-pointer font-semibold hover:text-black hover:scale-105 transition duration-300 ease-in-out flex items-center space-x-2"
          >
            <FaBook /> <span>Publications</span>
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            onClick={toggleMenu}
            className="text-xl text-gray-700 hover:cursor-pointer font-semibold hover:text-black hover:scale-105 transition duration-300 ease-in-out flex items-center space-x-2"
          >
            <FaPhoneAlt /> <span>Contact</span>
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
