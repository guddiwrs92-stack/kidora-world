import { GTM_ID } from "../config/analytics";

export { GTM_ID };
export const CONSENT_KEY = "kidora_cookie_consent";
export const CONSENT_EXPIRY_DAYS = 180;
const EXPIRY_MS = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

export type ConsentValue = "accepted" | "declined";

interface StoredConsent {
  value: ConsentValue;
  expires: number;
}

let isTagManagerLoaded = false;

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Loads Google Tag Manager script once only after explicit visitor consent.
 */
export function loadTagManager(): void {
  if (isTagManagerLoaded || typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js"
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  isTagManagerLoaded = true;
}

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
 * If consent is 'accepted', calls loadTagManager().
 * If null, calls showBanner().
 * If 'declined', does nothing.
 */
export function initConsent(showBanner: () => void): void {
  const current = getConsent();
  if (current === "accepted") {
    loadTagManager();
  } else if (current === null) {
    showBanner();
  }
  // If 'declined', do nothing
}

/**
 * Saves 'accepted' and calls loadTagManager().
 */
export function accept(): void {
  setConsent("accepted");
  loadTagManager();
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

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}
