export interface PhoneContact {
  /** Номер у форматі для відображення */
  display: string;
  /** Номер у міжнародному форматі для посилань tel:/viber: */
  value: string;
  /** Чи є цей номер у Viber */
  viber: boolean;
}

export interface ContactInfo {
  company: string;
  /** Рядок для пошуку на Google Maps (карта і посилання) */
  mapQuery: string;
  email: string;
  phones: PhoneContact[];
}
