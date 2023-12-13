import React, { useState, useEffect } from "react";

const BinaryDigit = ({ content }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const randomTime = Math.random() * 5000 + 50;

    const timer = setTimeout(() => {
      setIsVisible(!isVisible); // Toggle visibility after random time
    }, randomTime);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [isVisible]);

  return (
    <div className={`fade-in-out ${isVisible ? "visible" : "hidden"}`}>
      <p className="binary_digit">{content}</p>
    </div>
  );
};

export default BinaryDigit;
