<script lang="ts">
  import { onMount } from 'svelte';

  interface Rect {
    width: number;
    height: number;
    left: number;
    top: number;
  }

  const colors = ['#ff595e', '#ffb501', '#08a652', '#0099ff', '#6f00ff', '#cb2cd9', '#c7b5ff', '#ffc3d9'];

  let svg: SVGSVGElement;
  let rects: Rect[] = [];
  let spinDuration = 5;

  function updateRects() {
    if (!svg) return;
    const allRects = svg.querySelectorAll('rect');
    rects = Array.from(allRects).map(rect => ({
      width: rect.getAttribute('width') ? parseFloat(rect.getAttribute('width')!) : 10,
      height: rect.getAttribute('height') ? parseFloat(rect.getAttribute('height')!) : 26,
      left: rect.getAttribute('x') ? parseFloat(rect.getAttribute('x')!) : 0,
      top: rect.getAttribute('y') ? parseFloat(rect.getAttribute('y')!) : 0
    }));
  }

  onMount(() => {
    updateRects();
  });
</script>

<div class="loader-container">
  <svg bind:this={svg} id="mainSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <g id="container" fill="#888">
      {#each Array(12) as _, i}
        <rect
          x={395 - 5}
          y={250 - (i * 26 + 15)}
          width="10"
          height="26"
          rx="5"
          fill={colors[i % colors.length]}
          style="animation: spin {spinDuration}s linear infinite; animation-delay: {-i * (spinDuration / 12)}s;"
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .loader-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  @keyframes spin {
    0% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
  }
</style>
