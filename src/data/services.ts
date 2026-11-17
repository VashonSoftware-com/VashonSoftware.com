/**
 * The four service areas. Header nav, footer and the Home tiles read from this list,
 * so a rename or a new page only needs a change here (plus the page itself).
 */
export interface ServiceArea {
  href: string;
  /** Label in the footer and mobile menu. */
  nav: string;
  /** Shorter label for the desktop header nav, where space is tight. */
  short?: string;
  /** Page title (h1) and Home tile heading. */
  title: string;
  /** Home tile text. */
  tile: string;
  /** Icon key used by the Features component. */
  icon: 'globe' | 'zap' | 'shield' | 'chart';
}

export const serviceAreas: ServiceArea[] = [
  {
    href: '/websites',
    nav: 'Websites',
    title: 'Websites',
    tile: 'Fast, low-JS, mobile-first sites with proven 100 PageSpeed scores for Performance, Accessibility, Best Practices and SEO. You own them, and you can edit them.',
    icon: 'globe',
  },
  {
    href: '/software',
    nav: 'Software',
    title: 'Crafted Software',
    tile: 'Custom applications in C#, TypeScript, Python and C++. Small language models for GIS and IoT, secure IoT, and data analytics on modern cloud platforms.',
    icon: 'zap',
  },
  {
    href: '/emergency',
    nav: 'Emergency Management Tech',
    short: 'Emergency Tech',
    title: 'Emergency Management Tech',
    tile: 'ICS, NIMS and NRF-based tools for Emergency Operations Centers. Systems that keep working without the cloud, and use it when it is there.',
    icon: 'shield',
  },
  {
    href: '/architecture',
    nav: 'Architecture & Health IT',
    title: 'Architecture & Health IT',
    tile: 'Thirty years of enterprise architecture, including federal health systems, health information exchanges and EHR integration. Consulting, reviews and contract roles.',
    icon: 'chart',
  },
];
