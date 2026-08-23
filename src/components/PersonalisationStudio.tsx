import React, { useState } from "react";
import {
  Sparkles,
  Music,
  BookOpen,
  Volume2,
  Square,
  Play,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Award,
  Smile,
  RefreshCw,
  Star,
  Share2
} from "lucide-react";
import { PersonalisationState, MusicTheme, GeneratedStory } from "../types";
import { soundManager } from "../utils/audioSynthesizer";
import { speechVoice } from "../utils/speechVoice";
import { generatePersonalizedStory } from "../utils/geminiStoryGenerator";
import confetti from "canvas-confetti";

interface PersonalisationStudioProps {
  personalisation: PersonalisationState;
  onUpdatePersonalisation: (updater: (prev: PersonalisationState) => PersonalisationState) => void;
  onOpenCertificate: () => void;
  whatsAppUrl: string;
}

export const PersonalisationStudio: React.FC<PersonalisationStudioProps> = ({
  personalisation,
  onUpdatePersonalisation,
  onOpenCertificate,
  whatsAppUrl
}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "avatar" | "music">("profile");
  const [musicTheme, setMusicTheme] = useState<MusicTheme>("chimes");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isReadingVoice, setIsReadingVoice] = useState(false);
  const [currentNoteStep, setCurrentNoteStep] = useState<number | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedChoiceOutcome, setSelectedChoiceOutcome] = useState<string | null>(null);
  const [bonusStars, setBonusStars] = useState(0);

  // Generate real-time story data
  const story: GeneratedStory = generatePersonalizedStory(personalisation);

  const handlePlayMusic = () => {
    if (isPlayingMusic) {
      soundManager.stopCurrentSong();
      setIsPlayingMusic(false);
      setCurrentNoteStep(null);
    } else {
      setIsPlayingMusic(true);
      soundManager.playThemedSong(
        musicTheme,
        (step) => setCurrentNoteStep(step),
        () => {
          setIsPlayingMusic(false);
          setCurrentNoteStep(null);
        }
      );
    }
  };

  const handleReadAloud = (textToRead: string) => {
    if (isReadingVoice) {
      speechVoice.stop();
      setIsReadingVoice(false);
    } else {
      setIsReadingVoice(true);
      speechVoice.speak(textToRead, {
        pitch: 1.2,
        rate: 0.92,
        onEnd: () => setIsReadingVoice(false)
      });
    }
  };

  const handleSelectChoice = (option: { label: string; outcome: string; bonusValue: string }) => {
    soundManager.playSoundEffect("victory");
    setSelectedChoiceOutcome(`${option.outcome} ⭐ ${option.bonusValue}`);
    setBonusStars((prev) => prev + 50);

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#1D9E75", "#F5A623", "#1A3BD4", "#7F77DD"]
    });
  };

  const PET_OPTIONS = [
    { label: "Baby Dragon 🐉", icon: "🐉" },
    { label: "Space Pup 🐶", icon: "🐶" },
    { label: "Flying Kitten 🐱", icon: "🐱" },
    { label: "Magic Owl 🦉", icon: "🦉" },
    { label: "Galaxy Panda 🐼", icon: "🐼" },
    { label: "Wonder Lion 🦁", icon: "🦁" }
  ];

  const AGE_OPTIONS = ["3-5 Years", "6-8 Years", "9-11 Years"];
  const INTEREST_OPTIONS = [
    "Space & Stars",
    "Dinosaurs",
    "Jungle Animals",
    "Magic Trains",
    "Superheroes",
    "Deep Ocean"
  ];
  const GOAL_OPTIONS = [
    "Curiosity & Science",
    "Vocabulary & Speech",
    "Numbers & Logic",
    "Rhythm & Music"
  ];
  const VALUE_OPTIONS = [
    "Kindness 💛",
    "Bravery 🦁",
    "Sharing & Caring 🤝",
    "Politeness & Respect ✨",
    "Persistence 🐢"
  ];

  const MUSIC_THEMES: { id: MusicTheme; name: string; icon: string; desc: string }[] = [
    { id: "chimes", name: "Music Box Chimes", icon: "🔔", desc: "Gentle sparkling bells" },
    { id: "marimba", name: "Sunny Marimba", icon: "🌴", desc: "Upbeat tropical bounce" },
    { id: "lullaby", name: "Starry Lullaby", icon: "🌙", desc: "Soothing bedtime calm" },
    { id: "arcade", name: "8-Bit Arcade", icon: "👾", desc: "Playful retro video game" }
  ];

  const currentPage = story.pages[currentPageIndex];

  return (
    <section id="personalise" className="py-16 md:py-24 bg-[#FFFBF5] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-accent1/15 text-brand-accent1 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Creator Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text">
            Not a template. Made for <span className="text-brand-primary">{personalisation.name || "YOUR Child"}</span>.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Customize their profile below and test their live sing-along jingle, interactive storybook, and superpower badge in real-time!
          </p>
        </div>

        {/* Studio Box */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-brand-accent1/15 overflow-hidden">
          
          {/* Studio Navigation Tabs */}
          <div className="flex border-b border-gray-100 bg-gray-50/70 p-2 gap-2">
            <button
              onClick={() => {
                soundManager.playSoundEffect("click");
                setActiveTab("profile");
              }}
              className={`flex-1 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-white text-brand-primary shadow-sm border border-gray-100"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>👤</span>
              <span>1. Child Profile</span>
            </button>
            <button
              onClick={() => {
                soundManager.playSoundEffect("click");
                setActiveTab("avatar");
              }}
              className={`flex-1 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "avatar"
                  ? "bg-white text-brand-accent2 shadow-sm border border-gray-100"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>✨</span>
              <span>2. Companion Avatar</span>
            </button>
            <button
              onClick={() => {
                soundManager.playSoundEffect("click");
                setActiveTab("music");
              }}
              className={`flex-1 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === "music"
                  ? "bg-white text-brand-accent1 shadow-sm border border-gray-100"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span>🎵</span>
              <span>3. Jingle Melody</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 md:p-10">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-5 space-y-6">
              
              {activeTab === "profile" && (
                <div className="space-y-5 animate-fade-in">
                  
                  {/* Child Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="child-name-input" className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Child's Name
                    </label>
                    <input
                      id="child-name-input"
                      type="text"
                      value={personalisation.name}
                      onChange={(e) =>
                        onUpdatePersonalisation((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="E.g., Arjun, Diya, Kabir, Ananya"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-bold outline-hidden transition-all"
                    />
                  </div>

                  {/* Age Group */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Age Group
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {AGE_OPTIONS.map((age) => (
                        <button
                          key={age}
                          type="button"
                          onClick={() => {
                            soundManager.playSoundEffect("click");
                            onUpdatePersonalisation((prev) => ({ ...prev, age }));
                          }}
                          className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            personalisation.age === age
                              ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {age}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Child's World / Interest
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {INTEREST_OPTIONS.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => {
                            soundManager.playSoundEffect("pop");
                            onUpdatePersonalisation((prev) => ({ ...prev, interest }));
                          }}
                          className={`py-2.5 px-3 text-left rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer ${
                            personalisation.interest === interest
                              ? "bg-brand-accent2 text-white border-brand-accent2 shadow-sm"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span>{interest}</span>
                          {personalisation.interest === interest && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Moral Values */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Moral Value to Instill
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {VALUE_OPTIONS.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => {
                            soundManager.playSoundEffect("starDing");
                            onUpdatePersonalisation((prev) => ({ ...prev, value: val }));
                          }}
                          className={`py-2 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            personalisation.value === val
                              ? "bg-brand-success text-white border-brand-success shadow-sm"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Learning Goals */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Learning Goal
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GOAL_OPTIONS.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => {
                            soundManager.playSoundEffect("click");
                            onUpdatePersonalisation((prev) => ({ ...prev, goal }));
                          }}
                          className={`py-1.5 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            personalisation.goal === goal
                              ? "bg-brand-accent1 text-white border-brand-accent1 shadow-sm"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {activeTab === "avatar" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 flex items-center space-x-3">
                    <span className="text-3xl animate-bounce">
                      {personalisation.avatar.companionPet.split(" ")[1] || "🐉"}
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-purple-950 uppercase tracking-wider">
                        Active Explorer Buddy
                      </h4>
                      <p className="text-xs text-purple-700 font-semibold">
                        {personalisation.avatar.companionPet} travels with {personalisation.name || "Arjun"} on every adventure!
                      </p>
                    </div>
                  </div>

                  {/* Pick Pet */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Choose Companion Pet
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {PET_OPTIONS.map((pet) => (
                        <button
                          key={pet.label}
                          type="button"
                          onClick={() => {
                            soundManager.playSoundEffect("pop");
                            onUpdatePersonalisation((prev) => ({
                              ...prev,
                              avatar: { ...prev.avatar, companionPet: pet.label }
                            }));
                          }}
                          className={`p-3 rounded-2xl text-xs font-bold border text-left flex items-center space-x-2.5 transition-all cursor-pointer ${
                            personalisation.avatar.companionPet === pet.label
                              ? "bg-brand-accent2 text-white border-brand-accent2 shadow-md"
                              : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-xl">{pet.icon}</span>
                          <span className="font-semibold">{pet.label.split(" ")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Explorer Cape Color */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Explorer Cape Color
                    </label>
                    <div className="flex gap-3">
                      {[
                        { name: "Royal Blue", bg: "bg-blue-600" },
                        { name: "Sunny Gold", bg: "bg-amber-500" },
                        { name: "Emerald Green", bg: "bg-emerald-500" },
                        { name: "Magic Purple", bg: "bg-purple-600" },
                        { name: "Hero Coral", bg: "bg-rose-500" }
                      ].map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            soundManager.playSoundEffect("click");
                            onUpdatePersonalisation((prev) => ({
                              ...prev,
                              avatar: { ...prev.avatar, color: c.name }
                            }));
                          }}
                          className={`w-8 h-8 rounded-full ${c.bg} transition-transform cursor-pointer ${
                            personalisation.avatar.color === c.name
                              ? "ring-4 ring-offset-2 ring-brand-primary scale-110"
                              : "hover:scale-105"
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "music" && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                      Select Jingle Melody
                    </label>
                    <div className="space-y-2.5">
                      {MUSIC_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => {
                            soundManager.playSoundEffect("click");
                            setMusicTheme(theme.id);
                            soundManager.playThemedSong(theme.id);
                            setIsPlayingMusic(true);
                          }}
                          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            musicTheme === theme.id
                              ? "bg-amber-50 border-brand-accent1 text-brand-text shadow-sm"
                              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{theme.icon}</span>
                            <div>
                              <h4 className="text-xs font-black text-brand-text">{theme.name}</h4>
                              <p className="text-[11px] text-gray-500">{theme.desc}</p>
                            </div>
                          </div>
                          {musicTheme === theme.id ? (
                            <span className="text-xs font-black text-brand-accent1 bg-white px-2.5 py-1 rounded-full shadow-2xs">
                              Selected 🎵
                            </span>
                          ) : (
                            <Play className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons below form */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSoundEffect("starDing");
                    onOpenCertificate();
                  }}
                  className="flex-1 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-wider border border-emerald-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  View Certificate
                </button>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  onClick={() => soundManager.playSoundEffect("victory")}
                  className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </a>
              </div>

            </div>

            {/* Right Column: Live Interactive Sing-along & Story Player */}
            <div className="lg:col-span-7 bg-zinc-50/70 rounded-3xl p-6 sm:p-7 border border-amber-100 flex flex-col justify-between relative shadow-xs">
              
              {/* Badge + Player Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/80">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-800">
                    Live Jingle & Story Engine
                  </span>
                  {bonusStars > 0 && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      +{bonusStars} Stars
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {/* Read Aloud Voice Button */}
                  <button
                    onClick={() => handleReadAloud(`${currentPage.text} ${currentPage.characterDialogue}`)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      isReadingVoice
                        ? "bg-purple-600 text-white shadow-md animate-pulse"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    }`}
                    title="Read aloud using kid-friendly speech narration"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isReadingVoice ? "Reading..." : "Read Aloud"}</span>
                  </button>

                  {/* Synth Melody Music Play Button */}
                  <button
                    onClick={handlePlayMusic}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                      isPlayingMusic
                        ? "bg-brand-accent1 text-white shadow-md animate-pulse"
                        : "bg-brand-primary text-white hover:bg-brand-primary/95"
                    }`}
                  >
                    {isPlayingMusic ? (
                      <>
                        <Square className="w-3 h-3 fill-white" />
                        <span>Stop Melody</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-white" />
                        <span>Play Melody</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sing-Along Jingle Box with Karaoke bouncing highlight */}
              <div className="bg-amber-50/80 rounded-2xl p-4.5 border border-amber-200/70 my-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-brand-accent1" />
                    Custom Singalong Jingle for {story.childName}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    24h WhatsApp Delivery
                  </span>
                </div>

                <div className="space-y-1.5 font-display text-xs sm:text-sm font-bold text-gray-800 leading-relaxed">
                  {story.lyrics.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-1.5 rounded-lg transition-colors ${
                        currentNoteStep !== null && (currentNoteStep % story.lyrics.length === idx)
                          ? "bg-amber-200 text-amber-950 font-black scale-[1.01]"
                          : ""
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Storybook Page Display */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs space-y-4">
                {/* Scene Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-primary bg-indigo-50 px-2.5 py-1 rounded-md">
                    Chapter {currentPage.pageNumber} of {story.pages.length}: {currentPage.sceneTitle}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <button
                      disabled={currentPageIndex === 0}
                      onClick={() => {
                        soundManager.playSoundEffect("cardFlip");
                        setCurrentPageIndex((prev) => Math.max(0, prev - 1));
                        setSelectedChoiceOutcome(null);
                      }}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      disabled={currentPageIndex === story.pages.length - 1}
                      onClick={() => {
                        soundManager.playSoundEffect("cardFlip");
                        setCurrentPageIndex((prev) => Math.min(story.pages.length - 1, prev + 1));
                        setSelectedChoiceOutcome(null);
                      }}
                      className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Animated Illustration Scene */}
                <div className="flex items-center justify-center p-4 bg-linear-to-r from-indigo-50 via-purple-50 to-amber-50 rounded-xl">
                  <div className="text-5xl animate-bounce">{currentPage.illustrationEmoji}</div>
                  <div className="flex space-x-2 ml-4">
                    {currentPage.secondaryEmojis.map((em, i) => (
                      <span key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                        {em}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Narrative Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {currentPage.text}
                </p>

                {/* Character Dialogue Bubble */}
                <div className="p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/10 text-xs font-bold text-brand-primary italic">
                  💬 {currentPage.characterDialogue}
                </div>

                {/* Moral Choice Tree if on Page 2 */}
                {currentPage.moralChoice && (
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <p className="text-xs font-black text-gray-800 uppercase tracking-wider">
                      🎯 Interactive Choice: {currentPage.moralChoice.prompt}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => handleSelectChoice(currentPage.moralChoice!.optionA)}
                        className="p-2.5 rounded-xl text-left bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-amber-900 transition-all cursor-pointer"
                      >
                        {currentPage.moralChoice.optionA.label}
                      </button>
                      <button
                        onClick={() => handleSelectChoice(currentPage.moralChoice!.optionB)}
                        className="p-2.5 rounded-xl text-left bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold text-indigo-900 transition-all cursor-pointer"
                      >
                        {currentPage.moralChoice.optionB.label}
                      </button>
                    </div>

                    {selectedChoiceOutcome && (
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-black text-emerald-800 animate-fade-in">
                        ✨ {selectedChoiceOutcome}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom WhatsApp Order banner */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span>Personalized Delivery within 24 Hours</span>
                <span className="text-brand-primary font-bold">Starts at ₹299 Flat</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
