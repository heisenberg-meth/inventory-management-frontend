import { RouterProvider } from 'react-router';
import { router } from './router';

// Initialize theme before React renders to avoid flash
const saved = localStorage.getItem('ims-theme');
// const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const isDark = saved !== null ? saved === 'dark' : true; // default dark
if (isDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
