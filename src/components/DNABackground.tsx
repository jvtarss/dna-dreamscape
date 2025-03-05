
import React, { useEffect, useRef, useState } from 'react';

interface DNANucleotide {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  vx: number;
  vy: number;
}

const DNABackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const nucleotidesRef = useRef<DNANucleotide[]>([]);
  const activeRef = useRef(true);
  const frameIdRef = useRef<number>(0);
  
  // Generate initial nucleotides
  useEffect(() => {
    const createNucleotides = () => {
      const nucleotides: DNANucleotide[] = [];
      const colors = ['#4A90E2', '#50E3C2', '#B6E3FF', '#194185'];
      
      for (let i = 0; i < 60; i++) {
        nucleotides.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 8 + 2,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7
        });
      }
      
      nucleotidesRef.current = nucleotides;
    };
    
    createNucleotides();
    
    window.addEventListener('resize', createNucleotides);
    
    return () => {
      window.removeEventListener('resize', createNucleotides);
    };
  }, []);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Render and animate nucleotides
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    const connectNucleotides = (ctx: CanvasRenderingContext2D, a: DNANucleotide, b: DNANucleotide) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(74, 144, 226, ${(1 - distance / 100) * 0.15})`;
        ctx.lineWidth = 1;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    };
    
    const drawNucleotides = () => {
      if (!activeRef.current) return;
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouseInfluenceRadius = 200;
      const mouseForce = 0.5;
      
      // Update and draw nucleotides
      for (let i = 0; i < nucleotidesRef.current.length; i++) {
        const nucleotide = nucleotidesRef.current[i];
        
        // Apply mouse influence
        const dx = mousePosition.x - nucleotide.x;
        const dy = mousePosition.y - nucleotide.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInfluenceRadius) {
          const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
          nucleotide.vx += (dx / distance) * force * mouseForce;
          nucleotide.vy += (dy / distance) * force * mouseForce;
        }
        
        // Update position
        nucleotide.x += nucleotide.vx;
        nucleotide.y += nucleotide.vy;
        
        // Dampen velocity
        nucleotide.vx *= 0.98;
        nucleotide.vy *= 0.98;
        
        // Boundary check
        if (nucleotide.x < 0 || nucleotide.x > canvas.width) {
          nucleotide.vx *= -1;
          nucleotide.x = Math.max(0, Math.min(canvas.width, nucleotide.x));
        }
        
        if (nucleotide.y < 0 || nucleotide.y > canvas.height) {
          nucleotide.vy *= -1;
          nucleotide.y = Math.max(0, Math.min(canvas.height, nucleotide.y));
        }
        
        // Connect with other nucleotides
        for (let j = i + 1; j < nucleotidesRef.current.length; j++) {
          connectNucleotides(ctx, nucleotide, nucleotidesRef.current[j]);
        }
        
        // Draw nucleotide
        ctx.beginPath();
        ctx.fillStyle = nucleotide.color.replace(')', `, ${nucleotide.opacity})`);
        ctx.arc(nucleotide.x, nucleotide.y, nucleotide.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      frameIdRef.current = requestAnimationFrame(drawNucleotides);
    };
    
    drawNucleotides();
    
    return () => {
      activeRef.current = false;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [mousePosition]);
  
  return <canvas ref={canvasRef} id="dna-background" className="fixed inset-0 -z-10" />;
};

export default DNABackground;
