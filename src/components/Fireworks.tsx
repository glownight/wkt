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

    // 减小对象池大小
    const POOL_SIZE = 500;
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
      size: number = 2;

      init(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        // 降低粒子速度
        const speed = Math.random() * 1.5 + 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.active = true;
        // 随机粒子大小
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        if (!this.active) return;
        
        this.x += this.vx;
        this.y += this.vy;
        // 降低重力加速度
        this.vy += 0.02;
        // 加快消失速度
        this.alpha -= 0.01;

        if (this.alpha <= 0 || 
            this.x < 0 || 
            this.x > canvas.width || 
            this.y < 0 || 
            this.y > canvas.height) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active) return;
        
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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
    let lastFireworkTime = 0;
    const FIREWORK_INTERVAL = 1000; // 限制烟花发射间隔

    const getParticle = () => {
      const particle = particlePool[poolIndex];
      poolIndex = (poolIndex + 1) % POOL_SIZE;
      return particle;
    };

    const isMobile = () => {
      return window.innerWidth <= 768;
    };

    const createFirework = (currentTime: number) => {
      // 控制发射间隔
      if (currentTime - lastFireworkTime < FIREWORK_INTERVAL) {
        return;
      }
      lastFireworkTime = currentTime;

      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetY = Math.random() * (canvas.height * 0.6);
      const color = colors[Math.floor(Math.random() * colors.length)];

      const explode = (x: number, y: number) => {
        const particleCount = isMobile() ? 20 : 35;
        for (let i = 0; i < particleCount; i++) {
          const particle = getParticle();
          particle.init(x, y, color);
        }
      };

      let currentY = y;
      const rise = () => {
        if (!canvas) return; // 防止组件卸载后继续运行
        
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
      if (!canvas) return; // 防止组件卸载后继续运行
      
      if (currentTime - lastTime >= frameInterval) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // 增加透明度，减少拖影
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let activeCount = 0;
        
        particlePool.forEach(particle => {
          if (particle.active) {
            particle.update();
            particle.draw();
            activeCount++;
          }
        });

        // 严格控制活跃粒子数量
        const maxActiveParticles = isMobile() ? 50 : 150;
        if (activeCount < maxActiveParticles) {
          createFirework(currentTime);
        }

        lastTime = currentTime;
      }

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame); // 清理动画
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