import carrier from '../assets/images/type-carrier.webp';
import trailers from '../assets/images/type-trailers.webp';
import van from '../assets/images/type-van.webp';

export interface ReeferType {
  id: string;
  image: string;
  /** Позиція кадру при обрізанні (CSS object-position) */
  position?: string;
}

/** Типи рефрижераторів, з якими працює компанія (показуються у першому екрані). */
export const reeferTypes: ReeferType[] = [
  {
    id: 'trailers',
    image: trailers,
    position: 'center 40%',
  },
  {
    id: 'van',
    image: van,
    position: 'center 40%',
  },
  {
    id: 'carrier',
    image: carrier,
    position: 'center 40%',
  },
];
