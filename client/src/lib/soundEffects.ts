/* =============================================================
   Sound Effects Utility — SpinPick Clone
   Web Audio API implementation for spin wheel sounds
   - Tick sound during spin
   - Fanfare sound on winner reveal
   ============================================================= */

export class SoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize audio context on first user interaction
    if (typeof window !== "undefined") {
      document.addEventListener("click", () => this.initAudioContext(), { once: true });
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  /**
   * Play a tick sound (short beep)
   * Used during wheel spin
   */
  playTick() {
    if (!this.enabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = 800; // 800 Hz frequency
    osc.type = "sine";

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Play a fanfare sound (winner announcement)
   * Ascending notes to celebrate the winner
   */
  playFanfare() {
    if (!this.enabled || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, C (higher octave)
    const noteDuration = 0.15;
    const gap = 0.05;

    notes.forEach((frequency, index) => {
      const startTime = now + index * (noteDuration + gap);
      this.playNote(frequency, noteDuration, startTime, 0.4);
    });

    // Add a final high note
    const finalTime = now + notes.length * (noteDuration + gap);
    this.playNote(1046.5, 0.3, finalTime, 0.3);
  }

  /**
   * Play a single note
   */
  private playNote(frequency: number, duration: number, startTime: number, volume: number) {
    if (!this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.frequency.value = frequency;
    osc.type = "sine";

    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  /**
   * Play continuous tick sound during spin
   * Calls tick every ~100ms for 3.5 seconds
   */
  playSpinTicks(durationMs: number = 3500) {
    if (!this.enabled) return;

    const tickInterval = setInterval(() => {
      this.playTick();
    }, 100);

    setTimeout(() => {
      clearInterval(tickInterval);
    }, durationMs);
  }
}

// Singleton instance
export const soundEffects = new SoundEffects();
