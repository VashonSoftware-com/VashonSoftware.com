/** Content for the four Websites pages (/websites, /websites/included, /care-plans, /compare). */

// /websites welcome: a guide to what's on offer, so first-time visitors can find their place.
export const offerCards = [
  {
    title: 'A new website',
    text: 'Starting from nothing, or from a page on Facebook. We talk about what you need, and I build a site that’s simple to run.',
    href: '#fit',
    link: 'A few questions to get started',
  },
  {
    title: 'Refresh the site you have',
    text: 'Slow, dated, hard to change, or stuck on a builder you’ve outgrown. I keep what works, move your content, and old links keep working.',
    href: '#fit',
    link: 'A few questions to get started',
  },
  {
    title: 'Looking after a site',
    text: 'Already happy with your site? Optional check-ups cover speed, security, links, forms and backups, with a plain-English report.',
    href: '/websites/care-plans',
    link: 'Care plans',
  },
  {
    title: 'Just curious',
    text: 'No plans yet? Run your site through the same free tests I use, or read how a site you own compares with Wix or Squarespace.',
    href: '#check',
    link: 'Check your current site',
  },
];

// /websites welcome: how working together goes, in three steps.
export const steps = [
  {
    title: 'We talk',
    text: 'By email, phone or over coffee. Tell me what you have and what you’d like it to do. No obligation.',
  },
  {
    title: 'A free check and a written quote',
    text: 'I test your current site (if you have one) and send a plain quote: what I’d do, what it costs, and what it costs to run.',
  },
  {
    title: 'I build it, you own it',
    text: 'You see it before it goes live. Afterwards it’s yours: your address, your files, and me to call if you need help.',
  },
];

// /websites: why a built-and-owned site differs from a drag-and-drop builder.
export const whyCards = [
  {
    title: 'You own it',
    slug: 'ownership',
    lead: 'Your domain, your accounts, your files.',
    text: 'A builder rents you a site: stop paying and it goes dark, and the design can’t come with you. Here the address is registered in your name, the site is ordinary files any developer can read, and nothing stops working if you stop paying me.',
  },
  {
    title: 'Fast everywhere',
    slug: 'speed',
    lead: 'Pages ready before your visitor’s thumb moves.',
    text: 'No page-building engine running behind every visit: just finished pages, served from Cloudflare’s network close to each visitor. Each site is measured with Google PageSpeed (target 95+ on a phone) before launch and at every check-up, against your old site’s scores.',
  },
  {
    title: 'Modern, not trendy',
    slug: 'tech',
    lead: 'Today’s best tools, chosen to last.',
    text: 'Built with Astro and plain web standards, every change recorded in git, published automatically. No plugins or database to patch, cookie-free statistics, accessibility to WCAG 2.2 AA, light and dark mode. Hosting is free at small-site sizes.',
  },
  {
    title: 'A person, not a help desk',
    slug: 'service',
    lead: 'You talk to the one who built it.',
    text: 'Plain written quotes and reports. Monitoring alerts come to me, often before you’d notice. On a care plan I check your site’s speed, security, links, forms and backups and tell you what I found, in plain English.',
  },
];

// Short contrast table under the cards (full comparison on /websites/compare).
export const contrastRows: [string, string, string][] = [
  [
    'Who owns the address and files',
    'The platform holds the site; you rent it',
    'You do, in your name',
  ],
  ['If you stop paying', 'The site goes offline', 'It keeps running (hosting is free)'],
  ['Moving later', 'Start again elsewhere', 'Copy the files; any developer can take over'],
  [
    'Speed and test scores',
    'Shared engine, heavy scripts; phone scores often well below 90',
    'Finished pages from a global network; 95+ PageSpeed target, measured at launch and every check-up',
  ],
  [
    'Updates and security',
    'Up to the platform, or you (WordPress)',
    'Nothing to patch; checked on a care plan',
  ],
  ['Help', 'Support tickets and forums', 'Me, by email, phone or in person'],
];

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
        'Page titles and descriptions, a sitemap, tidy addresses and sharing previews for Facebook, LinkedIn and texts. Set up in Google Search Console and Bing, so problems show up early.',
      ],
      [
        'On Google Maps, in your name',
        'For local businesses and nonprofits: your Google Business Profile checked and claimed with you as owner, your hours and area marked up for search engines, a review link with a QR code, and a one-page guide to looking after it.',
      ],
      [
        'Accessible',
        'Built to WCAG 2.2 AA: readable contrast, keyboard use, screen-reader labels. Light and dark mode. An accessibility page says so, and how visitors can report a problem.',
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
      [
        'Editing guide and video',
        'Written around your own pages, with screenshots, plus a short video of making a change on your own site.',
      ],
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
      [
        'Locked to secure connections',
        'Your domain added to the list built into every major browser, so they always use HTTPS, even on a first visit. Hard to undo, so it’s your choice.',
      ],
      [
        'A security grade report',
        'Your site’s HTTPS setup graded by Qualys SSL Labs, anything below A+ fixed, and a link you can share.',
      ],
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

// Care plans: one column per plan, with its name, what it is, and its price, so the
// frequency of each item never has to stand in for the plan's name.
export const carePlans: {
  name: string;
  tagline: string;
  price: string;
  perYear: string;
  featured?: boolean;
  /** Stripe Payment Links (Vashon Software account, created 2026-11-24). */
  buy?: { monthly: string; yearly: string };
}[] = [
  { name: 'No plan', tagline: 'Included with every site', price: '$0', perYear: '' },
  {
    name: 'SiteCare',
    tagline: 'Automated, monthly',
    price: '$10/month',
    perYear: 'or $100 a year (2 months free)',
    buy: {
      monthly: 'https://buy.stripe.com/cNi9ATaLd6M3f3n6Xt33W00',
      yearly: 'https://buy.stripe.com/9B67sLaLd1rJcVfgy333W01',
    },
  },
  {
    name: 'SiteCare + Review',
    tagline: 'A person checks it, quarterly',
    price: '$30/month',
    perYear: 'or $300 a year (2 months free)',
    featured: true,
    buy: {
      monthly: 'https://buy.stripe.com/7sYcN5cTlc6ndZj81x33W02',
      yearly: 'https://buy.stripe.com/4gMdR906z2vNdZj95B33W03',
    },
  },
  {
    name: 'SiteCare Complete',
    tagline: 'Hands-on, monthly',
    price: 'By quote',
    perYear: 'Depends on the site',
  },
];
// ✓ / — / text per plan, in carePlans order.
export const careRows: { label: string; cells: string[] }[] = [
  {
    label: 'Site keeps running, monthly visitor email, uptime alerts',
    cells: ['✓', '✓', '✓', '✓'],
  },
  {
    label: 'Automated health report: speed, security, links, renewals, with trends',
    cells: ['—', 'Monthly', 'Monthly', 'Monthly'],
  },
  { label: 'Backup kept off GitHub', cells: ['—', 'Monthly', 'Monthly', 'Monthly'] },
  { label: 'Backup test-restored', cells: ['—', '—', 'Quarterly', 'Monthly'] },
  { label: 'Full health check by me (below)', cells: ['—', '—', 'Quarterly', 'Monthly'] },
  { label: 'Software updates', cells: ['—', '—', 'Quarterly', 'Monthly'] },
  {
    label: 'Written note from me',
    cells: ['—', '—', 'Quarterly', 'Monthly'],
  },
  { label: 'Call to talk it over', cells: ['—', '—', 'Yearly', 'Quarterly'] },
  {
    label: 'Change time included',
    cells: ['Billed hourly', 'Billed hourly', '1 hour a year', '1 hour a month'],
  },
  {
    label: 'When something breaks',
    cells: ['Hourly, best effort', 'Hourly, best effort', 'Best effort', 'First in line, usually the next working day'],
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
  {
    name: 'HSTS Preload List',
    by: 'Chromium project',
    url: 'https://hstspreload.org/',
    what: 'whether browsers always use HTTPS for your domain',
  },
];

// Platform comparison. Typical published US prices, annual billing, November 2026.
// A cell is plain text, or a yes / partly / no mark with a short note (shown tinted).
export type Mark = 'yes' | 'partly' | 'no';
export type CompareCell = string | { mark: Mark; text: string };
export const compareCols = [
  'Typical running cost',
  'Up-front',
  'Who changes it',
  'You own it and can move it',
  'Keeps running if you stop paying',
  'No software patching for you',
  'Speed and test scores',
  'Best for',
];
export const platforms: { name: string; ours?: boolean; cells: CompareCell[] }[] = [
  {
    name: 'Built and owned (this page)',
    ours: true,
    cells: [
      'About $12/yr: hosting $0, a .com domain about $12/yr',
      'Setup, quoted in writing',
      'You (words, photos) or me; layout changes by me',
      {
        mark: 'yes',
        text: 'Plain HTML/CSS/JS from open-source tools; any host, any web professional',
      },
      { mark: 'yes', text: 'Keeps running; just renew the domain' },
      { mark: 'yes', text: 'Nothing to patch: no plugins or database' },
      { mark: 'yes', text: 'Target 95+ in Google PageSpeed on phones; security and HTTPS graded; re-measured at every check-up' },
      'Small businesses wanting low running costs, ownership and a person to call',
    ],
  },
  {
    name: 'Wix',
    cells: [
      'About $204–468/yr ($17–39/mo)',
      'None (you build it)',
      'You, drag-and-drop',
      { mark: 'no', text: 'Classic sites can’t be exported' },
      { mark: 'no', text: 'Falls back to a Wix address with ads' },
      { mark: 'yes', text: 'Wix does it' },
      { mark: 'partly', text: 'Heavy scripts; phone scores often well below 90. Security headers are Wix’s choice' },
      'People who enjoy designing their own pages',
    ],
  },
  {
    name: 'Squarespace',
    cells: [
      'About $192–468/yr ($16–39/mo)',
      'None (you build it)',
      'You, drag-and-drop',
      { mark: 'partly', text: 'Pages and posts export; design is rebuilt' },
      { mark: 'no', text: 'Site goes offline' },
      { mark: 'yes', text: 'Squarespace does it' },
      { mark: 'partly', text: 'Phone scores often well below 90; few speed or security settings you can change' },
      'Polished portfolios and small shops',
    ],
  },
  {
    name: 'GoDaddy builder',
    cells: [
      'About $120–180/yr ($10–15/mo) to start; more at renewal',
      'None (you build it)',
      'You, simple editor',
      { mark: 'no', text: 'No export' },
      { mark: 'no', text: 'Site goes offline' },
      { mark: 'yes', text: 'GoDaddy does it' },
      { mark: 'partly', text: 'Phone scores often well below 90; few settings you can change' },
      'A quick, simple first site',
    ],
  },
  {
    name: 'WordPress.com',
    cells: [
      'About $48–300/yr ($4–25/mo); more for a store',
      'None (you build it)',
      'You, block editor',
      { mark: 'yes', text: 'Exports to any WordPress host' },
      { mark: 'partly', text: 'Drops to the free plan (ads, no own domain)' },
      { mark: 'yes', text: 'WordPress.com does it' },
      { mark: 'partly', text: 'Depends on theme and plugins; higher plans allow tuning' },
      'Blogs and writing-heavy sites',
    ],
  },
  {
    name: 'WordPress, self-hosted',
    cells: [
      'About $200–800/yr for hosting, theme and plugins',
      'Often a developer',
      'You, block editor',
      { mark: 'yes', text: 'Moves to any WordPress host' },
      { mark: 'no', text: 'Offline when hosting lapses' },
      { mark: 'no', text: 'You or a paid maintainer: regular core, theme and plugin updates' },
      { mark: 'partly', text: 'Can be fast with work; theme, plugins and host decide' },
      'Large content sites with someone to maintain them',
    ],
  },
  {
    name: 'Webflow',
    cells: [
      'From about $180/yr ($15/mo) per site',
      'Usually a designer',
      'A designer; you edit content',
      { mark: 'partly', text: 'Code exports; content as CSV' },
      { mark: 'no', text: 'Custom domain stops working' },
      { mark: 'yes', text: 'Webflow does it' },
      { mark: 'partly', text: 'Can score well; animations and scripts often lower phone scores' },
      'Design-led sites built by a designer',
    ],
  },
  {
    name: 'Shopify',
    cells: [
      'From $348/yr ($29/mo), plus card fees',
      'None, or a developer',
      'You',
      { mark: 'partly', text: 'Products and orders export; design doesn’t' },
      { mark: 'no', text: 'Store closes' },
      { mark: 'yes', text: 'Shopify does it' },
      { mark: 'partly', text: 'Theme and each added app slow it; Shopify sets security headers' },
      'Real online stores: stock, shipping, tax',
    ],
  },
  {
    name: 'Square Online',
    cells: [
      '$0 on the free plan (Square branding), or from $588/yr ($49/mo); card fees',
      'None (you build it)',
      'You',
      { mark: 'no', text: 'No site export' },
      { mark: 'partly', text: 'Free plan continues, with Square branding' },
      { mark: 'yes', text: 'Square does it' },
      { mark: 'partly', text: 'Phone scores often well below 90; few settings you can change' },
      'Shops and cafés already using Square',
    ],
  },
  {
    name: 'Google Sites',
    cells: [
      'About $12/yr: free, plus a domain',
      'None (you build it)',
      'You, simple editor',
      { mark: 'no', text: 'No usable export' },
      { mark: 'yes', text: 'Free, so nothing to stop paying' },
      { mark: 'yes', text: 'Google does it' },
      { mark: 'partly', text: 'Simple pages; no control over speed or security settings' },
      'Clubs, classes and simple internal pages',
    ],
  },
];

// "What a built site can do": built in, added from a service, or passed on to a better tool.
// Draft for John's review (Q-VS-30).
export type Fit = 'built' | 'added' | 'elsewhere';
export const canDo: { need: string; fit: Fit; how: string }[] = [
  {
    need: 'Search, blog or news, galleries, a catalogue, a second language',
    fit: 'built',
    how: 'Part of the site itself, with nothing extra to pay for.',
  },
  {
    need: 'Contact, order-request and sign-up forms',
    fit: 'built',
    how: 'Spam-protected; messages come to your email.',
  },
  {
    need: 'Private pages for a family, board or small group',
    fit: 'built',
    how: 'A sign-in in front of those pages (Cloudflare Access, free for up to 50 people).',
  },
  {
    need: 'A few products, deposits or donations',
    fit: 'added',
    how: 'Stripe or PayPal buttons; Zeffy for nonprofit donations.',
  },
  {
    need: 'Booking, appointments and event tickets',
    fit: 'added',
    how: 'Calendly, Square Appointments, Eventbrite or similar, linked or shown on your pages.',
  },
  {
    need: 'Mailing list',
    fit: 'added',
    how: 'A sign-up form on the site; the list and the emails live in Mailchimp, Kit or Buttondown.',
  },
  {
    need: 'An online store with stock, shipping and tax',
    fit: 'elsewhere',
    how: 'Shopify. Your site can link to the store or show a few products from it.',
  },
  {
    need: 'Point of sale and inventory for a shop or café',
    fit: 'elsewhere',
    how: 'Square, or Shopify POS. The site shows hours and links to online ordering.',
  },
  {
    need: 'Member accounts: sign-ups, profiles, paid memberships',
    fit: 'elsewhere',
    how: 'Ghost, Memberful or Squarespace Member Areas.',
  },
  {
    need: 'Online courses, forums or a community',
    fit: 'elsewhere',
    how: 'Teachable or Podia for courses; Discourse, Circle or a Facebook group for discussion.',
  },
  {
    need: 'Marketing campaigns and ads',
    fit: 'elsewhere',
    how: 'A marketer, plus your mailing-list service. The site is ready for them: fast pages, sharing previews, statistics.',
  },
  {
    need: 'Daily publishing by several writers',
    fit: 'elsewhere',
    how: 'WordPress or Ghost.',
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
