import frigoblock from '../assets/images/brand-frigoblock.webp';
import thermoKing from '../assets/images/brand-thermoking.webp';

export interface Brand {
  id: string;
  name: string;
  country: string;
  description: string;
  /** Фото установки на техніці (якщо є) */
  image?: string;
  /** Позиція кадру при обрізанні (CSS object-position) */
  position?: string;
}

/** Найпоширеніші марки рефрижераторних установок в Європі та Україні. */
export const brands: Brand[] = [
  {
    id: 'thermo-king',
    name: 'Thermo King',
    country: 'США',
    description: 'Установки для напівпричепів, вантажівок і фургонів',
    image: thermoKing,
    position: 'center 30%',
  },
  {
    id: 'carrier',
    name: 'Carrier Transicold',
    country: 'США',
    description: 'Установки для напівпричепів, вантажівок і контейнерів',
  },
  {
    id: 'frigoblock',
    name: 'Frigoblock',
    country: 'Німеччина',
    description: 'Установки для вантажівок і причепів',
    image: frigoblock,
    position: 'center 25%',
  },
  {
    id: 'zanotti',
    name: 'Zanotti',
    country: 'Італія',
    description: 'Установки для фургонів і середньотонажних вантажівок',
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi Heavy Industries',
    country: 'Японія',
    description: 'Компактні установки для фургонів і малотоннажного транспорту',
  },
];
