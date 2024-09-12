'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown'; 

const markdownText = `
**Amna Usman**, a leading legal practice in Pakistan dedicated to providing comprehensive legal services with integrity, expertise, and dedication. With decades of combined experience, we strive to serve our clients in a range of industries by delivering **top-tier legal counsel** that meets their unique needs.

Her mission is to **advocate** for our clients’ rights with a commitment to achieving **favorable outcomes**. Whether it’s **business law**, **family law**, or **dispute resolution**, she's here to guide you every step of the way.

At **Barrister-at-Law**, we believe in **personalized legal services**, **transparency**, and building **long-term relationships** with our clients. Our team of seasoned professionals ensures every client receives **dedicated attention**, **expert advice**, and **tailored solutions**.
`;

export default function About() {
  const [isInView, setIsInView] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleVisibility = (entry: IntersectionObserverEntry) => {
    if (aboutRef.current) {
      if (entry.isIntersecting || window.scrollY >= aboutRef.current.offsetTop - window.innerHeight / 2) {
        setIsInView(true);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => handleVisibility(entry),
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, },
  };

  return (
    <section 
      ref={aboutRef} 
      id="about" 
      className="min-h-screen py-16 relative"
    >
      {/* Background Image with Opacity and Fade-in Effect */}
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        animate={isInView ? { opacity: 0.2, x: 0 } : {}}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="absolute inset-0 bg-cover bg-left bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/about2.jpg')" }}
      ></motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Meet Amna Usman with underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h2 className="font-heading font-bold text-4xl mt-5 bg-gradient-to-r from-black via-orange-800 to-red-300 bg-clip-text text-transparent">
            Meet Amna Usman
          </h2>
          <div className="w-full h-1 bg-yellow-900 mt-2"></div>
        </motion.div>

        {/* Markdown text with staggered animation */}
        <motion.div
          className="max-w-3xl mx-auto prose prose-lg text-gray-950 font-semibold"
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={parentVariants}
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <motion.p variants={childVariants}>
                  {children}
                </motion.p>
              ),
            }}
          >
            {markdownText}
          </ReactMarkdown>
        </motion.div>

        {/* Contact Button */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 2 }}
        >
          <button className="relative overflow-hidden bg-yellow-950 font-bold duration-300 transition-transform text-white px-6 py-3 rounded-full group">
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-950 to-orange-400 transition-all duration-500 ease-in-out transform -translate-x-full group-hover:translate-x-0"></span>
            <span className="relative z-10">Contact Amna</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
