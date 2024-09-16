'use client';
import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useInView,
  animate,
  AnimationPlaybackControls,
} from 'framer-motion';
import { IconType } from 'react-icons';
import {
  FaBalanceScale,
  FaGavel,
  FaUserTie,
  FaHandshake,
  FaFileContract,
  FaLandmark,
  FaUniversity,
  FaShieldAlt,
} from 'react-icons/fa';

interface ExpertiseItemData {
  icon: IconType;
  title: string;
}

interface CounterData {
  title: string;
  value: number;
}

const expertiseData: ExpertiseItemData[] = [
  { icon: FaBalanceScale, title: 'Civil Litigation' },
  { icon: FaGavel, title: 'Criminal Defense' },
  { icon: FaUserTie, title: 'Corporate Law' },
  { icon: FaHandshake, title: 'Mediation' },
  { icon: FaFileContract, title: 'Contract Law' },
  { icon: FaLandmark, title: 'Constitutional Law' },
  { icon: FaUniversity, title: 'Intellectual Property' },
  { icon: FaShieldAlt, title: 'Family Law' },
];

const counterData: CounterData[] = [
  { title: 'Years of Experience', value: 25 },
  { title: 'Cases Won', value: 350 },
  { title: 'Happy Clients', value: 500 },
];

interface ExpertiseItemProps {
  icon: IconType;
  title: string;
}

const ExpertiseItem: React.FC<ExpertiseItemProps> = ({ icon: Icon, title }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variants={variants}
    >
      <span aria-label={title}>
        <Icon className="text-3xl text-blue-600" />
      </span>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </motion.div>
  );
};

interface CounterItemProps {
  title: string;
  value: number;
}

const CounterItem: React.FC<CounterItemProps> = ({ title, value }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [countValue, setCountValue] = useState<number>(0);

  useEffect(() => {
    if (isInView) {
      const controls: AnimationPlaybackControls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => {
          setCountValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="text-5xl font-bold text-blue-600">{countValue}</span>
      <span className="text-lg text-gray-700">{title}</span>
    </div>
  );
};

const Expertise: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      className="min-h-screen bg-gray-100 flex items-center justify-center py-16"
      id="expertise-section"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Our Expertise
        </h2>

        {/* Counter Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {counterData.map((item) => (
            <CounterItem key={item.title} title={item.title} value={item.value} />
          ))}
        </div>

        {/* Expertise Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {expertiseData.map((item) => (
            <ExpertiseItem key={item.title} icon={item.icon} title={item.title} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
