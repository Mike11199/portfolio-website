import React, { useState, useEffect } from 'react';

const BinaryDigit = ({content}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {

      // Generate random time between 1000ms and 3000ms
      // first generates random decimal number between 0 and 1 exclusive of 1
      // them multiples by 2000 and adds 1000 shift right to 1000-3000
      const randomTime = Math.random() * 5000 + 50; 
  
      const timer = setTimeout(() => {
        setIsVisible(!isVisible); // Toggle visibility after random time
      }, randomTime);
  
      return () => clearTimeout(timer); // Clear the timer on component unmount
  
    }, [isVisible]);
  
    return (
      <div className={`fade-in-out ${isVisible ? 'visible' : 'hidden'}`}>
        <p className='binary_digit'>{content}</p>
      </div>
    );
  };

export default BinaryDigit;