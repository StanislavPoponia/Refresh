import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection, type ScrollState } from '../../hooks/useSectionNavigation';
import { AboutSection } from './sections/AboutSection/AboutSection';
import { HeroSection } from './sections/HeroSection/HeroSection';
import { ServicesSection } from './sections/ServicesSection/ServicesSection';

/** Головна сторінка: Hero → Послуги → Про нас. */
export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const target = (location.state as ScrollState | null)?.scrollTo;

  // Прийшли з іншої сторінки з проханням прокрутити до секції (наприклад, з /shop)
  useEffect(() => {
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      scrollToSection(target);
      // Прибираємо state, щоб оновлення сторінки не повторювало скрол
      navigate(location.pathname, { replace: true, state: null });
    });
    return () => cancelAnimationFrame(frame);
  }, [target, navigate, location.pathname]);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
    </>
  );
}
