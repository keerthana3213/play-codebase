# AAVA Play+ Motion System 

---

## 1 · Introduction

Motion in **AAVA Play+** transforms static interfaces into responsive systems. It conveys clarity, rhythm, and intelligence — every transition signals purpose. The design language rests on three pillars:

* **Glass**: surfaces that reveal hierarchy and focus.
* **Liquid**: transitions that express continuity and momentum.
* **Light**: feedback that reflects action, energy, and intelligence.

> Motion is not effect — it’s experience.

---

## 2 · Motion Stack

Motion is the overall system that defines how everything in Play+ moves — from buttons to full screens. **Micro-interactions** are just one part of it, focusing on small, single-element feedback. 

The Motion Stack makes all of this work together in layers (Atomic → Molecular → Organism → Ecosystem) so the whole product feels fluid and connected, not just animated


| Stack Level        | Purpose                             | Example                                          |
| ------------------ | ----------------------------------- | ------------------------------------------------ |
| **Atomic (Micro)** | Feedback inside components.         | Button ripple, toggle glide.                     |
| **Molecular**      | Interaction among related elements. | Card hover, tab change.                          |
| **Organism**       | Layout or section transitions.      | Modal reveal, drawer expand.                     |
| **Ecosystem**      | Application-wide harmony.           | Page transition, dashboard cascade, AI activity. |

---

## 3 · Motion Catalog

### Glass — Surface Layer

| Animation          | Description                                    | Duration | Easing      |
| ------------------ | ---------------------------------------------- | -------- | ----------- |
| **Glass Lift**     | Elevation and blur reveal for focus and depth. | 280ms    | ease-in-out |
| **Blur Morph**     | Background blur transition for overlays.       | 320ms    | ease-in-out |
| **Glass Glow**     | Halo glow indicating focus or readiness.       | 180ms    | ease-out    |
| **Sticky Elevate** | Subtle shadow when elements attach on scroll.  | 160ms    | ease-out    |

### Liquid — Motion Layer

| Animation          | Description                                    | Duration  | Easing                     |
| ------------------ | ---------------------------------------------- | --------- | -------------------------- |
| **Flow Slide**     | Directional translation (8–16px).              | 220ms     | cubic-bezier(0.25,1,0.5,1) |
| **Liquid Fade**    | Smooth opacity transition with viscous easing. | 240ms     | cubic-bezier(0.25,1,0.5,1) |
| **Soft Bounce**    | Elastic rebound for toggles or switches.       | 180ms     | spring(80,20)              |
| **Viscous Settle** | Deceleration with micro overshoot.             | 300ms     | ease-in-out                |
| **Cascade Reveal** | Staggered entrance for list or grid items.     | 240ms     | ease-in                    |
| **Inertial Drag**  | Velocity-based drag and settle.                | 220–320ms | spring(90,20)+ease-out     |

### Light — Feedback Layer

| Animation              | Description                                                                        | Duration          | Easing                     |
| ---------------------- | ---------------------------------------------------------------------------------- | ----------------- | -------------------------- |
| **Light Pulse**        | Quick glow feedback.                                                               | 120ms             | ease-out                   |
| **Ripple Spread**      | Expanding radial confirmation wave.                                                | 150ms             | ease-out                   |
| **Highlight Wave**     | Shimmer indicating background activity.                                            | 500ms             | ease-in-out                |
| **Specular Sweep**     | Luminous highlight indicating success.                                             | 400ms             | ease-in-out                |
| **Light Dissolve**     | Fade-out with brightness taper.                                                    | 200ms             | ease-in                    |
| **AI Gradient Flow**   | Animated gradient shimmer indicating AI thinking or generation.                    | 600–900ms (loop)  | cubic-bezier(0.4,0,0.2,1)  |
| **AI Gradient Border** | Gradient border traveling along component perimeter to indicate active AI process. | 800–1200ms (loop) | cubic-bezier(0.45,0,0.2,1) |



---

## 4 · Scenario Matrix (Comprehensive)

### 4.1 Navigation & Layout

| Scenario                                      | Glass                      | Liquid                      | Light                      |
| --------------------------------------------- | -------------------------- | --------------------------- | -------------------------- |
| **Primary Navigation change (tabs/sections)** | —                          | `Flow Slide`, `Liquid Fade` | —                          |
| **Breadcrumb drill-in / back**                | —                          | `Flow Slide`                | —                          |
| **Side panel open/close**                     | `Blur Morph`, `Glass Lift` | `Viscous Settle`            | —                          |
| **Peek panel (partial reveal)**               | `Glass Lift`               | `Flow Slide`                | —                          |
| **Split-view resize**                         | `Glass Lift`               | `Viscous Settle`            | —                          |
| **Sticky header attach/detach**               | `Sticky Elevate`           | —                           | —                          |
| **Command palette / Quick Search**            | `Blur Morph`, `Glass Lift` | `Liquid Fade`               | `Light Pulse` on selection |
| **Sidebar collapse/expand**                   | `Glass Lift`               | `Flow Slide`                | —                          |
| **Dashboard section switch**                  | `Blur Morph`               | `Flow Slide`                | —                          |

### 4.2 Forms & Inputs

| Scenario                              | Glass        | Liquid           | Light                          |
| ------------------------------------- | ------------ | ---------------- | ------------------------------ |
| **Input focus / blur**                | `Glass Glow` | —                | —                              |
| **Field validation success/error**    | —            | —                | `Light Pulse` (semantic color) |
| **Dropdown open/close**               | `Glass Lift` | `Flow Slide`     | —                              |
| **Stepper / Wizard transition**       | —            | `Flow Slide`     | `Light Pulse`                  |
| **Autosave in background**            | —            | —                | `Highlight Wave`               |
| **Destructive confirmation modal**    | `Glass Lift` | `Viscous Settle` | `Light Pulse` (warn)           |
| **Copy to clipboard / inline action** | —            | —                | `Light Pulse` (success)        |
| **Password reveal / hide**            | —            | `Soft Bounce`    | —                              |
| **Tag or chip addition/removal**      | —            | `Soft Bounce`    | —                              |

### 4.3 Data, Tables & Lists

| Scenario                         | Glass        | Liquid                      | Light            |
| -------------------------------- | ------------ | --------------------------- | ---------------- |
| **Row hover / focus**            | `Glass Lift` | —                           | —                |
| **Sort column / filter**         | —            | `Flow Slide`, `Liquid Fade` | —                |
| **Inline edit enter/exit**       | `Glass Glow` | `Liquid Fade`               | `Light Pulse`    |
| **Pagination / infinite scroll** | —            | `Cascade Reveal`            | —                |
| **Empty state appear**           | —            | `Liquid Fade`               | —                |
| **Bulk select / chips**          | —            | `Soft Bounce`               | `Light Pulse`    |
| **Table refresh / reload**       | —            | `Cascade Reveal`            | `Highlight Wave` |
| **Pinned column highlight**      | `Glass Glow` | —                           | —                |

### 4.4 Content Reveal & Loading

| Scenario                       | Glass                      | Liquid                         | Light            |
| ------------------------------ | -------------------------- | ------------------------------ | ---------------- |
| **Dashboard initial load**     | —                          | `Cascade Reveal`               | —                |
| **Skeleton loading**           | —                          | —                              | `Highlight Wave` |
| **Image / Lightbox open**      | `Blur Morph`, `Glass Lift` | `Viscous Settle`               | —                |
| **Accordion / Section expand** | —                          | `Flow Slide`, `Viscous Settle` | —                |
| **Content lazy-load**          | —                          | `Liquid Fade`                  | —                |
| **Grid item focus / defocus**  | `Glass Lift`               | `Soft Bounce`                  | —                |

### 4.5 Feedback, Status & Notifications

| Scenario                            | Glass        | Liquid           | Light                           |
| ----------------------------------- | ------------ | ---------------- | ------------------------------- |
| **Toast appear/dismiss**            | —            | `Liquid Fade`    | `Light Dissolve`                |
| **Inline banner info/warn**         | —            | `Liquid Fade`    | `Light Pulse` (warn/info)       |
| **Background sync / refresh**       | —            | —                | `Highlight Wave`                |
| **Success / completion**            | —            | —                | `Specular Sweep`, `Light Pulse` |
| **Error alert with recovery**       | `Glass Lift` | `Viscous Settle` | `Light Pulse` (error)           |
| **Progress indicator (non-AI)**     | —            | —                | `Highlight Wave` (loop)         |
| **System alert / critical message** | `Glass Lift` | `Liquid Fade`    | `Light Pulse` (warn)            |

### 4.6 Editing, Manipulation & Interaction

| Scenario                        | Glass        | Liquid           | Light                   |
| ------------------------------- | ------------ | ---------------- | ----------------------- |
| **Drag & drop (reorder/move)**  | —            | `Inertial Drag`  | `Light Pulse`           |
| **Resize panels / handles**     | `Glass Lift` | `Viscous Settle` | —                       |
| **Multi-select marquee**        | —            | `Liquid Fade`    | —                       |
| **Duplicate / clone element**   | —            | `Soft Bounce`    | `Light Pulse` (success) |
| **Pin / unpin element**         | `Glass Glow` | —                | —                       |
| **Hover tooltip / info reveal** | `Glass Lift` | `Liquid Fade`    | —                       |

### 4.7 Search, Filters & Discovery

| Scenario                           | Glass                      | Liquid                      | Light         |
| ---------------------------------- | -------------------------- | --------------------------- | ------------- |
| **Filter apply/clear**             | —                          | `Liquid Fade`, `Flow Slide` | —             |
| **Search results appear**          | —                          | `Cascade Reveal`            | —             |
| **No results / suggestion prompt** | —                          | `Liquid Fade`               | `Light Pulse` |
| **Quick search invoke**            | `Blur Morph`, `Glass Lift` | `Liquid Fade`               | —             |
| **Smart suggestion hover/select**  | `Glass Glow`               | —                           | `Light Pulse` |

### 4.8 Collaboration & Realtime

| Scenario                           | Glass                      | Liquid           | Light            |
| ---------------------------------- | -------------------------- | ---------------- | ---------------- |
| **Comments drawer open/close**     | `Blur Morph`, `Glass Lift` | `Viscous Settle` | —                |
| **Presence indicator join/leave**  | —                          | —                | `Light Pulse`    |
| **Live cursor movement**           | —                          | —                | `Highlight Wave` |
| **Realtime update tick / flash**   | —                          | —                | `Highlight Wave` |
| **Document sync or co-edit state** | `Glass Glow`               | —                | `Highlight Wave` |

### 4.9 AI Activity & Intelligent Response

| Scenario                             | Glass                      | Liquid           | Light                                    |
| ------------------------------------ | -------------------------- | ---------------- | ---------------------------------------- |
| **AI computation / thinking**        | —                          | —                | `AI Gradient Flow`, `AI Gradient Border` |
| **AI suggestion reveal**             | —                          | `Cascade Reveal` | `AI Gradient Flow`                       |
| **AI summary completion**            | —                          | —                | `Specular Sweep`, `AI Gradient Flow`     |
| **AI streaming response**            | `Glass Glow`               | `Liquid Fade`    | `AI Gradient Border`                     |
| **AI card generation / new insight** | `Glass Lift`               | `Cascade Reveal` | `AI Gradient Flow`                       |
| **AI background analysis active**    | —                          | —                | `AI Gradient Flow` (low intensity)       |
| **AI panel open/close**              | `Blur Morph`, `Glass Lift` | `Viscous Settle` | —                                        |

---

## 5 · Accessibility, Tokens & Best Practices

### Accessibility & Performance

* Respect `prefers-reduced-motion`.
* Animate only `transform` and `opacity`.
* Maintain 60fps; limit to three concurrent motions.
* Avoid flicker (>3Hz) and mirror entry/exit timing.

### Tokens

```scss
$motion-fast: 120ms;
$motion-medium: 240ms;
$motion-slow: 360ms;
$motion-entry: 380ms;
$motion-exit: 260ms;
$ease-liquid: cubic-bezier(0.25,1,0.5,1);
$ease-glass: ease-in-out;
$ease-light: ease-out;
$layer-glass-blur: 8–16px;
$layer-light-opacity: 0.1–0.3;
$layer-liquid-distance: 8–16px;

// AI Feedback Tokens
$ai-gradient-colors: var(--ai-color-1), var(--ai-color-2), var(--ai-color-3), var(--ai-color-4);
$ai-border-width: 1px;
$ai-border-speed: 1.2s;
$ai-border-ease: cubic-bezier(0.45,0,0.2,1);
$ai-flow-speed: 700ms;
```

### Best Practices

* Motion clarifies, never decorates.
* Favor *asymmetric timing* (open slower, close faster).
* Foreground leads; background responds.
* Ensure consistent easing and rhythm.
* Verify accessibility and performance profiles.

---

## 6 · Inspiration, Not Imitation

Play+ draws inspiration from Apple’s physics-based motion but reinterprets it for enterprise AI — functional realism and rhythmic intelligence.

| Inspired By              | Reimagined As                                         |
| ------------------------ | ----------------------------------------------------- |
| Emotional realism        | Functional motion for clarity and continuity.         |
| Depth and blur hierarchy | Glass and Light defining operational state.           |
| Cinematic transitions    | Systemic flow across dense, multi-panel UIs.          |
| Tactile delight          | Calm precision in AI-driven environments.             |
| Artistic storytelling    | Purposeful orchestration with **AI gradient motion**. |

> *Inspired by craft, perfected for intelligence — motion that feels real, performs beautifully, and scales intelligently.*

---

## Closing Thought

> **Play+ Motion reveals intelligence through movement.**
> Where **Glass** defines, **Liquid** connects, and **Light** responds —
> even AI feels tangible, fluid, and alive.
