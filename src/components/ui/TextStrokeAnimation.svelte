<script lang="ts">
  let text = 'SVELTE';
  let animating = true;

  function toggleAnimation() {
    animating = !animating;
  }
</script>

<div class="text-stroke-container">
  <main>
    <svg class="text-stroke" viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .text {{
            font-size: 80px;
            font-weight: 700;
            font-family: 'Arial', sans-serif;
            fill: none;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
          }}

          .text-stroke-animated {{
            animation: {animating ? 'strokeAnimation 4s ease-in-out infinite' : 'none'};
          }}

          @keyframes strokeAnimation {{
            0% {{
              stroke: #6f00ff;
              stroke-dashoffset: 0;
            }}
            25% {{
              stroke: #cb2cd9;
            }}
            50% {{
              stroke: #ff595e;
            }}
            75% {{
              stroke: #ffb501;
            }}
            100% {{
              stroke: #6f00ff;
              stroke-dashoffset: 0;
            }}
          }}
        </style>
      </defs>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="text text-stroke-animated">
        {text}
      </text>
    </svg>
  </main>

  <button class="toggle-btn" on:click={toggleAnimation}>
    {animating ? 'Stop' : 'Start'} Animation
  </button>
</div>

<style>
  .text-stroke-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-family: 'Arial', sans-serif;
  }

  main {
    width: 100%;
    max-width: 500px;
    margin-bottom: 30px;
  }

  .text-stroke {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.1));
  }

  .toggle-btn {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #6f00ff 0%, #cb2cd9 100%);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(111, 0, 255, 0.4);
  }

  .toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(111, 0, 255, 0.6);
  }

  .toggle-btn:active {
    transform: translateY(0);
  }
</style>
