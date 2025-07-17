import React from 'react';

const tips = [
  "Start your day with a glass of warm water and lemon.",
  "Take 5-minute stretch breaks every hour if you sit a lot.",
  "Avoid screen time 30 minutes before bed for better sleep.",
  "Eat a fruit or raw veggie daily to boost fiber intake.",
  "Spend 10 minutes outside to absorb natural Vitamin D.",
  "Laugh more – it's good for your heart and stress levels!",
  "Try a 3-minute breathing exercise to stay focused."
];

const TipOfTheDay = () => {
  const date = new Date();
  const index = date.getDate() % tips.length; 
  const tip = tips[index];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-10 max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold text-blue-800 mb-2">🌟 Tip of the Day</h3>
      <p className="text-gray-700 text-lg">{tip}</p>
    </div>
  );
};

export default TipOfTheDay;
