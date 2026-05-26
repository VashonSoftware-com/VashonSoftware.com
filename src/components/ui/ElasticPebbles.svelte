<script lang="ts">
  import { onMount } from 'svelte';

  export let preview = false;

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let width: number;
  let height: number;
  let animationId: number;
  let resizeObserver: ResizeObserver | undefined;

  const DIST_BRIDSON_MIN = 0.1;
  const DIST_BRIDSON_MAX = 0.2;
  const SPEED = 0.6;

  interface Polygon {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    angle?: number;
    angularVelocity?: number;
  }

  let polygons: Polygon[] = [];
  const colors = ['#FF1493', '#00FF00', '#87CEEB', '#FFD700', '#FF8C00', '#DDA0DD', '#20B2AA', '#FF69B4'];

  function generatePolygons() {
    polygons = [];
    const numPolygons = Math.floor((width * height) / 50000);

    for (let i = 0; i < numPolygons; i++) {
      const size = Math.random() * (width * 0.05) + width * 0.02;
      polygons.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function drawPolygon(polygon: Polygon) {
    ctx.save();
    ctx.translate(polygon.x, polygon.y);
    ctx.rotate(polygon.angle || 0);

    ctx.fillStyle = polygon.color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;

    ctx.beginPath();
    const sides = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const x = Math.cos(angle) * polygon.radius;
      const y = Math.sin(angle) * polygon.radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function updateAndDraw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    for (const polygon of polygons) {
      polygon.x += polygon.vx * SPEED;
      polygon.y += polygon.vy * SPEED;
      if (polygon.angle !== undefined && polygon.angularVelocity !== undefined) {
        polygon.angle += polygon.angularVelocity;
      }

      // Bounce off walls
      if (polygon.x - polygon.radius < 0 || polygon.x + polygon.radius > width) {
        polygon.vx *= -1;
      }
      if (polygon.y - polygon.radius < 0 || polygon.y + polygon.radius > height) {
        polygon.vy *= -1;
      }

      drawPolygon(polygon);
    }
  }

  function animate() {
    updateAndDraw();
    animationId = requestAnimationFrame(animate);
  }

  function handleCanvasClick() {
    polygons = [];
    generatePolygons();
  }

  function resizeCanvas() {
    const rect = preview && container
      ? container.getBoundingClientRect()
      : { width: window.innerWidth, height: window.innerHeight };

    width = canvas.width = Math.max(1, Math.round(rect.width));
    height = canvas.height = Math.max(1, Math.round(rect.height));
    generatePolygons();
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    resizeCanvas();
    animate();

    if (preview) {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', resizeCanvas);
    }
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  });
</script>

<div class:preview class="elastic-pebbles-container" bind:this={container}>
  <canvas bind:this={canvas}></canvas>
  <div class="hint">Click to change colors</div>
</div>

<style>
  .elastic-pebbles-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #000;
  }

  .elastic-pebbles-container.preview {
    height: 100%;
    min-height: 100%;
  }

  canvas {
    display: block;
    cursor: pointer;
    background: #000;
    width: 100%;
    height: 100%;
  }

  .hint {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    color: #888;
    font-family: Arial, sans-serif;
    font-size: 14px;
    pointer-events: none;
  }
</style>
