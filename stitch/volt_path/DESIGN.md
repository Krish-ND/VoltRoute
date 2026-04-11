# Design System Document: EV Smart Trip Planner

## 1. Overview & Creative North Star: "The Kinetic Horizon"
This design system is built upon the North Star of **"The Kinetic Horizon."** In the world of Electric Vehicles, the experience should feel frictionless, forward-moving, and hyper-intelligent. We are moving away from the "clunky dashboard" aesthetic toward a high-end editorial experience that mirrors the silent, powerful glide of an EV.

To achieve this, the system breaks from the rigid, boxed-in layouts of traditional SaaS. We utilize **intentional asymmetry**, **glassmorphism**, and **tonal depth** to create a UI that feels like a premium heads-up display. Elements should never feel "pasted" on; they should feel like they are floating in a cohesive, atmospheric space.

---

## 2. Colors & Surface Philosophy

### The Palettes
The palette is rooted in high-energy "Electric Blue" and "Sustainable Green," balanced by a sophisticated range of cool-toned neutrals.

*   **Primary (Electric Blue):** `#004ac6` (Primary) / `#2563eb` (Container). Use for high-intent actions and navigation paths.
*   **Secondary (Green):** `#006c49` (Secondary) / `#6cf8bb` (Container). Use exclusively for "Energy" states—battery levels, charging stations, and eco-friendly routing.
*   **Tertiary (Slate):** `#4d556b`. Used for metadata and secondary technical info to avoid visual clutter.

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To define boundaries, use color shifts or elevation.
*   **Do:** Place a `surface-container-low` card on a `surface` background.
*   **Don't:** Use a 1px `#cccccc` border to separate content.

### The "Glass & Gradient" Rule
To capture the "Tesla-like" aesthetic, main CTAs and floating map controls must use a **Linear Gradient** (Primary to Primary-Container) at a 135-degree angle. This adds "soul" and dimension. For overlays, use **Glassmorphism**: `surface` color at 70% opacity with a 20px backdrop-blur.

---

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headlines) with **Inter** (Body/Labels) to balance technological precision with human readability.

*   **Display & Headline (Manrope):** These are your "Hero" moments. Use `display-lg` (3.5rem) for trip durations and `headline-md` (1.75rem) for location names. The tighter tracking of Manrope conveys a custom, engineered feel.
*   **Body & Labels (Inter):** Inter is our workhorse. Use `body-lg` (1rem) for all user-generated content. `label-md` (0.75rem) should be used for technical data (kW, distance, voltage) often in all-caps with +5% letter spacing for a "technical readout" vibe.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "heavy" for a modern EV interface. We use **Tonal Layering**.

*   **The Layering Principle:** 
    *   **Base:** `surface` (#faf8ff)
    *   **Sections:** `surface-container-low` (#f3f3fe)
    *   **Interactive Cards:** `surface-container-lowest` (#ffffff)
*   **Ambient Shadows:** For floating map controls or the Voice Assistant button, use an ultra-diffused shadow: `offset-y: 12px, blur: 24px, color: rgba(25, 27, 35, 0.06)`. This creates a soft "lift" rather than a harsh edge.
*   **The Ghost Border:** If high-contrast accessibility is required, use `outline-variant` at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Cards & Data Visualization
*   **Rule:** Forbid divider lines. Use `surface-container-high` as a subtle background for headers within a card to separate them from the body.
*   **Visuals:** Use high-contrast "Sparklines" for energy consumption trends, utilizing the `secondary` green with a soft glow effect (`drop-shadow`).

### Input Fields & Autocomplete
*   **Style:** Minimalist. No bottom border or full box. Use `surface-container-low` as a full-bleed background with `xl` (1.5rem) rounded corners. 
*   **Autocomplete:** Results should appear on a glassmorphic panel that "grows" from the input field, using `backdrop-blur`.

### Floating Voice Assistant (The "Orb")
*   **Style:** A circular `full` radius button.
*   **Background:** A moving mesh gradient of `primary` and `secondary`.
*   **Interaction:** On tap, the orb expands into a wide `surface-container-highest` bar with a pulsing "on-secondary" glow.

### Buttons
*   **Primary:** Gradient fill, `xl` corner radius, white text.
*   **Secondary (Google Sign-In):** `surface-container-lowest` background with a `ghost-border`. No heavy shadows.
*   **Map Controls:** Small, 40x40px glassmorphic squares with `md` (0.75rem) rounding.

---

## 6. Do's and Don'ts

### Do
*   **Do** use extreme whitespace. If a card feels cramped, double the padding.
*   **Do** use "Secondary Fixed" green for battery status to ensure it’s the most legible element on the screen.
*   **Do** animate transitions between "Planning" and "Navigation" modes with a soft 300ms ease-in-out.

### Don't
*   **Don't** use pure black (#000000). Even in Dark Mode, use `inverse-surface` to maintain the "premium slate" look.
*   **Don't** use standard Material icons. Use thin-stroke (1.5pt) custom iconography to match the "Inter" font weight.
*   **Don't** use sharp corners. Everything—from the map zoom buttons to the input fields—must use the `md` to `xl` roundedness scale.

---

## 7. Responsive Adaptability
On mobile, the card-based components should stack vertically, but the **"Floating Voice Assistant"** remains pinned to the bottom right, slightly overlapping the primary navigation bar to maintain the "layered" editorial feel. On Desktop/Dashboard view, the map is the `surface`, and all UI elements exist as glassmorphic panels "docked" to the left and right edges.