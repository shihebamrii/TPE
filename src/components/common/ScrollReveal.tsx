import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export type RevealAnimation = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-scale' | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  className = '',
  threshold = 0.12,
  triggerOnce = true,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold, triggerOnce });

  const getTransform = () => {
    if (isVisible) {
      return animation === 'fade-scale' ? 'scale(1)' : 'translate3d(0, 0, 0)';
    }

    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 24px, 0)';
      case 'fade-down':
        return 'translate3d(0, -24px, 0)';
      case 'fade-left':
        return 'translate3d(24px, 0, 0)';
      case 'fade-right':
        return 'translate3d(-24px, 0, 0)';
      case 'fade-scale':
        return 'scale(0.96)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

