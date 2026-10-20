import React, { useEffect } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { CONTACT_CONFIG } from "../config/contact";
import { soundManager } from "../utils/audioSynthesizer";
import { resetConsent } from "../lib/consent";

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onOpenCookieSettings?: () => void;
  onNavigateTerms?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBackToHome,
  onOpenCookieSettings,
  onNavigateTerms
}) => {
  useEffect(() => {
    document.title = "Privacy Policy — Kidora";
    window.scrollTo(0, 0);
  }, []);

  const tocItems = [
    { id: "section-1", title: "1. Who we are" },
    { id: "section-2", title: "2. Who this is for" },
    { id: "section-3", title: "3. What we collect" },
    { id: "section-4", title: "4. Why we use it" },
    { id: "section-5", title: "5. How we create content" },
    { id: "section-6", title: "6. Who we share it with" },
    { id: "section-7", title: "7. Consent" },
    { id: "section-8", title: "8. How long we keep it" },
    { id: "section-9", title: "9. Your rights" },
    { id: "section-10", title: "10. Security" },
    { id: "section-11", title: "11. Cookies" },
    { id: "section-12", title: "12. Changes" },
    { id: "section-13", title: "13. Contact" }
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
              Privacy Policy
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

          {/* Legal Content Sections (Strict verbatim text from brief) */}
          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-gray-800">
            
            <section id="section-1" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                1. Who we are
              </h2>
              <p>
                Kidora ("we", "us") creates personalised songs, storybooks and games for children. We are based
                in Jodhpur, Rajasthan, India. Email: {CONTACT_CONFIG.email}. WhatsApp: {CONTACT_CONFIG.whatsappDisplay}.
                The contact details shown on this website are always our current ones. Our Grievance Officer is
                Gautam Rajpurohit ({CONTACT_CONFIG.email}). We reply within 7 days.
              </p>
            </section>

            <section id="section-2" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                2. Who this is for
              </h2>
              <p>
                Our services are bought by parents and legal guardians. We do not ask children to create
                accounts or contact us. If you share a child's details with us, you confirm that you are their
                parent or legal guardian and you agree to this policy on their behalf.
              </p>
            </section>

            <section id="section-3" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                3. What we collect
              </h2>
              <p>
                <strong>Parent or guardian:</strong> your WhatsApp number, your name (if you give it), your order details, and
                payment confirmation for UPI payments (such as the payer name or UPI ID shown on the
                confirmation). We never see your UPI PIN or bank login.
              </p>
              <p>
                <strong>Child:</strong> first name, age band, favourite interests, the value you choose (such as kindness or
                bravery), the learning goal, and name pronunciation notes (if you give them).
              </p>
              <p>
                <strong>Website:</strong> if you accept analytics cookies, Google Analytics collects basic usage data such as
                pages visited, device type and approximate region. We never send a child's details to Google
                Analytics, and we do not use Google's advertising features.
              </p>
              <p>
                We do not collect children's photos, voice recordings, school names, home addresses or location.
              </p>
            </section>

            <section id="section-4" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                4. Why we use it
              </h2>
              <p>
                To create and deliver your personalised song, storybook, certificate and games; to reply to your
                messages and handle orders, revisions and refunds; to understand how our website is used (only
                if you accept analytics cookies); and to keep the service secure. We do not use children's data
                for advertising, profiling or behavioural tracking.
              </p>
            </section>

            <section id="section-5" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                5. How we create content
              </h2>
              <p>
                We use AI tools, including Google (Gemini) and Suno, to help produce songs and stories. We send
                them only what is needed for your order: the child's first name, interests, chosen value,
                learning goal and pronunciation notes. We never send your phone number. A person reviews each
                pack before we deliver it.
              </p>
            </section>

            <section id="section-6" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                6. Who we share it with
              </h2>
              <p>
                WhatsApp (Meta) to deliver your order; Google (Gemini and Analytics); Suno; Vercel, our hosting
                provider; our database provider; and UPI payment apps and banks that process your payment. We do
                not sell your data and we do not show ads. We share data only with providers who need it to run
                the service, or when the law requires.
              </p>
            </section>

            <section id="section-7" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                7. Consent
              </h2>
              <p>
                We ask for a parent's or guardian's consent before using a child's details. You can withdraw
                consent at any time by messaging us. Withdrawing may mean we cannot complete an order. You can
                change your cookie choice at any time using "Cookie settings" in the footer.
              </p>
            </section>

            <section id="section-8" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                8. How long we keep it
              </h2>
              <p>
                We delete a child's details within 30 days after delivery, or sooner if you ask. We keep order
                records (your WhatsApp number, order and payment confirmation) for up to 3 years for accounts and
                legal needs, unless you ask us to delete them and the law allows.
              </p>
            </section>

            <section id="section-9" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                9. Your rights
              </h2>
              <p>
                You can ask us to show, correct or delete the data we hold about you or your child, to withdraw
                consent, or to nominate someone to act for you. Email {CONTACT_CONFIG.email} or message us
                on WhatsApp and we will respond within 7 days. If your concern is not resolved, you can complain
                to the Data Protection Board of India.
              </p>
            </section>

            <section id="section-10" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                10. Security
              </h2>
              <p>
                We use HTTPS and limit access to your data to the people who need it. No system is perfectly
                secure. If a breach affects your data, we will tell you and the authorities as the law requires.
              </p>
            </section>

            <section id="section-11" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                11. Cookies
              </h2>
              <p>
                We use only essential storage for the site to work, and Google Analytics only if you accept. We
                do not use advertising or tracking cookies.
              </p>
            </section>

            <section id="section-12" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                12. Changes
              </h2>
              <p>
                If we change this policy we will update the date above and, for important changes, tell you on
                WhatsApp or on this website.
              </p>
            </section>

            <section id="section-13" className="space-y-2 pt-2 scroll-mt-24">
              <h2 className="font-display text-xl font-black text-[#1A3BD4]">
                13. Contact
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
            <span className="font-bold text-gray-700">Privacy Policy</span>
            <span>•</span>
            <a
              href="/terms"
              onClick={(e) => {
                if (onNavigateTerms) {
                  e.preventDefault();
                  onNavigateTerms();
                }
              }}
              className="text-[#1A3BD4] hover:underline font-bold"
            >
              Terms &amp; Refunds
            </a>
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
