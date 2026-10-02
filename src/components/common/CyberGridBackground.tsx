import React, { useEffect, useRef } from 'react';

/**
 * CyberGridBackground
 * High-performance ambient cyber background featuring:
 * 1. Flowing harmonic telemetry waves (inspired by g-helper & EEG signal monitoring)
 * 2. Animated drifting cyber grid with subtle glowing intersections
 * 3. Mouse-reactive spotlight & crosshair reveal
 * 4. Battery & performance conscious: pauses on tab blur, throttled FPS, respects reduced motion
 */
export const CyberGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates with smooth lerp
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Grid configuration
    const GRID_SIZE = 48; // Size of each cyber grid cell
    let gridOffset = 0;
    let time = 0;
    let isTabVisible = !document.hidden;

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Color definitions for telemetry waves (Cyan -> Blue -> Violet)
    const WAVE_COLORS = [
      { r: 56, g: 189, b: 248, a: 0.16 },  // Sky 400
      { r: 14, g: 165, b: 233, a: 0.13 },  // Sky 500
      { r: 99, g: 102, b: 241, a: 0.11 },  // Indigo 500
      { r: 168, g: 85, b: 247, a: 0.08 },  // Purple 500
      { r: 16, g: 185, b: 129, a: 0.09 },  // Emerald 500 (health signal)
    ];

    let lastFrameTime = performance.now();
    const TARGET_INTERVAL = 1000 / 45; // 45 FPS cap for buttery smooth performance without heating CPU/GPU

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isTabVisible) return;

      const delta = now - lastFrameTime;
      if (delta < TARGET_INTERVAL) return;
      lastFrameTime = now - (delta % TARGET_INTERVAL);

      if (!prefersReducedMotion) {
        time += 0.012;
        gridOffset = (gridOffset + 0.25) % GRID_SIZE;
      }

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // --- 1. RENDER MOVING CYBER GRID ---
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)';

      // Vertical grid lines
      const startX = -(gridOffset % GRID_SIZE);
      ctx.beginPath();
      for (let x = startX; x < width + GRID_SIZE; x += GRID_SIZE) {
        ctx.moveTo(Math.floor(x) + 0.5, 0);
        ctx.lineTo(Math.floor(x) + 0.5, height);
      }

      // Horizontal grid lines drifting slowly downwards
      const startY = -(gridOffset % GRID_SIZE);
      for (let y = startY; y < height + GRID_SIZE; y += GRID_SIZE) {
        ctx.moveTo(0, Math.floor(y) + 0.5);
        ctx.lineTo(width, Math.floor(y) + 0.5);
      }
      ctx.stroke();

      // --- 2. MOUSE SPOTLIGHT ON GRID & CROSSHAIRS ---
      if (mouse.active || mouse.x > 0) {
        const radius = 280;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, radius);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
        grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.035)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - radius, mouse.y - radius, radius * 2, radius * 2);

        // Highlight nearest grid intersection points with cyber crosshairs
        const snapX = Math.round((mouse.x + (gridOffset % GRID_SIZE)) / GRID_SIZE) * GRID_SIZE - (gridOffset % GRID_SIZE);
        const snapY = Math.round((mouse.y + (gridOffset % GRID_SIZE)) / GRID_SIZE) * GRID_SIZE - (gridOffset % GRID_SIZE);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;

        // Render crosshairs at intersections near cursor
        for (let ix = -1; ix <= 1; ix++) {
          for (let iy = -1; iy <= 1; iy++) {
            const cx = snapX + ix * GRID_SIZE;
            const cy = snapY + iy * GRID_SIZE;
            const dist = Math.hypot(cx - mouse.x, cy - mouse.y);
            if (dist < 180) {
              const alpha = (1 - dist / 180) * 0.45;
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              // Small 6px crosshair
              ctx.moveTo(cx - 3, cy);
              ctx.lineTo(cx + 3, cy);
              ctx.moveTo(cx, cy - 3);
              ctx.lineTo(cx, cy + 3);
              ctx.stroke();
            }
          }
        }
      }

      // --- 3. FLOWING TELEMETRY RIBBON WAVES (g-helper style) ---
      // We render harmonic multi-strand waves in the top/middle section
      const waveBaseY = Math.min(height * 0.28, 260);
      const points = 70;
      const step = width / (points - 1);

      WAVE_COLORS.forEach((color, i) => {
        ctx.beginPath();
        const phaseOffset = i * 0.42;
        const speedMultiplier = 1 + i * 0.12;
        const amp = 32 + i * 9;

        for (let p = 0; p < points; p++) {
          const px = p * step;
          const progress = px / width;

          // Double harmonic sine wave with envelope dampening at screen edges
          const envelope = Math.sin(progress * Math.PI); // 0 at edges, 1 at center
          const primaryWave = Math.sin(progress * 4.2 + time * speedMultiplier + phaseOffset);
          const secondaryWave = Math.sin(progress * 8.6 - time * 0.7 * speedMultiplier + phaseOffset * 1.5) * 0.35;
          const py = waveBaseY + (primaryWave + secondaryWave) * amp * (0.45 + 0.55 * envelope);

          if (p === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      });

      // --- 4. SECONDARY LOWER TELEMETRY STRAND (subtle ambient depth) ---
      const lowerBaseY = Math.min(height * 0.72, 750);
      ctx.beginPath();
      for (let p = 0; p < points; p++) {
        const px = p * step;
        const progress = px / width;
        const wave = Math.sin(progress * 3.5 + time * 0.8 + 1.2) * 22;
        const py = lowerBaseY + wave;
        if (p === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Canvas with moving grid and harmonic waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Soft atmospheric vignettes ensuring high text contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(56,189,248,0.06),transparent_80%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950/90" />
    </div>
  );
};

export default CyberGridBackground;
