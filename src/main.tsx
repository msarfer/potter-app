import App from '@/App'
import '@/index.css'
import { AuthProvider } from '@/providers/AuthProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { buildProvidersTree } from '@/services/providers'
import store from '@/store/store'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const AppProvider = buildProvidersTree([
  [Provider, { store }],
  [ThemeProvider, { defaultTheme: "system", storageKey: "vite-ui-theme"}],
  [LanguageProvider, { storageKey: "vite-locale"}],
  [AuthProvider],
  [BrowserRouter, { basename: '/potter-app'}]
])

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>
)
