import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./components/pages/home/home";
import Products from "./components/pages/product";
import About from "./components/pages/about";
import Profile from "./components/pages/profile";
import ProtectedRoute from "./routes/protectedRoute";

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {}, [user]);

  const handleSignIn = (username: string) => {
    setTimeout(() => {
      setUser(username);
    }, 1000);
  };

  const handleSignUp = (username: string) => {
    setTimeout(() => {
      setUser(username);
    }, 1000);
  };

  return (
    <Router>
      <Header onAuthUser={setUser} user={user} onSignIn={handleSignIn} onSignUp={handleSignUp} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute user={user} onAuthUser={setUser}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/category/:category"
            element={
              <ProtectedRoute user={user} onAuthUser={setUser}>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute user={user} onAuthUser={setUser}>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user} onAuthUser={setUser}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
