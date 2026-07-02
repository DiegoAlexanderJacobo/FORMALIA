---
name: Formalia Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fa'
  surface-container: '#eeedf4'
  surface-container-high: '#e9e7ef'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#444651'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e3e1e9'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is engineered for the formalization of small businesses, balancing institutional trust with the momentum of growth. The personality is **Professional yet Hopeful**, designed to demystify complex bookkeeping into an empowering daily habit.

The visual style follows a **Modern Corporate** direction with **Tactile Minimalist** influences. It prioritizes clarity and high-contrast accessibility to ensure usability in varied lighting conditions (e.g., outdoor markets or bright storefronts). The interface uses purposeful whitespace and a clear hierarchical structure to reduce cognitive load for users transitioning into formal tax regimes.

**Key Principles:**
- **Reliability:** Solid containers and precise alignment to evoke government-grade security.
- **Momentum:** Use of the primary gradient to signify the transition from "informal" to "established."
- **Optimized Utility:** Mobile-first architecture focused on high-frequency, one-handed interactions.

## Colors

This design system utilizes a strategic color palette that maps directly to business health.

- **The Growth Gradient:** The primary brand mark and high-priority actions use a linear gradient from **Corporate Blue (#1E3A8A)** to **Sea Green (#10B981)**, symbolizing the journey from formal structure to financial prosperity.
- **Semantic Mapping:** 
    - **Emerald (#10B981):** Represents compliance, successful entries, and healthy limits.
    - **Amber (#F59E0B):** Signals nearing thresholds or pending actions.
    - **Crimson (#EF4444):** Reserved for over-limit alerts and critical errors.
- **Neutral Foundation:** The background uses **#F9FAFB** to provide a soft contrast against pure white cards, reducing eye strain during long periods of data entry.

## Typography

The design system employs **Inter** for its exceptional legibility on mobile screens and neutral, systematic tone. 

- **Scale:** Typography is intentionally oversized. The base body size starts at 16px to ensure readability for users of all ages and vision levels.
- **Weight:** Headlines use Bold (700) or SemiBold (600) to create a clear visual anchor, while labels use Medium (500) for distinct functional identification.
- **Content Style:** Copy must be jargon-free. Use "Sales" instead of "Revenue Streams" and "Daily Limit" instead of "Aggregated Threshold."

## Layout & Spacing

The layout is **Mobile-First** and adheres to a flexible grid system optimized for one-handed operation.

- **Grid:** A 4-column grid for mobile with 20px outer margins. Desktop views expand to a 12-column centered layout (max-width 1280px).
- **Safe Zones:** High-frequency interactive elements (like "Add Entry") are placed within the thumb's natural reach in the lower two-thirds of the screen.
- **Spacing Rhythm:** An 8pt scale is used for structural spacing, while 4pt increments are used for fine-tuning internal component padding.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layering** to define hierarchy without visual clutter.

- **Levels:**
    - **Level 0 (Background):** #F9FAFB. The canvas.
    - **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a soft, diffused shadow (Y: 4px, Blur: 12px, Opacity: 5% Black).
    - **Level 2 (Active States/Modals):** Pure White with a more pronounced shadow (Y: 8px, Blur: 24px, Opacity: 10% Black) to indicate temporary overlay.
- **Interaction:** Cards do not use heavy borders; depth is exclusively created by the contrast between the surface color and the subtle background tint.

## Shapes

The shape language is approachable and modern, utilizing significant corner radii to soften the "formal" nature of bookkeeping.

- **Base Radius:** 8px (0.5rem) for inputs and small components.
- **Large Radius (2xl):** 24px (1.5rem) for main content cards and containers.
- **Pill Shape:** Used for status chips and high-priority action buttons to distinguish them from data containers.

## Components

### Buttons
- **Primary:** Gradient background (Corporate Blue to Sea Green) with white text. High-priority CTAs (e.g., "Submit Tax") feature a subtle pulse animation on the outer shadow.
- **Secondary:** White background with a 1px border (#E5E7EB) and Primary Blue text.

### Navigation
- **Top Navigation:** Minimalist bar with text links or icon-only triggers for Profile and Notifications. Avoid sidebars on mobile; use a "Home" dashboard as the central hub.

### Cards
- **Stat Cards:** Large 24px rounded corners. Include a semantic colored indicator (left-border or icon color) to show category health at a glance.

### Progress Bars
- **Dynamic Track:** The fill color of progress bars must transition dynamically: 
    - 0-70%: Emerald Green.
    - 71-90%: Amber.
    - 91-100%: Crimson.
- **Track Style:** Thick (12px) with rounded ends and a light-gray (#F3F4F6) background.

### Input Fields
- **Design:** Large hit targets (min 48px height). Use "Floating Labels" to maintain context even when the field is filled. 
- **Validation:** Clear semantic icons (Checkmark/Warning) placed on the right side of the input.

### Icons
- **Style:** 24px line-based icons (2px stroke width). Avoid filled icons unless used as a "selected" state in a navigation menu.