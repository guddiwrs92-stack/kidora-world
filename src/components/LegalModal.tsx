import React, { useState } from "react";
import { X, Shield, FileText, CheckCircle2, Lock, Trash2 } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";

interface LegalModalProps {
  initialTab?: "privacy" | "terms";
  onClose: () => void;
  whatsAppUrl: string;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  initialTab = "privacy",
  onClose,
  whatsAppUrl
}) => {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(initialTab);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-gray-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center space-x-2">
            {activeTab === "privacy" ? (
              <Shield className="w-5 h-5 text-brand-primary" />
            ) : (
              <FileText className="w-5 h-5 text-brand-primary" />
            )}
            <h2 className="font-display text-xl font-black text-brand-text">
              {activeTab === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h2>
          </div>

          <button
            onClick={() => {
              soundManager.playSoundEffect("click");
              onClose();
            }}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 pt-4 pb-2 shrink-0">
          <button
            onClick={() => {
              soundManager.playSoundEffect("click");
              setActiveTab("privacy");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "privacy"
                ? "bg-brand-primary text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => {
              soundManager.playSoundEffect("click");
              setActiveTab("terms");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "terms"
                ? "bg-brand-primary text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto pr-2 space-y-4 py-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
          {activeTab === "privacy" ? (
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs font-semibold text-brand-primary">
                Summary: We collect minimal details (first name, age band, interests) solely to generate your child's content. No ads, no data selling, and you can delete everything anytime via WhatsApp.
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">1. Information We Collect</h3>
                <p>
                  When you configure and order content on Kidora, we ask only for:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Your child's first name (or nickname) and optional pronunciation guide.</li>
                  <li>Age band (e.g., 3–5, 6–8, 9–11) to adapt sentence structure and vocabulary.</li>
                  <li>Interests and virtues chosen by the parent (e.g., Space, Dinosaurs, Kindness).</li>
                  <li>Parent contact information (WhatsApp number or email) for order delivery.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">2. How We Use Information</h3>
                <p>
                  Information is used exclusively to produce your custom audio jingles, illustrated storybooks, and activity links. Every piece is AI-assisted, human-reviewed before it reaches your child.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">3. What We Never Do</h3>
                <p>
                  We never track or profile children across websites or devices. We never display third-party advertisements. We never sell, rent, or trade family or child personal information to advertisers or brokers.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">4. Right to Deletion &amp; Control</h3>
                <p>
                  Parents maintain 100% control. At any time, you may message us via WhatsApp or email to request immediate deletion of all submitted inputs and generated files from our creative queue.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100 text-xs font-semibold text-amber-900">
                Summary: Simple, transparent terms. One-time payment, no subscriptions, free revisions, and personal family usage rights.
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">1. Service Description</h3>
                <p>
                  Kidora provides personalized children's digital content, including customized MP3 sing-along rhymes, illustrated storybook PDFs, and educational browser mini-games.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">2. One-Time Pricing &amp; Revisions</h3>
                <p>
                  All packages are one-time payments (Magic Jingle ₹299, Growth Duo Pack ₹499, Birthday Mega Pack ₹899). There are zero recurring subscriptions or hidden charges. If a name pronunciation or detail needs adjustment, we provide free revisions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">3. Personal &amp; Family License</h3>
                <p>
                  Delivered audio and PDF materials are licensed for your family's personal, non-commercial listening, reading, and celebration.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-sm text-brand-text">4. Parent Guidance &amp; Nature of Content</h3>
                <p>
                  Kidora content is designed as an interactive, positive screen-time alternative. It is an educational and entertainment planning resource, not medical, psychological, or diagnostic advice.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
          <a
            href={whatsAppUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            className="text-xs text-brand-primary font-bold hover:underline"
          >
            Questions? Chat with us on WhatsApp &rarr;
          </a>
          <button
            onClick={() => {
              soundManager.playSoundEffect("click");
              onClose();
            }}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
