import React, { ReactNode } from 'react';

interface BlueTextWrapperProps {
  children: ReactNode;
}

const TextPop: React.FC<BlueTextWrapperProps> = ({ children }) => {
  return (
    <span className="text-accent-ink">
      {children}
    </span>
  );
};

export default TextPop;