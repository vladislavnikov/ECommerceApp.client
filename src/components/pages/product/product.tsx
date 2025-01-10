import SearchBar from "../home/searchBar/searchBar";
import ProductAside from "./productAside";

function Products() {
  return (
    <div className="products-page">
      <ProductAside />
      <main className="products-container">
        <SearchBar />
        <section className="products-grid">
          <div className="product-card">
            <img src="/images/battlefield.jpg" alt="Battlefield 1" />
            <div className="product-info">
              <h4>Battlefield 1</h4>
              <p>23.99$</p>
              <div className="rating">⭐⭐⭐⭐</div>
            </div>
          </div>
          <div className="product-card">
            <img src="/images/csgo.jpg" alt="Counter Strike" />
            <div className="product-info">
              <h4>Counter Strike: Global Offensive</h4>
              <p>10$</p>
              <div className="rating">⭐⭐⭐</div>
            </div>
          </div>
          <div className="product-card">
            <img src="/images/genshin.jpg" alt="Genshin Impact" />
            <div className="product-info">
              <h4>Genshin Impact</h4>
              <p>14.99$</p>
              <div className="rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Products;
