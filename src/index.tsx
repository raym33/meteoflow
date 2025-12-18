import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('MeteoFlow: Iniciando...');

try {
  const root = document.getElementById('root');
  console.log('MeteoFlow: Root element:', root);

  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('MeteoFlow: App renderizada');
  } else {
    console.error('MeteoFlow: No se encontró el elemento root');
  }
} catch (error) {
  console.error('MeteoFlow: Error al iniciar:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">Error: ${error}</div>`;
}
