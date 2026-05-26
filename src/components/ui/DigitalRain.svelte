<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    characters?: string;
    backgroundColor?: string;
    glowColor?: string;
    fontSize?: number;
    trailLength?: number;
    fadeOpacity?: number;
    speedMin?: number;
    speedMax?: number;
    density?: number;
  }

  type Stream = {
    x: number;
    y: number;
    speed: number;
    phase: number;
    seed: number;
  };

  let {
    characters = '0123456789',
    backgroundColor = '#030605',
    glowColor = '#9cff2e',
    fontSize = 18,
    trailLength = 12,
    fadeOpacity = 0.08,
    speedMin = 0.1375,
    speedMax = 0.3375,
    density = 1
  }: Props = $props();

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let resizeObserver: ResizeObserver | undefined;
  let animationFrameId = 0;
  let frame = 0;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let streams: Stream[] = [];

  const glyphs = $derived.by(() => {
    const characterPool = Array.from(new Set(characters.split(''))).filter(Boolean);
    return characterPool.length > 0 ? characterPool : ['0', '1'];
  });

  function buildStreams() {
    if (!width || !height) {
      streams = [];
      return;
    }

    const columnWidth = Math.max(12, fontSize * 1.1);
    const totalColumns = Math.max(1, Math.floor((width / columnWidth) * Math.max(density, 0.25)));

    streams = Array.from({ length: totalColumns }, (_, index) => ({
      x: (width / totalColumns) * index + columnWidth * 0.5,
      y: Math.random() * height,
      speed: speedMin + Math.random() * (speedMax - speedMin),
      phase: Math.random() * Math.PI * 2,
      seed: Math.random()
    }));
  }

  function paintBackground() {
    if (!ctx) {
      return;
    }

    const baseGradient = ctx.createLinearGradient(0, 0, 0, height);
    baseGradient.addColorStop(0, '#050808');
    baseGradient.addColorStop(0.5, backgroundColor);
    baseGradient.addColorStop(1, '#010202');

    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);

    const glowGradient = ctx.createRadialGradient(
      width * 0.5,
      height * 0.2,
      0,
      width * 0.5,
      height * 0.2,
      Math.max(width, height) * 0.9
    );
    glowGradient.addColorStop(0, 'rgba(156, 255, 46, 0.1)');
    glowGradient.addColorStop(0.35, 'rgba(156, 255, 46, 0.04)');
    glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, width, height);
  }

  function resizeCanvas() {
    if (!canvas || !container || !ctx) {
      return;
    }

    const rect = container.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    paintBackground();
    buildStreams();
  }

  function randomGlyph(index: number, trailIndex: number) {
    return glyphs[(frame + index * 5 + trailIndex * 7) % glyphs.length];
  }

  function drawFrame() {
    if (!ctx) {
      return;
    }

    frame += 1;
    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
    ctx.fillRect(0, 0, width, height);
    ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    for (let index = 0; index < streams.length; index += 1) {
      const stream = streams[index];
      const x = stream.x + Math.sin(frame / 24 + stream.phase) * fontSize * 0.15;

      for (let trailIndex = 0; trailIndex < trailLength; trailIndex += 1) {
        const y = stream.y - trailIndex * fontSize * 0.95;

        if (y < -fontSize || y > height + fontSize) {
          continue;
        }

        const falloff = 1 - trailIndex / trailLength;
        const alpha = Math.max(0, falloff * (0.6 + 0.4 * stream.seed));

        ctx.globalAlpha = trailIndex === 0 ? alpha : alpha * 0.55;
        ctx.shadowBlur = trailIndex === 0 ? 22 : 10;
        ctx.shadowColor = glowColor;
        ctx.fillStyle = trailIndex === 0 ? glowColor : 'rgba(165, 255, 84, 1)';
        ctx.fillText(randomGlyph(index, trailIndex), x, y);
      }

      stream.y += stream.speed * fontSize * 0.9;

      if (stream.y - trailLength * fontSize > height + Math.random() * height * 0.35) {
        stream.y = -Math.random() * height * 0.7;
        stream.speed = speedMin + Math.random() * (speedMax - speedMin);
        stream.seed = Math.random();
      }
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function animate() {
    drawFrame();
    animationFrameId = window.requestAnimationFrame(animate);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    resizeCanvas();
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
    };
  });
</script>

<div class="digital-rain" bind:this={container} aria-hidden="true">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .digital-rain {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    background:
      radial-gradient(circle at 50% 18%, rgba(155, 255, 46, 0.08), transparent 36%),
      linear-gradient(180deg, #060909 0%, #030405 55%, #010202 100%);
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>