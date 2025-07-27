//=== components/ScrollIndicator.jsx ===
'use client';
import { HiChevronDoubleDown } from 'react-icons/hi';

export default function ScrollIndicator({ target }) {
  const handleClick = () => {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onClick={handleClick}
    >
      {/* Using Tailwind animate-bounce instead of framer-motion */}
      <HiChevronDoubleDown className="text-4xl text-gray-400 animate-bounce" />
    </div>
  );
}
