import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import SiteRouter from './SiteRouter.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Unable to start BuiltbyGSV: missing #root element.');

createRoot(rootElement).render(
  <StrictMode>
    <SiteRouter />
  </StrictMode>,
);
