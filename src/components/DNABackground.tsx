import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  }
}

const PARTICLE_COUNT = 40;
const MAX_VELOCITY = 0.5;
const COLORS = ['#00D873', '#00D873', '#00D873', '#ffffff'];
const CONNECTION_DISTANCE = 150;

const DNABackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isMouseMoving = useRef(false);
  
  // Initialize particles
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    // Initial setup
    updateDimensions();
    
    // Create initial particles
    const initialParticles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      initialParticles.push(createParticle(i));
    }
    setParticles(initialParticles);
    
    // Handle resize
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Create a new particle
  const createParticle = (id: number): Particle => ({
    id,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 4 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    velocity: {
      x: (Math.random() - 0.5) * MAX_VELOCITY,
      y: (Math.random() - 0.5) * MAX_VELOCITY
    }
  });
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      isMouseMoving.current = true;
      
      // Reset the flag after 100ms of no movement
      setTimeout(() => {
        isMouseMoving.current = false;
      }, 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animation loop
  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Copy the particle to avoid directly mutating state
          const newParticle = { ...particle };
          
          // Update position based on velocity
          newParticle.x += newParticle.velocity.x;
          newParticle.y += newParticle.velocity.y;
          
          // Handle mouse interaction if mouse is moving
          if (isMouseMoving.current) {
            const dx = mousePosition.x - newParticle.x;
            const dy = mousePosition.y - newParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If particle is close to mouse, push it away slightly
            if (distance < 100) {
              const angle = Math.atan2(dy, dx);
              const pushFactor = (100 - distance) / 500;
              
              newParticle.velocity.x -= Math.cos(angle) * pushFactor;
              newParticle.velocity.y -= Math.sin(angle) * pushFactor;
            }
          }
          
          // Boundary checking - wrap around edges
          if (newParticle.x < 0) newParticle.x = dimensions.width;
          if (newParticle.x > dimensions.width) newParticle.x = 0;
          if (newParticle.y < 0) newParticle.y = dimensions.height;
          if (newParticle.y > dimensions.height) newParticle.y = 0;
          
          // Apply some friction to prevent infinite acceleration
          newParticle.velocity.x *= 0.99;
          newParticle.velocity.y *= 0.99;
          
          // Keep velocity within bounds
          const speed = Math.sqrt(
            newParticle.velocity.x * newParticle.velocity.x + 
            newParticle.velocity.y * newParticle.velocity.y
          );
          
          if (speed > MAX_VELOCITY) {
            newParticle.velocity.x = (newParticle.velocity.x / speed) * MAX_VELOCITY;
            newParticle.velocity.y = (newParticle.velocity.y / speed) * MAX_VELOCITY;
          }
          
          return newParticle;
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, dimensions]);
  
  // Calculate connections between particles
  const getConnections = () => {
    const connections: JSX.Element[] = [];
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < CONNECTION_DISTANCE) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / CONNECTION_DISTANCE);
          
          connections.push(
            <line
              key={`${p1.id}-${p2.id}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={p1.color === p2.color ? p1.color : '#00D873'}
              strokeOpacity={opacity * 0.5}
              strokeWidth={1}
            />
          );
        }
      }
    }
    
    return connections;
  };
  
  return (
    <div ref={canvasRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%">
        {/* Draw connections between particles */}
        {getConnections()}
        
        {/* Draw particles */}
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default DNABackground;
