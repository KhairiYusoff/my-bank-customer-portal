import React, { useRef, useState, useEffect, PropsWithChildren } from 'react';
import { Fade } from '@mui/material';

/**
 * FadeInSection wraps its children and fades them in when they enter the viewport.
 * Uses IntersectionObserver so it requires no external libraries.
 */
const FadeInSection: React.FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node); // Trigger once
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Fade in={visible} timeout={800} style={{ transformOrigin: '0 0 0' }}>
        <div>{children}</div>
      </Fade>
    </div>
  );
};

export default FadeInSection;
