import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextProvider from "./context/Context";  // ✅ default import

createRoot(document.getElementById('root')).render(
    <ContextProvider>
      <App />
    </ContextProvider>
);
