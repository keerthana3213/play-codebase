import { Inject, Injectable, Optional } from '@angular/core';
import { PlayAnimationFn, animationPresets } from './presets';
import {
  PLAY_ANIMATION_CONFIG,
  PlayAnimationConfig,
  DEFAULT_PLAY_ANIMATION_CONFIG
} from './play-animation.config';

@Injectable({ providedIn: 'root' })
export class PlayAnimationService {
  private animations = new Map<string, PlayAnimationFn>();
  private config: PlayAnimationConfig;

  constructor(@Optional() @Inject(PLAY_ANIMATION_CONFIG) config?: PlayAnimationConfig) {
    this.config = { ...DEFAULT_PLAY_ANIMATION_CONFIG, ...config };

    // Register built-in presets
    Object.entries(animationPresets).forEach(([key, fn]) => this.register(key, fn));
  }

  register(name: string, fn: PlayAnimationFn) {
    if (!name || typeof fn !== 'function') {
      throw new Error('[play-animation] register requires a name and a function');
    }
    this.animations.set(name, fn);
  }

  get(name: string): PlayAnimationFn | undefined {
    return this.animations.get(name);
  }

  has(name: string): boolean {
    return this.animations.has(name);
  }

  list(): string[] {
    return Array.from(this.animations.keys());
  }

  getDefaults() {
    return this.config;
  }
  
}
