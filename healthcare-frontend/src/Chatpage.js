import React, { useEffect } from 'react';

const Chatting = () => {
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = "//code.tidio.co/pdrp56oyi7drwkpfhqp7a9uutm6yobgp.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="chatbot-page">
      <h1 className="text-center text-3xl font-bold mt-12 mb-12">💬 Chat with Us!</h1>
      <p className="text-center">We’re here to help. Ask us anything.</p>
    </div>
  );
};

export default Chatting;
