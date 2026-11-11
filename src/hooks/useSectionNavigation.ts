import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type SectionId = 'top' | 'services' | 'about';

export interface ScrollState {
  scrollTo?: SectionId;
}

/** Плавний скрол до секції на головній сторінці (або до верху). */
export function scrollToSection(id: SectionId): void {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Навігація до секцій головної сторінки.
 * Якщо користувач на іншій сторінці (наприклад /shop) — спершу перехід на «/»,
 * а HomePage після цього виконує скрол (див. location.state.scrollTo).
 */
export function useSectionNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goTo = useCallback(
    (id: SectionId) => {
      if (pathname === '/') {
        scrollToSection(id);
      } else {
        navigate('/', { state: { scrollTo: id } satisfies ScrollState });
      }
    },
    [navigate, pathname],
  );

  return { goTo };
}
