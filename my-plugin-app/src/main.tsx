import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

interface PluginOptions {
  initializedOptions: string[];
  onPositionChange: (positions: string[]) => void;
  onComplete: (positions: string[]) => void;
  onInit: () => void;
  selector: string;
}

declare global {
  interface Window {
    MY_APP: {
      init: (options: PluginOptions) => void;
    };
  }
}

if (import.meta.env.MODE === 'development') {
  const renderElement = document.getElementById('root');
  createRoot(renderElement as HTMLElement).render(
    <App

    />
  );
} else {
  window.MY_APP = {
    init: (options: PluginOptions) => {
      const { selector } = options;
      if (selector) {
        const renderElement = document.querySelector(selector);
        if (renderElement) {
          createRoot(renderElement as HTMLElement).render(
            <App />
          );
        }
      }
    },
  };
}
