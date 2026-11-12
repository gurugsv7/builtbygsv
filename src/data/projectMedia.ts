
/** Real captures of each build, composed into covers by device frame. Folder name → project id. */
const captured = import.meta.glob<string>(['../assets/*/*.webp', '!../assets/neon-rail/*.webp'], { eager: true, import: 'default' });
const CAPTURE_FOLDERS: Record<string, string> = {
  'striatum-4-symposium-platform': 'striatum',
  'karaikal-one': 'karaikal-one',
  's4skillup': 's4skillup',
  'kamayuu-card-game': 'kamayuu',
  'tempo-word-game': 'tempo',
  'gsv-os-studio-operations': 'gsv-os',
  'thaai-clinic-website': 'thaai-clinic',
};
const capture = (folder: string, name: string) => captured[`../assets/${folder}/${name}.webp`];

/** Bundled screenshots per project, shared by the desktop and mobile case studies. */
export const projectMedia: Record<string, { hero?: string; story?: string; glimpses?: string[]; thumb?: string }> = {
  ...Object.fromEntries(Object.entries(CAPTURE_FOLDERS).map(([id, folder]) => [id, {
    hero: capture(folder, 'hero'),
    story: capture(folder, 'story'),
    thumb: capture(folder, 'thumb'),
    glimpses: [1, 2, 3, 4].map((n) => capture(folder, `glimpse${n}`)).filter(Boolean),
  }])),
};

/** Per-project colours for covers and stages. Anything not listed uses the studio teal. */
export const PROJECT_THEMES: Record<string, { bg: string; accent: string; dark?: boolean }> = {
  's4skillup': { bg: '#E8EDFF', accent: '#2946E9' },
  'thaai-clinic-website': { bg: '#FBE4EE', accent: '#E11D48' },
  'striatum-4-symposium-platform': { bg: '#E8F1FB', accent: '#1D4ED8' },
  'karaikal-one': { bg: '#FFF4DB', accent: '#B45309' },
  'kamayuu-card-game': { bg: '#1C1712', accent: '#CA8A04', dark: true },
  'tempo-word-game': { bg: '#FFF1E6', accent: '#E85D22' },
  'gsv-os-studio-operations': { bg: '#131921', accent: '#0F8B75', dark: true },
  'reelcut-ai-video-editor': { bg: '#1C1916', accent: '#FF5A36', dark: true },
};
export const projectTheme = (id: string) => PROJECT_THEMES[id] ?? { bg: '#E2F1ED', accent: '#0F8B75' };
