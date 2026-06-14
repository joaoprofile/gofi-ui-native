export interface NavItem { id: string; label: string; }
export interface NavGroup { group: string; items: NavItem[]; }

/** Sidebar structure. Ids match the keys in pages.tsx. */
export const NAV: NavGroup[] = [
  {
    group: 'Get started',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
    ],
  },
  {
    group: 'Foundations',
    items: [
      { id: 'foundations', label: 'Tokens · Colors · Type' },
      { id: 'theming', label: 'Theme & Dark mode' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'atoms', label: 'Atoms' },
      { id: 'forms', label: 'Forms' },
      { id: 'containers', label: 'Containers & Data' },
      { id: 'overlays', label: 'Overlay & Feedback' },
      { id: 'charts', label: 'Charts' },
    ],
  },
  {
    group: 'Patterns',
    items: [
      { id: 'patterns', label: 'Overview' },
      { id: 'pattern-splash', label: 'Splash' },
      { id: 'pattern-login', label: 'Login / Sign in' },
      { id: 'pattern-register', label: 'Register / Sign up' },
      { id: 'pattern-crud', label: 'CRUD' },
    ],
  },
  {
    group: 'Showcase',
    items: [
      { id: 'showcase', label: 'Overview' },
      { id: 'hero', label: 'Hero / Onboarding' },
      { id: 'dashboard', label: 'Mobile Dashboard' },
      { id: 'finance', label: 'Personal Finance' },
      { id: 'bank', label: 'Blue Famly' },
      { id: 'crm', label: 'Mobile CRM' },
      { id: 'education', label: 'Education App' },
    ],
  },
];

/** Routes that render a full-bleed phone app (no docs chrome padding). */
export const SHOWCASE_ROUTES = new Set([
  'hero', 'dashboard', 'finance', 'bank', 'crm', 'education',
  'pattern-splash', 'pattern-login', 'pattern-register', 'pattern-crud',
]);
