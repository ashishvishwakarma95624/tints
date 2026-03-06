import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4500,
          style: {
            background: '#0a0a0a',
            color: '#fff',
            fontSize: '13.5px',
            fontFamily: '"DM Sans", sans-serif',
            borderRadius: '10px',
            padding: '12px 18px',
          },
          success: { iconTheme: { primary: '#c8a96e', secondary: '#0a0a0a' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          loading: { iconTheme: { primary: '#c8a96e', secondary: '#0a0a0a' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
