import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_PRODUCT, GET_PRODUCTS } from "./queries";

const ProductForm = () => {
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      const { products } = cache.readQuery({ query: GET_PRODUCTS }) as any;
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: { products: [...products, createProduct] }
      });
    }
  });

  let nameInput: any, descriptionInput: any;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        createProduct({
          variables: {
            name: nameInput ? nameInput.value : "",
            description: descriptionInput.value
          }
        });
        nameInput.value = "";
        descriptionInput.value = "";
      }}
    >
      <input
        ref={node => {
          nameInput = node;
        }}
        name="name"
        placeholder="name"
      />
      <input
        ref={node => {
          descriptionInput = node;
        }}
        name="description"
        placeholder="description"
      />
      <button type="submit">Create user</button>
    </form>
  );
};

export default ProductForm;
