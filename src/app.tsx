import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "src/constants/routes";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./components/pages/home/home";
import Products from "./components/pages/product/product";
import About from "./components/pages/about";
import Profile from "./components/pages/profile/profile";
import ProtectedRoute from "./routes/protectedRoute";
import Cart from "./components/pages/cart/cart";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path={ROUTES.PRODUCTS}
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PRODUCT_CATEGORY}
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ABOUT}
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.CART}
            element={
              <ProtectedRoute>
                <Cart />
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
