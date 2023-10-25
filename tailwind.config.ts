import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '426px',
      md: '769px',
      'semimd': '901px',
      lg: '1281px'
    },
    extend: {
      colors: {
        'text': '#041e25',
        'background': '#edf9fd',
        'primary': '#10677f',
        'secondary': '#bbeaf7',
        'third': '#76d5ef',
        'accent': '#19a5cc',
      },            
    },
  },
  plugins: [],
}
export default config