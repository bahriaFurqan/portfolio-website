import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Lenis from '@studio-freight/lenis';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Initialize Lenis for smooth scrolling with custom settings
const lenis = new Lenis({
  duration: 1.2, // scroll duration in seconds
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing
  smoothWheel: true, // smooth on mouse wheel
  smoothTouch: false, // disable on touch devices for native feel
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 