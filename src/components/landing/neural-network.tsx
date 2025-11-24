
'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: Particle[] = [];
    const particleCount = width < 768 ? 80 : 150;
    const fov = width * 0.5;

    class Particle {
      x: number;
      y: number;
      z: number;
      projectedX: number;
      projectedY: number;
      projectedScale: number;

      constructor() {
        this.x = (Math.random() - 0.5) * width;
        this.y = (Math.random() - 0.5) * height;
        this.z = Math.random() * width;
        this.projectedX = 0;
        this.projectedY = 0;
        this.projectedScale = 0;
      }

      project() {
        this.projectedScale = fov / (fov + this.z);
        this.projectedX = this.x * this.projectedScale + width / 2;
        this.projectedY = this.y * this.projectedScale + height / 2;
      }

      update(rotationYValue: number) {
        // Rotate around Y axis (horizontal rotation)
        const cosY = Math.cos(rotationYValue);
        const sinY = Math.sin(rotationYValue);
        
        const prevX = this.x;
        const prevZ = this.z;

        this.x = prevX * cosY - prevZ * sinY;
        this.z = prevX * sinY + prevZ * cosY;

        // Wrap particles around
        if (this.z > width) this.z -= width * 2;
        if (this.z < -width) this.z += width * 2;
        
        this.project();
      }
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    let animationFrameId: number;
    const rotationYValue = 0.0005;

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      const isDarkMode = document.documentElement.classList.contains('dark');
      const particleColor = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
      const lineColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(rotationYValue);
        if (particles[i].projectedScale > 0) { // Check if particle is visible
          ctx!.beginPath();
          ctx!.arc(particles[i].projectedX, particles[i].projectedY, particles[i].projectedScale * 2, 0, Math.PI * 2);
          ctx!.fillStyle = particleColor;
          ctx!.fill();
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          if (p1.projectedScale <= 0 || p2.projectedScale <= 0) continue; // Don't draw lines to invisible particles

          const dx = p1.projectedX - p2.projectedX;
          const dy = p1.projectedY - p2.projectedY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx!.beginPath();
            ctx!.moveTo(p1.projectedX, p1.projectedY);
            ctx!.lineTo(p2.projectedX, p2.projectedY);
            ctx!.strokeStyle = lineColor.replace('0.1', `${(opacity * 0.2).toFixed(2)}`);
            ctx!.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }
    
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      createParticles();
    };

    createParticles();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Rerun effect if theme changes

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default NeuralNetwork;
