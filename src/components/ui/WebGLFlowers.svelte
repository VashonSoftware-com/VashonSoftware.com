<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  export let preview = false;

  let container: HTMLDivElement;
  let scene: THREE.Scene;
  let camera: THREE.Camera;
  let renderer: THREE.Renderer;
  let particles: THREE.Points[] = [];
  let animationFrameId: number;

  const fragmentShader = `
    #define PI 3.14159265359

    uniform sampler2D texture1;
    uniform float time;
    varying vec2 vUv;
    varying float vNoise;

    float random (vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
    }

    float noise (vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = vUv;
      float n = noise(uv * 5.0 + time * 0.5);
      
      gl_FragColor = vec4(
        0.5 + 0.5 * sin(time + uv.x * PI),
        0.5 + 0.5 * sin(time + uv.y * PI + 2.0),
        0.5 + 0.5 * sin(time + PI),
        n * 0.8
      );
    }
  `;

  const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    varying float vNoise;

    float random (vec3 st) {
      return fract(sin(dot(st.xyz, vec3(12.9898,78.233,45.164)))* 43758.5453123);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(time + position.x) * 10.0;
      pos.y += cos(time + position.y) * 10.0;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  function createFlower(x: number, y: number) {
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 100;
      positions[i] = x + Math.cos(angle) * radius;
      positions[i + 1] = y + Math.sin(angle) * radius;
      positions[i + 2] = Math.random() * 500;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        texture1: { value: new THREE.Texture() }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particles.push(points);

    return points;
  }

  function animate() {
    renderer.render(scene, camera);

    particles.forEach((particle, index) => {
      const material = particle.material as any;
      material.uniforms.time.value += 0.016;
      particle.rotation.x += 0.001;
      particle.rotation.y += 0.002;
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  onMount(() => {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 300;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Event listeners
    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width) * 2 - 1;
      const y = -((e.clientY - rect.top) / height) * 2 + 1;

      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      createFlower(pos.x, pos.y);
    };

    renderer.domElement.addEventListener('click', handleClick);

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      (camera as THREE.PerspectiveCamera).aspect = newWidth / newHeight;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Create initial flowers
    createFlower(0, 0);
    createFlower(200, 200);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.domElement.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  });
</script>

<div bind:this={container} class:preview class="webgl-flowers-container">
  <div class="overlay">
    <p>Click to Add Flowers</p>
  </div>
</div>

<style>
  .webgl-flowers-container {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #000;
    position: relative;
  }

  .webgl-flowers-container.preview {
    height: 100%;
    min-height: 100%;
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2rem;
    font-family: Arial, sans-serif;
    text-align: center;
    pointer-events: none;
    z-index: 10;
  }

  .webgl-flowers-container.preview .overlay {
    font-size: 1.25rem;
  }

  p {
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }
</style>
