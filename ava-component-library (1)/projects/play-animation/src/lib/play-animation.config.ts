import { InjectionToken } from '@angular/core';

export interface PlayAnimationConfig {
  duration: number;
  delay: number;
  easing: string; // ✅ Added this
  repeat: number;
}

export const DEFAULT_PLAY_ANIMATION_CONFIG: PlayAnimationConfig = {
  duration: 0.6,
  delay: 0,
  easing: 'ease-out', // ✅ Standard CSS easing
  repeat: 0,
};

export const PLAY_ANIMATION_CONFIG = new InjectionToken<PlayAnimationConfig>(
  'PLAY_ANIMATION_CONFIG'
);
