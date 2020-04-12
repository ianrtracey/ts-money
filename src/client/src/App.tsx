import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import ProductList from "./components/products/ProductList";
import ProductForm from "./components/products/ProductForm";

const GET_HELLO_WORLD = gql`
  query {
    helloWorld
  }
`;

type HelloWorldData = {
  helloWorld: string;
};

interface IButtonProps {
  primary?: string;
}
const Button = styled.button<IButtonProps>`
  background: ${props => (props.primary ? "palevioletred" : "white")};
  color: ${props => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const App = () => {
  return (
    <div>
      <h1>An amazing app</h1>
      <ProductForm />
      <ProductList />
      <Button>I'm a styled button</Button>
    </div>
  );
};

export default App;
