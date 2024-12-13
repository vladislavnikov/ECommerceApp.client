import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Modal from "src/components/header/modals/modal";
import SignIn from "src/components/header/modals/signIn";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./components/pages/home/home";
import Products from "./components/pages/product";
import About from "./components/pages/about";
import Profile from "./components/pages/profile";
import ProtectedRoute from "./routes/protectedRoute";

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [isSignInOpen, setSignInOpen] = useState(false);

  const handleSignIn = (username: string) => {
    setTimeout(() => {
      setUser(username);
      setSignInOpen(false);
    }, 1000);
  };

  const handleSignUp = (username: string) => {
    setTimeout(() => {
      setUser(username);
      setSignInOpen(false);
    }, 1000);
  };

  return (
    <Router>
      <Header onAuthUser={setUser} user={user} onSignIn={handleSignIn} onSignUp={handleSignUp} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} setSignInOpen={setSignInOpen} />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute isAuthenticated={!!user} onAuthUser={setUser}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute isAuthenticated={!!user} onAuthUser={setUser}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={!!user} onAuthUser={setUser}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />

      {isSignInOpen && (
        <Modal isOpen={isSignInOpen} onClose={() => setSignInOpen(false)}>
          <SignIn onSubmit={handleSignIn} />
        </Modal>
      )}
    </Router>
  );
}

export default App;
