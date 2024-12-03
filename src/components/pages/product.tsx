import { useParams } from "react-router-dom";

function Products() {
  const { category } = useParams();

  return (
    <div>
      <h1>Products</h1>
      {category ? <p>{category.toUpperCase()}</p> : <p>Showing all products</p>}
    </div>
  );
}

export default Products;
