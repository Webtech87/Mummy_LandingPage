// src/components/FadeIn.tsx
import React, { useEffect, useState } from 'react';

type FadeInProps = {
  children: React.ReactNode;
  duration?: number; // in milliseconds
  delay?: number; // in milliseconds
  className?: string;
};

const FadeIn: React.FC<FadeInProps> = ({
  children,
  duration = 1000,
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;