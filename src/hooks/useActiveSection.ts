import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { SectionId } from './useSectionNavigation';

export type TrackedSection = Exclude<SectionId, 'top'>;

const SECTIONS: TrackedSection[] = ['services', 'about'];

/**
 * Визначає, у якій секції головної сторінки зараз користувач (scroll-spy).
 * `hold` одразу підсвічує обрану секцію після кліку й утримує її, поки триває плавний
 * скрол, щоб підсвітка не стрибала по проміжних секціях.
 */
export function useActiveSection() {
  const { pathname } = useLocation();
  const [spy, setSpy] = useState<TrackedSection | null>(null);
  const [held, setHeld] = useState<TrackedSection | null>(null);
  const holdTimer = useRef<number | undefined>(undefined);

  const releaseSoon = useCallback(() => {
    window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => setHeld(null), 250);
  }, []);

  const hold = useCallback(
    (id: TrackedSection) => {
      setHeld(id);
      releaseSoon();
    },
    [releaseSoon],
  );

  useEffect(() => {
    if (pathname !== '/') {
      setSpy(null);
      return;
    }

    let frame = 0;
    const compute = () => {
      frame = 0;
      // Лінія спостереження: трохи нижче хедера, у верхній третині екрана
      const line = window.innerHeight * 0.35;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: TrackedSection | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Якщо докрутили до кінця сторінки — остання секція, навіть якщо вона коротка
      if (atBottom) current = SECTIONS[SECTIONS.length - 1];
      setSpy(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
      setHeld((prev) => {
        if (prev) releaseSoon();
        return prev;
      });
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(holdTimer.current);
    };
  }, [pathname, releaseSoon]);

  return { active: held ?? spy, hold };
}
