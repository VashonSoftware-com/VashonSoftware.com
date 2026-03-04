Here's the full impact analysis:

Current React Usage (6 files)
File	What It Does	React Features
LoginForm.tsx	Login form with loading state	useState, FormEvent — needs framework
button.tsx	Button with variants	forwardRef, Radix Slot
input.tsx	Styled <input>	forwardRef only
label.tsx	Accessible label	forwardRef, Radix Label
card.tsx	Card layout compound	forwardRef ×6 — not actually used anywhere
badge.tsx	Badge/chip display	CVA variants — not actually used anywhere
Only 2 pages use React components:

login.astro — hydrates LoginForm with client:load (ships JS)
404.astro — uses Button statically (no JS shipped)
Impact of Removing React
Remove @astrojs/react, react, react-dom, @types/react, @types/react-dom, @radix-ui/react-slot, @radix-ui/react-label (~7 packages)
Delete or rewrite 6 .tsx files
The LoginForm needs a real replacement — it has useState for a loading spinner
Button used statically in 404 can become plain Astro markup
card.tsx and badge.tsx are unused — can just be deleted
Can Svelte Replace It?
Yes, cleanly. Here's the mapping:

React	Svelte equivalent
LoginForm.tsx with useState	LoginForm.svelte with let isLoading = $state(false)
client:load hydration	client:load — same Astro directive, works with Svelte
button.tsx (static use)	Plain .astro component with class variants
label.tsx (Radix)	Native <label> — Radix is only needed for React
card.tsx, badge.tsx (unused)	Delete — or convert to .astro
The only component that requires a client-side framework is LoginForm. Everything else is either static or can be a native .astro component. Svelte is lighter than React and its runes syntax ($state, $derived) is very ergonomic.

Recommendation
Yes, replace React with Svelte. Want me to do it?

The work is:

Add @astrojs/svelte, remove @astrojs/react and React packages
Convert LoginForm.tsx → LoginForm.svelte (simple — just useState → $state)
Convert Button → .astro component with CVA-style variant classes (it's only used statically)
Delete card.tsx, badge.tsx (unused), input.tsx, label.tsx (folded into LoginForm.svelte)
Update astro.config.mjs