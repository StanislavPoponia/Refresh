import frigoblock from '../assets/images/brand-frigoblock.webp';
import thermoKing from '../assets/images/brand-thermoking.webp';

export interface Brand {
  id: string;
  name: string;
  /** Фото установки на техніці (якщо є) */
  image?: string;
  /** Позиція кадру при обрізанні (CSS object-position) */
  position?: string;
}

/** Найпоширеніші марки рефрижераторних установок. Країна й опис — у перекладах (i18n). */
export const brands: Brand[] = [
  {
    id: 'thermo-king',
    name: 'Thermo King',
    image: thermoKing,
    position: 'center 30%',
  },
  {
    id: 'carrier',
    name: 'Carrier Transicold',
  },
  {
    id: 'frigoblock',
    name: 'Frigoblock',
    image: frigoblock,
    position: 'center 25%',
  },
  {
    id: 'zanotti',
    name: 'Zanotti',
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi Heavy Industries',
  },
];
