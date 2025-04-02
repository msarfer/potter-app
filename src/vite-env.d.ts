/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_FIREBASE_API_KEY: string;
  VITE_POTTER_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}