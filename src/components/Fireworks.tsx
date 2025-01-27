"use client";

import React, { useEffect } from 'react';

const Fireworks: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('fireworks') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    
    // 设置画布大小为窗口大小
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.03;
        this.alpha -= 0.008;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles: Particle[] = [];
    const colors = ['#ff0', '#f0f', '#0ff', '#ff4444', '#44ff44'];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetY = Math.random() * (canvas.height * 0.5);
      const color = colors[Math.floor(Math.random() * colors.length)];

      const explode = (x: number, y: number) => {
        for (let i = 0; i < 50; i++) {
          particles.push(new Particle(x, y, color));
        }
      };

      // 烟花上升动画
      let currentY = y;
      const rise = () => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, currentY, 2, 0, Math.PI * 2);
        ctx.fill();

        currentY -= 5;

        if (currentY > targetY) {
          requestAnimationFrame(rise);
        } else {
          explode(x, currentY);
        }
      };

      rise();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => p.alpha > 0);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      if (Math.random() < 0.02) {
        createFirework();
      }

      requestAnimationFrame(animate);
    };

    animate();

    // 清理函数
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      id="fireworks"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default Fireworks; 