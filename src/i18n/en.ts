import type { Dictionary } from './uk';

/** English — second site language. Keep the same keys as in uk.ts. */
export const en: Dictionary = {
  meta: {
    title: 'RefChe — reefer unit repair in Chernivtsi',
    description:
      'RefChe — repair and diagnostics of refrigerated trucks and trailers in Chernivtsi, Ukraine. Refrigeration units for vehicles of all types.',
  },

  nav: {
    services: 'Services',
    contacts: 'Contacts',
    shop: 'Shop',
    about: 'About us',
    mainMenu: 'Main menu',
    mobileMenu: 'Mobile menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  theme: {
    label: 'Site theme',
    light: 'Light theme (cold)',
    dark: 'Dark theme (heat)',
  },

  language: {
    label: 'Site language',
    uk: 'Українська',
    en: 'English',
  },

  logo: { aria: 'RefChe — back to the top of the site' },

  hero: {
    title: 'Reefer unit repair and diagnostics in Chernivtsi',
    lead: 'We bring the cold back to your cargo: we find the fault quickly and repair refrigeration units of all types reliably.',
    services: 'Our services',
    contact: 'Get in touch',
  },

  reeferTypes: {
    heading: 'Reefers we work with',
    items: {
      trailers: {
        title: 'Refrigerated semi-trailers',
        description: 'Semi-trailers with refrigeration units for long-haul transport',
      },
      van: {
        title: 'Refrigerated vans',
        description: 'Trucks with a refrigerated body for city and regional deliveries',
      },
      carrier: {
        title: 'Semi-trailers with Carrier units',
        description: 'Repair and servicing of units on semi-trailers',
      },
    },
  },

  services: {
    title: 'Services',
    photoAlt: 'A mechanic repairing a refrigeration unit on a semi-trailer',
    introTitle: 'Reefer repair and diagnostics',
    introText:
      'Our company repairs and diagnoses refrigeration units of all types — for trucks, semi-trailers and vans. We work with equipment from popular manufacturers and get it back in operation as fast as possible.',
    items: [
      {
        id: 'diagnostics',
        title: 'Diagnostics',
        description:
          'Computer and visual diagnostics of refrigeration units, finding the causes of faults.',
      },
      {
        id: 'repair',
        title: 'Reefer repair',
        description:
          'Repair of refrigeration units on trucks and semi-trailers of various types and makes.',
      },
      {
        id: 'compressors',
        title: 'Compressors and engines',
        description:
          'Repair and replacement of compressors, diesel engines and drives of refrigeration units.',
      },
      {
        id: 'freon',
        title: 'Refrigerant recharge',
        description: 'Leak detection, vacuuming and recharging the system with refrigerant.',
      },
      {
        id: 'electric',
        title: 'Electrics and automation',
        description: 'Repair of control units, sensors and wiring, and setup of temperature modes.',
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        description: 'Scheduled service so your reefer runs reliably and the cargo arrives fresh.',
      },
    ],
  },

  brands: {
    title: 'Brands we work with',
    lead: 'We repair and service the most common refrigeration units in Europe and Ukraine.',
    photoAlt: '{name} unit on a reefer',
    items: {
      'thermo-king': {
        country: 'USA',
        description: 'Units for semi-trailers, trucks and vans',
      },
      carrier: {
        country: 'USA',
        description: 'Units for semi-trailers, trucks and containers',
      },
      frigoblock: { country: 'Germany', description: 'Units for trucks and trailers' },
      zanotti: {
        country: 'Italy',
        description: 'Units for vans and medium-duty trucks',
      },
      mitsubishi: {
        country: 'Japan',
        description: 'Compact units for vans and light commercial vehicles',
      },
    },
  },

  about: {
    title: 'About us',
    intro:
      'Our team are experienced mechanics with many years of work on refrigeration equipment. We know refrigeration units inside out, so we find the fault quickly and repair it reliably.',
    advantages: [
      {
        id: 'experience',
        title: 'Years of experience',
        description: 'Many years of experience repairing reefers of different types and makes.',
      },
      {
        id: 'professional',
        title: 'Professionalism',
        description: 'Modern diagnostic equipment and quality spare parts for every repair.',
      },
      {
        id: 'speed',
        title: 'Fast results',
        description: 'We value your time: minimal vehicle downtime and honest deadlines.',
      },
      {
        id: 'contact',
        title: 'Always available',
        description: 'Our mechanics answer calls, Viber messages and emails during working hours.',
      },
    ],
    howWeWork:
      'Our mechanics are always reachable. To book a consultation or a repair, open the “Contacts” tab and get in touch with us.',
    button: 'Contacts',
  },

  contacts: {
    title: 'Contacts',
    subtitle: 'Get in touch — book a consultation or a repair.',
    close: 'Close',
    labelAddress: 'Address',
    labelPhones: 'Phones',
    labelEmail: 'Email',
    labelSchedule: 'Working hours',
    city: 'Chernivtsi',
    address: '24 B Serhiia Vatrycha St, Chernivtsi, Chernivtsi Oblast, Ukraine',
    formerAddress: 'formerly 24b Cherepovetska St',
    schedule: [
      { days: 'Mon – Fri', hours: '09:00 – 21:00' },
      { days: 'Sat – Sun', hours: 'Closed' },
    ],
    emailSubject: 'Repair / consultation request (RefChe)',
    viber: 'Viber',
    viberAria: 'Message on Viber {phone}',
    mapTitle: 'Map: {address}',
    mapOpen: 'Open in Google Maps',
    mapOpenAria: 'Open in Google Maps: {address}',
  },

  footer: {
    tagline: 'Repair and diagnostics of refrigeration units in Chernivtsi.',
    quickLinks: 'Quick links',
    rights: 'All rights reserved.',
  },

  shop: {
    title: 'Spare parts shop is under construction',
    text: 'We are preparing a catalogue of spare parts for reefers. The shop will appear here soon — in the meantime, contact us and we will find the part you need.',
    home: 'Back to home',
  },

  notFound: {
    svgAlt: 'A refrigerated trailer with a broken refrigeration unit',
    title: 'Looks like the unit has stopped working — try restarting it',
    text: 'Page not found: the link is outdated or the address was typed incorrectly.',
    home: 'Back to home',
  },

  loading: 'Loading…',
};
