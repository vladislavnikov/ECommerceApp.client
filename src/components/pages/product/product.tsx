import ProductAside from "./productAside";
import ProductSection from "./productSection";
import * as styles from "./product.module.scss";

function Products() {
  return (
    <div className={styles.products}>
      <ProductAside />
      <ProductSection />
    </div>
  );
}

export default Products;
