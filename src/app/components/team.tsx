'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import Image from 'next/image';
import teamMembers from './data';

const Team = () => {
  const text = "My Team";
  const letters = text.split("");

  const [isInView, setIsInView] = useState(false);
  const teamRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Handle in-view and direct link trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || window.location.hash === "#team") {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    // Check if directly clicked on team link
    if (window.location.hash === "#team") {
      setIsInView(true);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="team"
      className="relative py-16 xl:py-8 bg-gray-50 overflow-hidden h-screen"
      ref={teamRef}
    >
      {/* Background Image with fade-in and reduced opacity */}
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        animate={isInView ? { opacity: 0.2, x: 0 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0 bg-cover bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/team1.jpg')" }}
      ></motion.div>

      <div className="mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Heading with staggered letter animation */}
        <motion.h1
          className="py-2 font-heading bg-gradient-to-r from-orange-400 via-orange-800 to-white bg-clip-text text-transparent text-5xl sm:text-6xl font-bold text-center mt-5 mb-3 sm:mb-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {letters.map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <Slider {...settings}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="p-4"
              >
                <div className="bg-white rounded-lg shadow-lg text-center px-2 py-2 team-card h-96 flex flex-col justify-between sm:h-80 lg:h-96">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full h-20 w-20 mx-auto shadow-lg shadow-gray-700 sm:h-28 sm:w-28 lg:h-36 lg:w-32"
                  />
                  <h3 className="text-xl font-heading font-bold mt-4 sm:text-lg lg:text-xl">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 sm:text-xs lg:text-sm">{member.role}</p>
                  <p className="text-gray-600 text-sm overflow-hidden sm:text-xs lg:text-sm">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-4 mt-3 mb-2">
                    <a href={member.social.facebook} className="text-blue-600 sm:text-sm lg:text-lg">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href={member.social.linkedin} className="text-blue-400 sm:text-sm lg:text-lg">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href={member.social.instagram} className="text-pink-600 sm:text-sm lg:text-lg">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};

// Right Arrow Component
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <motion.div
      onClick={onClick}
      className="absolute hover:scale-125 duration-300 right-0 top-1/2 transition-transform -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer"
    > <FaArrowAltCircleRight />
    </motion.div>
  );
}

// Left Arrow Component
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="absolute hover:scale-125 duration-300 left-0 top-1/2 transition-transform -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer"
    > <FaArrowAltCircleLeft />
    </motion.div>
  );
}

export { NextArrow, PrevArrow };
export default Team;
