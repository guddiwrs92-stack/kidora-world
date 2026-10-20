import React, { useEffect } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { CONTACT_CONFIG } from "../config/contact";
import { soundManager } from "../utils/audioSynthesizer";
import { resetConsent } from "../lib/consent";

interface TermsPageProps {
  onBackToHome: () => void;
  onOpenCookieSettings?: () => void;
  onNavigatePrivacy?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onBackToHome,
  onOpenCookieSettings,
  onNavigatePrivacy
}) => {
  useEffect(() => {
    document.title = "Terms & Refund Policy — Kidora";
    window.scrollTo(0, 0);
  }, []);

  const tocItems = [
    { id: "term-1", title: "1. About these terms" },
    { id: "term-2", title: "2. What we provide" },
    { id: "term-3", title: "3. Ordering and payment" },
    { id: "term-4", title: "4. Delivery" },
    { id: "term-5", title: "5. Revisions" },
    { id: "term-6", title: "6. Refunds and cancellation" },
    { id: "term-7", title: "7. How you may use the content" },
    { id: "term-8", title: "8. Parental responsibility" },
    { id: "term-9", title: "9. Liability" },
    { id: "term-10", title: "10. Disputes" },
    { id: "term-11", title: "11. Changes to these terms" },
    { id: "term-12", title: "12. Contact" }
  ];

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1A1A2E] font-sans flex flex-col selection:bg-brand-primary selection:text-white">
      {/* Top Header */}
      <header className="border-b border-amber-200/50 bg-[#FAF9F5]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playSoundEffect("click");
              onBackToHome();
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1A3BD4] hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to home</span>
          </a>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playSoundEffect("click");
              onBackToHome();
            }}
            className="flex items-center space-x-2"
          >
            <span className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-xs">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            </span>
            <span className="font-display text-xl font-black text-brand-primary tracking-tight">
              Kidora
            </span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6">
        <article className="max-w-[760px] mx-auto space-y-8">
          
          {/* Title Header */}
          <header className="space-y-2 border-b border-amber-200/60 pb-6">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#1A3BD4] tracking-tight">
              Terms &amp; Refund Policy
            </h1>
            <p className="text-xs sm:text-sm font-bold text-gray-500 font-mono">
              Last updated: 20 October 2026
            </p>
          </header>

          {/* Table of Contents */}
          <nav
            aria-label="Table of contents"
            className="p-5 sm:p-6 bg-white/80 rounded-3xl border border-amber-200/70 shadow-xs space-y-3"
          >
            <h2 className="font-display text-sm font-black uppercase tracking-wider text-[#1A3BD4]">
              Table of Contents
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-medium">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleTocClick(e, item.id)}
                    className="text-gray-700 hover:text-[#1A3BD4] hover:underline transition-colors block py-0.5"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Content Sections */}
          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-800">
            
            <section id="term-1" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                1. About these terms
              </h2>
              <p>
                By ordering from Kidora you agree to these terms. You must be at least 18 and the child's
                parent or legal guardian.
              </p>
            </section>

            <section id="term-2" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                2. What we provide
              </h2>
              <p>
                Personalised songs, illustrated storybooks, certificates and games made from the details you give
                us. Packs and prices: Magic Jingle ₹299, Growth Duo Pack ₹499 and Birthday Mega Pack ₹899. Prices
                are one-time, in Indian rupees, and do not include GST. If GST applies to your order, we will show
                it before you pay.
              </p>
            </section>

            <section id="term-3" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                3. Ordering and payment
              </h2>
              <p>
                Orders are placed through WhatsApp. We confirm your order there. You pay by UPI, and we start work
                after your payment is confirmed.
              </p>
            </section>

            <section id="term-4" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                4. Delivery
              </h2>
              <p>
                We deliver within 24 to 48 hours after payment is confirmed, to the WhatsApp number you used to
                order. Delivery may take longer on busy days or if we need information from you. We will tell you
                if there is a delay.
              </p>
            </section>

            <section id="term-5" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                5. Revisions
              </h2>
              <p>
                Each pack includes 1 free revision for name pronunciation or small details. You must ask for
                revisions within 7 days of delivery. Revisions for new songs, different topics or completely
                different names need a new order.
              </p>
            </section>

            <section id="term-6" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                6. Refunds and cancellation
              </h2>
              <p>
                Because each item is personalised, we cannot offer refunds once work begins or after delivery if you
                simply change your mind. If we cannot deliver within 48 hours of payment, or if there is an error on
                our part that we cannot fix through a revision, you can ask for a full refund. Message us on WhatsApp
                or email {CONTACT_CONFIG.email} within 7 days. Approved refunds are paid to your UPI within 5 to 7
                working days.
              </p>
            </section>

            <section id="term-7" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                7. How you may use the content
              </h2>
              <p>
                Everything we deliver is for your personal, family use only. You can share it with family and
                friends and play it at private gatherings. You may not resell, broadcast or commercially use any
                Kidora song, story or game.
              </p>
            </section>

            <section id="term-8" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                8. Parental responsibility
              </h2>
              <p>
                Our content is designed for fun and positive screen time. It is not medical, therapeutic or
                developmental advice. Parents and legal guardians are responsible for guiding their child's screen
                time.
              </p>
            </section>

            <section id="term-9" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                9. Liability
              </h2>
              <p>
                As far as Indian law allows, Kidora's liability for any order is limited to the amount you paid for
                that order. We are not liable for indirect or consequential losses.
              </p>
            </section>

            <section id="term-10" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                10. Disputes
              </h2>
              <p>
                These terms follow the laws of India. Any disputes will be handled in the courts of Jodhpur,
                Rajasthan, India.
              </p>
            </section>

            <section id="term-11" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                11. Changes to these terms
              </h2>
              <p>
                We may update these terms from time to time. The latest date is always shown at the top. Ordering
                again after changes means you agree to the updated terms.
              </p>
            </section>

            <section id="term-12" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                12. Contact
              </h2>
              <p className="font-medium">
                {CONTACT_CONFIG.businessName}, {CONTACT_CONFIG.location} | {CONTACT_CONFIG.email} | {CONTACT_CONFIG.whatsappDisplay}
              </p>
            </section>

          </div>
        </article>
      </main>

      {/* Footer on legal pages */}
      <footer className="border-t border-amber-200/60 py-8 bg-[#FAF9F5] text-xs text-gray-500">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Kidora. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a
              href="/privacy"
              onClick={(e) => {
                if (onNavigatePrivacy) {
                  e.preventDefault();
                  onNavigatePrivacy();
                }
              }}
              className="text-[#1A3BD4] hover:underline font-bold"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <span className="font-bold text-gray-700">Terms &amp; Refunds</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                soundManager.playSoundEffect("click");
                resetConsent();
              }}
              className="text-[#1A3BD4] hover:underline font-bold cursor-pointer"
            >
              Cookie settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
