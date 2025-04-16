import { Navbar } from "@/components/Navbar";
import AdminRoute from "@/components/routes/AdminRoute";
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import BooksPage from "@/pages/BooksPage";
import CharactersPage from "@/pages/CharactersPage";
import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import SpellsPage from "@/pages/SpellsPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <main className="h-screen w-screen">
      <Navbar/>
      <section className="h-9/10 w-full p-10 box-border scroll-smooth overflow-auto">
        <Routes>
          <Route index element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<RegisterPage/>} />
          <Route path="/books" element={<ProtectedRoute><BooksPage/></ProtectedRoute>} />
          <Route path="/characters" element={<ProtectedRoute><CharactersPage/></ProtectedRoute>} />
          <Route path="/spells" element={<ProtectedRoute><SpellsPage/></ProtectedRoute>} />
          <Route path="/houses" element={<ProtectedRoute><BooksPage/></ProtectedRoute>} />
          <Route path="/dashboard" element={<AdminRoute><DashboardPage/></AdminRoute>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
