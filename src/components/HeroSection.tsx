import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Play,
  Square,
  ArrowRight,
  Star,
  Volume2,
  ShieldCheck,
  Zap,
  Heart,
  Smile,
  Music,
  Compass
} from "lucide-react";
import { PersonalisationState } from "../types";
import { soundManager } from "../utils/audioSynthesizer";
import confetti from "canvas-confetti";

interface HeroSectionProps {
  personalisation: PersonalisationState;
  onOpenCreator: () => void;
  onPlaySample: () => void;
  isPlayingSample: boolean;
  onStopSample: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  personalisation,
  onOpenCreator,
  onPlaySample,
  isPlayingSample,
  onStopSample
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroCtaRef = useRef<HTMLButtonElement | null>(null);
  const [heroCtaStyle, setHeroCtaStyle] = useState<React.CSSProperties>({});
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});

  // Typewriter effect state
  const [headlinePart1, setHeadlinePart1] = useState("");
  const [headlinePart2, setHeadlinePart2] = useState("");
  const [cursorFade, setCursorFade] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const text1 = "Screen time they love.";
    const text2 = "Growth you trust.";
    let i = 0;
    let j = 0;

    const timer1 = setInterval(() => {
      if (i < text1.length) {
        setHeadlinePart1(text1.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer1);
        setTimeout(() => {
          const timer2 = setInterval(() => {
            if (j < text2.length) {
              setHeadlinePart2(text2.substring(0, j + 1));
              j++;
            } else {
              clearInterval(timer2);
              setTimeout(() => setCursorFade(true), 2000);
            }
          }, 60);
        }, 300);
      }
    }, 60);

    return () => {
      clearInterval(timer1);
    };
  }, []);

  // Magnetic button pull effect
  useEffect(() => {
    const button = heroCtaRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const pullX = dx * 0.22;
        const pullY = dy * 0.22;
        setHeroCtaStyle({
          transform: `translate(${pullX}px, ${pullY}px) scale(1.04)`,
          transition: "transform 0.08s ease-out"
        });
      } else {
        setHeroCtaStyle({
          transform: "translate(0px, 0px) scale(1)",
          transition: "transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3D Card tilt calculation
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: "0 25px 50px -12px rgba(26, 59, 212, 0.22), 0 0 35px rgba(127, 119, 221, 0.25)",
      transition: "transform 0.05s ease-out, box-shadow 0.2s ease"
    });
  };

  const handleCardMouseLeave = () => {
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.07)",
      transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease"
    });
  };

  // Canvas star particles background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const stars = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.35 + 0.1),
      color: Math.random() > 0.4 ? "#FFD700" : "#7F77DD",
      opacity: Math.random() * 0.6 + 0.3,
      pulse: Math.random() * Math.PI
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouse);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        const dx = mouseX - s.x;
        const dy = mouseY - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let driftX = 0;
        let driftY = 0;
        if (dist < 260) {
          const force = (260 - dist) / 260;
          driftX = (dx / dist) * force * 0.25;
          driftY = (dy / dist) * force * 0.25;
        }

        s.x += s.speedX + driftX;
        s.y += s.speedY + driftY;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        s.pulse += 0.03;
        const currentOpacity = s.opacity * (0.6 + 0.4 * Math.sin(s.pulse));

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, currentOpacity));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      frameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(frameId);
    };
  }, []);

  const triggerConfettiExplosion = (e: React.MouseEvent) => {
    soundManager.playSoundEffect("starDing");
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ["#1A3BD4", "#F5A623", "#7F77DD", "#1D9E75", "#FFD700"]
    });
  };

  const childName = personalisation.name.trim() || "Arjun";

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-16 md:py-24 bg-linear-to-b from-white via-indigo-50/20 to-brand-bg"
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-accent2/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Super Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent1 animate-spin" />
              <span>Personalised Kids Content & Learning Adventures</span>
            </div>

            {/* Typewriter Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-brand-text leading-tight tracking-tight min-h-[140px] sm:min-h-[160px]">
              <span className="text-brand-primary relative inline-block">
                {headlinePart1}
                {headlinePart1 && (
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-brand-primary/15 -z-10 rounded-full"></span>
                )}
              </span>{" "}
              <br />
              <span className="text-brand-accent2 relative inline-block">
                {headlinePart2}
                {headlinePart2 && (
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-brand-accent2/15 -z-10 rounded-full"></span>
                )}
              </span>
              {!cursorFade && (
                <span className="inline-block w-[3px] h-[0.9em] bg-brand-accent2 ml-1 align-middle animate-pulse"></span>
              )}
              <div className="text-base sm:text-lg md:text-xl font-bold text-brand-accent1 font-display tracking-wide mt-2">
                "Custom songs, stories & games built for {childName}."
              </div>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Transform random phone scrolling into confidence, moral values, and vocabulary growth. Delivered directly to your WhatsApp in 24 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="btn-hero-order"
                ref={heroCtaRef}
                style={heroCtaStyle}
                onClick={(e) => {
                  triggerConfettiExplosion(e);
                  onOpenCreator();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-primary/95 text-white text-base font-black rounded-2xl shadow-xl shadow-brand-primary/25 hover:shadow-2xl transition-all cursor-pointer"
              >
                <span>Customize For {childName} Now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button
                id="btn-hero-sample"
                onClick={(e) => {
                  triggerConfettiExplosion(e);
                  if (isPlayingSample) {
                    onStopSample();
                  } else {
                    onPlaySample();
                  }
                }}
                className={`w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 text-base font-extrabold rounded-2xl border-2 transition-all cursor-pointer ${
                  isPlayingSample
                    ? "bg-amber-50 border-brand-accent1 text-brand-accent1 ring-4 ring-brand-accent1/20"
                    : "bg-white border-brand-accent2/30 text-brand-accent2 hover:bg-brand-accent2/5 hover:border-brand-accent2"
                }`}
              >
                {isPlayingSample ? (
                  <>
                    <Square className="w-5 h-5 mr-2 fill-brand-accent1 text-brand-accent1 animate-pulse" />
                    <span>Pause Sample 🎵</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2 fill-brand-accent2 text-brand-accent2" />
                    <span>Hear Sample Jingle 🎵</span>
                  </>
                )}
              </button>
            </div>

            {/* Visualizer bars during sample play */}
            {isPlayingSample && (
              <div className="flex items-center justify-center lg:justify-start space-x-2 bg-indigo-50/80 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0 border border-indigo-100 animate-pulse">
                <Volume2 className="w-4 h-4 text-brand-primary" />
                <span className="text-xs font-mono font-bold text-brand-primary">
                  Synthesizing Chimes (C-Pentatonic 115 BPM):
                </span>
                <div className="flex space-x-1 items-end h-3">
                  {[0, 1, 2, 3, 4, 5].map((b) => (
                    <span
                      key={b}
                      className="w-1 rounded-full bg-brand-primary animate-bounce"
                      style={{
                        height: `${Math.random() * 80 + 30}%`,
                        animationDelay: `${b * 120}ms`,
                        animationDuration: "0.5s"
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Trust Bar */}
            <div className="pt-4 border-t border-gray-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                  <Zap className="w-4 h-4 text-brand-accent1" />
                  <span>AI Powered</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-success" />
                  <span>100% Ad-Free</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Loved by Parents</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                  <span className="text-base">🇮🇳</span>
                  <span>Made in India</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={cardStyle}
              className="relative w-full max-w-sm sm:max-w-md bg-white border-2 border-brand-primary/20 rounded-3xl p-6 sm:p-7 shadow-xl shadow-indigo-100/50 cursor-pointer"
            >
              {/* Badge */}
              <div className="absolute -top-3.5 -right-2 bg-brand-accent1 text-white text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider rotate-3 shadow-md shadow-amber-400/25 flex items-center space-x-1">
                <span>⭐ LIVE PREVIEW</span>
              </div>

              {/* Card Header */}
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-100 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Music className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-brand-text">Active Child Jingle Pack</h4>
                  <p className="text-[10px] text-gray-400 font-mono">Status: Ready to Personalise</p>
                </div>
              </div>

              {/* Animated Scene Preview */}
              <div className="bg-linear-to-br from-indigo-50/80 to-purple-50/60 rounded-2xl p-5 relative overflow-hidden mb-4 border border-indigo-50 text-center">
                <div className="flex justify-center mb-2">
                  <div className="relative animate-bounce">
                    <span className="text-6xl block drop-shadow-md">
                      {personalisation.avatar.companionPet.split(" ")[1] || "🐉"}
                    </span>
                    <span className="absolute -top-1 -right-2 text-xl animate-spin">✨</span>
                  </div>
                </div>

                <p className="font-display text-base sm:text-lg font-black text-brand-text leading-snug">
                  "Today, <span className="text-brand-primary underline decoration-2 decoration-brand-accent1">{childName}</span> journeys into <span className="text-brand-accent2">{personalisation.interest}</span> to learn <span className="text-brand-success">{personalisation.value.split(" ")[0]}</span>!"
                </p>
              </div>

              {/* Specs Details */}
              <div className="space-y-2.5 bg-gray-50/80 p-3.5 rounded-2xl text-xs font-semibold">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5 text-brand-accent1" /> Hero Companion:
                  </span>
                  <span className="text-brand-accent2 bg-white px-2 py-0.5 rounded-md font-bold shadow-2xs">
                    {personalisation.avatar.companionPet}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-brand-primary" /> Active World:
                  </span>
                  <span className="text-brand-primary bg-white px-2 py-0.5 rounded-md font-bold shadow-2xs">
                    {personalisation.interest}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-brand-success" /> Value Focus:
                  </span>
                  <span className="text-brand-success bg-white px-2 py-0.5 rounded-md font-bold shadow-2xs">
                    {personalisation.value}
                  </span>
                </div>
              </div>

              {/* Live Preview Button */}
              <button
                id="btn-hero-activate"
                onClick={() => {
                  soundManager.playSoundEffect("pop");
                  onOpenCreator();
                }}
                className="mt-4 w-full text-center py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-md shadow-brand-primary/20 cursor-pointer"
              >
                <span>Launch Creator Studio →</span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
