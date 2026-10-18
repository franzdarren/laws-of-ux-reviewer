import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Dark by default; a saved choice from the theme button wins.
let theme = 'dark';
try {
  theme = localStorage.getItem('laws-of-ux-reviewer:theme') || 'dark';
} catch {}
document.documentElement.dataset.theme = theme;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
