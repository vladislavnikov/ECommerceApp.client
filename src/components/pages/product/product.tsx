import { useState } from "react";
import { sortingParams } from "@/shared/models/sortingParams";
import ProductAside from "./productAside";
import ProductSection from "./productSection";
import * as styles from "./product.module.scss";

function Products() {
  const [filters, setFilters] = useState<sortingParams>({});

  return (
    <div className={styles.products}>
      <ProductAside filters={filters} setFilters={setFilters} />
      <ProductSection filters={filters} />
    </div>
  );
}

export default Products;
