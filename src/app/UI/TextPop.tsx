import React, { ReactNode } from 'react';

interface BlueTextWrapperProps {
  children: ReactNode;
}

const TextPop: React.FC<BlueTextWrapperProps> = ({ children }) => {
  return (
    <span className="text-[#8080ff]">
      {children}
    </span>
  );
};

export default TextPop;