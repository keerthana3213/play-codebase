import { MotionTokens } from './tokens';

export type PlayAnimationFn = (
  el: HTMLElement,
  duration: number,
  delay: number,
  easing: string,
  repeat: number
) => Animation | void;

function ensureGlobalStyles() {
  if (typeof document === 'undefined') return;
  const styleId = 'play-animation-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* Ripple */
    .playanim-ripple-host { position: relative; overflow: hidden; }
    .playanim-ripple-host::after {
      content: ""; position: absolute;
      left: var(--ripple-x, 50%); top: var(--ripple-y, 50%);
      width: var(--ripple-size, 100px); height: var(--ripple-size, 100px);
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 70%);
      opacity: 0; z-index: 9999;
    }
    .playanim-ripple-host.playanim-rippling::after {
      animation: playanim-ripple ${MotionTokens.DURATION_RIPPLE_SPREAD}s linear;
    }
    @keyframes playanim-ripple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
      20% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.5; }
      100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
    }

    /* Glass Hover Shine */
    .glass-hover { position: relative; overflow: hidden; }
    .glass-hover::before {
      content: ""; position: absolute;
      top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
      transform: skewX(-25deg); pointer-events: none; z-index: 10;
    }
    .glass-hover.glass-hover--shine::before {
      animation: glass-shine 0.6s ease-in-out;
    }
    @keyframes glass-shine {
      from { left: -100%; }
      to { left: 200%; }
    }


  `;
  document.head.appendChild(style);
}

// Ensure styles are loaded
ensureGlobalStyles();

export const animationPresets: Record<string, PlayAnimationFn> = {

  fade: (el, duration, delay, easing, repeat) => {
    const keyframes = [
      { opacity: 0 },
      { opacity: 1 }
    ];

    const animOptions: KeyframeAnimationOptions = {
      duration: (duration || MotionTokens.DURATION_LIQUID_FADE) * 1000,
      delay: (delay || 0) * 1000,
      easing: easing || MotionTokens.EASE_LIQUID,
      fill: 'both',
      iterations: (repeat || 0) + 1
    };
    return el.animate(keyframes, animOptions);
  },

  slideUp: (el, duration, delay, easing, repeat) => {
    const keyframes = [
      { transform: `translateY(${MotionTokens.DISTANCE_LIQUID})`, opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ];

    const animOptions: KeyframeAnimationOptions = {
      duration: (duration || MotionTokens.DURATION_FLOW_SLIDE) * 1000,
      delay: (delay || 0) * 1000,
      easing: easing || MotionTokens.EASE_LIQUID,
      fill: 'both',
      iterations: (repeat || 0) + 1
    };
    return el.animate(keyframes, animOptions);
  },

  slideDown: (el, duration, delay, easing, repeat) => {
    const keyframes = [
      { transform: `translateY(-${MotionTokens.DISTANCE_LIQUID})`, opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ];

    const animOptions: KeyframeAnimationOptions = {
      duration: (duration || MotionTokens.DURATION_FLOW_SLIDE) * 1000,
      delay: (delay || 0) * 1000,
      easing: easing || MotionTokens.EASE_LIQUID,
      fill: 'both',
      iterations: (repeat || 0) + 1
    };
    return el.animate(keyframes, animOptions);
  },

  zoomFadeIn: (el, duration, delay, easing, repeat) => {
    const keyframes = [
      { transform: `scale(0.85) translateY(${MotionTokens.DISTANCE_LIQUID})`, opacity: 0 },
      { transform: 'scale(1) translateY(0)', opacity: 1 }
    ];

    const animOptions: KeyframeAnimationOptions = {
      duration: (duration || MotionTokens.DURATION_GLASS_LIFT) * 1000,
      delay: (delay || 0) * 1000,
      easing: easing || MotionTokens.EASE_GLASS,
      fill: 'both',
      iterations: (repeat || 0) + 1
    };
    return el.animate(keyframes, animOptions);
  },

  bounce: (el, duration, delay, easing, repeat) => {
    const keyframes = [
      { transform: 'scale(0.85)', offset: 0 },
      { transform: 'scale(1.1)', offset: 0.5 },
      { transform: 'scale(0.95)', offset: 0.75 },
      { transform: 'scale(1)', offset: 1 }
    ];

    const animOptions: KeyframeAnimationOptions = {
      duration: (duration || MotionTokens.DURATION_SOFT_BOUNCE) * 1000,
      delay: (delay || 0) * 1000,
      easing: easing || MotionTokens.EASE_BOUNCE_APPROX,
      fill: 'both',
      iterations: (repeat || 0) + 1
    };
    return el.animate(keyframes, animOptions);
  },

  pulse: (el, duration, delay, easing, repeat) => {
    const keyframes = [
      { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(225, 29, 72, 0.0)' },
      { transform: 'scale(1.02)', boxShadow: '0 0 0 4px rgba(225, 29, 72, 0)' },
      { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(225, 29, 72, 0)' }
    ];

    const animOptions: KeyframeAnimationOptions = {
      duration: (duration || MotionTokens.DURATION_LIGHT_PULSE) * 1000,
      delay: (delay || 0) * 1000,
      easing: easing || MotionTokens.EASE_LIGHT,
      fill: 'both',
      iterations: (repeat || 0) + 1
    };
    return el.animate(keyframes, animOptions);
  },

  flip: (element, duration, delay, easing, repeat) => {
    const el = element;
    const keyframes = [
      { transform: 'rotateY(0deg)' },
      { transform: 'rotateY(360deg)' }
    ];

    return el.animate(keyframes, {
      duration: (duration || MotionTokens.DURATION_FLIP) * 1000,
      delay: (delay || 0) * 1000,
      easing: easing || MotionTokens.EASE_GLASS,
      fill: 'both',
      iterations: (repeat || 0) + 1
    });
  },

  shake: (el, duration, delay, easing, repeat) => {
    const keyframes = [
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' }
    ];

    return el.animate(keyframes, {
      duration: 80,
      delay: (delay || 0) * 1000,
      direction: 'alternate',
      iterations: ((repeat || 0) + 3) * 2,
      easing: 'linear',
      fill: 'both'
    });
  },

  ripple: (el, duration, delay, easing, repeat) => {
    ensureGlobalStyles();
    const rect = el.getBoundingClientRect();

    const last = (window as any).__lastRippleClick as { x: number; y: number } | undefined;

    const originX = last ? last.x - rect.left : rect.width / 2;
    const originY = last ? last.y - rect.top : rect.height / 2;

    const size = Math.max(rect.width, rect.height) * 1.2;

    el.classList.add('playanim-ripple-host');
    el.style.setProperty('--ripple-x', `${originX}px`);
    el.style.setProperty('--ripple-y', `${originY}px`);
    el.style.setProperty('--ripple-size', `${size}px`);

    // restart animation
    el.classList.remove('playanim-rippling');
    void el.offsetWidth;
    el.classList.add('playanim-rippling');

    const dur = (Number(duration) || MotionTokens.DURATION_RIPPLE_SPREAD) * 1000;
    setTimeout(() => {
      el.classList.remove('playanim-rippling');
    }, dur + 400 + (delay || 0) * 1000);
  },

  glassLift: (el, duration, delay, easing, repeat) => {
    const enterKeyframes = [
      { transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 16px 40px rgba(0,0,0,0.2)', backdropFilter: 'blur(12px)' }
    ];
    const leaveKeyframes = [
      { transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }
    ];

    const dur = (duration || MotionTokens.DURATION_GLASS_LIFT) * 1000;
    const ease = easing || MotionTokens.EASE_GLASS;

    const enter = () => el.animate(enterKeyframes, { duration: dur, easing: ease, fill: 'forwards' });
    const leave = () => el.animate(leaveKeyframes, { duration: dur, easing: ease, fill: 'forwards' });

    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
  },

  glassHover: (el, duration, delay, easing, repeat) => {
    ensureGlobalStyles();
    el.classList.add('glass-hover');

    const enterKeyframes = [
      { transform: 'translateY(-4px) scale(1.01)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)' }
    ];
    const leaveKeyframes = [
      { transform: 'translateY(0) scale(1)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', backdropFilter: 'blur(4px)' }
    ];

    const dur = (duration || 0.3) * 1000;
    const ease = easing || MotionTokens.EASE_LIGHT;

    const enter = () => {
      el.animate(enterKeyframes, { duration: dur, easing: ease, fill: 'forwards' });

      el.classList.remove('glass-hover--shine');
      void el.offsetWidth;
      el.classList.add('glass-hover--shine');
    };

    const leave = () => {
      el.animate(leaveKeyframes, { duration: dur, easing: ease, fill: 'forwards' });
      el.classList.remove('glass-hover--shine');
    };

    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
  },

  swoop: (element: HTMLElement, duration, delay, easing, repeat) => {
    const el = (element.querySelector('.ava-dialog-content') as HTMLElement) || element;

    // Adjusted: Anchor to BOTTOM (50% 100%) to prevent "downward" expansion.
    // 1. Start: Right (2vw). Grow UP and LEFT.
    // 2. Middle: Left (-20vw). Grow UP and RIGHT.
    // 3. End: Center.
    const keyframes = [
      {
        opacity: 0,
        transformOrigin: '50% 100%',
        transform: 'perspective(1400px) scale(0.1) translateX(1vw)',
        offset: 0
      },
      {
        opacity: 0.4,
        transformOrigin: '50% 100%',
        transform: 'perspective(1400px) scale(0.3) translateX(-10vw)',
        offset: 0.25
      },
      {
        opacity: 0.7,
        transformOrigin: '50% 100%',
        transform: 'perspective(1400px) scale(0.55) translateX(-20vw)',
        offset: 0.5
      },
      {
        opacity: 1,
        transformOrigin: '50% 100%',
        transform: 'perspective(1400px) scale(0.8) translateX(-10vw)',
        offset: 0.75
      },
      {
        opacity: 1,
        transformOrigin: '50% 100%',
        transform: 'perspective(1400px) scale(1) translateX(0)',
        offset: 1
      }
    ];

    const animOptions: KeyframeAnimationOptions = {
      duration: (duration || 1) * 1000,
      delay: (delay || 0.1) * 1000,
      easing: MotionTokens.EASE_GLASS,
      fill: 'both',
      iterations: (repeat || 0) + 1
    };

    return el.animate(keyframes, animOptions);
  },

  swoopOut: (element: HTMLElement, duration, delay, easing, repeat) => {
    const el = (element.querySelector('.ava-dialog-content') as HTMLElement) || element;

    const startTransform = 'scale(0.7) rotateX(8deg) perspective(800px) translateZ(-150px)';
    const midTransform = 'scale(1.05) rotateX(0) perspective(800px) translateZ(0)';
    const endTransform = 'scale(1) rotateX(0) perspective(800px) translateZ(0)';

    const keyframes = [
      { opacity: 0, transform: startTransform, filter: 'blur(10px)', offset: 0 },
      { opacity: 1, transform: midTransform, filter: 'blur(0px)', offset: 0.7 },
      { opacity: 1, transform: endTransform, filter: 'blur(0px)', offset: 1 }
    ];

    return el.animate(keyframes, {
      duration: 1.0 * 1000,
      delay: (delay || 0) * 1000,
      fill: 'both',
      easing: MotionTokens.EASE_LIGHT,
    });
  },

  tabSwitch: (el, duration, delay, easing, repeat) => {
    const tabs = Array.from(el.querySelectorAll(".ava-tabs__tab")) as HTMLElement[];
    tabs.forEach(t => t.classList.add("ava-tabs__tab--custom-active-style"));

    const newActive = el.querySelector(".ava-tabs__tab--active") as HTMLElement;

    // Find previous active tab from internal state or class
    const prevActive =
      tabs.find(t => t.dataset["wasActive"] === "true") ||
      tabs.find(t => t.classList.contains("ava-tabs__tab--active") && t !== newActive) ||
      null;

    if (!prevActive && newActive) {
      newActive.dataset["wasActive"] = "true";

      // Create static highlight for initial state
      let hl = newActive.querySelector(".ava-tab-highlight") as HTMLElement;
      if (!hl) {
        hl = document.createElement("div");
        hl.className = "ava-tab-highlight";
        Object.assign(hl.style, {
          position: "absolute",
          height: "100%",
          width: "100%", // Full width immediately
          top: "0",
          left: "0",
          pointerEvents: "none",
          zIndex: "-1",
          background: "var(--tabs-button-active-bg, rgba(0,122,255,0.15))",
          borderRadius: "var(--global-radius-sm)", // Rounded at rest
          opacity: "1"
        });
        newActive.style.position = "relative";
        newActive.appendChild(hl);
      }
      return;
    }

    if (!newActive || prevActive === newActive) return;

    // Update state
    tabs.forEach(t => (t.dataset["wasActive"] = "false"));
    newActive.dataset["wasActive"] = "true";

    // 2. Determine Direction
    let direction: "ltr" | "rtl" = "ltr";
    if (prevActive) {
      const prevIndex = tabs.indexOf(prevActive);
      const newIndex = tabs.indexOf(newActive);
      direction = newIndex > prevIndex ? "ltr" : "rtl";
    }

    const dur = (duration || MotionTokens.DURATION_GLASS_LIFT) * 1000;

    // Cleanup any sliders from previous implementation
    const list = el.querySelector('.ava-tabs__list') as HTMLElement;
    if (list) {
      list.querySelectorAll('.ava-tab-slider').forEach(e => e.remove());
    }

    // 3. Exit Animation (Old Tab)
    if (prevActive) {
      const full = prevActive.offsetWidth;
      let oldHL = prevActive.querySelector(".ava-tab-highlight") as HTMLElement;

      // Create if missing
      if (!oldHL) {
        oldHL = document.createElement("div");
        oldHL.className = "ava-tab-highlight";
        prevActive.appendChild(oldHL);
      }

      // Style / Anchor for Exit
      oldHL.removeAttribute('style');
      Object.assign(oldHL.style, {
        position: "absolute",
        height: "100%",
        width: full + "px",
        top: "0",
        pointerEvents: "none",
        zIndex: "-1",
        background: "var(--tabs-button-active-bg, rgba(0,122,255,0.15))",
        borderRadius: "0px", // Square during motion
        // anchor: LTR -> Anchor Right (auto left). RTL -> Anchor Left (0)
        left: direction === "ltr" ? "auto" : "0",
        right: direction === "ltr" ? "0" : "auto"
      });
      prevActive.style.position = "relative";

      // Animation: Slow Exit (ease-in)
      oldHL.animate([
        { width: `${full}px` },
        { width: '0px' }
      ], {
        duration: dur,
        easing: 'ease-in',
        fill: 'forwards'
      }).onfinish = () => {
        oldHL.remove();
      };
    }

    // 4. Enter Animation (New Tab)
    const newWidth = newActive.offsetWidth;
    let newHL = newActive.querySelector(".ava-tab-highlight") as HTMLElement;
    if (newHL) newHL.remove();

    newHL = document.createElement("div");
    newHL.className = "ava-tab-highlight";

    Object.assign(newHL.style, {
      position: "absolute",
      height: "100%",
      width: "0px",
      top: "0",
      pointerEvents: "none",
      zIndex: "-1",
      background: "var(--tabs-button-active-bg, rgba(0,122,255,0.15))",
      borderRadius: "0px", // Square during motion
      opacity: "1",
      // anchor: LTR -> Expand from Left (0). RTL -> Expand from Right (0)
      left: direction === "ltr" ? "0" : "auto",
      right: direction === "ltr" ? "auto" : "0"
    });

    newActive.style.position = "relative";
    newActive.appendChild(newHL);

    // Animation: Fast Enter (ease-out)
    const animation = newHL.animate([
      { width: '0px' },
      { width: `${newWidth}px` }
    ], {
      duration: dur,
      easing: 'ease-out',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      // Restore rounded corners and ensure full width
      Object.assign(newHL.style, {
        width: '100%',
        borderRadius: 'var(--global-radius-sm)'
      });
    };
  }
};