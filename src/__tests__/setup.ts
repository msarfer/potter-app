Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query === "(prefers-color-scheme: dark)", // Simula un tema oscuro
    media: query,
    onchange: null,
    addListener: () => {}, // Métodos vacíos para evitar errores
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});