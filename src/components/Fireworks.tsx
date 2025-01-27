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

    // 对象池配置
    const POOL_SIZE = 1000;
    const particlePool: Particle[] = [];
    let poolIndex = 0;

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      alpha: number = 1;
      color: string = '#fff';
      active: boolean = false;

      init(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.active = true;
      }

      update() {
        if (!this.active) return;
        
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.03;
        this.alpha -= 0.008;

        if (this.alpha <= 0) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 初始化对象池
    for (let i = 0; i < POOL_SIZE; i++) {
      particlePool.push(new Particle());
    }

    const colors = ['#ff0', '#f0f', '#0ff', '#ff4444', '#44ff44'];
    let lastTime = 0;
    const FPS = 60;
    const frameInterval = 1000 / FPS;

    const getParticle = () => {
      const particle = particlePool[poolIndex];
      poolIndex = (poolIndex + 1) % POOL_SIZE;
      return particle;
    };

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetY = Math.random() * (canvas.height * 0.5);
      const color = colors[Math.floor(Math.random() * colors.length)];

      const explode = (x: number, y: number) => {
        for (let i = 0; i < 50; i++) {
          const particle = getParticle();
          particle.init(x, y, color);
        }
      };

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

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 批量更新和绘制活跃的粒子
        particlePool.forEach(particle => {
          if (particle.active) {
            particle.update();
            particle.draw();
          }
        });

        if (Math.random() < 0.02) {
          createFirework();
        }

        lastTime = currentTime;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

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