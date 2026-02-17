import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {extend: {colors: {background: '#0b1020', foreground: '#f9fafb', primary: '#0ea5e9'}}},
  plugins: []
};
export default config;
