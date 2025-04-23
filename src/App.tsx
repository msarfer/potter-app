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
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import HousesPage from "@/pages/HousesPage";
import UserRoute from "./components/routes/UserRoute";

function App() {
  return (
    <main className="h-screen w-screen">
      <Navbar />
      <section className="h-9/10 w-full p-10 box-border scroll-smooth overflow-auto">
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <UserRoute>
                  <LoginPage />
                </UserRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UserRoute>
                  <RegisterPage />
                </UserRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BooksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/characters"
              element={
                <ProtectedRoute>
                  <CharactersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spells"
              element={
                <ProtectedRoute>
                  <SpellsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/houses"
              element={
                <ProtectedRoute>
                  <HousesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardPage />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </section>
    </main>
  );
}

export default App;
