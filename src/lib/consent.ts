import { GA_MEASUREMENT_ID } from "../config/analytics";

export { GA_MEASUREMENT_ID };
export const CONSENT_KEY = "kidora_cookie_consent";
export const CONSENT_EXPIRY_DAYS = 180;
const EXPIRY_MS = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

export type ConsentValue = "accepted" | "declined";

interface StoredConsent {
  value: ConsentValue;
  expires: number;
}

let isAnalyticsLoaded = false;

// Declare global dataLayer and gtag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Loads Google Analytics (gtag.js) script once only after explicit visitor consent.
 * Configured with strict privacy flags (no Google Signals, no ad personalization, IP anonymized).
 */
export function loadGoogleAnalytics(): void {
  if (isAnalyticsLoaded || typeof window === "undefined") {
    return;
  }

  // 1. Create window.dataLayer = window.dataLayer || []; define function gtag(){dataLayer.push(arguments);}
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag;

  // 2. Call gtag('js', new Date());
  gtag("js", new Date());

  // 3. Call gtag('config', 'G-Q4NV9493NZ', { allow_google_signals: false, allow_ad_personalization_signals: false, anonymize_ip: true });
  gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    anonymize_ip: true
  });

  // 4. Then inject an async <script> with src 'https://www.googletagmanager.com/gtag/js?id=G-Q4NV9493NZ' into document.head
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  isAnalyticsLoaded = true;
}

// Backward-compatible alias
export const loadTagManager = loadGoogleAnalytics;

/**
 * Reads the saved consent choice from localStorage.
 * Returns 'accepted', 'declined' or null if none or expired.
 */
export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    const data: StoredConsent = JSON.parse(raw);
    if (!data || !data.value || !data.expires) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    if (Date.now() > data.expires) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    if (data.value === "accepted" || data.value === "declined") {
      return data.value;
    }

    localStorage.removeItem(CONSENT_KEY);
    return null;
  } catch {
    return null;
  }
}

/**
 * Saves consent choice to localStorage with 180-day expiry.
 */
export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;

  try {
    const payload: StoredConsent = {
      value,
      expires: Date.now() + EXPIRY_MS
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  } catch {
    // Gracefully ignore storage quota errors
  }
}

/**
 * Initializes consent on page load.
 * If consent is 'accepted', calls loadGoogleAnalytics().
 * If null, calls showBanner().
 * If 'declined', does nothing.
 */
export function initConsent(showBanner: () => void): void {
  const current = getConsent();
  if (current === "accepted") {
    loadGoogleAnalytics();
  } else if (current === null) {
    showBanner();
  }
  // If 'declined', do nothing
}

/**
 * Saves 'accepted' and calls loadGoogleAnalytics().
 */
export function accept(): void {
  setConsent("accepted");
  loadGoogleAnalytics();
}

/**
 * Saves 'declined' and loads nothing.
 */
export function decline(): void {
  setConsent("declined");
}

/**
 * Removes the saved choice and reloads the page so the banner appears again.
 */
export function resetConsent(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Ignore errors
  }
  window.location.reload();
}

/**
 * Strict data rule: Only generic events (page_view, click_order_button)
 * are allowed. Never attaches child names, interests, phone numbers, or order details.
 */
export function trackGenericEvent(event: "page_view" | "click_order_button"): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", event);
  } else if (window.dataLayer) {
    window.dataLayer.push({ event });
  }
}
