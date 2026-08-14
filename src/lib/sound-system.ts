"use client";

// Web Audio API Synthesizer with Continuous Spatial Mouse Theremin & Kinetic Harp

class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  // Continuous Mouse Movement Synth Nodes
  private mouseOsc: OscillatorNode | null = null;
  private mouseOsc2: OscillatorNode | null = null;
  private mouseFilter: BiquadFilterNode | null = null;
  private mouseGain: GainNode | null = null;
  private mousePanner: StereoPannerNode | null = null;
  private isMouseSynthActive: boolean = false;
  private mouseMoveTimeout: NodeJS.Timeout | null = null;
  private lastNoteIndex: number = -1;
  private lastChimeTime: number = 0;

  // Pentatonic Scale Frequencies for Musical Mouse Tracking (C Major / Emerald Pentatonic)
  private pentatonicScale = [
    261.63, 293.66, 329.63, 392.0, 440.0,
    523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51
  ];

  public resumeContext() {
    if (typeof window === "undefined") return;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  // Initialize Continuous Mouse Spatial Ambient Oscillator
  private setupMouseSynth() {
    if (!this.ctx || this.isMouseSynthActive) return;

    try {
      this.mouseOsc = this.ctx.createOscillator();
      this.mouseOsc2 = this.ctx.createOscillator();
      this.mouseFilter = this.ctx.createBiquadFilter();
      this.mouseGain = this.ctx.createGain();

      // Stereo Panning Node if supported
      if (this.ctx.createStereoPanner) {
        this.mousePanner = this.ctx.createStereoPanner();
      }

      // Warm pure sine + triangle harmonic
      this.mouseOsc.type = "sine";
      this.mouseOsc2.type = "triangle";

      this.mouseOsc.frequency.setValueAtTime(440, this.ctx.currentTime);
      this.mouseOsc2.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.mouseFilter.type = "lowpass";
      this.mouseFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      this.mouseFilter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      // Start silent
      this.mouseGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Connect graph: Osc -> Filter -> Gain -> Panner -> Destination
      this.mouseOsc.connect(this.mouseFilter);
      this.mouseOsc2.connect(this.mouseFilter);
      this.mouseFilter.connect(this.mouseGain);

      if (this.mousePanner) {
        this.mouseGain.connect(this.mousePanner);
        this.mousePanner.connect(this.ctx.destination);
      } else {
        this.mouseGain.connect(this.ctx.destination);
      }

      this.mouseOsc.start();
      this.mouseOsc2.start();
      this.isMouseSynthActive = true;
    } catch {
      // Audio fallback
    }
  }

  // Continuous Mouse Movement Interaction:
  public handleMouseMove(normalizedX: number, normalizedY: number, speed: number = 1) {
    if (!this.enabled) return;

    try {
      this.resumeContext();
      if (!this.ctx) return;

      if (!this.isMouseSynthActive) {
        this.setupMouseSynth();
      }

      const now = this.ctx.currentTime;

      // 1. Quantize X to nearest harmonic note in Pentatonic Scale
      const noteIndex = Math.min(
        this.pentatonicScale.length - 1,
        Math.max(0, Math.floor(normalizedX * this.pentatonicScale.length))
      );
      const targetFreq = this.pentatonicScale[noteIndex];

      if (this.mouseOsc && this.mouseOsc2 && this.mouseFilter && this.mouseGain) {
        // Smooth glissando pitch shift
        this.mouseOsc.frequency.setTargetAtTime(targetFreq, now, 0.05);
        this.mouseOsc2.frequency.setTargetAtTime(targetFreq * 0.5, now, 0.05);

        // 2. Map Y to Filter Cutoff
        const targetCutoff = 500 + (1 - normalizedY) * 2600;
        this.mouseFilter.frequency.setTargetAtTime(targetCutoff, now, 0.08);

        // 3. Map X to Stereo Panner
        if (this.mousePanner) {
          const panValue = (normalizedX - 0.5) * 1.6;
          this.mousePanner.pan.setTargetAtTime(panValue, now, 0.06);
        }

        // 4. Volume responds dynamically to velocity
        const clampedSpeed = Math.min(speed, 30);
        const targetGain = Math.min(0.065, 0.012 + (clampedSpeed / 30) * 0.05);

        this.mouseGain.gain.setTargetAtTime(targetGain, now, 0.04);

        // Auto fade to silence when mouse stops moving
        if (this.mouseMoveTimeout) {
          clearTimeout(this.mouseMoveTimeout);
        }

        this.mouseMoveTimeout = setTimeout(() => {
          if (this.mouseGain && this.ctx) {
            this.mouseGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.15);
          }
        }, 120);
      }

      // Kinetic Harp Chime when crossing note zones while moving fast
      const perfNow = performance.now();
      if (noteIndex !== this.lastNoteIndex && speed > 2.5 && perfNow - this.lastChimeTime > 90) {
        this.lastNoteIndex = noteIndex;
        this.lastChimeTime = perfNow;
        this.playHoverChime(noteIndex);
      }
    } catch {
      // Audio fallback
    }
  }

  // Play Shimmer Glass Chime on Hovering Cards or Elements
  public playHoverChime(index: number = 0) {
    if (!this.enabled) return;

    try {
      this.resumeContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const note = this.pentatonicScale[index % this.pentatonicScale.length];
      osc.type = "sine";
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(note * 1.5, this.ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio fallback
    }
  }

  // Crisp Tactile Mechanical Click on button presses
  public playMechanicalClick() {
    if (!this.enabled) return;

    try {
      this.resumeContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(360, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // Audio fallback
    }
  }

  // Soft Glass Tap for quick button hover
  public playGlassTap() {
    if (!this.enabled) return;

    try {
      this.resumeContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(950, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // Audio fallback
    }
  }

  // Pentatonic Glass Chord for Switch / Success / Copy Action
  public playSuccessChime() {
    if (!this.enabled) return;

    try {
      this.resumeContext();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.04 + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.04);
        osc.stop(this.ctx.currentTime + idx * 0.04 + 0.16);
      });
    } catch {
      // Audio fallback
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled && this.mouseGain && this.ctx) {
      this.mouseGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.05);
    }
  }
}

export const spatialAudio = new SpatialAudioEngine();
