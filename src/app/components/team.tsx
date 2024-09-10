'use client';
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import teamMembers from './data';
import Image from 'next/image';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";


const Team = () => {
  const [isInView, setIsInView] = useState(false);
  const teamRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };  
  // Intersection Observer to trigger animation when the team section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing once in view
        }
      },
      { threshold: 0.3 } // 30% of the team section is visible
    );

    if (teamRef.current) {
      observer.observe(teamRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Variants for fade-in and stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Staggered fade-in for each card
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="team"
      className="py-16 bg-gray-50"
      ref={teamRef}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mt-5 mb-12">My Team</h2>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants} // Applying fade-in and stagger
        >
          <Slider {...settings}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                }} // Hover scale-up effect
                transition={{ type: 'spring', stiffness: 200 }}
                className="p-4"
              >
                <div className="bg-white rounded-lg shadow-lg text-center px-5 py-2 team-card h-96 flex flex-col justify-between">
                  {/* Team Member Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full h-36 w-32 mx-auto shadow-lg shadow-gray-700"
                  />
                  {/* Name */}
                  <h3 className="text-xl font-bold mt-4">{member.name}</h3>
                  {/* Role */}
                  <p className="text-sm text-gray-500 mb-2">{member.role}</p>
                  {/* Description */}
                  <p className="text-gray-600 text-sm overflow-hidden">
                    {member.description}
                  </p>
                  {/* Social Media Icons */}
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href={member.social.facebook} className="text-blue-600">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href={member.social.linkedin} className="text-blue-400">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href={member.social.instagram} className="text-pink-600">
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

// Arrow components with rounded background and proper z-index


// Right Arrow Component
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <motion.div
      onClick={onClick}
      // whileHover={{ scale: 1.2 }}
      className="absolute hover:scale-125 duration-300 right-0 top-1/2 
      transition-transform -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer"
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
      initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:1,delay:1}}
      className="absolute hover:scale-125 duration-300 left-0 top-1/2 transition-transform -translate-y-1/2 z-10 bg-gray-100 rounded-full p-2 shadow-md cursor-pointer"
    > <FaArrowAltCircleLeft/>
      
    </motion.div>
  );
}

export { NextArrow, PrevArrow };


export default Team