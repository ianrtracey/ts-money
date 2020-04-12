import { gql } from "apollo-boost";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $description: String) {
    createProduct(input: { name: $name, description: $description }) {
      name
      description
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    products {
      name
      description
    }
  }
`;
