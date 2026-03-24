import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouse = { x: -1000, y: -1000 };
    let targetMouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };
    window.addEventListener('resize', resize);

    const spacing = 45; // 调大间距，让阵列感更强
    let dots: { x: number, y: number, originX: number, originY: number }[] = [];

    const initDots = () => {
      dots = [];
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          dots.push({ x, y, originX: x, originY: y });
        }
      }
    };
    initDots();

    let animationFrameId: number;

    const draw = () => {
      // 鼠标平滑跟随
      mouse.x += (targetMouse.x - mouse.x) * 0.15;
      mouse.y += (targetMouse.y - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // 1. 更大、更亮的全局光效跟随
      if (mouse.x > -500) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 800);
        gradient.addColorStop(0, 'rgba(140, 142, 255, 0.18)'); // 中心更亮
        gradient.addColorStop(0.4, 'rgba(140, 142, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(140, 142, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. 绘制科技感连线和浮点突起
      const maxDistance = 450; // 影响范围大幅扩大

      dots.forEach(dot => {
        const dx = mouse.x - dot.originX;
        const dy = mouse.y - dot.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let radius = 1.8; // 基础点变大
        let drawX = dot.originX;
        let drawY = dot.originY;

        if (distance < maxDistance) {
          const force = Math.max(0, (maxDistance - distance) / maxDistance);
          const easeForce = Math.pow(force, 2); // 平滑曲线
          
          // 突起力度大幅增加 (放大效果)
          radius = 1.8 + easeForce * 6;
          
          // 强烈的排斥/突起距离
          const angle = Math.atan2(dy, dx);
          const pushDistance = easeForce * 100; // 突起距离增加到 100px
          drawX -= Math.cos(angle) * pushDistance;
          drawY -= Math.sin(angle) * pushDistance;
          
          // 绘制鼠标到浮点的科技感连线 (Plexus 效果)
          if (distance < maxDistance * 0.6) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(drawX, drawY);
            ctx.strokeStyle = `rgba(192, 193, 255, ${easeForce * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // 靠近鼠标的浮点非常亮
          ctx.fillStyle = `rgba(192, 193, 255, ${0.2 + easeForce * 0.8})`;
        } else {
          // 默认浮点颜色
          ctx.fillStyle = 'rgba(192, 193, 255, 0.2)';
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-2]"
    />
  );
}
