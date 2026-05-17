import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number; // horizontal starting percentage (0 - 100)
  size: number; // size in pixels
  delay: number; // animation delay in seconds
  duration: number; // animation fall duration
  type: string; // emoji or petal type
  rotation: number; // starting rotation angle
  drift: number; // side-to-side drift offset
}

const PETAL_TYPES = ['🌸', '🌹', '🌼', '🏵️', '🪷', '🍂'];

export const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate initial petals
    const initialPetals = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 15 + 15, // 15px to 30px
      delay: Math.random() * -10, // negative delay so they start at different stages
      duration: Math.random() * 8 + 8, // 8s to 16s fall duration
      type: PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)],
      rotation: Math.random() * 360,
      drift: Math.random() * 40 - 20, // drift amount
    }));
    // eslint-disable-next-line
    setPetals(initialPetals);

    // Periodically spawn new petals to keep the stream going
    const interval = setInterval(() => {
      setPetals((prev) => {
        // Keep active ones and replace old ones to avoid memory leaks
        const active = prev.filter(() => Math.random() > 0.1);
        const countToCreate = Math.max(0, 30 - active.length);
        const newPetals = Array.from({ length: countToCreate }).map((_, i) => ({
          id: Date.now() + i + Math.random(),
          x: Math.random() * 100,
          size: Math.random() * 15 + 15,
          delay: 0,
          duration: Math.random() * 8 + 8,
          type: PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)],
          rotation: Math.random() * 360,
          drift: Math.random() * 40 - 20,
        }));
        return [...active, ...newPetals];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute text-opacity-80 transition-all select-none"
          style={{
            left: `${petal.x}%`,
            top: `-50px`,
            fontSize: `${petal.size}px`,
            animationName: 'petal-fall-drift',
            animationDuration: `${petal.duration}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotation}deg)`,
            opacity: 0.85,
            filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.15))',
          }}
        >
          {petal.type}
        </div>
      ))}
      <style>{`
        @keyframes petal-fall-drift {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(105vh) rotate(720deg) translateX(50px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FallingPetals;
