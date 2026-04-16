import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { PlayAnimationService } from './play-animation.service';

type TriggerName = 'hover' | 'click' | 'load';

@Directive({
  selector: '[playAnimate]',
  standalone: true,
})
export class PlayAnimateDirective implements OnInit, AfterViewInit, OnDestroy {

  // Accept string or arrays
  @Input() animation: string | string[] = 'fadeIn';
  @Input() trigger: TriggerName | TriggerName[] = 'hover';

  @Input() duration?: number;
  @Input() delay?: number;
  @Input() easing?: string;
  @Input() repeat?: number;

  private nativeEl!: HTMLElement;
  private observer?: MutationObserver;

  private normalizedAnimations: string[] = [];
  private normalizedTriggers: TriggerName[] = [];

  constructor(private el: ElementRef, private play: PlayAnimationService) {}

  ngOnInit() {
    // Normalize into arrays (do not modify original inputs)
    this.normalizedAnimations = Array.isArray(this.animation) ? [...this.animation] : [this.animation];
    this.normalizedTriggers = Array.isArray(this.trigger) ? [...this.trigger] : [this.trigger as TriggerName];

    // trim & sanitize animations
    this.normalizedAnimations = this.normalizedAnimations.map(a => (a ?? '').toString().trim()).filter(Boolean);
    if (this.normalizedAnimations.length === 0) this.normalizedAnimations = ['fadeIn'];

    // ensure triggers are valid
    this.normalizedTriggers = this.normalizedTriggers.map(t => (t ?? 'hover') as TriggerName);

    this.nativeEl = this.el.nativeElement;
  }

  ngAfterViewInit() {
    this.resolveInnerElement(true);

    // Make visible if no load trigger
    if (!this.normalizedTriggers.includes('load')) {
      this.nativeEl.style.opacity = '1';
      this.nativeEl.style.transform = 'none';
    }

    // Observe changes if component renders later
    try {
      this.observer = new MutationObserver(() => {
        this.resolveInnerElement(false);
      });
      this.observer.observe(this.el.nativeElement, { childList: true, subtree: true });
    } catch (e) {
      console.warn('[playAnimate] MutationObserver not available', e);
    }

    // Auto-run load triggers
    this.normalizedTriggers.forEach((t, i) => {
      if (t === 'load') {
        const anim = this.normalizedAnimations[i] ?? this.normalizedAnimations[0];
        setTimeout(() => this.safeRunAnimation(i), 100);
      }
    });
  }

  ngOnDestroy() {
    try { this.observer?.disconnect(); } catch (e) {}
  }

  private resolveInnerElement(log = false) {
    const host = this.el.nativeElement as HTMLElement;

    // Try to find a likely animatable element inside the host
    const preferred = [
      '[data-play-core]',
      '.aava-core',
      '.aava-tabs-core',
      '.play-core',
      ':scope > div' // direct child div
    ];

    let found: HTMLElement | null = null;
    for (const sel of preferred) {
      try {
        if (sel === ':scope > div') {
          const el = host.querySelector(':scope > div') as HTMLElement | null;
          if (el) { found = el; break; }
        } else {
          const el = host.querySelector(sel) as HTMLElement | null;
          if (el) { found = el; break; }
        }
      } catch (e) {
        // ignore invalid selectors in some browsers
      }
    }

    this.nativeEl = (found ?? host) as HTMLElement;
    
  }

  @HostListener('mouseenter')
  onHover() {
    const idx = this.normalizedTriggers.indexOf('hover');
    if (idx === -1) return;
    this.safeRunAnimation(idx);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const idx = this.normalizedTriggers.indexOf('click');
    if (idx === -1) return;

    (window as any).__lastRippleClick = { x: event.clientX, y: event.clientY };

    // ensure DOM settled
    requestAnimationFrame(() => {
      this.resolveInnerElement(true);
      this.safeRunAnimation(idx);
    });
  }

  // safe wrapper by index
  private safeRunAnimation(index: number) {
    try {
      const animName = this.normalizedAnimations[index] ?? this.normalizedAnimations[0];
      this.runAnimation(animName);
    } catch (err) {
      console.error('[playAnimate] safeRunAnimation error', err);
    }
  }

  private runAnimation(animName: string) {
    if (!animName) {
      console.warn('[playAnimate] empty animation name, skipping');
      return;
    }
    const fn = this.play.get(animName);
    if (typeof fn !== 'function') {
      console.warn(`[playAnimate] animation "${animName}" not found in PlayAnimationService`);
      return;
    }
    const defaults = this.play.getDefaults ? this.play.getDefaults() : ({} as any);
    try {
      fn(
        this.nativeEl,
        this.duration ?? defaults.duration,
        this.delay ?? defaults.delay,
        this.easing ?? defaults.easing,
        this.repeat ?? defaults.repeat
      );
    } catch (err) {
      console.error(`[playAnimate] error running "${animName}"`, err);
    }
  }
}
