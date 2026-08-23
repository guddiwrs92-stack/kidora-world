// Web Audio synthesizer for Kidora interactive soundscapes & instruments
import { MusicTheme } from "../types";

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentLoopTimeouts: number[] = [];
  private currentSourceNodes: (OscillatorNode | GainNode)[] = [];

  private initContext(): AudioContext | null {
    if (this.ctx && this.ctx.state !== "closed") {
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    this.ctx = new AudioCtx();
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopCurrentSong();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play a single UI sound effect
  public playSoundEffect(type: "click" | "correct" | "wrong" | "victory" | "cardFlip" | "starDing" | "laser" | "pop") {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (type) {
      case "click": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case "correct": {
        // Cheerful ascending major chord (C5 - E5 - G5 - C6)
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0, now + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.26);
        });
        break;
      }

      case "wrong": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
        break;
      }

      case "starDing": {
        // High sparkle bell
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1318.51, now); // E6
        osc.frequency.exponentialRampToValueAtTime(1760.0, now + 0.15); // A6
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.36);
        break;
      }

      case "cardFlip": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }

      case "laser": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        break;
      }

      case "pop": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.04);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case "victory": {
        // Kid fanfare: C5, C5, C5, F5, A5, C6 (extended hold)
        const fanfare = [
          { f: 523.25, d: 0.12 },
          { f: 523.25, d: 0.12 },
          { f: 523.25, d: 0.12 },
          { f: 698.46, d: 0.25 },
          { f: 880.00, d: 0.25 },
          { f: 1046.5, d: 0.60 }
        ];
        let offset = 0;
        fanfare.forEach((n) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(n.f, now + offset);
          gain.gain.setValueAtTime(0, now + offset);
          gain.gain.linearRampToValueAtTime(0.25, now + offset + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + n.d);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + n.d + 0.02);
          offset += n.d + 0.04;
        });
        break;
      }
    }
  }

  // Play customized thematic songs with note tracking
  public playThemedSong(
    theme: MusicTheme,
    onNoteStep?: (step: number, total: number) => void,
    onComplete?: () => void
  ) {
    this.stopCurrentSong();
    if (this.isMuted) {
      if (onComplete) onComplete();
      return;
    }

    const ctx = this.initContext();
    if (!ctx) return;

    let notes: number[] = [];
    let noteDur = 0.4;
    let waveType: OscillatorType = "triangle";

    switch (theme) {
      case "chimes": // Bright Music Box
        notes = [
          261.63, 329.63, 392.00, 392.00, 440.00, 440.00, 392.00,
          349.23, 349.23, 329.63, 329.63, 293.66, 293.66, 261.63,
          392.00, 440.00, 523.25, 659.25, 523.25
        ];
        noteDur = 0.38;
        waveType = "triangle";
        break;

      case "marimba": // Bouncy Tropical Adventure
        notes = [
          392.0, 523.25, 659.25, 783.99, 659.25, 523.25, 392.0,
          440.0, 587.33, 698.46, 880.0, 698.46, 587.33, 440.0,
          523.25, 659.25, 783.99, 1046.5
        ];
        noteDur = 0.28;
        waveType = "sine";
        break;

      case "lullaby": // Soothing Bedtime Calm
        notes = [
          261.63, 329.63, 392.0, 523.25, 392.0, 329.63,
          261.63, 293.66, 349.23, 440.0, 349.23, 293.66,
          261.63, 329.63, 392.0, 523.25
        ];
        noteDur = 0.65;
        waveType = "sine";
        break;

      case "arcade": // 8-Bit Joy
        notes = [
          329.63, 329.63, 0, 329.63, 0, 261.63, 329.63, 0,
          392.00, 0, 0, 0, 196.00, 0, 0, 0,
          261.63, 0, 196.00, 0, 164.81, 0, 220.00, 246.94
        ];
        noteDur = 0.16;
        waveType = "square";
        break;
    }

    const totalNotes = notes.length;
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (freq > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = waveType;
        osc.frequency.setValueAtTime(freq, now + idx * noteDur);

        const startT = now + idx * noteDur;
        const stopT = startT + noteDur;

        gain.gain.setValueAtTime(0, startT);
        gain.gain.linearRampToValueAtTime(theme === "arcade" ? 0.08 : 0.22, startT + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, stopT - 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startT);
        osc.stop(stopT);
      }

      const tId = window.setTimeout(() => {
        if (onNoteStep) onNoteStep(idx, totalNotes);
        if (idx === totalNotes - 1) {
          const finalTId = window.setTimeout(() => {
            if (onComplete) onComplete();
          }, noteDur * 1000);
          this.currentLoopTimeouts.push(finalTId);
        }
      }, idx * noteDur * 1000);

      this.currentLoopTimeouts.push(tId);
    });
  }

  public stopCurrentSong() {
    this.currentLoopTimeouts.forEach((t) => clearTimeout(t));
    this.currentLoopTimeouts = [];
    if (this.ctx && this.ctx.state === "running") {
      // Create quick silence
    }
  }
}

export const soundManager = new AudioSynthesizer();
