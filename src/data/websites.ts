/** Content for the four Websites pages (/websites, /websites/included, /care-plans, /compare). */

export const howCards = [
  {
    title: 'Performance-First Static Sites',
    description:
      'Reliable Svelte and Angular component-focused solutions using Astro, Eleventy, Hugo, Decap, Nunjucks, HTML5, CSS3+, TypeScript, and Markdown — with modern versioning & CI/CD pipelines.',
  },
  {
    title: 'Creative Design & User Editable',
    description:
      'Creative design that your team can manage and update without developer involvement — all at an economical price.',
  },
  {
    title: 'Example Sites',
    description:
      'VashonSoftware.com, eoc.online, Mesh101.com, VashonMesh.com, MadeInParadiseRocks.com, VashonTaiChi.com, VashonMassage.com, Cornelisons.com, VashonBePrepared, VashonEOC, and many others over the years.',
  },
];

// What every small-business site includes, grouped so a reader can scan by concern.
export const included = [
  {
    title: 'You own it',
    slug: 'ownership',
    items: [
      [
        'Your domain, in your name',
        'Registered at cost, with auto-renew on. Owner privacy (your name and address hidden from public look-ups) is included free.',
      ],
      [
        'Your accounts, or mine on your behalf',
        'The site can live in your own free GitHub and Cloudflare accounts, with me as an administrator, or I can run it for you. You can switch later.',
      ],
      [
        'Your files',
        'The site is ordinary, readable files (HTML, CSS, Markdown), not a format tied to one company. Any web developer can pick it up, and you can move it anywhere.',
      ],
      [
        'No platform licence',
        'Nothing to keep paying a builder for, and nothing lost if you stop paying me.',
      ],
    ],
  },
  {
    title: 'Nothing gets lost',
    slug: 'history',
    items: [
      [
        'A full change history',
        'Every change, yours or mine, is recorded with its date (git). Any earlier version can be looked at or put back.',
      ],
      [
        'Backups kept elsewhere',
        'Besides the copy at GitHub, a backup is kept on separate storage (on a care plan).',
      ],
      [
        'Old links keep working',
        'When moving from an old site, every old page address is sent on to its new page, so search results and bookmarks still work.',
      ],
      ['The old site stays as a fallback', 'Until the new one is live and checked.'],
    ],
  },
  {
    title: 'Fast and easy to find',
    slug: 'speed',
    items: [
      [
        'Fast on phones',
        'Target of 95+ in Google PageSpeed for speed, accessibility, best practices and SEO, measured before launch.',
      ],
      [
        'Search-engine basics done',
        'Page titles and descriptions, a sitemap, tidy addresses and sharing previews for Facebook, LinkedIn and texts.',
      ],
      [
        'Accessible',
        'Built to WCAG 2.2 AA: readable contrast, keyboard use, screen-reader labels. Light and dark mode.',
      ],
      ['Served worldwide', 'Hosted on Cloudflare’s network, free at small-site sizes.'],
    ],
  },
  {
    title: 'Secure by default',
    slug: 'security',
    items: [
      [
        'HTTPS, renewed automatically',
        'The padlock in the address bar, with nothing to renew by hand.',
      ],
      [
        'Nothing to patch',
        'No server, database or plugins for anyone to break into or keep updated.',
      ],
      [
        'Spam-protected contact form',
        'Messages come to your email. Your address and phone are hidden from scrapers.',
      ],
      [
        'Security headers and a privacy page',
        'The page says plainly what the site collects (usually very little).',
      ],
    ],
  },
  {
    title: 'You know how it’s doing',
    slug: 'monitoring',
    items: [
      ['Visitor statistics without cookies', 'So no cookie banner is needed.'],
      [
        'A monthly visitor email',
        'Visits, top pages and where people came from, in plain numbers.',
      ],
      [
        'Watched automatically',
        'An uptime monitor, an alert if an update fails to publish, and a weekly check for broken links to other sites.',
      ],
    ],
  },
  {
    title: 'Email and domains',
    slug: 'email',
    items: [
      ['Email at your domain', 'you@yourbusiness.com, forwarded to the inbox you already use.'],
      ['Extra domains', 'Other names you own (misspellings, old names) are sent to the main site.'],
    ],
  },
];

export const options = [
  {
    title: 'Editing it yourself',
    items: [
      [
        'Browser editor',
        'Change words, photos and lists from any browser, with no software to install. Each save is recorded in the change history, so a mistake can be undone.',
      ],
      [
        'Site tools page',
        'A small private admin page for your site: open the editor, see whether your last change published, recent site checks, and a button to report a problem or ask for a change.',
      ],
      ['Editing guide', 'Written around your own pages, with screenshots.'],
    ],
  },
  {
    title: 'More on the site',
    items: [
      ['Full-site search', ''],
      ['Blog or news section, with tags', ''],
      ['Extra forms', 'Orders, booking requests, sign-ups.'],
      [
        'Payment buttons',
        'Stripe or PayPal, for a few products or deposits. Larger stores: see the platform comparison.',
      ],
      ['Booking', 'Linking or embedding Calendly, Square and the like.'],
      ['Mailing-list sign-up', ''],
      [
        'A collection or catalogue',
        'Items with tags and filters, a page for each, bulk photo upload.',
      ],
      ['Members-only or family pages', 'Behind a sign-in.'],
      ['A second language', ''],
    ],
  },
  {
    title: 'Email and other work',
    items: [
      [
        'A full mailbox at your domain',
        'On a small, reliable mail host, for about $10 a year; or Google Workspace at Google’s price.',
      ],
      ['Moving old mail across', ''],
      ['A new design or restyle', ''],
      ['Writing or entering content', 'Typing, photo editing, captions.'],
      [
        'Rescuing a lost site',
        'Rebuilding from the Internet Archive when the old host or login is gone.',
      ],
    ],
  },
];

// Care plans. ✓ / — / text per column.
export const careCols = ['No plan', 'Yearly', 'Quarterly', 'Total care (monthly)'];
export const careRows: { label: string; cells: string[] }[] = [
  {
    label: 'Site keeps running, monthly visitor email, automatic alerts',
    cells: ['✓', '✓', '✓', '✓'],
  },
  { label: 'Full health check (below)', cells: ['—', 'Yearly', 'Quarterly', 'Monthly'] },
  { label: 'Software updates', cells: ['—', 'Yearly', 'Quarterly', 'Monthly'] },
  {
    label: 'Backup kept off GitHub, test-restored',
    cells: ['—', 'Yearly', 'Quarterly', 'Monthly'],
  },
  { label: 'Short written report', cells: ['—', 'Yearly', 'Quarterly', 'Monthly'] },
  { label: 'Call to talk it over', cells: ['—', 'Yearly', 'Yearly', 'Quarterly'] },
  {
    label: 'Change time included',
    cells: ['Billed hourly', '1 hour a year', '2 hours a year', '1 hour a month'],
  },
  {
    label: 'When something breaks',
    cells: ['Hourly, best effort', 'Best effort', 'Best effort', 'Next working day'],
  },
];

export const healthCheck = [
  ['Speed', 'Google PageSpeed on phone and desktop, compared with last time.'],
  ['Accessibility', 'Automated WCAG checks plus a keyboard and screen-reader spot check.'],
  ['Security', 'HTTPS certificate, security-header grade, nothing exposed that shouldn’t be.'],
  ['Links and forms', 'Broken links, a test message through each form.'],
  ['Search', 'Sitemap, page titles, sharing previews, Google Search Console warnings.'],
  ['Renewals', 'Domain and certificate dates, so nothing lapses.'],
  ['Backups', 'A fresh off-site copy, and a test that it restores.'],
];

export const checkTools = [
  {
    name: 'PageSpeed Insights',
    by: 'Google',
    url: 'https://pagespeed.web.dev/',
    what: 'speed, accessibility, SEO basics',
  },
  {
    name: 'HTTP Observatory',
    by: 'Mozilla (MDN)',
    url: 'https://developer.mozilla.org/en-US/observatory',
    what: 'security headers',
  },
  {
    name: 'SSL Server Test',
    by: 'Qualys SSL Labs',
    url: 'https://www.ssllabs.com/ssltest/',
    what: 'the HTTPS certificate and its setup',
  },
];

// Platform comparison. Typical published US prices, annual billing, November 2026.
export const compareCols = [
  'Typical running cost',
  'Up-front',
  'Who changes it',
  'Moving it later',
  'If you stop paying',
  'Who keeps it updated and secure',
  'Best for',
];
export const platforms: { name: string; ours?: boolean; cells: string[] }[] = [
  {
    name: 'Built and owned (this page)',
    ours: true,
    cells: [
      'Hosting $0; a .com about $11/yr; optional care plan',
      'Setup, quoted in writing',
      'You (words, photos) or me; layout changes by me',
      'Copy the files to any host',
      'Keeps running; just renew the domain',
      'Nothing to patch; checked on a care plan',
      'Small businesses wanting low running costs, ownership and a person to call',
    ],
  },
  {
    name: 'Wix',
    cells: [
      'About $17–39/mo',
      'None (you build it)',
      'You, drag-and-drop',
      'Classic sites can’t be exported',
      'Falls back to a Wix address with ads',
      'Wix',
      'People who enjoy designing their own pages',
    ],
  },
  {
    name: 'Squarespace',
    cells: [
      'About $16–39/mo',
      'None (you build it)',
      'You, drag-and-drop',
      'Partial: pages and posts; design is rebuilt',
      'Site goes offline',
      'Squarespace',
      'Polished portfolios and small shops',
    ],
  },
  {
    name: 'GoDaddy builder',
    cells: [
      'About $10–15/mo to start; more at renewal',
      'None (you build it)',
      'You, simple editor',
      'No export',
      'Site goes offline',
      'GoDaddy',
      'A quick, simple first site',
    ],
  },
  {
    name: 'WordPress.com',
    cells: [
      'About $4–25/mo; more for a store',
      'None (you build it)',
      'You, block editor',
      'Exports to any WordPress host',
      'Drops to the free plan (ads, no own domain)',
      'WordPress.com',
      'Blogs and writing-heavy sites',
    ],
  },
  {
    name: 'WordPress, self-hosted',
    cells: [
      'About $200–800/yr for hosting, theme and plugins',
      'Often a developer',
      'You, block editor',
      'Moves to any WordPress host',
      'Offline when hosting lapses',
      'You or a paid maintainer: regular core, theme and plugin updates',
      'Large content sites with someone to maintain them',
    ],
  },
  {
    name: 'Webflow',
    cells: [
      'From about $15/mo per site',
      'Usually a designer',
      'A designer; you edit content',
      'Partial: code export, content as CSV',
      'Custom domain stops working',
      'Webflow',
      'Design-led sites built by a designer',
    ],
  },
  {
    name: 'Shopify',
    cells: [
      'From $29/mo, plus card fees',
      'None, or a developer',
      'You',
      'Products and orders export; design doesn’t',
      'Store closes',
      'Shopify',
      'Real online stores: stock, shipping, tax',
    ],
  },
  {
    name: 'Square Online',
    cells: [
      'Free plan (Square branding), or from $49/mo; card fees',
      'None (you build it)',
      'You',
      'No site export',
      'Free plan continues',
      'Square',
      'Shops and cafés already using Square',
    ],
  },
  {
    name: 'Google Sites',
    cells: [
      'Free; domain extra',
      'None (you build it)',
      'You, simple editor',
      'No usable export',
      'Free',
      'Google',
      'Clubs, classes and simple internal pages',
    ],
  },
];

// "Which approach fits?" questions. Each answer adds points to approaches; highest wins.
export type Key =
  | 'owned'
  | 'builder'
  | 'wpcom'
  | 'wpself'
  | 'webflow'
  | 'shopify'
  | 'square'
  | 'gsites';
export const questions: {
  id: string;
  q: string;
  answers: { label: string; pts: Partial<Record<Key, number>>; tier?: string }[];
}[] = [
  {
    id: 'purpose',
    q: 'What does the site mainly need to do?',
    answers: [
      {
        label: 'Tell people who we are and how to reach us',
        pts: { owned: 3, builder: 2, gsites: 1, wpcom: 1 },
        tier: 'A',
      },
      {
        label: 'Show a portfolio, gallery or catalogue',
        pts: { owned: 3, builder: 2, webflow: 1 },
        tier: 'C',
      },
      {
        label: 'Publish articles or news often',
        pts: { wpcom: 3, wpself: 2, owned: 2, builder: 1 },
      },
      { label: 'Sell many products online', pts: { shopify: 7, builder: 2, square: 2, owned: -2 } },
      { label: 'Take orders for a shop or café already on Square', pts: { square: 5, shopify: 1 } },
    ],
  },
  {
    id: 'editor',
    q: 'Who will make changes?',
    answers: [
      { label: 'Rarely needed; someone else can do it', pts: { owned: 3 }, tier: 'A' },
      {
        label: 'Me: words and photos',
        pts: { owned: 2, builder: 2, wpcom: 2, shopify: 1, square: 1 },
        tier: 'B',
      },
      {
        label: 'Me: I want to redesign pages often',
        pts: { builder: 4, wpcom: 2, webflow: 1, square: 1, shopify: 1, owned: -2 },
      },
      { label: 'A web designer or a team', pts: { webflow: 5, owned: 2, wpself: 2 } },
    ],
  },
  {
    id: 'money',
    q: 'How would you rather pay?',
    answers: [
      { label: 'Once to build it, then very little', pts: { owned: 3, wpself: 1, gsites: 2 } },
      {
        label: 'A monthly fee, with no setup cost',
        pts: { builder: 3, wpcom: 2, square: 2, shopify: 1, gsites: 1, owned: -2 },
      },
      { label: 'Either is fine', pts: {} },
    ],
  },
  {
    id: 'own',
    q: 'How much does owning it, and being free to move it, matter?',
    answers: [
      {
        label: 'A lot',
        pts: { owned: 3, wpself: 3, wpcom: 1, builder: -2, gsites: -1, square: -1 },
      },
      { label: 'Somewhat', pts: { owned: 1, wpself: 1 } },
      { label: 'Not much', pts: { builder: 1, gsites: 1 } },
    ],
  },
  {
    id: 'upkeep',
    q: 'Who should look after updates and security?',
    answers: [
      {
        label: 'Someone else, please',
        pts: { owned: 3, builder: 1, shopify: 1, square: 1, wpself: -3 },
      },
      { label: 'I can follow instructions', pts: { builder: 1, wpcom: 1, gsites: 1 } },
      { label: 'I’m happy to run updates myself', pts: { wpself: 3, webflow: 1 } },
    ],
  },
];

export const results: Record<Key, { title: string; why: string; next: string; href?: string }> = {
  owned: {
    title: 'A site built for you, and owned by you',
    why: 'Low running costs, nothing to patch, and a person to call. You pay once for the build.',
    next: 'See what’s included, then get in touch for a quote.',
    href: '/about#contact',
  },
  builder: {
    title: 'A site builder: Squarespace or Wix',
    why: 'You want to design and rearrange pages yourself and prefer a monthly fee to a setup cost.',
    next: 'Squarespace for polish, Wix for flexibility. I can help set one up or move content in.',
  },
  wpcom: {
    title: 'WordPress.com',
    why: 'Good for regular writing, with an export path to any WordPress host later.',
    next: 'Start on a paid plan so you can use your own domain.',
  },
  wpself: {
    title: 'Self-hosted WordPress',
    why: 'Maximum control and a huge plugin choice, if someone keeps it updated.',
    next: 'Budget for good hosting and regular updates, or a maintenance plan.',
  },
  webflow: {
    title: 'Webflow, with a designer',
    why: 'A design-led site where a designer builds it and you edit the content.',
    next: 'Hire a Webflow designer; ask about code export before you start.',
  },
  shopify: {
    title: 'Shopify',
    why: 'Stock, shipping and tax are its job. Custom work rarely beats it for a real store.',
    next: 'Start on Basic. A built-and-owned site can link to the store if you want both.',
  },
  square: {
    title: 'Square Online',
    why: 'If you already take payments with Square, the online shop connects to it directly.',
    next: 'Try the free plan first.',
  },
  gsites: {
    title: 'Google Sites',
    why: 'Free and simple, good enough for a club, class or internal page.',
    next: 'Add your own domain for a few dollars a year.',
  },
};

export const tierNames: Record<string, string> = {
  A: 'Most likely the Essentials package: I make changes on request.',
  B: 'Most likely the Self-edit package: you change words and photos in the browser.',
  C: 'Most likely the Collection package: items with tags, filters and a page each.',
};
