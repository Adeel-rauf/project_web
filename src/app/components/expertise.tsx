'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const expertiseData = [
  { title: 'Corporate & Commercial Law', description: 'Comprehensive legal services for businesses...' },
  { title: 'Dispute Resolution & Arbitration', description: 'Expertise in resolving commercial and civil disputes...' },
  { title: 'Family Law', description: 'Compassionate legal counsel on family matters...' },
  // Add more expertise items here...
];

const CounterSection = () => {
  const [countersVisible, setCountersVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={counterRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
      {['Cases Solved', 'Years of Experience', 'Clients Served'].map((label, index) => (
        <motion.div
          key={index}
          className="p-6 bg-white rounded-lg shadow-lg text-center"
          initial={{ opacity: 0 }}
          animate={countersVisible ? { opacity: 1, scale: [0.5, 1] } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-2">
            {countersVisible ? <Counter end={index * 200 + 500} /> : 0}
          </h2>
          <p className="text-gray-600">{label}</p>
        </motion.div>
      ))}
    </div>
  );
};

const Counter = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / 100;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
};

const ExpertiseSection = () => {
  const [isInView, setIsInView] = useState(false);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (expertiseRef.current) {
      observer.observe(expertiseRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const expertiseVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3 },
    }),
  };

  return (
    <div ref={expertiseRef} className="h-screen">
      {expertiseData.map((expertise, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={expertiseVariants}
          className="mb-8 bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">{expertise.title}</h3>
          <p className="text-gray-600">{expertise.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

const Expertise = () => {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-4xl font-heading text-center mb-12">Our Expertise</h2>
      <CounterSection />
      <ExpertiseSection />
    </section>
  );
};

export default Expertise;
