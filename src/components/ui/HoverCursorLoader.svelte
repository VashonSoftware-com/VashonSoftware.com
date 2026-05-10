<script lang="ts">
  import { onMount } from 'svelte';
  import AnimatedLoader from './AnimatedLoader.svelte';

  let x = 0;
  let y = 0;
  let isLoading = false;

  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  function toggleLoading() {
    isLoading = !isLoading;
  }
</script>

<div class="cursor-loader-container">
  <div class="custom-cursor" style="left: {x}px; top: {y}px; opacity: {isLoading ? 1 : 0};">
    <div class="loader-wrapper" style="scale: {isLoading ? 1 : 0.5};">
      <AnimatedLoader />
    </div>
  </div>

  <div class="content">
    <h1>Hover Cursor Loader</h1>
    <p>Move your mouse around and click to toggle the loading cursor</p>
    <button on:click={toggleLoading} class="toggle-btn">
      {isLoading ? 'Stop Loading' : 'Start Loading'}
    </button>
    <p class="info">The animated loader follows your cursor when active</p>
  </div>
</div>

<style>
  .cursor-loader-container {
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    color: white;
    cursor: none;
    overflow: hidden;
  }

  .custom-cursor {
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    z-index: 1000;
  }

  .loader-wrapper {
    width: 80px;
    height: 80px;
    transition: scale 0.3s ease;
  }

  .content {
    text-align: center;
    z-index: 10;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 18px;
    margin: 10px 0;
    opacity: 0.9;
  }

  .toggle-btn {
    padding: 14px 32px;
    font-size: 16px;
    font-weight: 600;
    color: #667eea;
    background: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 30px 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .toggle-btn:active {
    transform: translateY(0);
  }

  .info {
    font-size: 14px;
    margin-top: 20px;
    opacity: 0.7;
  }
</style>
