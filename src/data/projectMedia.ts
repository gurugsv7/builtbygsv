import v2Glimpse1 from '../assets/v2productions/glimpse1.png';
import v2Glimpse2 from '../assets/v2productions/glimpse2.png';
import v2Glimpse3 from '../assets/v2productions/glimpse3.png';
import v2Glimpse4 from '../assets/v2productions/glimpse4.png';
import v2HeroImg from '../assets/v2productions/hero.png';
import v2StoryImg from '../assets/v2productions/the_story.png';

/** Bundled screenshots per project, shared by the desktop and mobile case studies. */
export const projectMedia: Record<string, { hero?: string; story?: string; glimpses?: string[] }> = {
  'v2-productions': {
    hero: v2HeroImg,
    story: v2StoryImg,
    glimpses: [v2Glimpse1, v2Glimpse2, v2Glimpse3, v2Glimpse4],
  },
};
