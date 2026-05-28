import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * HTML5 Canvas scratch-to-reveal card.
 * - Supports mouse & touch.
 * - Auto-reveals once >= threshold (default 40%) is scratched.
 */
const ScratchCard = ({
  width = 520,
  height = 320,
  threshold = 40,
  onReveal,
  revealed,
  resetKey,
  children,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawing = useRef(false);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState({ w: width, h: height });
  const hasRevealed = useRef(false);

  // Responsive sizing
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = Math.min(containerRef.current.offsetWidth, width);
      const h = Math.round((w / width) * height);
      setSize({ w, h });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [width, height]);

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { w, h } = size;
    canvas.width = w;
    canvas.height = h;
    // Always reset composite mode so we paint, not erase
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    // Solid base first to guarantee opacity
    ctx.fillStyle = '#bfbfbf';
    ctx.fillRect(0, 0, w, h);

    // Metallic silver gradient over solid base
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#d8d8d8');
    grad.addColorStop(0.35, '#f1f1f1');
    grad.addColorStop(0.6, '#a8a8a8');
    grad.addColorStop(1, '#7d7d7d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Noise texture for scratch-card feel
    const noiseDensity = Math.floor((w * h) / 80);
    for (let i = 0; i < noiseDensity; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const a = Math.random() * 0.15;
      ctx.fillStyle = `rgba(0,0,0,${a})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Diagonal stripes for premium feel
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    for (let i = -h; i < w; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }
    ctx.restore();

    // Hint text
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.font = `600 ${Math.max(16, Math.round(w / 22))}px Space Grotesk, Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 - 14);
    ctx.font = `500 ${Math.max(12, Math.round(w / 32))}px Inter, sans-serif`;
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillText('A Kiwi problem worth solving', w / 2, h / 2 + 18);
  }, [size]);

  useEffect(() => {
    hasRevealed.current = false;
    setProgress(0);
    paintCover();
  }, [paintCover, resetKey]);

  // If parent forces revealed=true, clear the canvas
  useEffect(() => {
    if (revealed && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [revealed]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (e) => {
    if (!isDrawing.current || revealed) return;
    e.preventDefault?.();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, Math.max(20, canvas.width / 18), 0, Math.PI * 2);
    ctx.fill();
    computeProgress();
  };

  const computeProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    // Sample every 16th pixel for speed
    for (let i = 3; i < img.data.length; i += 64) {
      if (img.data[i] < 30) cleared++;
    }
    const total = img.data.length / 64;
    const pct = Math.round((cleared / total) * 100);
    setProgress(pct);
    if (pct >= threshold && !hasRevealed.current) {
      hasRevealed.current = true;
      // Smoothly clear remaining
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      onReveal?.();
    }
  };

  const start = (e) => {
    isDrawing.current = true;
    scratch(e);
  };
  const end = () => {
    isDrawing.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[520px] mx-auto select-none"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Revealed content underneath */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0e1320] to-[#0a0a0a] ring-1 ring-white/10 shadow-2xl">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #00BFFF22, transparent 40%), radial-gradient(circle at 80% 80%, #39FF1422, transparent 40%)' }} />
        <div className="relative z-10 h-full w-full p-6 sm:p-8 flex flex-col justify-center">
          {children}
        </div>
        <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-[#39FF14]" />
          Kiwi Problem
        </div>
      </div>

      {/* Scratch canvas overlay — always mounted but disabled when revealed for click pass-through safety */}
      <canvas
        ref={canvasRef}
        width={size.w}
        height={size.h}
        className={`absolute inset-0 w-full h-full rounded-2xl touch-none transition-opacity duration-300 z-20 ${
          revealed ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-grab active:cursor-grabbing'
        }`}
        onMouseDown={start}
        onMouseMove={scratch}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={scratch}
        onTouchEnd={end}
      />

      {!revealed && (
        <div className="absolute -bottom-7 left-0 right-0 text-center text-xs text-white/50 z-10">
          {progress < threshold ? `Keep scratching… ${progress}%` : 'Revealing…'}
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
