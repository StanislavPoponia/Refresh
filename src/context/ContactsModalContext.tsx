import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface ContactsModalValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactsModalContext = createContext<ContactsModalValue | null>(null);

export function ContactsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <ContactsModalContext.Provider value={value}>{children}</ContactsModalContext.Provider>;
}

export function useContactsModal(): ContactsModalValue {
  const ctx = useContext(ContactsModalContext);
  if (!ctx)
    throw new Error('useContactsModal має використовуватись всередині ContactsModalProvider');
  return ctx;
}
