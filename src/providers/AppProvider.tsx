import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./LanguageProvider";
import { Provider } from "react-redux"
import store from "@/store/store";
import { AuthProvider } from "./AuthProvider";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <LanguageProvider>
            <AuthProvider>
              <BrowserRouter basename="/potter-app">
                {children}
              </BrowserRouter>
              </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}
