import { useEffect, useState } from 'react';

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

/**
 * Chrome on Android fires `beforeinstallprompt` when the page can be installed.
 * Returns a function that shows the install sheet, or null when that is not available
 * (iPhone, desktop Safari, or already running as an installed app).
 */
export function useInstallPrompt() {
  const [event, setEvent] = useState<InstallEvent | null>(null);
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    const capture = (e: Event) => { e.preventDefault(); setEvent(e as InstallEvent); };
    const installed = () => setEvent(null);
    window.addEventListener('beforeinstallprompt', capture);
    window.addEventListener('appinstalled', installed);
    return () => { window.removeEventListener('beforeinstallprompt', capture); window.removeEventListener('appinstalled', installed); };
  }, []);
  if (!event) return null;
  return async () => { await event.prompt(); await event.userChoice; setEvent(null); };
}
