'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import publicationsData from './publicationData';
import Image from 'next/image';

// Define the Publication type for better type safety
interface Publication {
  title: string;
  authors: string;
  summary: string;
  link: string;
  imageUrl?: string;
}

// Custom hook to handle intersection observer logic
const useInView = (threshold: number = 0.3) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Disconnect after first intersection
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { isInView, ref };
};

// Animation variants for the publication cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Publications: React.FC = () => {
  const { isInView, ref } = useInView(0.3);

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-heading text-center mb-12 text-gray-800">
          Our Publications
        </h2>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {publicationsData.map((publication: Publication, index: number) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              aria-labelledby={`publication-title-${index}`}
            >
              {publication.imageUrl && (
                <div className="mb-4 flex-shrink-0">
                  <Image
                    src={publication.imageUrl}
                    alt={`${publication.title} cover image`}
                    width={400}
                    height={200}
                    className="rounded-md object-cover w-full h-40"
                  />
                </div>
              )}
              <div className="flex flex-col flex-grow">
                <h3
                  id={`publication-title-${index}`}
                  className="text-2xl font-semibold text-gray-800 mb-2"
                >
                  {publication.title}
                </h3>
                <p className="text-gray-500 mb-4">By {publication.authors}</p>
                <p className="text-gray-700 flex-grow">{publication.summary}</p>
                <a
                  href={publication.link}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read more about ${publication.title}`}
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
