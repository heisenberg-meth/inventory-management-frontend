import { useState, useRef, useCallback, useEffect } from 'react';

export type DropdownId = 'features' | 'solutions' | 'pricing' | 'testimonials';

export function useMegaDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((id: DropdownId) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveDropdown(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 100);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const close = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveDropdown(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return { activeDropdown, open, scheduleClose, cancelClose, close };
}
