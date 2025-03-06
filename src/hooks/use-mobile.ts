import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768): boolean {
  // Start with a sensible default, and update after effect runs
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if current viewport is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Run once on mount
    checkIsMobile();

    // Set up event listener for resize
    window.addEventListener('resize', checkIsMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}
