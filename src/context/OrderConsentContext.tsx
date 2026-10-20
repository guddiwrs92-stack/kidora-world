import React, { createContext, useContext, useState, useEffect } from "react";

interface OrderConsentContextType {
  hasConsented: boolean;
  setHasConsented: (consent: boolean) => void;
  showWarning: boolean;
  triggerWarning: () => void;
  dismissWarning: () => void;
}

const OrderConsentContext = createContext<OrderConsentContextType>({
  hasConsented: false,
  setHasConsented: () => {},
  showWarning: false,
  triggerWarning: () => {},
  dismissWarning: () => {}
});

const SESSION_STORAGE_KEY = "kidora_guardian_order_consent";

export const OrderConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasConsented, setConsentState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [showWarning, setShowWarning] = useState<boolean>(false);

  const setHasConsented = (consent: boolean) => {
    setConsentState(consent);
    if (consent) {
      setShowWarning(false);
    }
    try {
      if (consent) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {
      // Ignore sessionStorage errors
    }
  };

  const triggerWarning = () => {
    setShowWarning(true);
  };

  const dismissWarning = () => {
    setShowWarning(false);
  };

  return (
    <OrderConsentContext.Provider
      value={{
        hasConsented,
        setHasConsented,
        showWarning,
        triggerWarning,
        dismissWarning
      }}
    >
      {children}
    </OrderConsentContext.Provider>
  );
};

export const useOrderConsent = () => useContext(OrderConsentContext);
