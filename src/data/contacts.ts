import type { ContactInfo } from '../types';

/** ЄДИНЕ джерело контактних даних: хедер, модальне вікно і футер беруть дані звідси. */
export const contacts: ContactInfo = {
  company: 'RefChe',
  city: 'Чернівці',
  address: 'Чернівці, Чернівецька область, вул. Сергія Ватрича, 24 Б',
  formerAddress: 'колишня вул. Череповецька, 24б',
  mapQuery: 'вулиця Сергія Ватрича, 24Б, Чернівці, Чернівецька область, Україна',
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

const emailSubject = 'Запит на ремонт / консультацію (RefChe)';

/**
 * Відкриває вікно нового листа в Gmail з уже заповненими адресою і темою.
 * Працює без налаштованої поштової програми (на відміну від mailto:).
 */
export const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contacts.email,
)}&su=${encodeURIComponent(emailSubject)}`;

/** Запасний варіант: відкрити поштову програму на пристрої. */
export const mailtoLink = `mailto:${contacts.email}?subject=${encodeURIComponent(emailSubject)}`;

/** Відкриває цю адресу в Google Maps (на телефоні — у додатку). */
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contacts.mapQuery,
)}`;

/** Адреса для вбудованої карти (iframe) — ключ API не потрібен. */
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  contacts.mapQuery,
)}&hl=uk&z=16&output=embed`;

/** Посилання на чат у Viber. */
export const viberLink = (phone: string): string =>
  `viber://chat?number=${encodeURIComponent(phone)}`;

export const telLink = (phone: string): string => `tel:${phone}`;
