
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
  const [mouseActive, setMouseActive] = useState(false);
  const nucleotidesRef = useRef<DNANucleotide[]>([]);
  const activeRef = useRef(true);
  const frameIdRef = useRef<number>(0);
  
  // Generate initial nucleotides
  useEffect(() => {
    const createNucleotides = () => {
      const nucleotides: DNANucleotide[] = [];
      const colors = ['#00D873', '#1F4843', '#80EBAA', '#347A70'];
      
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
    
    const handleResize = () => {
      createNucleotides();
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseActive(true);
      
      // Reset mouse active after some time of inactivity
      clearTimeout(mouseActiveTimeout);
      mouseActiveTimeout = setTimeout(() => setMouseActive(false), 200);
    };
    
    const handleMouseLeave = () => {
      setMouseActive(false);
    };
    
    let mouseActiveTimeout: number;
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mouseActiveTimeout);
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
    
    const connectNucleotides = (ctx: CanvasRenderingContext2D, a: DNANucleotide, b: DNANucleotide) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 216, 115, ${(1 - distance / 120) * 0.2})`;
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
      
      const mouseInfluenceRadius = 180;
      const mouseForce = mouseActive ? 1.0 : 0;
      
      // Update and draw nucleotides
      for (let i = 0; i < nucleotidesRef.current.length; i++) {
        const nucleotide = nucleotidesRef.current[i];
        
        // Apply mouse influence
        const dx = mousePosition.x - nucleotide.x;
        const dy = mousePosition.y - nucleotide.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseInfluenceRadius && mouseActive) {
          const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
          nucleotide.vx += (dx / distance) * force * mouseForce * 0.2;
          nucleotide.vy += (dy / distance) * force * mouseForce * 0.2;
        }
        
        // Update position
        nucleotide.x += nucleotide.vx;
        nucleotide.y += nucleotide.vy;
        
        // Dampen velocity
        nucleotide.vx *= 0.97;
        nucleotide.vy *= 0.97;
        
        // Boundary check with buffer zone to prevent getting stuck at edges
        const buffer = 20;
        if (nucleotide.x < buffer || nucleotide.x > canvas.width - buffer) {
          nucleotide.vx *= -1;
          nucleotide.x = Math.max(buffer, Math.min(canvas.width - buffer, nucleotide.x));
        }
        
        if (nucleotide.y < buffer || nucleotide.y > canvas.height - buffer) {
          nucleotide.vy *= -1;
          nucleotide.y = Math.max(buffer, Math.min(canvas.height - buffer, nucleotide.y));
        }
        
        // Connect with other nucleotides
        for (let j = i + 1; j < nucleotidesRef.current.length; j++) {
          connectNucleotides(ctx, nucleotide, nucleotidesRef.current[j]);
        }
        
        // Draw nucleotide
        ctx.beginPath();
        ctx.fillStyle = nucleotide.color.replace(')', `, ${nucleotide.opacity})`).replace('rgb', 'rgba');
        ctx.arc(nucleotide.x, nucleotide.y, nucleotide.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      frameIdRef.current = requestAnimationFrame(drawNucleotides);
    };
    
    drawNucleotides();
    
    return () => {
      activeRef.current = false;
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [mousePosition, mouseActive]);
  
  return <canvas ref={canvasRef} id="dna-background" className="fixed inset-0 -z-10" />;
};

export default DNABackground;
