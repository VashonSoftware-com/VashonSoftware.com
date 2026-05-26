<script lang="ts">
  import { onMount } from 'svelte';

  export let preview = false;

  interface Walker {
    x: number;
    y: number;
    originalAngle: number;
    angle: number;
    walk(): void;
  }

  let container: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let w: number;
  let h: number;
  let walkers: Walker[] = [];
  const numWalkers = 20;
  const maxStep = 5;
  let animationFrameId: number;
  let resizeObserver: ResizeObserver | undefined;

  class Walker implements Walker {
    x: number;
    y: number;
    originalAngle: number;
    angle: number;

    constructor() {
      this.x = w / 2;
      this.y = h / 2;
      this.originalAngle = Math.random() * Math.PI * 2;
      this.angle = this.originalAngle;
    }

    walk() {
      this.angle += Math.random() - 0.5;
      const delta = Math.PI / 2;
      if (this.angle > this.originalAngle + delta) {
        this.angle = this.originalAngle + delta;
      } else if (this.angle < this.originalAngle - delta) {
        this.angle = this.originalAngle - delta;
      }
      const step = Math.random() * maxStep;
      this.x += Math.cos(this.angle) * step;
      this.y += Math.sin(this.angle) * step;
    }
  }

  function draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;

    for (const walker of walkers) {
      walker.walk();
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2);
      ctx.lineTo(walker.x, walker.y);
      ctx.stroke();
    }
  }

  function animate() {
    draw();
    animationFrameId = requestAnimationFrame(animate);
  }

  function resetScene() {
    walkers = [];
    for (let i = 0; i < numWalkers; i++) {
      walkers.push(new Walker());
    }
  }

  function resizeCanvas() {
    const rect = preview && container
      ? container.getBoundingClientRect()
      : { width: window.innerWidth, height: window.innerHeight };

    w = canvas.width = Math.max(1, Math.round(rect.width));
    h = canvas.height = Math.max(1, Math.round(rect.height));
    resetScene();
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

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  });
</script>

<div class:preview class="line-flower-container" bind:this={container}>
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .line-flower-container {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: white;
  }

  .line-flower-container.preview {
    height: 100%;
    min-height: 100%;
  }

  canvas {
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
</style>
