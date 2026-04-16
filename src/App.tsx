import { RouterProvider } from 'react-router';
import { router } from './router';
import { AuthProvider } from './context/AuthContext';

// Initialize theme before React renders to avoid flash
const saved = localStorage.getItem('ims-theme');
// const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const isDark = saved !== null ? saved === 'dark' : true; // default dark
if (isDark) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
