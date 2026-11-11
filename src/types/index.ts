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
  city: string;
  email: string;
  phones: PhoneContact[];
  schedule: { days: string; hours: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
}
