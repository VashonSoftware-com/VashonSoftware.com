<script lang="ts">
  import AnimatedLoader from '@/components/ui/AnimatedLoader.svelte';
  import CloudGenerator from '@/components/ui/CloudGenerator.svelte';
  import DigitalRain from '@/components/ui/DigitalRain.svelte';
  import ElasticPebbles from '@/components/ui/ElasticPebbles.svelte';
  import HoverCursorLoader from '@/components/ui/HoverCursorLoader.svelte';
  import LineFlower from '@/components/ui/LineFlower.svelte';
  import ParticleAnimation from '@/components/ui/ParticleAnimation.svelte';
  import SymmetrishQuality from '@/components/ui/SymmetrishQuality.svelte';
  import TextStrokeAnimation from '@/components/ui/TextStrokeAnimation.svelte';
  import WebGLFlowers from '@/components/ui/WebGLFlowers.svelte';

  const effects = [
    {
      id: 'line-flower',
      number: '01',
      name: 'LineFlower',
      description: 'Canvas-based animated line drawing with multiple walkers creating organic patterns.',
      sourceLabel: 'DonKarlssonSan - Line Flower',
      sourceUrl: 'https://codepen.io/DonKarlssonSan/pen/PoeyBog',
      importName: 'LineFlower.svelte',
      type: 'Full-screen canvas animation',
      interaction: 'Autonomous sketching effect with no controls required.',
      previewNote: 'Preview runs inside the gallery stage. Use the standalone component full-width when you want the pattern to fill the entire viewport.',
      component: LineFlower,
      previewProps: { preview: true }
    },
    {
      id: 'webgl-flowers',
      number: '02',
      name: 'WebGLFlowers',
      description: 'Three.js-based interactive 3D particle flowers. Click to add more flowers.',
      sourceLabel: 'ksenia-k - WebGL Flowers',
      sourceUrl: 'https://codepen.io/ksenia-k/pen/RwqrxBG',
      importName: 'WebGLFlowers.svelte',
      type: 'WebGL 3D animation',
      interaction: 'Click the preview stage to add another flower cluster.',
      previewNote: 'The preview keeps the renderer mounted only for the selected effect so the page does not initialize every animation at once.',
      component: WebGLFlowers,
      previewProps: { preview: true }
    },
    {
      id: 'cloud-generator',
      number: '03',
      name: 'CloudGenerator',
      description: 'Draggable SVG clouds with procedural noise filters and a gradient sky scene.',
      sourceLabel: 'BalintFerenczy - Cloud Generator',
      sourceUrl: 'https://codepen.io/BalintFerenczy/pen/qENdpoL',
      importName: 'CloudGenerator.svelte',
      type: 'Interactive SVG component',
      interaction: 'Drag the cloud directly inside the preview.',
      previewNote: 'This effect is fully interactive in the gallery, so you can test the drag behavior before dropping it into a page section.',
      component: CloudGenerator,
      previewProps: { preview: true }
    },
    {
      id: 'elastic-pebbles',
      number: '04',
      name: 'ElasticPebbles',
      description: 'Bouncing colored polygons with lightweight physics. Click to regenerate colors.',
      sourceLabel: 'Dillo - Elastic Pebbles',
      sourceUrl: 'https://codepen.io/Dillo/pen/KKrjKpa',
      importName: 'ElasticPebbles.svelte',
      type: 'Canvas physics animation',
      interaction: 'Click the stage to reshuffle the polygon palette.',
      previewNote: 'The gallery preview constrains the simulation to the stage bounds so it behaves like an embeddable panel instead of a full-screen takeover.',
      component: ElasticPebbles,
      previewProps: { preview: true }
    },
    {
      id: 'animated-loader',
      number: '05',
      name: 'AnimatedLoader',
      description: 'SVG-based rotating loader with 12 colored segments for loading states and hover cues.',
      sourceLabel: 'chrisgannon - Manual Loader',
      sourceUrl: 'https://codepen.io/chrisgannon/pen/bGKeovd',
      importName: 'AnimatedLoader.svelte',
      type: 'SVG spinner/loader',
      interaction: 'Passive loader preview.',
      previewNote: 'Useful for isolated loading states or as a building block inside larger interactions like HoverCursorLoader.',
      component: AnimatedLoader,
      previewProps: {}
    },
    {
      id: 'particle-animation',
      number: '06',
      name: 'ParticleAnimation',
      description: 'GSAP-powered particle system with burst interactions and gravity-driven falloff.',
      sourceLabel: 'chrisgannon - Your Other Me',
      sourceUrl: 'https://codepen.io/chrisgannon/pen/KKGYxxR',
      importName: 'ParticleAnimation.svelte',
      type: 'Interactive particle system',
      interaction: 'Click anywhere in the stage to spawn a burst.',
      previewNote: 'Only the active effect is mounted, so this stays responsive even though the particle system is heavier than the SVG demos.',
      component: ParticleAnimation,
      previewProps: { preview: true }
    },
    {
      id: 'text-stroke-animation',
      number: '07',
      name: 'TextStrokeAnimation',
      description: 'SVG text with animated stroke effects and smooth color transitions.',
      sourceLabel: 'Taluska - Text Stroke Animation',
      sourceUrl: 'https://codepen.io/Taluska/pen/yLRZRoY',
      importName: 'TextStrokeAnimation.svelte',
      type: 'SVG text animation',
      interaction: 'Use the built-in button to pause or restart the effect.',
      previewNote: 'This preview keeps the animation controls active so you can test a small self-contained UI effect in place.',
      component: TextStrokeAnimation,
      previewProps: { preview: true }
    },
    {
      id: 'hover-cursor-loader',
      number: '08',
      name: 'HoverCursorLoader',
      description: 'Custom cursor treatment that attaches the animated loader to pointer movement.',
      sourceLabel: 'Composite demo using AnimatedLoader',
      sourceUrl: 'https://codepen.io/chrisgannon/pen/bGKeovd',
      importName: 'HoverCursorLoader.svelte',
      type: 'Interactive UI overlay',
      interaction: 'Move around the preview and toggle the loader on.',
      previewNote: 'The gallery uses container-relative pointer tracking here so the cursor effect stays inside the stage instead of taking over the whole page.',
      component: HoverCursorLoader,
      previewProps: { preview: true }
    },
    {
      id: 'digital-rain',
      number: '09',
      name: 'DigitalRain',
      description: 'Matrix-style background rain with glowing trails inspired by the Meshtastic Build-Off hero.',
      sourceLabel: 'Seeed Studio - Meshtastic Build-Off',
      sourceUrl: 'https://landing-page.seeedstudio.com/Meshtastic_Build-Off.html',
      importName: 'DigitalRain.svelte',
      type: 'Full-screen canvas background',
      interaction: 'Passive background effect with configurable density and glow.',
      previewNote: 'Characters, density, trail length, font size, speed range, and glow colors are configurable from props when you embed the component elsewhere.',
      component: DigitalRain,
      previewProps: { density: 1.1, trailLength: 14, fontSize: 16 }
    },
    {
      id: 'symmetrish-quality',
      number: '10',
      name: 'SymmetrishQuality',
      description: 'Rotationally symmetric water-like line flows with a soft mandala pulse adapted from fractal kitty\'s p5 sketch.',
      sourceLabel: 'fractal kitty - theSymmetrishQuality',
      sourceUrl: 'https://codepen.io/fractalkitty/pen/qEqrqoW',
      importName: 'SymmetrishQuality.svelte',
      type: 'Canvas generative animation',
      interaction: 'Click to reseed density, symmetry, and flow behavior.',
      previewNote: 'The preview preserves the original dark teal palette and mirrored rotational drawing while keeping the simulation scoped to this stage.',
      component: SymmetrishQuality,
      previewProps: { preview: true }
    }
  ];

  let selectedId = 'digital-rain';
  $: selected = effects.find((effect) => effect.id === selectedId) ?? effects[0];
</script>

<section class="component-preview" aria-labelledby="live-preview-heading">
  <div class="preview-copy">
    <p class="preview-label">Live preview</p>
    <h2 id="live-preview-heading">{selected.name}</h2>
    <p>{selected.description}</p>

    <dl class="preview-meta">
      <div>
        <dt>Import</dt>
        <dd><code>{selected.importName}</code></dd>
      </div>
      <div>
        <dt>Type</dt>
        <dd>{selected.type}</dd>
      </div>
      <div>
        <dt>Interaction</dt>
        <dd>{selected.interaction}</dd>
      </div>
      <div>
        <dt>Source</dt>
        <dd><a href={selected.sourceUrl} target="_blank" rel="noreferrer">{selected.sourceLabel}</a></dd>
      </div>
    </dl>
  </div>

  <div class="preview-stage">
    <div class="preview-frame">
      {#key selected.id}
        <svelte:component this={selected.component} {...selected.previewProps} />
      {/key}
    </div>

    <div class="preview-overlay">
      <p>{selected.previewNote}</p>
    </div>
  </div>
</section>

<div class="components-grid" role="list" aria-label="Animation components">
  {#each effects as effect}
    <article class:selected={effect.id === selectedId} class="component-card" role="listitem" aria-current={effect.id === selectedId ? 'true' : undefined}>
      <div class="component-card__header">
        <p class="component-card__number">{effect.number}</p>
        <div>
          <h3>{effect.name}</h3>
          <p>{effect.description}</p>
        </div>
      </div>

      <ul>
        <li><strong>Import:</strong> <code>{effect.importName}</code></li>
        <li><strong>Type:</strong> {effect.type}</li>
        <li><strong>Preview:</strong> {effect.interaction}</li>
      </ul>

      <div class="component-card__actions">
        <a href={effect.sourceUrl} target="_blank" rel="noreferrer">View source inspiration</a>
        <button type="button" class="component-card__button" on:click={() => (selectedId = effect.id)} aria-pressed={effect.id === selectedId}>
          {effect.id === selectedId ? 'Previewing' : 'Preview effect'}
        </button>
      </div>
    </article>
  {/each}
</div>

<style>
  .component-preview {
    display: grid;
    grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
    gap: 24px;
    margin-bottom: 48px;
    align-items: stretch;
  }

  .preview-copy,
  .preview-stage {
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--primary) 16%, var(--border, var(--muted)));
    background: var(--card);
  }

  .preview-copy {
    padding: 28px;
  }

  .preview-label {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--primary);
  }

  .preview-copy h2 {
    margin: 10px 0 12px;
    color: var(--foreground);
    font-size: 2rem;
  }

  .preview-copy > p:last-of-type {
    margin: 0 0 24px;
    color: var(--muted-foreground);
    line-height: 1.65;
  }

  .preview-meta {
    display: grid;
    gap: 16px;
    margin: 0;
  }

  .preview-meta div {
    display: grid;
    gap: 4px;
  }

  .preview-meta dt {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted-foreground);
  }

  .preview-meta dd {
    margin: 0;
    color: var(--foreground);
    line-height: 1.5;
  }

  .preview-meta a,
  .component-card__actions a {
    color: var(--primary);
    text-decoration: none;
  }

  .preview-meta a:hover,
  .component-card__actions a:hover {
    text-decoration: underline;
  }

  .preview-stage {
    position: relative;
    min-height: 360px;
    background: #030405;
    isolation: isolate;
  }

  .preview-frame {
    position: relative;
    height: 100%;
    min-height: 360px;
    overflow: hidden;
  }

  .preview-frame :global(> *) {
    width: 100%;
    height: 100%;
  }

  .preview-overlay {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    z-index: 3;
    padding: 20px 24px;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(3, 4, 5, 0) 0%, rgba(3, 4, 5, 0.9) 100%);
  }

  .preview-overlay p {
    margin: 0;
    max-width: 38rem;
    color: rgba(236, 255, 239, 0.92);
    font-size: 14px;
    line-height: 1.55;
  }

  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
    gap: 24px;
    margin-bottom: 60px;
  }

  .component-card {
    display: grid;
    gap: 18px;
    padding: 24px;
    border: 1px solid var(--muted);
    border-radius: 16px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--card) 88%, white 12%), var(--card));
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .component-card:hover,
  .component-card.selected {
    border-color: color-mix(in srgb, var(--primary) 55%, transparent);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px);
  }

  .component-card__header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 14px;
    align-items: start;
  }

  .component-card__number {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--primary);
  }

  .component-card h3 {
    margin: 0 0 10px;
    font-size: 1.2rem;
    color: var(--foreground);
  }

  .component-card__header p:last-child {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .component-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  }

  .component-card li {
    color: var(--muted-foreground);
    font-size: 0.9rem;
    line-height: 1.5;
  }

  code {
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.82rem;
    color: var(--foreground);
    background: color-mix(in srgb, var(--muted) 80%, transparent);
    padding: 2px 6px;
    border-radius: 6px;
  }

  .component-card__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .component-card__button {
    border: 0;
    border-radius: 999px;
    padding: 10px 16px;
    font: inherit;
    font-weight: 700;
    color: var(--primary-foreground);
    background: var(--primary);
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .component-card__button:hover {
    transform: translateY(-1px);
  }

  .component-card__button[aria-pressed='true'] {
    opacity: 0.82;
  }

  @media (max-width: 768px) {
    .component-preview {
      grid-template-columns: 1fr;
    }

    .preview-stage,
    .preview-frame {
      min-height: 300px;
    }

    .component-card__actions {
      flex-direction: column;
      align-items: stretch;
    }

    .component-card__button {
      width: 100%;
    }
  }
</style>