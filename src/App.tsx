import { ModeToggle } from "./components/ModeToggle"
import { ThemeProvider } from "./context/ThemeProvider"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1 className="text-3xl">Potter App</h1>
        <ModeToggle/>
      </ThemeProvider>
    </>
  )
}

export default App
