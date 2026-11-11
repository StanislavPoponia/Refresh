import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContactsModalProvider } from './context/ContactsModalContext';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ContactsModalProvider>
        <App />
      </ContactsModalProvider>
    </BrowserRouter>
  </StrictMode>,
);
