'use client';
import React from 'react';
import Slider from 'react-slick';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  social: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ahmed Sheikh',
    role: 'Partner',
    description:
      'Ahmed is a litigation expert with extensive experience in civil and criminal law.',
    image: '/images/ahmed.png',
    social: {
      facebook: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    name: 'Rafia Siddiqui',
    role: 'Associate',
    description:
      'Rafia focuses on environmental law, helping organizations navigate regulatory issues.',
    image: '/images/rafia.png',
    social: {
      facebook: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    name: 'Rafia Siddiqui',
    role: 'Associate',
    description:
      'Rafia focuses on environmental law, helping organizations navigate regulatory issues.',
    image: '/images/rafia.png',
    social: {
      facebook: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  // Add more team members here...
];

// Custom Next Arrow for Slider
const NextArrow = ({ onClick }: { onClick?: () => void }, isMenuOpen: boolean) => (
  <div
    className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-4xl text-gray-700 cursor-pointer z-10 ${
      isMenuOpen ? 'z-0' : 'z-20'
    }`}
    onClick={onClick}
  >
    <FaArrowAltCircleRight />
  </div>
);

// Custom Prev Arrow for Slider
const PrevArrow = ({ onClick }: { onClick?: () => void }, isMenuOpen: boolean) => (
  <div
    className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-4xl text-gray-700 cursor-pointer z-10 ${
      isMenuOpen ? 'z-0' : 'z-20'
    }`}
    onClick={onClick}
  >
    <FaArrowAltCircleLeft />
  </div>
);

const TeamSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides on larger screens
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Larger screens like desktops and laptops
        settings: {
          slidesToShow: 2, // Show 2 slides on screens smaller than 1024px
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1, // Show 1 slide on screens smaller than 768px
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-100 py-16" id="team">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-center text-orange-600 mb-12"
        >
          Meet Our Team
        </motion.h2>

        {/* Slider Component */}
        <div className="relative">
          <Slider {...settings}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-sm mx-auto">
                  {/* Team Member Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="mx-auto rounded-full shadow-lg"
                  />

                  {/* Team Member Info */}
                  <h3 className="text-xl font-bold mt-4">{member.name}</h3>
                  <p className="text-orange-500 font-medium">{member.role}</p>
                  <p className="text-gray-600 mt-2">{member.description}</p>

                  {/* Social Icons */}
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href={member.social.facebook} aria-label="Facebook">
                      <FaFacebook className="text-blue-600 hover:text-blue-800" size={24} />
                    </a>
                    <a href={member.social.linkedin} aria-label="LinkedIn">
                      <FaLinkedin className="text-blue-500 hover:text-blue-700" size={24} />
                    </a>
                    <a href={member.social.instagram} aria-label="Instagram">
                      <FaInstagram className="text-pink-600 hover:text-pink-800" size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TeamSlider;
