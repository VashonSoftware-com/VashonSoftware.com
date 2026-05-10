<script lang="ts">
  import { onMount } from 'svelte';

  let cloudEl: SVGGElement;
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let currentX = 0;
  let currentY = 0;

  function handleMouseDown(e: MouseEvent) {
    isDragging = true;
    const rect = cloudEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    const svgRect = (cloudEl.closest('svg') as SVGElement).getBoundingClientRect();
    const svg = cloudEl.closest('svg') as any;
    
    const pt = svg.createSVGPoint();
    pt.x = e.clientX - svgRect.left - offsetX;
    pt.y = e.clientY - svgRect.top - offsetY;
    
    currentX = pt.x;
    currentY = pt.y;
    
    cloudEl.setAttribute('transform', `translate(${currentX}, ${currentY})`);
  }

  function handleMouseUp() {
    isDragging = false;
  }

  onMount(() => {
    const svg = cloudEl.closest('svg') as SVGElement;
    svg.addEventListener('mousemove', handleMouseMove);
    svg.addEventListener('mouseup', handleMouseUp);
    svg.addEventListener('mouseleave', handleMouseUp);

    return () => {
      svg.removeEventListener('mousemove', handleMouseMove);
      svg.removeEventListener('mouseup', handleMouseUp);
      svg.removeEventListener('mouseleave', handleMouseUp);
    };
  });
</script>

<div class="cloud-generator-container">
  <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="cloudFilter" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="5" result="noise1" />
        <feTurbulence type="fractalNoise" seed="462" baseFrequency="0.011" numOctaves="2" result="noise2" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>
    </defs>

    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
      </linearGradient>
    </defs>

    <rect width="1200" height="600" fill="url(#skyGradient)" />

    <g bind:this={cloudEl} on:mousedown={handleMouseDown} style="cursor: grab; user-select: none;">
      <!-- Cloud shapes -->
      <ellipse cx="200" cy="150" rx="80" ry="50" fill="white" opacity="0.9" filter="url(#cloudFilter)" />
      <ellipse cx="280" cy="140" rx="100" ry="60" fill="white" opacity="0.85" filter="url(#cloudFilter)" />
      <ellipse cx="120" cy="160" rx="70" ry="45" fill="white" opacity="0.8" filter="url(#cloudFilter)" />
    </g>
  </svg>

  <p class="hint">Drag the cloud around</p>
</div>

<style>
  .cloud-generator-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    overflow: hidden;
  }

  svg {
    width: 100%;
    max-width: 900px;
    height: auto;
    aspect-ratio: 2 / 1;
    filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.2));
  }

  .hint {
    margin-top: 20px;
    color: white;
    font-size: 16px;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
</style>
