import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  return { ref, inView };
};

export const useCountUp = (end: number, duration: number = 2000) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (!inView || !countRef.current) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      if (countRef.current) {
        countRef.current.textContent = Math.floor(start).toLocaleString();
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return { ref, countRef };
};
