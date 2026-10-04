import React, { useState } from "react";
import { MessageCircle, Play, Square, Download, FileText, ExternalLink, Award, CheckCheck, Sparkles, Send } from "lucide-react";
import { PersonalisationState } from "../types";
import { soundManager } from "../utils/audioSynthesizer";

interface WhatsAppMockupViewerProps {
  personalisation: PersonalisationState;
  whatsAppUrl: string;
}

export const WhatsAppMockupViewer: React.FC<WhatsAppMockupViewerProps> = ({
  personalisation,
  whatsAppUrl
}) => {
  const [isPlayingAudioNote, setIsPlayingAudioNote] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const childName = personalisation.name.trim() || "Arjun";

  const togglePlayAudioNote = () => {
    if (isPlayingAudioNote) {
      soundManager.stopCurrentSong();
      setIsPlayingAudioNote(false);
      setAudioProgress(0);
    } else {
      setIsPlayingAudioNote(true);
      soundManager.playThemedSong(
        "chimes",
        (step, total) => {
          setAudioProgress(Math.round((step / total) * 100));
        },
        () => {
          setIsPlayingAudioNote(false);
          setAudioProgress(100);
        }
      );
    }
  };

  return (
    <section id="delivery" className="py-16 md:py-24 bg-white border-t border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-widest">
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-600" />
            <span>Instant WhatsApp Delivery Experience</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-brand-text">
            Delivered directly to your WhatsApp in 24h
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            No complicated app downloads or logins. Your high-fidelity custom MP3, storybook, and certificates arrive straight in your chat.
          </p>
        </div>

        {/* Smartphone Phone Frame Mockup */}
        <div className="max-w-sm sm:max-w-md mx-auto bg-zinc-900 p-4 rounded-[40px] shadow-2xl border-4 border-zinc-800">
          
          {/* Phone Top Notch */}
          <div className="w-32 h-4 bg-zinc-800 rounded-full mx-auto mb-3 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full"></div>
          </div>

          {/* WhatsApp Interface Inside Phone */}
          <div className="bg-[#EFEAE2] rounded-[28px] overflow-hidden shadow-inner flex flex-col h-[520px]">
            
            {/* WhatsApp Chat Header */}
            <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold ring-2 ring-white/50">
                  ⭐
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">Kidora Magic Content</h4>
                  <p className="text-[10px] text-emerald-200">Online • Official Verified Pack</p>
                </div>
              </div>
              <span className="text-xs bg-emerald-700/60 px-2 py-0.5 rounded text-emerald-100 font-mono">
                24h Delivery
              </span>
            </div>

            {/* Chat Bubble Area */}
            <div className="flex-1 p-3.5 space-y-3 overflow-y-auto font-sans text-xs">
              
              {/* Timestamp */}
              <div className="text-center">
                <span className="bg-white/80 text-gray-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
                  TODAY
                </span>
              </div>

              {/* Incoming WhatsApp Bubble: Delivery Package */}
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-xs space-y-2.5 max-w-[90%] border border-gray-100">
                <p className="text-gray-800 font-medium">
                  🎉 Hello! Your custom <strong>Kidora Growth Pack</strong> for <strong>{childName}</strong> is ready! ✨
                </p>

                {/* 1. Interactive Audio Voice Note Player */}
                <div className="bg-[#DCF8C6] p-2.5 rounded-xl flex items-center space-x-2.5 border border-emerald-200">
                  <button
                    onClick={togglePlayAudioNote}
                    className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                  >
                    {isPlayingAudioNote ? <Square className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-700 mb-1">
                      <span>{childName}_magic_jingle.mp3</span>
                      <span>0:45</span>
                    </div>
                    {/* Audio wave bar */}
                    <div className="w-full bg-gray-300 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#075E54] h-full transition-all duration-300"
                        style={{ width: `${audioProgress || (isPlayingAudioNote ? 60 : 15)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* 2. Storybook PDF Attachment Mock */}
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-[10px]">
                      PDF
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-800">{childName}'s Adventure Story</p>
                      <p className="text-[9px] text-gray-400">Illustrated Storybook • 1.2 MB</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-gray-500" />
                </div>

                {/* 3. Certificate of Achievement Attachment */}
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-6 h-6 text-amber-600" />
                    <div>
                      <p className="text-[11px] font-bold text-amber-900">Explorer Certificate</p>
                      <p className="text-[9px] text-amber-700">Printable Gold Badge</p>
                    </div>
                  </div>
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="flex justify-end items-center space-x-1 text-[9px] text-gray-400">
                  <span>10:30 AM</span>
                  <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>

            </div>

            {/* Bottom Quick Order Action */}
            <div className="p-3 bg-gray-100 border-t border-gray-200">
              <a
                href={whatsAppUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Chat & Order for {childName} →</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
