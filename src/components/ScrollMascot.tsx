import React, { useEffect, useRef, useState, useMemo } from "react";
import mascotDragonImg from "../assets/images/assets/mascot-dragon.png";

interface ScrollMascotProps {
  companionPet?: string;
  onLandedChange?: (landed: boolean) => void;
}

// Convert Catmull-Rom spline waypoints into a smooth cubic Bezier SVG path
function createSmoothSvgPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export const ScrollMascot: React.FC<ScrollMascotProps> = ({
  companionPet = "Baby Dragon 🐉",
  onLandedChange
}) => {
  const dragonRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  // States
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [wingFrame, setWingFrame] = useState<0 | 1>(0);
  const [pathD, setPathD] = useState<string>("");
  const [pathLength, setPathLength] = useState<number>(1000);

  // Scroll physics references
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<any>(null);
  const wingTimerRef = useRef<any>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mql.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  // Preload secondary flap frame
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/mascot-dragon-flap.png";
  }, []);

  // Compute responsive waypoints & SVG path
  const computeFlightPath = () => {
    if (typeof window === "undefined") return;

    const winW = window.innerWidth;
    const isMobile = winW < 768;
    const docH = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      5000
    );

    // Starting point: Measure Hero Live Preview card if available
    let startX = isMobile ? winW * 0.5 : winW * 0.72;
    let startY = 360;
    const heroSlot = document.getElementById("hero-mascot-slot");
    if (heroSlot) {
      const rect = heroSlot.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + window.scrollY;
    }

    // Landing target: Floating WhatsApp CTA button at bottom
    let endX = winW - (isMobile ? 70 : 100);
    let endY = docH - 120;
    const waBtn = document.getElementById("floating-whatsapp-btn");
    if (waBtn) {
      const rect = waBtn.getBoundingClientRect();
      endX = rect.left + rect.width / 2 - (isMobile ? 25 : 45);
      endY = rect.top + window.scrollY;
    }

    let waypoints: { x: number; y: number }[] = [];

    if (isMobile) {
      // Mobile: simpler, narrower path hugging the right edge to never obstruct reading
      const rightX = Math.max(260, winW - 55);
      waypoints = [
        { x: startX, y: startY },
        { x: rightX - 10, y: docH * 0.16 },
        { x: rightX + 8, y: docH * 0.32 },
        { x: rightX - 12, y: docH * 0.48 },
        { x: rightX + 6, y: docH * 0.64 },
        { x: rightX - 8, y: docH * 0.80 },
        { x: rightX - 2, y: docH * 0.92 },
        { x: endX, y: endY }
      ];
    } else {
      // Desktop / Tablet: Generous S-curves through spacious outer margins
      const maxContentW = 1280;
      const marginPad = Math.max(45, (winW - maxContentW) / 2 + 35);
      const leftMarginX = marginPad;
      const rightMarginX = winW - marginPad;

      waypoints = [
        { x: startX, y: startY },
        { x: leftMarginX, y: docH * 0.15 },       // Beside Creator Studio
        { x: rightMarginX, y: docH * 0.32 },      // Beside Games Playroom
        { x: leftMarginX + 15, y: docH * 0.48 }, // Beside Delivery Mockup
        { x: rightMarginX - 10, y: docH * 0.64 },// Beside Calculator
        { x: leftMarginX + 10, y: docH * 0.78 }, // Beside Products & Pricing
        { x: rightMarginX - 30, y: docH * 0.90 },// Beside Founding Families
        { x: endX, y: endY }                     // Lands near WhatsApp CTA
      ];
    }

    const d = createSmoothSvgPath(waypoints);
    setPathD(d);
  };

  // Recompute path on mount and on window resize
  useEffect(() => {
    computeFlightPath();

    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        computeFlightPath();
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update total path length when pathD changes
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) setPathLength(len);
      } catch (err) {
        // SVG length fallback
      }
    }
  }, [pathD]);

  // Handle scroll detection and wing flap activation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      targetProgressRef.current = progress;

      // Flight activation state
      const shouldFly = scrollY > 25;
      setIsFlying(shouldFly);

      // Scrolling active flag for wing-flap effect
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 140);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Wing flap frame toggling while scrolling
  useEffect(() => {
    if (isScrolling) {
      wingTimerRef.current = setInterval(() => {
        setWingFrame((prev) => (prev === 0 ? 1 : 0));
      }, 120);
    } else {
      clearInterval(wingTimerRef.current);
      setWingFrame(0);
    }
    return () => clearInterval(wingTimerRef.current);
  }, [isScrolling]);

  // 60FPS RAF animation loop using transform only for buttery smooth movement
  useEffect(() => {
    if (isReducedMotion) return;

    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;

      // Smooth lerp easing
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;
      currentProgressRef.current += diff * 0.1;

      const p = currentProgressRef.current;
      const landed = p >= 0.94;
      setIsLanded(landed);
      if (onLandedChange) {
        onLandedChange(landed);
      }

      const path = pathRef.current;
      const dragon = dragonRef.current;

      if (path && dragon && pathLength > 0) {
        try {
          const distance = Math.min(pathLength, Math.max(0, p * pathLength));
          const pt = path.getPointAtLength(distance);

          // Calculate trajectory angle from neighboring points
          const delta = 4;
          const nextPt = path.getPointAtLength(Math.min(pathLength, distance + delta));
          const prevPt = path.getPointAtLength(Math.max(0, distance - delta));
          const dx = nextPt.x - prevPt.x;
          const dy = nextPt.y - prevPt.y;

          // Convert tangent to banking tilt angle
          const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          const tilt = Math.max(-22, Math.min(22, (rawAngle - 90) * 0.35));

          // Horizontal facing flip: face direction of travel
          const isFlyingLeft = dx < -0.2;
          const flipX = isFlyingLeft ? -1 : 1;

          // Size & 3D Depth Scaling
          const isMobile = window.innerWidth < 768;
          const baseScale = isMobile ? 0.58 : 0.9;
          // Scale slightly larger when near, smaller when dipping into distance
          const depthScale = baseScale * (0.92 + 0.12 * Math.sin(p * Math.PI * 5));

          // Fixed viewport coordinates
          const scrollY = window.scrollY || window.pageYOffset;
          const halfSize = isMobile ? 40 : 70;
          const screenX = pt.x - halfSize;
          const screenY = pt.y - scrollY - halfSize;

          dragon.style.transform = `translate3d(${screenX.toFixed(1)}px, ${screenY.toFixed(1)}px, 0) scale(${depthScale * flipX}, ${depthScale}) rotate(${tilt.toFixed(1)}deg)`;
        } catch (e) {
          // Ignore SVG measurement glitches
        }
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);
    return () => {
      isMounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isReducedMotion, pathLength, onLandedChange]);

  // If user prefers reduced motion, disable flying animation completely
  if (isReducedMotion) {
    return null;
  }

  // Mascot image selection (swap between main and flap frame during active scroll)
  const isDragon = companionPet.toLowerCase().includes("dragon");
  const mascotSrc =
    isDragon && isScrolling && wingFrame === 1
      ? "/assets/mascot-dragon-flap.png"
      : mascotDragonImg;

  return (
    <>
      {/* Invisible Flight Path SVG for mascot trajectory calculation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible opacity-0"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="none"
        />
      </svg>

      {/* 2. Fixed Layer for Flying Mascot (pointer-events: none, zIndex 30) */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden select-none"
        style={{ zIndex: 30 }}
        aria-hidden="true"
      >
        <div
          ref={dragonRef}
          className="absolute top-0 left-0 will-change-transform pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isFlying ? 1 : 0
          }}
        >
          <div className="relative flex items-center justify-center">
            {/* Mascot Image with Wing Flap Flutter */}
            <img
              src={mascotSrc}
              alt="Kidora Baby Dragon Mascot"
              className={`h-[120px] sm:h-[140px] w-auto object-contain select-none ${
                isScrolling ? "animate-wing-flutter" : ""
              } ${isLanded ? "animate-mascot-wave" : ""}`}
              style={{
                filter: "drop-shadow(0 14px 18px rgba(26, 59, 212, 0.24))"
              }}
              referrerPolicy="no-referrer"
            />

            {/* Sparkle Trail Effect */}
            <span
              className="absolute -top-1 -right-2 text-xl sm:text-2xl animate-pulse select-none"
              aria-hidden="true"
            >
              ✨
            </span>

            {/* Final Section Landing Greeting Bubble */}
            {isLanded && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white/95 text-emerald-800 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-md border border-emerald-200 whitespace-nowrap animate-bounce flex items-center gap-1">
                <span>Wave! 💬 Ready to start!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
