import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Beautiful Vector Chef Hat Icon for Outer Follower
const ChefHatIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300">
    <path d="M6 18V16C6 16 5 15.5 4 14C3 12.5 3 10.5 4.5 9.5C6 8.5 7.5 9 7.5 9C7.5 9 8 7 9.5 6C11 5 13 5 14.5 6C16 7 16.5 9 16.5 9C16.5 9 18 8.5 19.5 9.5C21 10.5 21 12.5 20 14C19 15.5 18 16 18 16V18" />
    <path d="M6 18H18" />
    <path d="M7 21H17" />
  </svg>
);

// Beautiful Vector Cooking Spoon Icon for Inner Pointer
const SpoonIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors duration-300">
    {/* Spoon Bowl */}
    <path d="M12 2A4 4 0 0 0 8 6c0 2.5 1.5 4.5 3.5 5.5" />
    <path d="M12 2a4 4 0 0 1 4 4c0 2.5-1.5 4.5-3.5 5.5" />
    {/* Spoon Handle */}
    <path d="M12 11.5V22" />
  </svg>
);

export const CustomCursor = () => {
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Soft spring for the Chef Hat follower
  const springConfig = { damping: 28, stiffness: 220, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(max-width: 1024px)').matches) {
      return;
    }

    // eslint-disable-next-line
    setHidden(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')) {
        setLinkHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .cursor-pointer, input, textarea, select')) {
        setLinkHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Springy Chef Hat Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 select-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicked ? 0.85 : linkHovered ? 1.3 : 1,
          rotate: clicked ? -15 : linkHovered ? 15 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <ChefHatIcon color={linkHovered ? '#C0392B' : '#D4AC0D'} />
      </motion.div>

      {/* Inner Spoon Pointer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 select-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicked ? 0.75 : linkHovered ? 1.2 : 1,
          rotate: clicked ? 45 : linkHovered ? -25 : 12,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      >
        <SpoonIcon color={linkHovered ? '#E74C3C' : '#F4D03F'} />
      </motion.div>
    </>
  );
};

export default CustomCursor;
