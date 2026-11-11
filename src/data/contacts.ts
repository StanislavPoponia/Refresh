import type { ContactInfo } from '../types';

/** ЄДИНЕ джерело контактних даних: хедер, модальне вікно і футер беруть дані звідси. */
export const contacts: ContactInfo = {
  company: 'RefChe',
  city: 'Чернівці',
  email: 'jelezniyser@gmail.com',
  phones: [
    { display: '+38 (095) 201-60-46', value: '+380952016046', viber: true },
    { display: '+38 (050) 522-70-03', value: '+380505227003', viber: true },
  ],
  schedule: [
    { days: 'Пн – Пт', hours: '09:00 – 21:00' },
    { days: 'Сб – Нд', hours: 'Вихідні' },
  ],
};

/** Посилання mailto: відкриває поштовий клієнт одразу з новим листом. */
export const emailLink = `mailto:${contacts.email}?subject=${encodeURIComponent(
  'Запит на ремонт / консультацію (RefChe)',
)}`;

/** Посилання на чат у Viber. */
export const viberLink = (phone: string): string =>
  `viber://chat?number=${encodeURIComponent(phone)}`;

export const telLink = (phone: string): string => `tel:${phone}`;
