'use client'
import { delay, motion } from "framer-motion";
import {Link} from "react-scroll";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, }}
        transition={{ duration: 1}}  
    className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: "url('/images/Hero.jpg')" }}
    >
      {/* Background image fade-in */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        
      ></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full">
        {/* Name - Each letter fades in */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-heading bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
          variants={container}
          initial="hidden"
          animate="show"
          transition={{delay:2}}
        >
          {"Barrister Amna Usman".split("").map((char, index) => (
            <motion.span key={index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading/Tagline appears after the name */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-heading bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent mt-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          Advocate & Legal Consultant
        </motion.p>

        {/* Button appears after subheading */}
        <motion.button
          className="mt-4 px-4 md:px-6 lg:px-8 py-2 bg-gradient-to-r from-yellow-950 to-orange-400 hover:scale-105  text-white 
          font-semibold font-serif text-sm md:text-md lg:text-md rounded-full shadow-md hover:bg-gradient-to-l hover:from-yellow-950 hover:to-orange-400
          transition duration-300 hover:shadow-lg hover:shadow-gray-800"
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          
            <Link to="about" smooth={true} duration={500}>
          About me
          </Link>
        </motion.button>
      </div>
    </motion.section>
  );
}
