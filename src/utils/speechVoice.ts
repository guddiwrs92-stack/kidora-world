// Speech Synthesis helper for reading Kidora stories, rhymes, phonics, and trivia aloud

class SpeechVoiceManager {
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public speak(
    text: string,
    options?: {
      pitch?: number;
      rate?: number;
      onBoundary?: (charIndex: number) => void;
      onEnd?: () => void;
    }
  ) {
    if (!("speechSynthesis" in window)) {
      if (options?.onEnd) options.onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    // Kid friendly slightly higher pitch and gentle pace
    utterance.pitch = options?.pitch ?? 1.25;
    utterance.rate = options?.rate ?? 0.92;

    // Pick an English or warm expressive voice if available
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(
      (v) =>
        (v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Zira"))) ||
        v.lang === "en-IN" ||
        v.lang === "en-US" ||
        v.lang === "en-GB"
    );

    if (friendlyVoice) {
      utterance.voice = friendlyVoice;
    }

    utterance.onboundary = (event) => {
      if (options?.onBoundary) {
        options.onBoundary(event.charIndex);
      }
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (options?.onEnd) {
        options.onEnd();
      }
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (options?.onEnd) {
        options.onEnd();
      }
    };

    this.isSpeaking = true;
    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const speechVoice = new SpeechVoiceManager();
