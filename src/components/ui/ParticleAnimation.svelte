<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

  gsap.registerPlugin(MotionPathPlugin);

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let width: number;
  let height: number;
  let animationId: number;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    alpha: number;
  }

  let particles: Particle[] = [];
  const colorArray = ['#d6140a', '#ffb301', '#082970', '#fa7204', '#e33189', '#ffb501', '#a49e3b', '#3d2c74', '#ce1918', '#1c9ba2'];
  const num = 400;

  function createParticles(x: number, y: number) {
    for (let i = 0; i < num; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const speed = Math.random() * 5 + 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
        alpha: 1
      });
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // gravity
      p.alpha -= 0.01;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    ctx.globalAlpha = 1;
  }

  function animate() {
    updateParticles();
    animationId = requestAnimationFrame(animate);
  }

  function handleCanvasClick(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createParticles(x, y);
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  });
</script>

<canvas bind:this={canvas}></canvas>
<div class="hint">Click anywhere to create particles</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  canvas {
    display: block;
    cursor: crosshair;
    background: #000;
  }

  .hint {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: #888;
    font-family: Arial, sans-serif;
    font-size: 14px;
    pointer-events: none;
  }
</style>
