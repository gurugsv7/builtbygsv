import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import SiteRouter from './SiteRouter.tsx';
import './index.css';
import { MotionProvider } from './motion/primitives';
import { initAnalytics } from './analytics';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Unable to start BuiltbyGSV: missing #root element.');

createRoot(rootElement).render(
  <StrictMode>
    <MotionProvider>
      <SiteRouter />
    </MotionProvider>
  </StrictMode>,
);

// After first paint, so analytics never competes with rendering.
if ('requestIdleCallback' in window) window.requestIdleCallback(initAnalytics);
else setTimeout(initAnalytics, 1500);
