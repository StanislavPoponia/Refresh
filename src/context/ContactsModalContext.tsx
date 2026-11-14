import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

interface ContactsModalValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  /** Відкриває контакти; після закриття викликає onClosed (наприклад, повернення до картки товару). */
  openWithReturn: (onClosed: () => void) => void;
}

const ContactsModalContext = createContext<ContactsModalValue | null>(null);

export function ContactsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const returnRef = useRef<(() => void) | null>(null);
  const open = useCallback(() => {
    returnRef.current = null;
    setIsOpen(true);
  }, []);
  const openWithReturn = useCallback((onClosed: () => void) => {
    returnRef.current = onClosed;
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    const back = returnRef.current;
    returnRef.current = null;
    back?.();
  }, []);
  const value = useMemo(
    () => ({ isOpen, open, close, openWithReturn }),
    [isOpen, open, close, openWithReturn],
  );

  return <ContactsModalContext.Provider value={value}>{children}</ContactsModalContext.Provider>;
}

export function useContactsModal(): ContactsModalValue {
  const ctx = useContext(ContactsModalContext);
  if (!ctx)
    throw new Error('useContactsModal має використовуватись всередині ContactsModalProvider');
  return ctx;
}
