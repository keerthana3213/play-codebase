export const MotionTokens = {
    // Durations (in seconds for WAAPI)
    DURATION_FAST: 0.12,
    DURATION_MEDIUM: 0.24,
    DURATION_SLOW: 0.36,
    DURATION_ENTRY: 0.38,
    DURATION_EXIT: 0.26,

    // Specific Animation Durations matching Motion-1
    DURATION_LIQUID_FADE: 0.24,
    DURATION_FLOW_SLIDE: 0.22,
    DURATION_GLASS_LIFT: 0.28,
    DURATION_GLASS_GLOW: 0.18,
    DURATION_STICKY_ELEVATE: 0.16,

    // Easings
    EASE_LIQUID: 'cubic-bezier(0.25, 1, 0.5, 1)',
    EASE_GLASS: 'ease-in-out',
    EASE_LIGHT: 'ease-out',
    EASE_SPRING: 'spring(80, 20)', // Note: standard CSS doesn't support spring(), WAAPI might if supported by browser or polyfill. For now keeping as string.

    // Layers / Distances
    DISTANCE_LIQUID: '16px',
    DISTANCE_GLASS_BLUR: '8px',

    // Interaction Durations
    DURATION_RIPPLE_SPREAD: 0.15,
    DURATION_SOFT_BOUNCE: 0.18,
    DURATION_LIGHT_PULSE: 0.12,
    DURATION_FLIP: 0.36,

    // Interaction Easings
    EASE_BOUNCE_APPROX: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Approximation of spring(80, 20)
};
