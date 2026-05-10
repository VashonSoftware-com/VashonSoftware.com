# CodePen Components - Source Documentation

This directory contains reusable Svelte components based on creative CodePen animations.

## Components Reference

### 1. **LineFlower.svelte**
- **Source**: https://codepen.io/DonKarlssonSan/pen/PoeyBog
- **Author**: Johan Karlsson (@DonKarlssonSan)
- **License**: MIT
- **Description**: Canvas-based animated line drawing that creates a flower-like pattern. Multiple "walkers" move around the center, drawing lines as they walk with constrained random motion.
- **Features**:
  - Responsive canvas that fills the viewport
  - Smooth animation with requestAnimationFrame
  - Multiple independent walkers creating organic patterns
  - Auto-resizes on window resize

### 2. **WebGLFlowers.svelte**
- **Source**: https://codepen.io/ksenia-k/pen/RwqrxBG
- **Description**: WebGL/Three.js-based interactive flower generation. Click anywhere to add animated particle flowers.
- **Features**:
  - Three.js 3D graphics
  - Shader-based animation with GLSL
  - Click-to-add particle effects
  - Dynamic lighting and camera projection
  - Responsive canvas

### 3. **CloudGenerator.svelte**
- **Source**: https://codepen.io/BalintFerenczy/pen/qENdpoL
- **Author**: Bálint Ferenczy (@BalintFerenczy)
- **Description**: Draggable SVG clouds with procedural noise filters. Creates a beautiful sky scene with interactive cloud manipulation.
- **Features**:
  - SVG-based with fractal noise filters
  - Drag-to-move interaction
  - Gradient sky background
  - Smooth shadow effects
  - No external library dependencies

### 4. **ElasticPebbles.svelte**
- **Source**: https://codepen.io/Dillo/pen/KKrjKpa
- **Author**: Dillon (@Dillo)
- **Description**: Canvas-based animation of elastic, bouncing polygons with random colors. Click the canvas to regenerate with new colors.
- **Features**:
  - Dynamic polygon generation using Bridson distance
  - Physics-based bouncing with gravity simulation
  - Click-to-randomize color scheme
  - Multiple configurable parameters (speed, size range)
  - Responsive canvas with resize handling

### 5. **AnimatedLoader.svelte**
- **Source**: https://codepen.io/chrisgannon/pen/bGKeovd
- **Author**: Chris Gannon (@chrisgannon)
- **License**: Professional/PRO content
- **Description**: SVG-based animated loader with rotating colored segments. Perfect for loading states, spinners, or hover effects.
- **Features**:
  - 12 rotating colored bars/segments
  - Configurable spin duration
  - Staggered animation delays
  - Smooth opacity and scale transitions
  - Lightweight SVG implementation

### 6. **ParticleAnimation.svelte**
- **Source**: https://codepen.io/chrisgannon/pen/KKGYxxR
- **Author**: Chris Gannon (@chrisgannon)
- **License**: Professional/PRO content
- **Title**: "Your Other Me"
- **Description**: GSAP-powered particle system that creates an animated effect with complex motion paths. Click anywhere to generate particle bursts.
- **Features**:
  - GSAP animation engine
  - Motion path plugin for complex trajectories
  - Multiple color palette support
  - Particle gravity simulation
  - Canvas-based rendering for performance
  - Click-interactive particle generation

### 7. **TextStrokeAnimation.svelte**
- **Source**: https://codepen.io/Taluska/pen/yLRZRoY
- **Author**: Taluska (@Taluska)
- **Description**: SVG text with animated stroke effects. Text displays with smooth color transitions and stroke animations.
- **Features**:
  - SVG-based text rendering
  - Configurable stroke colors and animation timing
  - Toggle animation on/off
  - CSS-based keyframe animations
  - Smooth color transitions

## Installation

All components are ready to use in your Svelte projects. Dependencies:

```bash
# Core dependencies (already installed)
pnpm add three gsap

# Optional: for advanced animation effects
pnpm add gsap
```

## Usage Examples

### Basic Component Import
```svelte
<script>
  import LineFlower from '@/components/ui/LineFlower.svelte';
  import CloudGenerator from '@/components/ui/CloudGenerator.svelte';
</script>

<LineFlower />
<CloudGenerator />
```

### Using in Astro
```astro
---
import LineFlower from '@/components/ui/LineFlower.svelte';
---

<LineFlower client:load />
```

## Component Properties

Most components are self-contained and don't require props, but can be extended with:

- `width`: Canvas/container width
- `height`: Canvas/container height
- `animationSpeed`: Control animation timing
- `colors`: Custom color arrays
- `particleCount`: Number of particles/objects
- `interactive`: Enable/disable interaction

## Performance Notes

- **Canvas components** (LineFlower, ElasticPebbles, ParticleAnimation): Use requestAnimationFrame for smooth 60fps
- **WebGL components** (WebGLFlowers): Use Three.js with shader optimization
- **SVG components** (CloudGenerator, AnimatedLoader, TextStrokeAnimation): Lightweight, GPU-accelerated transforms

## Attribution & Credits

These components are faithful Svelte adaptations of the original CodePen creations. Please credit the original authors in your projects:

- Johan Karlsson - Line Flower concept
- Ksenia K - WebGL Flowers
- Bálint Ferenczy - Cloud Generator
- Dillon - Elastic Pebbles
- Chris Gannon - Loaders and Particle Animations
- Taluska - Text Stroke Animation

## Licensing

Most original CodePen pens are available under Creative Commons licenses or professional licenses. Always verify the license terms for commercial use.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (WebGL may require specific flags on older versions)
- Mobile: Responsive design with touch support where applicable

## Customization Guide

### LineFlower
```svelte
<script>
  const numWalkers = 30; // Increase for more complexity
  const maxStep = 7; // Increase for longer strokes
</script>
```

### ElasticPebbles
```svelte
<script>
  const colors = ['#YOUR', '#CUSTOM', '#COLORS'];
  const SPEED = 0.8; // Increase for faster movement
</script>
```

### AnimatedLoader
```svelte
<script>
  let spinDuration = 3; // Faster rotation
  const colors = [...]; // Customize segment colors
</script>
```

## Future Enhancements

- [ ] Component props for customization
- [ ] Dark mode variants
- [ ] TypeScript strict mode compatibility
- [ ] Accessibility improvements (ARIA labels, keyboard controls)
- [ ] React versions
- [ ] Vue versions
- [ ] Performance profiling and optimization reports
