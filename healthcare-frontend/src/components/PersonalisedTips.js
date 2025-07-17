import React, { useState } from 'react';

const PersonalizedTips = () => {
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('');
  const [tip, setTip] = useState('');

  const generateTip = () => {
    if (goal === 'weight-loss') {
      setTip('💡 Try intermittent fasting and reduce sugar intake.');
    } else if (goal === 'mental-health') {
      setTip('🧘 Take daily 10-minute walks and practice mindfulness.');
    } else if (goal === 'fitness') {
      setTip('🏋️ Include strength training twice a week.');
    } else if (goal === 'immunity') {
      setTip('🍊 Consume foods rich in Vitamin C and zinc.');
    } else {
      setTip('⚠️ Please select a goal to get a personalized tip.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto border border-blue-100 mt-12 mb-12">
      <h3 className="text-3xl font-bold text-blue-900 mb-6 text-center">🧠 Get Your Personalized Health Tip</h3>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Health Goal</label>
          <select
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select a goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="mental-health">Mental Health</option>
            <option value="fitness">Fitness</option>
            <option value="immunity">Immunity</option>
          </select>
        </div>
        <button
          onClick={generateTip}
          className="bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Generate Tip
        </button>
        {tip && (
          <div className="mt-4 bg-blue-50 text-blue-900 p-4 rounded-xl border border-blue-200">
            <p className="text-md font-medium">{tip}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedTips;
