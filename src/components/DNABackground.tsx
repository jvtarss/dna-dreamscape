
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DNAPoint {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

const DNABackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dnaPoints, setDnaPoints] = useState<DNAPoint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Generate initial DNA points
  useEffect(() => {
    const generatePoints = () => {
      const newPoints: DNAPoint[] = [];
      const numPoints = 20; // Number of DNA points
      
      for (let i = 0; i < numPoints; i++) {
        newPoints.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 6 + 2, // Size between 2-8
          opacity: Math.random() * 0.5 + 0.1, // Opacity between 0.1-0.6
          delay: Math.random() * 0.5, // Animation delay
        });
      }
      
      setDnaPoints(newPoints);
    };
    
    generatePoints();
    
    // Regenerate points on window resize
    window.addEventListener('resize', generatePoints);
    return () => window.removeEventListener('resize', generatePoints);
  }, []);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Clear the previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set a new timeout to update DNA points
      timeoutRef.current = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;
        
        setDnaPoints(prevPoints => 
          prevPoints.map(point => {
            // Calculate distance from mouse to the point
            const dx = mousePosition.x - point.x;
            const dy = mousePosition.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If the point is close enough to the mouse, move it slightly
            if (distance < 200) {
              const angle = Math.atan2(dy, dx);
              const pushDistance = (200 - distance) / 10;
              
              return {
                ...point,
                x: point.x + Math.cos(angle) * pushDistance,
                y: point.y + Math.sin(angle) * pushDistance,
              };
            }
            
            return point;
          })
        );
      }, 50);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mousePosition]);
  
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {dnaPoints.map((point, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-bio-green"
          initial={{ x: point.x, y: point.y, opacity: 0, scale: 0 }}
          animate={{ 
            x: point.x, 
            y: point.y,
            opacity: point.opacity,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: point.delay,
          }}
          style={{
            width: point.size,
            height: point.size,
          }}
        />
      ))}
    </div>
  );
};

export default DNABackground;
