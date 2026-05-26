<script lang="ts">
  import { onMount } from 'svelte';

  export let preview = false;

  interface FlowPart {
    x: number;
    y: number;
    length: number;
    speed: number;
    light: string;
  }

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let resizeObserver: ResizeObserver | undefined;
  let animationFrameId = 0;

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let frame = 0;

  let spaceHeld = 0;
  let density = 0;
  let amplitude = 0;
  let changeFactors: [number, number, number] = [0, 0, 0];
  let symmetry = 8;
  let flowParts: FlowPart[] = [];

  function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  function randomInt(min: number, max: number) {
    return Math.floor(randomBetween(min, max + 1));
  }

  function degSin(value: number) {
    return Math.sin((value * Math.PI) / 180);
  }

  function degCos(value: number) {
    return Math.cos((value * Math.PI) / 180);
  }

  function createFlowPart(): FlowPart {
    const alpha = randomBetween(0.02, 0.12);

    return {
      x: randomBetween(-spaceHeld, spaceHeld),
      y: randomBetween(-height / 1.5, height / 1.5),
      length: randomBetween(width / 100, width / 20),
      speed: randomBetween(0.001, 0.2),
      light: `rgba(${Math.round(randomBetween(200, 250))}, ${Math.round(randomBetween(240, 255))}, 255, ${alpha.toFixed(3)})`
    };
  }

  function reseed() {
    if (!width || !height) {
      return;
    }

    spaceHeld = randomBetween(width / 20, width / 10);
    density = randomInt(200, 400);
    amplitude = randomBetween(width / 5, width / 3);
    changeFactors = [randomBetween(3, 10), randomBetween(3, 10), randomBetween(3, 10)];
    symmetry = [7, 8, 9, 10, 11, 12][Math.floor(Math.random() * 6)];

    flowParts = Array.from({ length: density }, () => createFlowPart());
  }

  function flow(part: FlowPart) {
    if (!ctx) {
      return;
    }

    ctx.strokeStyle = part.light;
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let i = 0; i < part.length; i += 1) {
      const px =
        part.x +
        amplitude *
          degCos(part.y + i) *
          degSin(part.y / changeFactors[0] + i / changeFactors[0]) *
          degCos(i * 2) -
        50 * degSin(i / changeFactors[1]);
      const py = part.y + i;

      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.stroke();

    if (part.y >= height / 1.5) {
      part.y = -height / 1.5 - part.length;
    } else {
      part.y += part.speed;
    }
  }

  function drawFrame() {
    if (!ctx) {
      return;
    }

    frame += 1;
    ctx.fillStyle = 'rgba(20, 70, 80, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((-frame / 10) * (Math.PI / 180));

    for (let k = 0; k < symmetry; k += 1) {
      ctx.save();
      ctx.rotate((Math.PI * k) / symmetry);
      for (const part of flowParts) {
        flow(part);
      }
      ctx.restore();
    }

    ctx.restore();
  }

  function animate() {
    drawFrame();
    animationFrameId = window.requestAnimationFrame(animate);
  }

  function resizeCanvas() {
    if (!ctx || !container) {
      return;
    }

    const rect = preview
      ? container.getBoundingClientRect()
      : {
          width: window.innerWidth,
          height: window.innerHeight
        };

    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.fillStyle = 'rgb(20, 70, 80)';
    ctx.fillRect(0, 0, width, height);
    reseed();
  }

  function handleCanvasClick() {
    reseed();
  }

  onMount(() => {
    ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    resizeCanvas();
    canvas.addEventListener('click', handleCanvasClick);

    if (preview) {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', resizeCanvas);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      canvas.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  });
</script>

<div class:preview class="symmetrish-quality" bind:this={container}>
  <canvas bind:this={canvas} aria-label="Rotational flow line animation"></canvas>
  <p class="hint">Click to reseed the flow</p>
</div>

<style>
  .symmetrish-quality {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: rgb(20, 70, 80);
  }

  .symmetrish-quality.preview {
    height: 100%;
    min-height: 100%;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .hint {
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    margin: 0;
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(5, 24, 28, 0.62);
    color: rgba(231, 253, 255, 0.92);
    font-size: 0.78rem;
    letter-spacing: 0.02em;
    pointer-events: none;
  }
</style>
