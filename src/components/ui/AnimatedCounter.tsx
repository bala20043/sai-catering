import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: Props) => {
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
        countRef.current.textContent = Math.floor(start).toLocaleString() + suffix;
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, suffix, duration]);

  return (
    <div ref={ref}>
      <span ref={countRef} className="text-4xl md:text-5xl font-bold font-accent text-accent">
        0{suffix}
      </span>
    </div>
  );
};

export default AnimatedCounter;
