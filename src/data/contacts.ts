import type { ContactInfo } from '../types';

/**
 * ЄДИНЕ джерело контактних даних, що не залежать від мови (телефони, пошта, карта).
 * Адреса, місто й графік — у перекладах: src/i18n/uk.ts та en.ts (розділ contacts).
 */
export const contacts: ContactInfo = {
  company: 'RefChe',
  mapQuery: 'вулиця Сергія Ватрича, 24Б, Чернівці, Чернівецька область, Україна',
  email: 'jelezniyser@gmail.com',
  phones: [
    { display: '+38 (095) 201-60-46', value: '+380952016046', viber: true },
    { display: '+38 (050) 522-70-03', value: '+380505227003', viber: true },
  ],
};

/**
 * Відкриває вікно нового листа в Gmail з уже заповненими адресою і темою.
 * Працює без налаштованої поштової програми (на відміну від mailto:).
 */
export const emailLink = (subject: string): string =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    contacts.email,
  )}&su=${encodeURIComponent(subject)}`;

/** Відкриває цю адресу в Google Maps (на телефоні — у додатку). */
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contacts.mapQuery,
)}`;

/** Адреса для вбудованої карти (iframe) — ключ API не потрібен. lang — мова підписів на карті. */
export const mapEmbedSrc = (lang: string): string =>
  `https://www.google.com/maps?q=${encodeURIComponent(
    contacts.mapQuery,
  )}&hl=${lang}&z=16&output=embed`;

/** Посилання на чат у Viber. */
export const viberLink = (phone: string): string =>
  `viber://chat?number=${encodeURIComponent(phone)}`;

export const telLink = (phone: string): string => `tel:${phone}`;
