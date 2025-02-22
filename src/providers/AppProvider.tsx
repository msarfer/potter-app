import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { BrowserRouter } from "react-router-dom";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter basename="/potter-app">
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
