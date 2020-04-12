import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS } from "./queries";

type Product = {
  name: string;
  description?: string;
};

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading || error) return null;

  return (
    <div>
      {data.products.map((product: Product, i: number) => (
        <div key={i}>
          {product.name} - {product.description}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
