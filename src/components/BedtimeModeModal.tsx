import React, { useState, useEffect } from "react";
import { Moon, Star, Volume2, Square, Play, X, Clock, Sparkles } from "lucide-react";
import { PersonalisationState } from "../types";
import { soundManager } from "../utils/audioSynthesizer";
import { speechVoice } from "../utils/speechVoice";

interface BedtimeModeModalProps {
  personalisation: PersonalisationState;
  onClose: () => void;
}

export const BedtimeModeModal: React.FC<BedtimeModeModalProps> = ({
  personalisation,
  onClose
}) => {
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [isReadingBedtimeStory, setIsReadingBedtimeStory] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(15);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60);

  const childName = personalisation.name.trim() || "Arjun";

  useEffect(() => {
    let interval: number | null = null;
    if (isPlayingLullaby && timeLeftSeconds > 0) {
      interval = window.setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            soundManager.stopCurrentSong();
            setIsPlayingLullaby(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingLullaby, timeLeftSeconds]);

  const toggleLullaby = () => {
    if (isPlayingLullaby) {
      soundManager.stopCurrentSong();
      setIsPlayingLullaby(false);
    } else {
      setIsPlayingLullaby(true);
      setTimeLeftSeconds(timerMinutes * 60);
      soundManager.playThemedSong("lullaby", undefined, () => {
        // replay or keep peaceful
      });
    }
  };

  const toggleBedtimeStory = () => {
    if (isReadingBedtimeStory) {
      speechVoice.stop();
      setIsReadingBedtimeStory(false);
    } else {
      setIsReadingBedtimeStory(true);
      const bedtimeScript = `Close your eyes, sweet ${childName}. The stars in the gentle sky are glowing softly just for you. Today you were brave, kind, and full of wonder. Your friend ${personalisation.avatar.companionPet} is resting beside you under the moonlight. Take a deep, gentle breath in... and let it out softly. Tomorrow brings brand new adventures. Goodnight, champion.`;
      speechVoice.speak(bedtimeScript, {
        pitch: 0.95,
        rate: 0.78,
        onEnd: () => setIsReadingBedtimeStory(false)
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-slate-100">
      <div className="bg-gradient-to-b from-slate-900 to-indigo-950 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-indigo-500/30 text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.stopCurrentSong();
            speechVoice.stop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Night Sky Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-indigo-900/50 flex items-center justify-center border border-indigo-400/30 relative">
            <Moon className="w-10 h-10 text-amber-200 fill-amber-200 animate-pulse" />
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 absolute top-2 right-2 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-300 bg-indigo-900/60 px-3 py-1 rounded-full border border-indigo-700/50">
            Kidora Bedtime Calm Mode
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
            Peaceful Sleep for {childName}
          </h3>
          <p className="text-xs text-indigo-200 font-medium">
            Soothing acoustic lullaby tones & calming guided sleep voice narration.
          </p>
        </div>

        {/* Lullaby Audio Player */}
        <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Gentle Sine Lullaby (432 Hz Calm)
            </span>
            <span className="font-mono text-amber-300">{formatTime(timeLeftSeconds)}</span>
          </div>

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={toggleLullaby}
              className={`px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingLullaby
                  ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              {isPlayingLullaby ? (
                <>
                  <Square className="w-4 h-4 fill-slate-950" />
                  <span>Pause Lullaby</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Lullaby Soundscape</span>
                </>
              )}
            </button>

            <button
              onClick={toggleBedtimeStory}
              className={`px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isReadingBedtimeStory
                  ? "bg-purple-500 text-white shadow-lg animate-pulse"
                  : "bg-slate-800 hover:bg-slate-700 text-purple-200 border border-purple-500/30"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isReadingBedtimeStory ? "Stop Voice" : "Guided Story Voice"}</span>
            </button>
          </div>
        </div>

        {/* Timer Presets */}
        <div className="flex items-center justify-center space-x-2 text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Sleep Timer:
          </span>
          {[5, 15, 30].map((m) => (
            <button
              key={m}
              onClick={() => {
                soundManager.playSoundEffect("click");
                setTimerMinutes(m);
                setTimeLeftSeconds(m * 60);
              }}
              className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold cursor-pointer ${
                timerMinutes === m
                  ? "bg-indigo-600 text-white border-indigo-400"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
              }`}
            >
              {m}m
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
