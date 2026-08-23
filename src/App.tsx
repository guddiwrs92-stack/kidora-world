import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Music,
  BookOpen,
  Gamepad2,
  Heart,
  Shield,
  CheckCircle2,
  Smile,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Play,
  Square,
  MessageCircle,
  School,
  Gift,
  Star,
  Volume2,
  VolumeX,
  Award,
  Clock,
  ArrowUpRight,
  Sparkle,
  MessageSquareOff,
  ExternalLink
} from "lucide-react";

// Types for personalization
interface PersonalisationState {
  name: string;
  age: string;
  interest: string;
  goal: string;
  value: string;
}

interface GameItem {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaUrl?: string;
  isComingSoon?: boolean;
  icon: string;
  colorTheme: {
    stripeBg: string;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    taglineText: string;
    borderHover: string;
  };
}

const GAMES_DATA: GameItem[] = [
  {
    id: "factblast",
    title: "FactBlast",
    badge: "Live Play",
    tagline: "Educational Web Game",
    description: "Discover fascinating facts, answer fun questions, and learn something new every day through an engaging interactive experience.",
    features: [
      "Fun learning experience",
      "Kid-friendly interface",
      "Interactive gameplay",
      "Educational content"
    ],
    ctaText: "Play FactBlast",
    ctaUrl: "https://factblast-ai-by-kidora.vercel.app/",
    icon: "🎮",
    colorTheme: {
      stripeBg: "bg-brand-primary",
      badgeBg: "bg-indigo-100",
      badgeText: "text-[#1A3BD4]",
      iconBg: "bg-indigo-50",
      taglineText: "text-indigo-500",
      borderHover: "hover:border-brand-primary/80 border-brand-primary/15"
    }
  },
  {
    id: "word-wizard",
    title: "Word Wizard",
    badge: "Coming Soon",
    tagline: "Spelling & Word Adventure",
    description: "Supercharge your child's spelling & vocabulary through dynamic phonics puzzles and high-frequency letter tasks.",
    features: [
      "Spelling booster",
      "Animated phonics",
      "Interactive letter puzzles",
      "Rich word audio"
    ],
    ctaText: "Word Magic Lab",
    isComingSoon: true,
    icon: "🔤",
    colorTheme: {
      stripeBg: "bg-amber-400",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
      iconBg: "bg-amber-50",
      taglineText: "text-amber-600",
      borderHover: "hover:border-amber-400/80 border-gray-100"
    }
  },
  {
    id: "math-quest",
    title: "Math Quest",
    badge: "Coming Soon",
    tagline: "Space Math Adventure",
    description: "Blast off into basic arithmetic! Master mental counting, addition, and pattern recognition with playful space rewards.",
    features: [
      "Fun space addition",
      "Adaptive difficulties",
      "Visual math toys",
      "Mental arithmetic habits"
    ],
    ctaText: "Math Academy",
    isComingSoon: true,
    icon: "➕",
    colorTheme: {
      stripeBg: "bg-fuchsia-400",
      badgeBg: "bg-fuchsia-100",
      badgeText: "text-fuchsia-700",
      iconBg: "bg-fuchsia-50",
      taglineText: "text-fuchsia-600",
      borderHover: "hover:border-fuchsia-400/80 border-gray-100"
    }
  },
  {
    id: "text-memory",
    title: "Memory Master",
    badge: "Coming Soon",
    tagline: "Focus & Logic Training",
    description: "Train memory and concentration with visual card match puzzles, shape-sorting levels, and delightful logical timers.",
    features: [
      "Memory card games",
      "Logical matching",
      "Visual attention focus",
      "Progress tracking"
    ],
    ctaText: "Playground Lab",
    isComingSoon: true,
    icon: "🧠",
    colorTheme: {
      stripeBg: "bg-emerald-400",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-700",
      iconBg: "bg-emerald-50",
      taglineText: "text-emerald-600",
      borderHover: "hover:border-emerald-400/80 border-gray-100"
    }
  }
];

export default function App() {
  // 16. PREMIUM PAGE LOADER state
  const [loading, setLoading] = useState(true);
  
  // 14. GLASSMORPHISM NAVBAR scroll state
  const [scrolled, setScrolled] = useState(false);

  // 12. 3D TESTIMONIAL CAROUSEL state
  const [testiIndex, setTestiIndex] = useState(1);

  // 3. TYPEWRITER EFFECT state
  const [part1Text, setPart1Text] = useState("");
  const [part2Text, setPart2Text] = useState("");
  const [cursorFade, setCursorFade] = useState(false);

  // 10. STEP COUNTER ANIMATION state
  const [stepValues, setStepValues] = useState([0, 0, 0, 0]);

  // Mobile Hamburger state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Customization state
  const [personalisation, setPersonalisation] = useState<PersonalisationState>({
    name: "Arjun",
    age: "6-8",
    interest: "Space & Stars",
    goal: "Curiosity & Science",
    value: "Kindness 💛",
  });
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStep, setAudioStep] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioTimeoutsRef = useRef<number[]>([]);

  // FAQ open state (stored as open indexes)
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true, // Default open the first one
  });

  // Generated rhyme based on options
  const [generatedContent, setGeneratedContent] = useState({ lyrics: "", storyBrief: "" });

  // Update generated content dynamically when personalisation state changes
  useEffect(() => {
    const name = personalisation.name.trim() || "Arjun";
    const interest = personalisation.interest;
    const value = personalisation.value;
    const goal = personalisation.goal;

    let interestText = "";
    if (interest === "Dinosaurs") {
      interestText = `with friendly dinosaurs of green and gold, exploring deep footprints from the days of old!`;
    } else if (interest === "Space & Stars") {
      interestText = `on a dynamic shiny rocket zooming high, counting shiny constellations in the starry sky!`;
    } else if (interest === "Jungle Animals") {
      interestText = `through the whispering forest where wild leopards play, laughing with wild baby monkeys along the way!`;
    } else if (interest === "Magic Trains") {
      interestText = `aboard the Kidora Express of colorful gleam, learning how to lead and letting off steam!`;
    } else if (interest === "Superheroes") {
      interestText = `flying over cities with a cape of brave blue, protecting small puppies and doing what is true!`;
    } else {
      interestText = `sailing the deep ocean where friendly dolphins leap, finding shiny coral secrets that the blue waves keep!`;
    }

    let valueText = "";
    if (value === "Kindness 💛") {
      valueText = `learned that gentle words and helping hands make a happier world for boys and girls of all lands. By smiling bright and spreading cheer, our hero made any worry disappear!`;
    } else if (value === "Bravery 🦁") {
      valueText = `stood so tall, brave, and strong, facing every tall hill and singing a bold song! Our hero realized that trying and standing up proud is the finest way to shine bright under any cloud!`;
    } else if (value === "Sharing & Caring 🤝") {
      valueText = `learned how sharing a toy or a special guide, fills the heart with sunbeams and warm joy inside. In the kingdom of friends, they showed everyone near, that caring for others is what makes us most dear!`;
    } else if (value === "Politeness & Respect ✨") {
      valueText = `learnt the magic spell of 'please' and 'thank you', bringing happy smiles to everyone they knew! With respect in their words and grace in their stride, they walked with a special shiny glow of pride!`;
    } else {
      valueText = `never gave up when a puzzle got tough, continuing forward when the pathway was rough! Step by step, showing how persistence is key, they reached the very top of the tallest green tree!`;
    }

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    setGeneratedContent({
      lyrics: `🎵 Listen up! Here comes ${capitalizedName}, brave and so bright,\nReady for adventures in the sunny morning light!\nTravelling ${interestText}\nAnd what did our kid learn as the journey reached the end?\n${capitalizedName} ${valueText}\n\n✨ Kidora Jingle #${Math.floor(Math.random() * 8000) + 1000} — Custom Written for ${capitalizedName}`,
      storyBrief: `Once upon a time in the magical land of Kidora, ${capitalizedName} (Age ${personalisation.age}) set off with their favorite backpack. Their goal was to explore ${goal.toLowerCase()}! On this day, they travelled ${interestText} Through tests of character, ${capitalizedName} chose ${value}, proving that true magic lies in the simple choices we make every single day.`
    });
  }, [personalisation]);

  // Refs for Premium Interactions
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroCtaRef = useRef<HTMLAnchorElement | null>(null);
  const [heroCtaStyle, setHeroCtaStyle] = useState<React.CSSProperties>({});
  const confettiParticlesRef = useRef<any[]>([]);

  // 2. 3D FLOATING HERO CARD state and tilt calculator
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({});
  const handleHeroCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 14; 
    const rotateY = (x / (rect.width / 2)) * 14;  
    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: "0 25px 65px -12px rgba(26, 59, 212, 0.25), 0 0 45px rgba(127, 119, 221, 0.35)",
      transition: "transform 0.05s ease-out, box-shadow 0.2s ease",
      transformStyle: "preserve-3d"
    });
  };
  const handleHeroCardMouseLeave = () => {
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
      transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease"
    });
  };

  // 7. 3D GLOSSY PRODUC CARD TILT States and handlers
  const [productTilts, setProductTilts] = useState<{[key: number]: React.CSSProperties}>({});
  const handleProductMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateX = -(py - 0.5) * 12; 
    const rotateY = (px - 0.5) * 12; 
    
    setProductTilts(prev => ({
      ...prev,
      [index]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`,
        boxShadow: "0 20px 40px rgba(26, 59, 212, 0.12)",
        transition: "transform 0.1s ease-out, box-shadow 0.2s ease",
        backgroundImage: `linear-gradient(${135 + rotateY * 2}deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) ${30 + px * 40}%, rgba(255,255,255,0.08) 100%)`
      }
    }));
  };

  const handleProductMouseLeave = (index: number) => {
    setProductTilts(prev => ({
      ...prev,
      [index]: {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s ease"
      }
    }));
  };

  // Confetti triggering function
  const triggerConfetti = (clientX: number, clientY: number) => {
    const particles = confettiParticlesRef.current;
    const colors = ["#FFD700", "#1A3BD4", "#7F77DD", "#F5A623", "#1D9E75"];
    
    // Spawn 40 particles spreading outward
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: clientX,
        y: clientY,
        vx: (Math.random() - 0.5) * 8, // float sideways
        vy: (Math.random() - 0.75) * 10 - 2, // shoot upward
        size: Math.random() * 6 + 4, // 4px to 10px
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1.0,
        rotation: Math.random() * 180,
        rotSpeed: (Math.random() - 0.5) * 6,
        gravity: 0.22,
        friction: 0.97
      });
    }
  };

  // 16. PAGE LOADER: 2-second timeout
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(loadTimer);
  }, []);

  // 14. NAVBAR SCROLL DETECTOR
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 12. TESTIMONIAL 3D CAROUSEL AUTO-ROTATE (5 seconds)
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  // 3. TYPEWRITER EFFECT
  useEffect(() => {
    if (loading) return;

    const text1 = "Screen time they love.";
    const text2 = "Growth you trust.";
    let i = 0;
    let j = 0;

    const startTimeout = setTimeout(() => {
      const typePart1 = setInterval(() => {
        if (i < text1.length) {
          setPart1Text(text1.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typePart1);
          // 500ms pause
          setTimeout(() => {
            const typePart2 = setInterval(() => {
              if (j < text2.length) {
                setPart2Text(text2.substring(0, j + 1));
                j++;
              } else {
                clearInterval(typePart2);
                // cursor fade out after 2s
                setTimeout(() => {
                  setCursorFade(true);
                }, 2000);
              }
            }, 80);
          }, 500);
        }
      }, 80);
    }, 150);

    return () => clearTimeout(startTimeout);
  }, [loading]);

  // 4. HERO CTA BUTTON — MAGNETIC EFFECT
  useEffect(() => {
    if (loading) return;
    const button = heroCtaRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      // Distance from mouse to center of button
      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        // Magnetic pull subtly towards cursor
        const pullX = dx * 0.28;
        const pullY = dy * 0.28;
        setHeroCtaStyle({
          transform: `translate(${pullX}px, ${pullY}px) scale(1.05)`,
          transition: "transform 0.08s ease-out"
        });
      } else {
        setHeroCtaStyle({
          transform: "translate(0px, 0px) scale(1)",
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [loading]);

  // 1 & 4. CANVAS STAR PARTICLES + CLICK BURST confetti
  useEffect(() => {
    if (loading) return;
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

    // stars array (80 particles)
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      baseSpeedX: number;
      baseSpeedY: number;
      color: string;
      baseOpacity: number;
      oscSpeed: number;
      oscVal: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1, // 1px to 4px
        baseSpeedX: (Math.random() - 0.5) * 0.3,
        baseSpeedY: -(Math.random() * 0.4 + 0.15), // floating upward
        color: Math.random() > 0.4 ? "#FFD700" : "#FFFFFF",
        baseOpacity: Math.random() * 0.6 + 0.3, // 0.3 to 0.9
        oscSpeed: Math.random() * 0.04 + 0.01,
        oscVal: Math.random() * Math.PI
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Render star particles floating
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // mouse drift: star floats gently towards cursor position
        const dx = mouseX - s.x;
        const dy = mouseY - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let driftX = 0;
        let driftY = 0;
        if (dist < 320) {
          const force = (320 - dist) / 320;
          driftX = (dx / dist) * force * 0.28;
          driftY = (dy / dist) * force * 0.28;
        }

        s.x += s.baseSpeedX + driftX;
        s.y += s.baseSpeedY + driftY;

        // border wrap
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = height;

        s.oscVal += s.oscSpeed;
        const opacity = s.baseOpacity * (0.6 + 0.4 * Math.sin(s.oscVal));
        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.95, opacity));
        ctx.fillStyle = s.color;

        if (s.size > 2.5) {
          // 4-pointed sparkle star
          ctx.beginPath();
          const r = s.size;
          ctx.moveTo(s.x, s.y - r);
          ctx.quadraticCurveTo(s.x, s.y, s.x + r, s.y);
          ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + r);
          ctx.quadraticCurveTo(s.x, s.y, s.x - r, s.y);
          ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - r);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Render confetti bursts
      const confetti = confettiParticlesRef.current;
      for (let i = confetti.length - 1; i >= 0; i--) {
        const c = confetti[i];
        c.vy += c.gravity;       // gravity
        c.vx *= c.friction;      // friction
        c.vy *= c.friction;
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotSpeed;
        c.opacity -= 0.015;      // decay

        if (c.opacity <= 0 || c.y > height || c.x < 0 || c.x > width) {
          confetti.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = c.opacity;
        ctx.fillStyle = c.color;
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        
        // draw confetti piece (small rectangle)
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size / 2);
        ctx.restore();
      }

      frameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [loading]);

  // 5 & 6 & 10 & 11. SCROLL REVEALS + ANIMATIVE COUNTERS
  useEffect(() => {
    if (loading) return;

    // Helper functions for counters
    const startCountAnimationsInElement = (sectionElem: Element) => {
      const counters = sectionElem.querySelectorAll("[data-target]");
      counters.forEach((el) => {
        const targetAttr = el.getAttribute("data-target");
        if (!targetAttr) return;
        const targetVal = parseFloat(targetAttr);

        let cur = 0;
        const dur = 2000;
        const startNow = performance.now();

        const anim = (timestamp: number) => {
          const pass = timestamp - startNow;
          const prog = Math.min(pass / dur, 1.0);
          const easeOut = 1 - Math.pow(1 - prog, 3); // cubic curve
          cur = Math.floor(easeOut * targetVal);

          if (prog === 1.0) {
            el.textContent = targetVal.toLocaleString("en-IN");
            el.classList.add("animate-bounce-subtle");
            return;
          }

          el.textContent = cur.toLocaleString("en-IN");
          requestAnimationFrame(anim);
        };
        requestAnimationFrame(anim);
      });
    };

    // Stagger count animation specifically for step numbers (1, 2, 3, 4) in How kidora works
    const handleStepCounterAnimation = () => {
      [1, 2, 3, 4].forEach((num, index) => {
        setTimeout(() => {
          let runningVal = 0;
          const stepDur = 1000; // 1s
          const stepStart = performance.now();
          const stepAnim = (time: number) => {
            const passTime = time - stepStart;
            const progressRatio = Math.min(passTime / stepDur, 1.0);
            runningVal = Math.floor(progressRatio * num);
            setStepValues((v) => {
              const clone = [...v];
              clone[index] = runningVal;
              return clone;
            });
            if (progressRatio < 1.0) {
              requestAnimationFrame(stepAnim);
            }
          };
          requestAnimationFrame(stepAnim);
        }, index * 200); // 200ms stagger offset
      });
    };

    const isHowItWorksSection = (id: string) => id === "how-it-works";

    // Build observer
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-active");

          // Start standard statistic number count-ups in this section (Requirement 11)
          startCountAnimationsInElement(entry.target);

          // If this is the "How Kidora Works" section, trigger custom step counter animations (Requirement 10)
          if (isHowItWorksSection(entry.target.id)) {
            handleStepCounterAnimation();
          }

          io.unobserve(entry.target); // fire once only
        }
      });
    }, { threshold: 0.18 });

    const revealables = document.querySelectorAll(".scroll-reveal, .scroll-slide-left, .scroll-slide-right");
    revealables.forEach((item) => io.observe(item));

    return () => {
      io.disconnect();
    };
  }, [loading]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Web Audio Music Box player
  const startAudio = () => {
    stopAudio();
    setIsPlaying(true);

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) {
      alert("Web Audio is not supported in this browser. Enjoy the lyrics below!");
      setIsPlaying(false);
      return;
    }

    const ctx = new AudioCtx();
    audioContextRef.current = ctx;

    // Cheerful children's melody in C Major pentatonic
    // C4, E4, G4, G4, A4, A4, G4, E4, E4, D4, D4, C4
    const notes = [
      261.63, 329.63, 392.00, 392.00,
      440.00, 440.00, 392.00,
      329.63, 329.63, 293.66, 293.66,
      261.63, 329.63, 392.00, 523.25
    ];
    
    const stepDuration = 0.45; // Speed of the beats (seconds)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Triangle waves sound gentle and sweet like a music box
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + (idx * stepDuration));

      const startTime = ctx.currentTime + (idx * stepDuration);
      const stopTime = startTime + stepDuration;

      // Soft envelope to simulate chimes / bell sound
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, stopTime - 0.02);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(stopTime);

      const timeoutId = window.setTimeout(() => {
        setAudioStep(idx);
        // Play small visual click
        if (idx === notes.length - 1) {
          // Finished playing
          const finishTimeout = window.setTimeout(() => {
            setIsPlaying(false);
            setAudioStep(null);
          }, stepDuration * 1000);
          audioTimeoutsRef.current.push(finishTimeout);
        }
      }, idx * stepDuration * 1000);

      audioTimeoutsRef.current.push(timeoutId);
    });
  };

  const stopAudio = () => {
    audioTimeoutsRef.current.forEach(t => clearTimeout(t));
    audioTimeoutsRef.current = [];
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsPlaying(false);
    setAudioStep(null);
  };

  const toggleFAQ = (id: number) => {
    setFaqOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Build WhatsApp pre-filled message URL
  const getWhatsAppURL = (isSchool = false) => {
    const baseNumber = "919983266017"; // Real customer contact number
    const childName = personalisation.name.trim() || "Arjun";
    
    let text = "";
    if (isSchool) {
      text = encodeURIComponent("Hi Kidora team! I'm interested in getting custom lyrics and personalized learning packs for my school/daycare. Please share your catalog and bulk pricing!");
    } else {
      text = encodeURIComponent(`Hi Kidora! I would love to order a personalized content pack for my child.\n\n✨ Child's Name: ${childName}\n🎂 Age Group: ${personalisation.age}\n⭐ Interest: ${personalisation.interest}\n🎯 Learning Goals: ${personalisation.goal}\n💛 Value to Build: ${personalisation.value}\n\nPlease share how I can get started!`);
    }
    return `https://wa.me/${baseNumber}?text=${text}`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A3BD4] text-white">
        <div className="flex flex-col items-center space-y-6 text-center px-4 max-w-sm">
          {/* Logo with scaling animation */}
          <div className="relative flex flex-col items-center animate-pulse">
            <span className="text-6xl sm:text-7xl block animate-bounce">⭐</span>
            <span className="font-display text-4xl sm:text-5xl font-black mt-4 tracking-tight flex items-center">
              Kidora <span className="text-[#F5A623] ml-1">⭐</span>
            </span>
            <p className="text-xs uppercase tracking-widest text-indigo-200 mt-1 font-mono font-bold">Personalised Growth Adventures</p>
          </div>
          
          {/* Progress loader container */}
          <div className="w-56 h-2 bg-indigo-900 rounded-full overflow-hidden mt-4 relative border border-indigo-700">
            <div className="h-full bg-[#FFD700] rounded-full animate-loading-bar" style={{ width: "100%" }}></div>
          </div>
          <span className="text-xs text-indigo-100 font-mono tracking-wider animate-pulse font-semibold">Constructing Your Magic Playground...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg text-brand-text selection:bg-brand-primary/10 relative">
      
      {/* 13. SUBTLE GRADIENT ORB BACKGROUNDS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[#1A3BD4] opacity-15 blur-[80px] animate-orb-1"></div>
        <div className="absolute top-[38%] right-[-15%] w-[500px] h-[500px] rounded-full bg-[#7F77DD] opacity-10 blur-[80px] animate-orb-2"></div>
        <div className="absolute bottom-[12%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#F5A623] opacity-[0.08] blur-[80px] animate-orb-3"></div>
      </div>
      
      {/* 1. NAVBAR */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 border-b border-gray-100 shadow-md py-1" : "bg-white/30 backdrop-blur-md border-b border-white/20 py-3"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#home" id="nav-logo" className="flex items-center space-x-2 group focus:outline-hidden">
              <span className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-md shadow-brand-primary/20 transform group-hover:rotate-12 transition-transform duration-300">
                <Star className="w-6 h-6 fill-brand-accent1 text-brand-accent1 animate-pulse-subtle" />
              </span>
              <div>
                <span className="font-display text-2xl font-black tracking-tight text-brand-primary flex items-center">
                  Kidora
                  <span className="text-brand-accent1 ml-1 text-base transform group-hover:scale-135 transition-transform duration-300">⭐</span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-brand-accent2 font-semibold -mt-1 font-sans">Made For Your Child</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">Home</a>
              <a href="#how-it-works" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">How It Works</a>
              <a href="#products" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">Products</a>
              <a href="#games" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">Games</a>
              <a href="#schools" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">For Schools</a>
              <a href="#testimonials" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">Reviews</a>
              <a href="#faq" className="text-sm font-semibold text-gray-600 hover:text-brand-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300">FAQ</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                id="btn-nav-order"
                href={getWhatsAppURL(false)}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center px-5 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-full shadow-lg shadow-brand-primary/10 hover:bg-brand-primary/95 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 mr-2 fill-emerald-400 text-transparent" />
                Order on WhatsApp
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 px-4 pt-4 pb-6 space-y-4"
            >
              <nav className="flex flex-col space-y-3">
                <a
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-semibold py-2 hover:text-brand-primary text-base"
                >
                  Home
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-semibold py-2 hover:text-brand-primary text-base"
                >
                  How It Works
                </a>
                <a
                  href="#products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-semibold py-2 hover:text-brand-primary text-base"
                >
                  Products
                </a>
                <a
                  href="#games"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-semibold py-2 hover:text-brand-primary text-base"
                >
                  Games
                </a>
                <a
                  href="#schools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-semibold py-2 hover:text-brand-primary text-base"
                >
                  For Schools
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-semibold py-2 hover:text-brand-primary text-base"
                >
                  Reviews
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 font-semibold py-2 hover:text-brand-primary text-base"
                >
                  FAQ
                </a>
              </nav>

              <div className="pt-2">
                <a
                  id="btn-nav-order-mobile"
                  href={getWhatsAppURL(false)}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full text-center inline-flex justify-center items-center px-6 py-3.5 bg-brand-primary text-white font-bold rounded-2xl shadow-md"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative overflow-hidden pt-12 pb-20 md:py-28 lg:py-36 bg-linear-to-b from-white via-indigo-50/15 to-brand-bg">
        {/* 1. ANIMATED PARTICLE BACKGROUND */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

        {/* Subtle CSS Floating Stars Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <span className="absolute top-[20%] left-[10%] animate-sparkle text-brand-accent1 text-2xl">⭐</span>
          <span className="absolute top-[35%] right-[15%] animate-sparkle text-brand-accent2 text-xl delay-1000">✦</span>
          <span className="absolute bottom-[25%] left-[25%] animate-sparkle text-brand-primary text-xl delay-500">✨</span>
          <span className="absolute top-[65%] left-[45%] animate-sparkle text-brand-accent1 text-3xl delay-200">★</span>
          <span className="absolute bottom-[15%] right-[12%] animate-sparkle text-emerald-400 text-2xl delay-[1.5s]">⭐</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              
              {/* Decorative Pill */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full hover:bg-brand-primary/15 transition-all text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>India's Leading Personalised Kids Content Brand</span>
              </div>

              {/* 3. TYPEWRITER HEADLINE EFFECT */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-brand-text leading-tight tracking-tight min-h-[140px] sm:min-h-[160px] md:min-h-[224px]">
                <span className="text-brand-primary relative inline-block">
                  {part1Text}
                  {part1Text && <span className="absolute bottom-1.5 left-0 w-full h-3 bg-brand-primary/10 -z-10 rounded-full"></span>}
                </span>{" "}
                <br />
                <span className="text-brand-accent2 relative inline-block">
                  {part2Text}
                  {part2Text && <span className="absolute bottom-1.5 left-0 w-full h-3 bg-brand-accent2/10 -z-10 rounded-full"></span>}
                </span>
                {!cursorFade && (
                  <span className="inline-block w-[3px] h-[0.9em] bg-brand-accent2 ml-1 align-middle animate-pulse"></span>
                )}
                <div className="text-base sm:text-lg md:text-xl font-semibold text-brand-accent1 font-display tracking-wide mt-2">
                  "Magic made just for your child."
                </div>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Personalised songs, stories and games — made with your child's name, their world, and the values <strong>YOU</strong> choose. No standard content, only customized growth adventures.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  id="btn-hero-order"
                  ref={heroCtaRef}
                  style={heroCtaStyle}
                  href="#personalise"
                  onClick={(e) => {
                    triggerConfetti(e.clientX, e.clientY);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white text-base font-extrabold rounded-2xl shadow-xl shadow-brand-primary/30 hover:bg-brand-primary/95 hover:shadow-2xl transition-all"
                >
                  Order Your Child's Jingle
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>

                <button
                  id="btn-hero-sample"
                  onClick={(e) => {
                    triggerConfetti(e.clientX, e.clientY);
                    isPlaying ? stopAudio() : startAudio();
                  }}
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-extrabold rounded-2xl border-2 transition-all cursor-pointer ${
                    isPlaying 
                      ? "bg-amber-550 border-brand-accent1 text-brand-accent1 ring-4 ring-brand-accent1/20"
                      : "bg-white border-brand-accent2 text-brand-accent2 hover:bg-brand-accent2/5"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-5 h-5 mr-2 fill-brand-accent1 text-brand-accent1 animate-pulse" />
                      Pause Sample 🎵
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2 fill-brand-accent2 text-brand-accent2" />
                      Hear a Sample 🎵
                    </>
                  )}
                </button>
              </div>

              {/* Interactive Audio Note visualizer shown during sample play */}
              {isPlaying && (
                <div className="flex items-center justify-center lg:justify-start space-x-2 bg-brand-accent2/10 px-4 py-2.5 rounded-full w-fit mx-auto lg:mx-0 animate-pulse">
                  <Volume2 className="w-4 h-4 text-brand-accent2" />
                  <span className="text-xs font-mono font-medium text-brand-accent2">Playing Melodic Chimes (Tempo 110 BPM):</span>
                  <div className="flex space-x-1 items-end h-3">
                    {[0, 1, 2, 3, 4].map((bar) => (
                      <span
                        key={bar}
                        className={`w-1 rounded-full bg-brand-accent2 animate-bounce`}
                        style={{
                          height: `${Math.random() * 100 + 40}%`,
                          animationDelay: `${bar * 150}ms`,
                          animationDuration: "0.6s"
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Bar */}
              <div className="pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                    <span className="text-brand-accent1">⚡</span>
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                    <span className="text-brand-success">🛡️</span>
                    <span>100% Safe & Ad-Free</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                    <span className="text-rose-500">❤️</span>
                    <span>Loved by Parents</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-1.5">
                    <span className="text-brand-primary">🇮🇳</span>
                    <span>Made in India</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ scale: 0.95, y: 12, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                onMouseMove={handleHeroCardMouseMove}
                onMouseLeave={handleHeroCardMouseLeave}
                style={cardStyle}
                className="relative w-full max-w-sm sm:max-w-md bg-white border-2 border-brand-accent2/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-100/50 cursor-pointer"
              >
                {/* Yellow Cute Badge */}
                <div className="absolute -top-4 -right-4 bg-brand-accent1 text-white text-xs font-black px-4 py-2 rounded-2xl uppercase tracking-widest rotate-6 shadow-md shadow-brand-accent1/25 flex items-center space-x-1">
                  <span>✨ BRAND NEW</span>
                </div>

                {/* Card Illustration Title */}
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100 mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-accent2/10 flex items-center justify-center text-brand-accent2">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm text-brand-text">Active Personalisation Preview</h4>
                    <p className="text-[10px] text-gray-400 font-mono">Status: Adventure Ready</p>
                  </div>
                </div>

                {/* Animated Character illustration representing dynamic story/jingle */}
                <div className="bg-indigo-50/50 rounded-2xl p-6 relative overflow-hidden mb-6 border border-indigo-50">
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="relative animate-float">
                      <span className="text-6xl sm:text-7xl block relative z-10 filter drop-shadow-md">🐉</span>
                      <span className="absolute -top-1 -right-2 text-2xl animate-sparkle">✨</span>
                      <span className="absolute -bottom-1 -left-2 text-xl animate-sparkle delay-700">💛</span>
                    </div>
                  </div>

                  <p className="font-display text-center text-base sm:text-lg font-extrabold text-brand-text">
                    "Today, <span className="text-brand-primary underline decoration-2 decoration-brand-accent1 font-black">{personalisation.name || "Arjun"}</span> goes on a magical adventure to learn <span className="text-brand-accent2 font-black">{personalisation.value.split(" ")[0]}</span>!"
                  </p>
                </div>

                {/* Illustration Details list */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span>Child Companion:</span>
                    <span className="text-brand-accent2 bg-brand-accent2/10 px-2 py-0.5 rounded-full font-bold">Kidora Star ✨</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span>Active Theme Set:</span>
                    <span className="text-brand-accent1 bg-brand-accent1/10 px-2 py-0.5 rounded-full font-bold">{personalisation.interest}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span>Learning focus:</span>
                    <span className="text-brand-success bg-brand-success/10 px-2 py-0.5 rounded-full font-bold">Kindness & Respect</span>
                  </div>
                </div>

                {/* Live sound preview trigger */}
                <button
                  id="btn-hero-activate"
                  onClick={() => {
                    const el = document.getElementById("personalise");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 w-full text-center py-3 bg-brand-accent2/10 hover:bg-brand-accent2 text-brand-accent2 hover:text-white font-extrabold text-sm rounded-xl transition-all flex items-center justify-center space-x-2 border border-brand-accent2/20"
                >
                  <span>Build For Your Child Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PROBLEM SECTION */}
      <section className="bg-[#FFF8F0] py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 scroll-reveal scroll-fade-up">
            <h2 className="font-display text-base font-black text-brand-accent1 uppercase tracking-widest">
              Every parent knows this feeling...
            </h2>
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text leading-tight">
              "When kids cry, we hand them our phones. But do we know what they're watching?"
            </p>
            <div className="w-16 h-1.5 bg-brand-accent1 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-amber-100 hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] scroll-slide-left">
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">
                📱
              </div>
              <h3 className="font-display text-xl font-bold text-brand-text mb-3">
                Random content, zero control
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Passive smartphone scrolling harms focus. Kids get addicted to hyper-stimulating videos that are meaningless and of questionable educational value.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-amber-100 hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] scroll-reveal scroll-fade-up">
              <div className="w-14 h-14 bg-amber-50 text-[#F5A623] rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">
                🎯
              </div>
              <h3 className="font-display text-xl font-bold text-brand-text mb-3">
                Ages 3–11 is the golden learning window
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                90% of brain development occurs during this critical slot. Every hour spent on passive low-quality screen time is a missed cognitive growth opportunity.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-amber-100 hover:shadow-lg transition-transform duration-300 hover:scale-[1.02] scroll-slide-right">
              <div className="w-14 h-14 bg-indigo-50 text-brand-accent2 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6">
                😰
              </div>
              <h3 className="font-display text-xl font-bold text-brand-text mb-3">
                Generic apps don't know YOUR child
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mass content channels don't care what moral values you want to instill or what your child genuinely loves. They show cookie-cutter templates to millions.
              </p>
            </div>

          </div>

          <div className="text-center mt-12 scroll-reveal scroll-fade-up">
            <span className="inline-block px-4 py-2 bg-brand-primary/10 text-brand-primary font-display font-black text-sm sm:text-base rounded-full animate-pulse">
              🚀 Kidora was built to change this.
            </span>
          </div>

        </div>
      </section>

      {/* 4. SOLUTION / HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white overflow-hidden scroll-reveal scroll-fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 scroll-reveal scroll-fade-up">
            <h2 className="font-display text-4xl font-extrabold text-brand-text">
              How Kidora Works
            </h2>
            <p className="text-gray-500 font-medium">
              We've designed a simple 4-step personalized flow to construct custom joy for your child in under 24 hours.
            </p>
            <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
          </div>

          {/* Dotted Connection Grid */}
          <div className="relative">
            {/* Desktop connects line SVG */}
            <div className="hidden lg:block absolute top-[15%] left-[8%] right-[8%] h-24 -z-1 overflow-visible">
              <svg className="w-full h-full overflow-visible" fill="none">
                <path
                  d="M10,48 C200,-5 250,90 450,48 C650,5 750,90 950,48"
                  stroke="url(#pathSvgGradient)"
                  strokeWidth="4"
                  strokeDasharray="1000"
                  strokeDashoffset={stepValues[3] > 0 ? "0" : "1000"}
                  style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                />
                <defs>
                  <linearGradient id="pathSvgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1A3BD4" />
                    <stop offset="50%" stopColor="#7F77DD" />
                    <stop offset="100%" stopColor="#1D9E75" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              
              {/* Step 1 */}
              <div 
                className="text-center flex flex-col items-center bg-brand-bg/40 p-6 rounded-3xl border border-gray-100 relative scroll-reveal scroll-fade-up"
                style={{ transitionDelay: "100ms" }}
              >
                <div className="absolute -top-5 bg-brand-primary text-white font-black w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md animate-bounce">
                  {stepValues[0]}
                </div>
                <div className={`w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl mb-6 transition-all duration-300 ${stepValues[0] > 0 ? "scale-110 rotate-6 ring-4 ring-brand-primary/20" : ""}`}>
                  👶
                </div>
                <h3 className="font-display text-lg font-bold text-brand-text mb-3">
                  Tell us about your child
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                  Fill in their name, age, specific interests (like dinos or stars) and customized moral values you want them to study.
                </p>
              </div>

              {/* Step 2 */}
              <div 
                className="text-center flex flex-col items-center bg-brand-bg/40 p-6 rounded-3xl border border-gray-100 relative scroll-reveal scroll-fade-up"
                style={{ transitionDelay: "250ms" }}
              >
                <div className="absolute -top-5 bg-brand-accent2 text-white font-black w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md animate-bounce">
                  {stepValues[1]}
                </div>
                <div className={`w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl mb-6 transition-all duration-300 ${stepValues[1] > 0 ? "scale-110 rotate-6 ring-4 ring-brand-accent2/20" : ""}`}>
                  ✨
                </div>
                <h3 className="font-display text-lg font-bold text-brand-text mb-3">
                  Kidora creates the magic
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                  Our custom AI and parent-vetted creators compose lyrics, voiceovers, rhymes, and interactive mini-adventure blocks custom to order.
                </p>
              </div>

              {/* Step 3 */}
              <div 
                className="text-center flex flex-col items-center bg-brand-bg/40 p-6 rounded-3xl border border-gray-100 relative scroll-reveal scroll-fade-up"
                style={{ transitionDelay: "400ms" }}
              >
                <div className="absolute -top-5 bg-brand-accent1 text-white font-black w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md animate-bounce">
                  {stepValues[2]}
                </div>
                <div className={`w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl mb-6 transition-all duration-300 ${stepValues[2] > 0 ? "scale-110 rotate-6 ring-4 ring-brand-accent1/20" : ""}`}>
                  🎵
                </div>
                <h3 className="font-display text-lg font-bold text-brand-text mb-3">
                  Your child enjoys & learns
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                  Songs, stories and lessons are delivered straight to your WhatsApp. Perfect for playtime, bedtime, or family road trips!
                </p>
              </div>

              {/* Step 4 */}
              <div 
                className="text-center flex flex-col items-center bg-brand-bg/40 p-6 rounded-3xl border border-gray-100 relative scroll-reveal scroll-fade-up"
                style={{ transitionDelay: "550ms" }}
              >
                <div className="absolute -top-5 bg-brand-success text-white font-black w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md animate-bounce">
                  {stepValues[3]}
                </div>
                <div className={`w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl mb-6 transition-all duration-300 ${stepValues[3] > 0 ? "scale-110 rotate-6 ring-4 ring-brand-success/20" : ""}`}>
                  📈
                </div>
                <h3 className="font-display text-lg font-bold text-brand-text mb-3">
                  Watch them grow
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
                  Watch their confidence swell! They internalize positive screen habits, dynamic moral principles, and good vocabulary.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. PRODUCTS SECTION */}
      <section id="products" className="py-20 md:py-28 bg-[#FAFAF8] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-display text-4xl font-extrabold text-brand-text">
              Everything Personalised for Your Child
            </h2>
            <p className="text-gray-500 font-medium">
              Choose individual custom gems or gift packs, delivered flat in 24 hours via WhatsApp.
            </p>
            <div className="w-16 h-1.5 bg-brand-accent2 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <div 
              onMouseMove={(e) => handleProductMouseMove(1, e)}
              onMouseLeave={() => handleProductMouseLeave(1)}
              style={productTilts[1]}
              className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform-gpu cursor-pointer"
            >
              <div className="h-2 bg-brand-primary"></div>
              <div className="p-6 md:p-8 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl mb-6 animate-[float_2.5s_ease-in-out_infinite]">
                  🎵
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-brand-text">Custom Jingles</h3>
                  <span className="text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full font-black">₹299</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  A catchy song with your child's name, their favourite things, and a lesson they'll love. Delivered in 24 hours.
                </p>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <a
                  href={getWhatsAppURL(false)}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-center py-3 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Order Now →
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              onMouseMove={(e) => handleProductMouseMove(2, e)}
              onMouseLeave={() => handleProductMouseLeave(2)}
              style={productTilts[2]}
              className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform-gpu cursor-pointer"
            >
              <div className="h-2 bg-brand-accent2"></div>
              <div className="p-6 md:p-8 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl mb-6 animate-[float_3.2s_ease-in-out_infinite]">
                  📖
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-brand-text">Custom Stories</h3>
                  <span className="text-xs bg-brand-accent2/10 text-brand-accent2 px-2.5 py-1 rounded-full font-black">₹399</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  Your child is the HERO. Custom adventure stories that teach values you choose. Great for high-quality reading and auditory focus.
                </p>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <a
                  href={getWhatsAppURL(false)}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-center py-3 bg-brand-accent2 hover:bg-brand-accent2/95 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Order Now →
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div 
              onMouseMove={(e) => handleProductMouseMove(3, e)}
              onMouseLeave={() => handleProductMouseLeave(3)}
              style={productTilts[3]}
              className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform-gpu cursor-pointer"
            >
              <div className="h-2 bg-brand-accent1"></div>
              <div className="p-6 md:p-8 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl mb-6 animate-[float_2.8s_ease-in-out_infinite]">
                  🎮
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-bold text-brand-text">Learning Games</h3>
                  <span className="text-xs bg-brand-accent1/10 text-brand-accent1 px-2.5 py-1 rounded-full font-black">₹499</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  Interactive educational games built around your child's name and interests. Fun AND highly educational with zero tracking.
                </p>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <a
                  href={getWhatsAppURL(false)}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-center py-3 bg-brand-accent1 hover:bg-brand-accent1/95 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Order Now →
                </a>
              </div>
            </div>

            {/* Card 4 */}
            <div 
              onMouseMove={(e) => handleProductMouseMove(4, e)}
              onMouseLeave={() => handleProductMouseLeave(4)}
              style={productTilts[4]}
              className="bg-white rounded-3xl shadow-xs border border-brand-accent1/40 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative transform-gpu cursor-pointer"
            >
              {/* Value Badge */}
              <div className="absolute top-4 right-4 bg-brand-accent1 text-white text-[9px] font-black px-2 py-0.5 rounded-md z-10">
                BEST DEAL
              </div>
              <div className="h-2 bg-brand-success"></div>
              <div className="p-6 md:p-8 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl mb-6 animate-[float_3.5s_ease-in-out_infinite]">
                  🎂
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-lg font-bold text-brand-text">Birthday Pack</h3>
                  <div className="text-right">
                    <span className="text-xs bg-brand-success/15 text-brand-success px-2 py-0.5 rounded-full font-black block">₹999</span>
                    <span className="text-[9px] text-red-500 line-through font-bold">Save ₹200</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                  Jingle + Story + Custom Game + Animated Birthday Video — the perfect high-end personalised birthday gift built for your child.
                </p>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <a
                  href={getWhatsAppURL(false)}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-center py-3 bg-brand-success hover:bg-brand-success/95 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Order Now →
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. PERSONALISATION SECTION (INTERACTIVE PLAYGROUND) */}
      <section id="personalise" className="py-20 md:py-28 bg-[#FFFBF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-display text-4xl font-black text-brand-text">
              Not a template. Not a copy-paste. Made for YOUR child.
            </h2>
            <p className="text-gray-500 font-medium">
              Experience the generator! Type your child's details below to inspect their custom rhymes, stories, and songs instantly.
            </p>
            <div className="w-16 h-1.5 bg-brand-accent1 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border-2 border-brand-accent1/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Form Column */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-text mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 text-brand-accent1 mr-2" />
                    Configure Your Child's Profile
                  </h3>
                  <div className="h-0.5 bg-gray-100 w-full mb-6"></div>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="child-name-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    👤 Child's Name
                  </label>
                  <input
                    id="child-name-input"
                    type="text"
                    value={personalisation.name}
                    onChange={(e) => setPersonalisation(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="E.g., Arjun, Diya, Priya"
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-semibold outline-hidden transition-all"
                  />
                </div>

                {/* Age Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    🎂 Child's Age Group
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["3-5 Years", "6-8 Years", "9-11 Years"].map((ageOpt) => (
                      <button
                        key={ageOpt}
                        onClick={() => setPersonalisation(prev => ({ ...prev, age: ageOpt }))}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          personalisation.age === ageOpt
                            ? "bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/10"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {ageOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ⭐ Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Dinosaurs", "Space & Stars", "Jungle Animals", "Magic Trains", "Superheroes", "Deep Ocean"].map((interestOpt) => (
                      <button
                        key={interestOpt}
                        onClick={() => setPersonalisation(prev => ({ ...prev, interest: interestOpt }))}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          personalisation.interest === interestOpt
                            ? "bg-brand-accent2 border-brand-accent2 text-white shadow-md shadow-brand-accent2/10"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {interestOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Learning Goals Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    🎯 Learning Goals
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Vocabulary & Speech", "Numbers & Logic", "Rhythm & Music", "Curiosity & Science"].map((goalOpt) => (
                      <button
                        key={goalOpt}
                        onClick={() => setPersonalisation(prev => ({ ...prev, goal: goalOpt }))}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          personalisation.goal === goalOpt
                            ? "bg-brand-accent1 border-brand-accent1 text-white shadow-md shadow-brand-accent1/10"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {goalOpt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Values Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    💛 Values to Build
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Kindness 💛", "Bravery 🦁", "Sharing & Caring 🤝", "Politeness & Respect ✨", "Persistence 🐢"].map((valueOpt) => (
                      <button
                        key={valueOpt}
                        onClick={() => setPersonalisation(prev => ({ ...prev, value: valueOpt }))}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          personalisation.value === valueOpt
                            ? "bg-brand-success border-brand-success text-white shadow-md shadow-brand-success/15"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {valueOpt}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Live Preview Display Column */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-zinc-55 border border-amber-100 rounded-3xl p-6 sm:p-8 shadow-xs relative">
                
                {/* Visual Music lines decoration */}
                <div className="absolute top-2 right-4 flex space-x-1.5 opacity-50">
                  <span className="text-xs text-brand-primary">🎧 Live Jingle Engine v1.0</span>
                </div>

                <div className="space-y-6">
                  
                  {/* Lyrics Box Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-2 animate-ping"></span>
                      Interactive Preview Output
                    </span>
                    <button
                      id="btn-play-preview"
                      onClick={isPlaying ? stopAudio : startAudio}
                      className={`px-4 py-2 rounded-full text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
                        isPlaying 
                          ? "bg-emerald-500 text-white shadow-lg animate-pulse"
                          : "bg-brand-primary text-white hover:bg-brand-primary/95"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="w-3 h-3 fill-white text-white" />
                          <span>Stop Chimes</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-white text-white" />
                          <span>Play Chimes</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Visualizer bars bouncing dynamically */}
                  {isPlaying && (
                    <div className="flex space-x-1.5 items-end h-8 justify-center bg-indigo-50/40 py-2 rounded-xl">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-brand-primary rounded-full animate-bounce"
                          style={{
                            height: `${Math.random() * 100 + 20}%`,
                            animationDelay: `${i * 100}ms`,
                            animationDuration: "0.55s"
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Lyrics text */}
                  <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100">
                    <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center">
                      <Music className="w-3.5 h-3.5 text-brand-accent1 mr-1.5" />
                      Rhyming Song Sample:
                    </p>
                    <p className="text-brand-text font-display text-sm leading-relaxed whitespace-pre-wrap font-bold italic">
                      {generatedContent.lyrics}
                    </p>
                  </div>

                  {/* Adventure Story Header */}
                  <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100">
                    <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2 flex items-center">
                      <BookOpen className="w-3.5 h-3.5 text-brand-accent2 mr-1.5" />
                      Custom Story Starter:
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed font-sans">
                      {generatedContent.storyBrief}
                    </p>
                  </div>

                </div>

                {/* Dynamic Order On WhatsApp action */}
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <a
                    id="btn-whatsapp-dynamic"
                    href={getWhatsAppURL(false)}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-[#25D366] text-white font-extrabold text-base rounded-2xl shadow-md hover:bg-[#20ba59] transition-all text-center"
                  >
                    <MessageCircle className="w-6 h-6 mr-2 fill-white text-[#25D366]" />
                    <span>Order Jingle for {personalisation.name || "your child"} on WhatsApp →</span>
                  </a>
                  <p className="text-center text-[10px] text-gray-400 mt-2 font-mono">
                    Starts at just ₹299 • Flat 24h delivery directly to WhatsApp
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. LEARNING GAMES SECTION */}
      <section id="games" className="py-20 md:py-28 bg-[#FAFAF8] border-b border-gray-100 overflow-hidden relative">
        {/* Playful background decorative elements */}
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-amber-200/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 scroll-reveal scroll-fade-up">
            <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-black uppercase tracking-widest">
              <span>🎮</span>
              <span>Kidora Playroom</span>
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-brand-text tracking-tight">
              Learning Games
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 font-semibold max-w-2xl mx-auto">
              Interactive educational adventures designed to make learning fun for kids.
            </p>
          </div>

          {/* Grid Layout of Reusable Game Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GAMES_DATA.map((game) => (
              <div 
                key={game.id}
                className={`bg-white rounded-3xl overflow-hidden border-2 ${game.colorTheme.borderHover} flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform-gpu hover:translate-y-[-6px] relative group cursor-pointer`}
              >
                {/* Top accent line */}
                <div className={`h-2.5 ${game.colorTheme.stripeBg}`}></div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Icon & Ribbon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${game.colorTheme.iconBg} flex items-center justify-center text-4xl shadow-xs group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-300`}>
                        {game.icon}
                      </div>
                      <span className={`${game.colorTheme.badgeBg} ${game.colorTheme.badgeText} text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-2xs`}>
                        {game.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-display text-2xl font-black text-gray-900 group-hover:text-brand-primary transition-colors duration-200">
                          {game.title}
                        </h3>
                        {!game.isComingSoon && <span className="animate-pulse text-xl">🚀</span>}
                      </div>
                      <p className={`text-xs font-bold ${game.colorTheme.taglineText} uppercase tracking-widest mt-1`}>
                        {game.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-6 font-medium ${game.isComingSoon ? "text-gray-500" : "text-gray-600"}`}>
                      {game.description}
                    </p>

                    {/* Feature Bullets */}
                    <div className="space-y-3 mb-8">
                      {game.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm font-semibold text-gray-700">
                          <CheckCircle2 className={`w-5 h-5 mr-2 shrink-0 ${game.isComingSoon ? "text-gray-300" : "text-emerald-500"}`} />
                          <span className={game.isComingSoon ? "text-gray-500" : "text-gray-700"}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div>
                    {game.isComingSoon ? (
                      <button
                        disabled
                        className="w-full inline-flex items-center justify-center py-3.5 bg-gray-100 text-gray-400 font-extrabold text-base rounded-2xl cursor-not-allowed select-none border border-gray-100"
                      >
                        <span>{game.ctaText}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => window.open(game.ctaUrl, "_blank")}
                        className="w-full inline-flex items-center justify-center py-3.5 bg-brand-primary text-white font-extrabold text-base rounded-2xl shadow-lg shadow-brand-primary/25 hover:bg-brand-primary/95 hover:shadow-xl transition-all select-none"
                      >
                        <span>{game.ctaText}</span>
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FOR SCHOOLS / B2B SECTION */}
      <section id="schools" className="py-20 md:py-28 bg-[#F0F2FD] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-display text-base font-black text-brand-primary uppercase tracking-widest">
              Kidora for Schools & Daycares
            </h2>
            <p className="font-display text-3xl sm:text-4xl font-extrabold text-brand-text">
              Transform Your Classroom with Custom Play
            </p>
            <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
            <p className="text-gray-500 text-sm max-w-xl mx-auto pt-2">
              We help educational institutions design unique sonic and reading templates to welcome and engage children directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Benefit Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-blue-50 relative hover:shadow-md transition-all">
              <span className="text-4xl block mb-6">🏫</span>
              <h3 className="font-display text-lg font-bold text-brand-text mb-3">
                Welcome songs for every child
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Empower your students right at the lobby. Custom morning greetings styled with individual names to boot confidence.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-blue-50 relative hover:shadow-md transition-all">
              <span className="text-4xl block mb-6">📚</span>
              <h3 className="font-display text-lg font-bold text-brand-text mb-3">
                Custom curriculum rhymes
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Turn dry lessons into hyper-focused catching tracks! From local environmental lessons to maths tables customized to your state syllabus.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-blue-50 relative hover:shadow-md transition-all">
              <span className="text-4xl block mb-6">🎁</span>
              <h3 className="font-display text-lg font-bold text-brand-text mb-3">
                Personalised parent gift packs
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Reward parents on annual days, birthdays, or special festivals with completely customized memory templates.
              </p>
            </div>

          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <p className="text-xs uppercase font-mono font-bold text-brand-primary tracking-widest">Affordable Pricing For Schools</p>
              <h4 className="font-display text-xl font-extrabold text-brand-text mt-1">Starting from ₹150 per child</h4>
              <p className="text-gray-500 text-xs mt-1">Bulk discounts apply. Perfect for school batches of 20 - 500+ pupils.</p>
            </div>
            <a
              id="btn-school-quote"
              href={getWhatsAppURL(true)}
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center px-6 py-3.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-extrabold text-sm rounded-xl transition-all"
            >
              Get a School Quote →
            </a>
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-display text-4xl font-extrabold text-brand-text">
              Parents Love Kidora
            </h2>
            <div className="flex justify-center text-brand-accent1 text-lg">
              ⭐⭐⭐⭐⭐
            </div>
            <p className="text-gray-500 font-medium text-xs">
              Early customer reviews — join them today
            </p>
            <div className="w-16 h-1.5 bg-brand-accent2 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-brand-bg/40 p-8 rounded-3xl border border-gray-150 flex flex-col justify-between">
              <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                "Arjun heard his name in a song and his face just LIT UP. He couldn't believe the singer knew his name! Best ₹299 I ever spent. We listen to it every night before sleeping."
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👩</span>
                <div>
                  <h4 className="font-display font-black text-sm text-brand-text">Sneha M.</h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Mumbai • Mom of Arjun (4)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-brand-bg/40 p-8 rounded-3xl border border-gray-150 flex flex-col justify-between">
              <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                "I was deeply worried about passive screen time scrolling. Kidora completely changed how my daughter engages with her phone. She is active, dances along, and practices sharing!"
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👨</span>
                <div>
                  <h4 className="font-display font-black text-sm text-brand-text">Rahul K.</h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Bangalore • Dad of Priya (6)</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-brand-bg/40 p-8 rounded-3xl border border-gray-150 flex flex-col justify-between">
              <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                "We ordered the birthday pack for my son's 5th birthday. Every single child at the backyard party wanted their own custom Kidora jingle! It was the absolute highlight."
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👩</span>
                <div>
                  <h4 className="font-display font-black text-sm text-brand-text">Priya S.</h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Delhi • Mom of Vihaan (5)</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. PRICING SUMMARY */}
      <section className="py-20 md:py-28 bg-[#FAFAFA] border-t border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="font-display text-4xl font-extrabold text-brand-text">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 font-medium">
              Choose the level of personalised joy you'd like to unlock. No hidden subscriptions.
            </p>
            <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Tier 1 */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-4">
                <p className="text-xs uppercase font-mono font-bold text-gray-400 tracking-widest">Starter Pack</p>
                <div className="flex items-baseline">
                  <span className="font-display text-4xl font-black text-brand-text">₹299</span>
                  <span className="text-xs text-gray-500 font-medium ml-1">/ single pack</span>
                </div>
                <div className="h-[1px] bg-gray-100 w-full my-4"></div>
                <ul className="space-y-3">
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>1 Custom Personalized Jingle</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>Flat 24 Hours Flat Delivery</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>WhatsApp Delivery (mp3 audio)</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>Choose 1 Core Custom Value</span>
                  </li>
                </ul>
              </div>
              <a
                id="btn-pricing-starter"
                href={getWhatsAppURL(false)}
                target="_blank"
                referrerPolicy="no-referrer"
                className="mt-8 w-full text-center py-3 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white font-extrabold text-sm rounded-xl transition-all"
              >
                Order Now →
              </a>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-3xl border-2 border-brand-accent2 p-8 flex flex-col justify-between relative hover:shadow-xl transition-all">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-brand-accent2 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                MOST POPULAR
              </div>
              <div className="space-y-4">
                <p className="text-xs uppercase font-mono font-bold text-brand-accent2 tracking-widest">Growth Pack</p>
                <div className="flex items-baseline">
                  <span className="font-display text-4xl font-black text-brand-text">₹599</span>
                  <span className="text-xs text-gray-500 font-medium ml-1">/ combopack</span>
                </div>
                <div className="h-[1px] bg-gray-100 w-full my-4"></div>
                <ul className="space-y-3">
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>1 Custom Jingle (Singalong)</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>1 Custom Adventure Story (Audiobook)</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>WhatsApp Delivery in 24 Hours</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>Choose 2 Custom Learning Path Goals</span>
                  </li>
                </ul>
              </div>
              <a
                id="btn-pricing-growth"
                href={getWhatsAppURL(false)}
                target="_blank"
                referrerPolicy="no-referrer"
                className="mt-8 w-full text-center py-3 bg-brand-accent2 text-white hover:bg-brand-accent2/90 font-extrabold text-sm rounded-xl shadow-md shadow-brand-accent2/20 transition-all"
              >
                Order Now →
              </a>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-3xl border border-brand-accent1/60 p-8 flex flex-col justify-between relative hover:shadow-lg transition-all">
              {/* Deal Tag */}
              <div className="absolute top-4 right-4 bg-brand-accent1 text-white text-[9px] font-black px-2.5 py-0.5 rounded-md">
                BEST VALUE
              </div>
              <div className="space-y-4">
                <p className="text-xs uppercase font-mono font-bold text-brand-accent1 tracking-widest">Magic Pack</p>
                <div className="flex items-baseline">
                  <span className="font-display text-4xl font-black text-brand-text">₹999</span>
                  <span className="text-xs text-gray-500 font-medium ml-1">/ fullpack</span>
                </div>
                <p className="text-[10px] text-red-500 font-bold -mt-2">Regularly ₹1,199 (Save ₹200)</p>
                <div className="h-[1px] bg-gray-100 w-full my-4"></div>
                <ul className="space-y-3">
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>1 Custom Jingle + 1 Custom Story</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>1 Personalized Android Learning Game</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>Custom Animated Birthday Greeting Video</span>
                  </li>
                  <li className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-brand-success mr-2 shrink-0" />
                    <span>Delivered within 24 Hours on WhatsApp</span>
                  </li>
                </ul>
              </div>
              <a
                id="btn-pricing-magic"
                href={getWhatsAppURL(false)}
                target="_blank"
                referrerPolicy="no-referrer"
                className="mt-8 w-full text-center py-3 bg-brand-accent1 text-white hover:bg-brand-accent1/90 font-extrabold text-sm rounded-xl shadow-md shadow-brand-accent1/20 transition-all"
              >
                Order Now →
              </a>
            </div>

          </div>

          <div className="text-center mt-12 text-sm text-gray-500 font-semibold flex items-center justify-center space-x-2">
            <span>⚡ Delivery via WhatsApp</span>
            <span>•</span>
            <span>100% Personalised</span>
            <span>•</span>
            <span>Made with Care 🇮🇳</span>
          </div>

        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-display text-4xl font-extrabold text-brand-text">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 font-medium">
              Got worries or questions? We have the honest answers.
            </p>
            <div className="w-16 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            
            {/* Accordion 1 */}
            <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200">
              <button
                id="faq-btn-0"
                onClick={() => toggleFAQ(0)}
                className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 flex items-center justify-between font-display font-black text-brand-text focus:outline-hidden"
              >
                <span>How is Kidora different from YouTube kids content?</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${faqOpen[0] ? "transform rotate-180" : ""}`} />
              </button>
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  faqOpen[0] ? "max-h-56 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 text-sm text-gray-650 leading-relaxed bg-[#FAFAF8]">
                  YouTube shows the exact same general content to every single child. Under passive scrolling, children run target-blind. Kidora creates content with <strong>YOUR child's name, their specific interests</strong>, and the active moral lessons of your selection. It is made exclusively for them securely.
                </div>
              </div>
            </div>

            {/* Accordion 2 */}
            <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200">
              <button
                id="faq-btn-1"
                onClick={() => toggleFAQ(1)}
                className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 flex items-center justify-between font-display font-black text-brand-text focus:outline-hidden"
              >
                <span>How long does delivery take?</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${faqOpen[1] ? "transform rotate-180" : ""}`} />
              </button>
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  faqOpen[1] ? "max-h-56 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 text-sm text-gray-650 leading-relaxed bg-[#FAFAF8]">
                  Most orders are hand-generated, checked for quality, and delivered directly into your WhatsApp inbox as a high-fidelity MP3/mp4 combo within <strong>24 hours flat</strong>.
                </div>
              </div>
            </div>

            {/* Accordion 3 */}
            <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200">
              <button
                id="faq-btn-2"
                onClick={() => toggleFAQ(2)}
                className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 flex items-center justify-between font-display font-black text-brand-text focus:outline-hidden"
              >
                <span>Is the content safe for children?</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${faqOpen[2] ? "transform rotate-180" : ""}`} />
              </button>
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  faqOpen[2] ? "max-h-56 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 text-sm text-gray-650 leading-relaxed bg-[#FAFAF8]">
                  <strong>100%.</strong> All Kidora content is fully parent-approved, strictly ad-free, completely non-hyperstimulating, and constructed to spark imagination for youngsters between ages 3 and 11.
                </div>
              </div>
            </div>

            {/* Accordion 4 */}
            <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200">
              <button
                id="faq-btn-3"
                onClick={() => toggleFAQ(3)}
                className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 flex items-center justify-between font-display font-black text-brand-text focus:outline-hidden"
              >
                <span>Can I customise the values and lessons?</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${faqOpen[3] ? "transform rotate-180" : ""}`} />
              </button>
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  faqOpen[3] ? "max-h-56 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 text-sm text-gray-650 leading-relaxed bg-[#FAFAF8]">
                  Absolutely. You tell us precisely what values you want your children to adopt — kindness, bravery, sharing, curiosity, or persistence — and we weave them directly into the storyline organically.
                </div>
              </div>
            </div>

            {/* Accordion 5 */}
            <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-xs transition-colors duration-200">
              <button
                id="faq-btn-4"
                onClick={() => toggleFAQ(4)}
                className="w-full text-left px-6 py-5 bg-white hover:bg-gray-50 flex items-center justify-between font-display font-black text-brand-text focus:outline-hidden"
              >
                <span>Do you offer refunds?</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${faqOpen[4] ? "transform rotate-180" : ""}`} />
              </button>
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  faqOpen[4] ? "max-h-56 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 text-sm text-gray-650 leading-relaxed bg-[#FAFAF8]">
                  If you are not completely enchanted by your child's custom content, we will re-generate or modify it completely for free. Your visual and sonic satisfaction is our core mission.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section className="bg-linear-to-r from-[#1A3BD4] to-[#7F77DD] text-white py-20 relative overflow-hidden">
        {/* Sparkles background inside Final CTA */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <span className="absolute top-[25%] left-[12%] animate-sparkle text-3xl">★</span>
          <span className="absolute bottom-[25%] right-[10%] animate-sparkle text-2xl delay-300">⭐</span>
          <span className="absolute top-[65%] right-[32%] animate-sparkle text-xl delay-1000">✨</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs font-black rounded-full uppercase tracking-widest leading-none">
            ⭐ Act Today, Secure Their Future
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Give your child the magic they deserve.
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-semibold">
            First personalized jingle delivered in 24 hours directly on WhatsApp! Just tell us your child's name to begin.
          </p>

          <div className="pt-4 flex flex-col items-center">
            <a
              id="btn-final-whatsapp-click"
              href={getWhatsAppURL(false)}
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-lg sm:text-xl rounded-2xl shadow-xl hover:scale-[1.03] transition-all"
            >
              <MessageCircle className="w-6 h-6 mr-3 fill-white text-[#25D366]" />
              Order on WhatsApp Now 💬
            </a>
            <p className="text-indigo-100/90 text-xs mt-4 font-semibold tracking-wide">
              Starting at just ₹299 | Safe & 100% personalised | Made with love in India 🇮🇳
            </p>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-zinc-900 text-gray-450 pt-16 pb-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-zinc-850">
            
            {/* Description column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white">
                  <Star className="w-5 h-5 fill-brand-accent1 text-brand-accent1" />
                </span>
                <span className="font-display text-xl font-black text-white">Kidora</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                Screen time they love. Growth you trust. We craft highly customized, healthy, and engaging visual, reading and audio experiences for wonderful young brains in India.
              </p>
              <p className="text-[10px] text-gray-500 font-semibold font-mono">"Personalized magic for every child."</p>
            </div>

            {/* Navigation links column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Products & Jingles</a></li>
                <li><a href="#schools" className="hover:text-white transition-colors font-semibold">For Schools & Daycares</a></li>
              </ul>
            </div>

            {/* Social channels / Contact info column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Contact & Socials</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span className="text-gray-300 font-semibold">+91 99832 66017</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📸</span>
                  <a href="https://instagram.com/kidora" target="_blank" referrerPolicy="no-referrer" className="text-gray-300 hover:text-white transition-colors">@kidora on Instagram</a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🇮🇳</span>
                  <span className="text-gray-400">Constructed in New Delhi, India</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-semibold">
            <p>© 2025 Kidora. Made with ❤️ in India. All rights reserved.</p>
            <div className="flex space-x-4">
              <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
