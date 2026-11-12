import carrier from '../assets/images/type-carrier.webp';
import trailers from '../assets/images/type-trailers.webp';
import van from '../assets/images/type-van.webp';

export interface ReeferType {
  id: string;
  title: string;
  description: string;
  image: string;
  /** Позиція кадру при обрізанні (CSS object-position) */
  position?: string;
}

/** Типи рефрижераторів, з якими працює компанія (показуються у першому екрані). */
export const reeferTypes: ReeferType[] = [
  {
    id: 'trailers',
    title: 'Рефрижераторні напівпричепи',
    description: 'Напівпричепи з холодильними установками для магістральних перевезень',
    image: trailers,
    position: 'center 40%',
  },
  {
    id: 'van',
    title: 'Фургони-рефрижератори',
    description: 'Вантажівки з рефрижераторним фургоном для міста й регіонів',
    image: van,
    position: 'center 40%',
  },
  {
    id: 'carrier',
    title: 'Напівпричепи з установками Carrier',
    description: 'Ремонт і обслуговування установок на напівпричепах',
    image: carrier,
    position: 'center 40%',
  },
];
