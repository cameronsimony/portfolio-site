# Design Diary

## Interactive Popover Links - December 1, 2025

### Overview
Implemented interactive link components that replace company names with logos, featuring dotted underlines and hover popovers with blur reveal animations.

### What We Built
- **PopoverLink Component**: A reusable component that displays company logos inline with text
- **Features**:
  - Inline logo display with dotted underline
  - Hover popover card with image/video
  - Blur reveal animation (16px blur → 0px on hover)
  - Customizable colors, spacing, and alignment per instance
  - Perfect circular dots using SVG (not CSS gradients)
  - Box-shadow borders instead of traditional borders

### Key Learnings

#### 1. Baseline Alignment with Inline SVGs
**Challenge**: Getting logos to align perfectly with text baseline while maintaining proper underline spacing.

**Solution**: 
- Used `verticalAlign` CSS property with negative values to optically align logos
- Positioned underline absolutely with `top: 100%` and `marginTop` to keep it outside the element's box model
- This prevents the underline from affecting baseline alignment (similar to Framer's approach of using separate layers)

**Takeaway**: Treating the underline as a separate element that extends beyond the bounding box is cleaner than trying to fit it inside with padding.

#### 2. Perfect Circular Dots
**Challenge**: CSS `radial-gradient` and `linear-gradient` don't create perfect circles - they appear squarish or elliptical.

**Solution**: 
- Used inline SVG data URIs with actual `<circle>` elements
- Each dot is a mathematically perfect circle: `viewBox='0 0 4 2'` with `circle cx='1' cy='1' r='1'`
- Pattern repeats every 4px (2px circle + 2px gap)

**Takeaway**: SVG is the only reliable way to get perfect circles in repeating patterns. CSS gradients will always have rendering artifacts.

#### 3. OKLCH Color Support in SVG
**Challenge**: SVG `fill` attributes don't support OKLCH color format.

**Initial Approach**: Created a complex OKLCH-to-hex conversion function.

**Simpler Solution**: Just use hex codes directly. OKLCH is great for CSS but SVG needs hex/RGB.

**Takeaway**: Sometimes the simpler solution is better - don't over-engineer when the user can provide hex codes.

#### 4. Box-Shadow Borders
**Reference**: [Using Shadows Instead of Borders](https://jakub.kr/work/shadows)

**Implementation**:
- Replaced `ring-1 ring-white/10` with layered box-shadows
- Creates more depth and adapts better to different backgrounds
- Uses multiple shadow layers for subtle border effect

**Takeaway**: Shadows provide more visual depth than borders and work better with images/gradients.

#### 5. Blur Reveal Animation
**Challenge**: Replicating Framer Motion's blur reveal effect with pure CSS.

**Solution**:
- Combined `opacity`, `transform`, and `filter` transitions
- Starts at `blur(16px)` and `opacity: 0`
- Animates to `blur(0px)` and `opacity: 1`
- 150ms duration with `ease-out` timing

**Takeaway**: CSS transitions can achieve sophisticated effects without animation libraries when you combine multiple properties.

#### 6. Component Customization
**Challenge**: Different logos need different spacing, alignment, and colors.

**Solution**: 
- Made component highly configurable with optional props:
  - `underlineSpacing`: Control gap between logo and underline
  - `verticalAlign`: Fine-tune baseline alignment per logo
  - `underlineWidth`: Control underline length (to remove last dot if needed)
  - `highlightColor`: Custom hover color per brand

**Takeaway**: Build components with flexibility in mind - what seems like a one-off often becomes a pattern.

### Technical Details

**Component Structure**:
```
PopoverLink
├── Popover (absolute, above logo)
│   └── Card with image
└── Link (inline)
    ├── Logo Image
    ├── Default Underline (dotted, gray)
    └── Hover Underline (dotted, colored)
```

**Key CSS Techniques**:
- `verticalAlign: "-2px"` for baseline alignment
- `top: 100%` + `marginTop` for underline positioning
- `transition-all duration-[150ms]` for smooth animations
- `filter: blur()` for reveal effect
- SVG data URIs for perfect circular dots

### Files Created/Modified
- `components/PopoverLink.tsx` - New reusable component
- `app/page.tsx` - Added PopoverLink instances for Kajabi and Iverson
- `public/kajabi-logo.svg` - Kajabi logo
- `public/iverson-logo.svg` - Iverson logo  
- `public/kajabi-hover-image.png` - Kajabi popover image

### Future Considerations
- Could add support for video in popovers
- Consider adding stagger delays for multiple links
- Might want to add keyboard navigation improvements
- Could extract dot pattern into a reusable utility
