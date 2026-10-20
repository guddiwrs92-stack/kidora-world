export interface ContactConfig {
  businessName: string;
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  location: string;
  grievanceOfficer: string;
}

export const CONTACT_CONFIG: ContactConfig = {
  businessName: "Kidora",
  email: "officialkidoramagic@gmail.com",
  whatsapp: "919983266017",
  whatsappDisplay: "+91 99832 66017",
  location: "Jodhpur, Rajasthan, India",
  grievanceOfficer: "Gautam Rajpurohit (officialkidoramagic@gmail.com)"
};

export interface OrderDetailsPayload {
  childName: string;
  ageBand: string;
  interest: string;
  value: string;
  learningGoal: string;
  chosenPack: string;
}

/**
 * Constructs the strictly compliant WhatsApp pre-filled message.
 * Per specification: may contain ONLY child's first name, age band, interest,
 * value, learning goal, and chosen pack.
 */
export function buildCompliantWhatsAppMessage(details: OrderDetailsPayload): string {
  const firstName = details.childName.trim().split(/\s+/)[0] || "Child";
  return [
    `Hello Kidora! I would like to order a personalised pack:`,
    `• Child's first name: ${firstName}`,
    `• Age band: ${details.ageBand}`,
    `• Interest: ${details.interest}`,
    `• Value: ${details.value}`,
    `• Learning goal: ${details.learningGoal}`,
    `• Chosen pack: ${details.chosenPack}`
  ].join("\n");
}

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${CONTACT_CONFIG.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
