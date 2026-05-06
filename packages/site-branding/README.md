# @vashonsoftware/site-branding

Shared branding primitives for VashonSoftware and related client sites.

## Current contract

This package currently exports the shared footer credit hover effect.

### CSS export

- `@vashonsoftware/site-branding/site-credit.css`

### Required markup

```html
<span>Site by <a class="site-credit-link" href="https://www.VashonSoftware.com" rel="noopener noreferrer">VashonSoftware.com</a></span>
```

## Intended consumers

- Astro sites
- Eleventy sites
- Other static sites that can import a CSS file

## Notes

- Keep the markup local to each site footer.
- Keep the hover behavior centralized here.
- Publish or expose this package from a public GitHub source before wiring external Cloudflare builds to it.