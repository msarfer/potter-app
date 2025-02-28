import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import BooksPage from "@/pages/BooksPage";
import CharactersPage from "@/pages/CharactersPage";
import SpellsPage from "./pages/SpellsPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <main className="h-screen w-screen">
      <Navbar/>
      <section className="h-9/10 w-screen p-10 box-border">
        <Routes>
          <Route index element={<HomePage/>} />
          <Route path="/books" element={<BooksPage/>} />
          <Route path="/characters" element={<CharactersPage/>} />
          <Route path="/spells" element={<SpellsPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
