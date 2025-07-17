import React from 'react';
import { HeartPulse, Dumbbell, Moon, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import TipOfTheDay from './TipOfDay';
import PersonalizedTips from './PersonalisedTips';
import './HealthTips.css';



const tips = [
  {
    title: "Stay Hydrated",
    category: "Nutrition",
    icon: <HeartPulse className="text-blue-500 w-8 h-8" />,
    content: "Drink at least 8 glasses of water daily to keep your body hydrated and functioning properly.",
  },
  {
    title: "Daily Exercise",
    category: "Fitness",
    icon: <Dumbbell className="text-green-500 w-8 h-8" />,
    content: "Engage in at least 30 minutes of physical activity every day to boost your energy and mood.",
  },
  {
    title: "Get Enough Sleep",
    category: "Sleep",
    icon: <Moon className="text-purple-500 w-8 h-8" />,
    content: "Aim for 7-9 hours of sleep each night to support mental and physical health.",
  },
  {
    title: "Mindful Breathing",
    category: "Mental Health",
    icon: <Brain className="text-yellow-500 w-8 h-8" />,
    content: "Practice deep breathing or meditation for 5 minutes daily to reduce stress.",
  },
];

const HealthTips = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 md:px-12 lg:px-24">
      <motion.h2
        className="text-4xl font-bold text-center text-blue-900 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
<div className="container">
<TipOfTheDay />
</div>
<div className="container">
<PersonalizedTips />
</div>
        🌿 Health Tips
      </motion.h2>

      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {tips.map((tip, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4 gap-3">
                {tip.icon}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{tip.title}</h3>
                  <p className="text-sm text-blue-600 font-medium">{tip.category}</p>
                </div>
              </div>
              <p className="text-gray-600">{tip.content}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HealthTips;
