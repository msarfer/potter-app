import App from "@/App";
import "@/index.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { buildProvidersTree } from "@/services/providers";
import store from "@/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const AppProvider = buildProvidersTree([
  [Provider, { store }],
  [ThemeProvider, { defaultTheme: "system", storageKey: "vite-ui-theme" }],
  [LanguageProvider, { storageKey: "vite-locale" }],
  [AuthProvider],
  [BrowserRouter, { basename: "/potter-app" }],
]);

export const Root: React.FC = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};
