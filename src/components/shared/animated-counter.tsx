"use client";

import { useEffect, useState, useRef } from 'react';

type AnimatedCounterProps = {
  to: number;
  speed?: number;
};

export function AnimatedCounter({ to, speed = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = to;
          const duration = speed;
          const startTime = performance.now();

          const animateCount = (timestamp: number) => {
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            start = Math.floor(percentage * (end - start));
            setCount(start);

            if (progress < duration) {
              requestAnimationFrame(animateCount);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [to, speed]);

  return <span ref={ref}>{count}</span>;
}
