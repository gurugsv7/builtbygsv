import v2Glimpse1 from '../assets/v2productions/glimpse1.png';
import v2Glimpse2 from '../assets/v2productions/glimpse2.png';
import v2Glimpse3 from '../assets/v2productions/glimpse3.png';
import v2Glimpse4 from '../assets/v2productions/glimpse4.png';
import v2HeroImg from '../assets/v2productions/hero.png';
import v2StoryImg from '../assets/v2productions/the_story.png';

/** Real captures of each build, composed into covers by device frame. Folder name → project id. */
const captured = import.meta.glob<string>('../assets/*/*.webp', { eager: true, import: 'default' });
const CAPTURE_FOLDERS: Record<string, string> = {
  'striatum-4-symposium-platform': 'striatum',
  'e-care-emergency-learning': 'e-care',
  'karaikal-one': 'karaikal-one',
  'neon-rail': 'neon-rail',
  'kamayuu-card-game': 'kamayuu',
  'tempo-word-game': 'tempo',
  'pulse-personal-finance-analyst': 'pulse',
  'gsv-os-studio-operations': 'gsv-os',
  'thaai-clinic-website': 'thaai-clinic',
};
const capture = (folder: string, name: string) => captured[`../assets/${folder}/${name}.webp`];

/** Bundled screenshots per project, shared by the desktop and mobile case studies. */
export const projectMedia: Record<string, { hero?: string; story?: string; glimpses?: string[]; thumb?: string }> = {
  'v2-productions': {
    hero: v2HeroImg,
    story: v2StoryImg,
    glimpses: [v2Glimpse1, v2Glimpse2, v2Glimpse3, v2Glimpse4],
  },
  ...Object.fromEntries(Object.entries(CAPTURE_FOLDERS).map(([id, folder]) => [id, {
    hero: capture(folder, 'hero'),
    story: capture(folder, 'story'),
    thumb: capture(folder, 'thumb'),
    glimpses: [1, 2, 3, 4].map((n) => capture(folder, `glimpse${n}`)).filter(Boolean),
  }])),
};

/** Per-project colours for covers and stages. Anything not listed uses the studio teal. */
export const PROJECT_THEMES: Record<string, { bg: string; accent: string; dark?: boolean }> = {
  'v2-productions': { bg: '#0B1622', accent: '#10B981', dark: true },
  'budget-diet-app': { bg: '#E6F4EA', accent: '#15803D' },
  'thaai-clinic-website': { bg: '#FBE4EE', accent: '#E11D48' },
  'striatum-4-symposium-platform': { bg: '#E8F1FB', accent: '#1D4ED8' },
  'e-care-emergency-learning': { bg: '#FDECEC', accent: '#DC2626' },
  'karaikal-one': { bg: '#FFF4DB', accent: '#B45309' },
  'neon-rail': { bg: '#0B1020', accent: '#0891B2', dark: true },
  'kamayuu-card-game': { bg: '#1C1712', accent: '#CA8A04', dark: true },
  'tempo-word-game': { bg: '#FFF1E6', accent: '#E85D22' },
  'pulse-personal-finance-analyst': { bg: '#E9F7EF', accent: '#059669' },
  'gsv-os-studio-operations': { bg: '#131921', accent: '#0F8B75', dark: true },
};
export const projectTheme = (id: string) => PROJECT_THEMES[id] ?? { bg: '#E2F1ED', accent: '#0F8B75' };
