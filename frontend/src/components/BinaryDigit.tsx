import { useState, useEffect } from "react";

interface BinaryDigitProps {
  content: string;
}

const BinaryDigit = ({ content }: BinaryDigitProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const randomTime = Math.random() * 5000 + 50;

    const timer = setTimeout(() => {
      setIsVisible(!isVisible);
    }, randomTime);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className={`fade-in-out ${isVisible ? "visible" : "hidden"}`}>
      <p className="binary_digit">{content}</p>
    </div>
  );
};

export default BinaryDigit;
