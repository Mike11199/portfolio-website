import { useState } from "react";

interface BinaryDigitProps {
  content: string;
}

const BinaryDigit = ({ content }: BinaryDigitProps) => {

  const randomTime = Math.floor(Math.random() * 5000) + 2000;
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(() => {
    setIsVisible(!isVisible);
  }, randomTime);

  return (
    <div className={`fade-in-out ${isVisible ? "visible" : "hidden"}`}>
      <p className="binary_digit">{content}</p>
    </div>
  );
};

export default BinaryDigit;
