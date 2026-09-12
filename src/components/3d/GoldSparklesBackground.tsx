import React, { useEffect, useRef } from 'react';

export const GoldSparklesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Adapt count for mobile responsiveness and performance
    const isMobile = width < 768;
    const bokehCount = isMobile ? 6 : 14;
    const bokehOrbs = Array.from({ length: bokehCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * (isMobile ? 50 : 80) + 35,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.4 ? 'rgba(212, 175, 55,' : 'rgba(184, 88, 116,', // Gold and warm wine
      alpha: Math.random() * 0.12 + 0.05,
      pulse: Math.random() * Math.PI * 2
    }));

    // 2. Fine Golden Glitter Embers
    const particleCount = isMobile ? 25 : 55;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.35 + 0.12),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.04 + 0.015,
      color: Math.random() > 0.3 ? 'rgba(255, 225, 120,' : 'rgba(255, 195, 80,'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render soft warm bokeh light orbs
      bokehOrbs.forEach(b => {
        b.x += b.speedX;
        b.y += b.speedY;
        b.pulse += 0.008;

        if (b.x < -100) b.x = width + 100;
        if (b.x > width + 100) b.x = -100;
        if (b.y < -100) b.y = height + 100;
        if (b.y > height + 100) b.y = -100;

        const dynamicAlpha = b.alpha * (0.8 + Math.sin(b.pulse) * 0.2);
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `${b.hue} ${dynamicAlpha})`);
        grad.addColorStop(0.6, `${b.hue} ${dynamicAlpha * 0.4})`);
        grad.addColorStop(1, `${b.hue} 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render drifting gold sparkles
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed * 0.1) * 0.015;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const clampedOpacity = Math.max(0.08, Math.min(0.9, p.opacity));
        ctx.fillStyle = `${p.color} ${clampedOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo
        ctx.fillStyle = `${p.color} ${clampedOpacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};
