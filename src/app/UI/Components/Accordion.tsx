'use client'

import { useRef } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gray-200 mb-2 overflow-hidden">
      <button className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none" onClick={onToggle}>

        <span className={"text-lg"}>{title}</span>

        <div className={`transform transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>
      
      <div className={`transition-[transform,max-height] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`} ref={contentRef}>
        <div className="p-4">
            {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;