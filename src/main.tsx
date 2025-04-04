
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeLocalStorage } from './lib/local-storage';

// Initialize local storage with default data if needed
initializeLocalStorage();

createRoot(document.getElementById("root")!).render(<App />);
