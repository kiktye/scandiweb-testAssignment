import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      product_id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
          __typename
        }
        name
        type
        __typename
      }
      prices {
        amount
        currency {
          label
          symbol
          __typename
        }
        __typename
      }
      brand
      __typename
    }
  }
`;

export const PRODUCT = gql`
  query ($id: ID!) {
    product(id: $id) {
      id
      product_id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
          __typename
        }
        name
        type
        __typename
      }
      prices {
        amount
        currency {
          label
          symbol
          __typename
        }
        __typename
      }
      brand
      __typename
    }
  }
`;

export const CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const CATEGORY = gql`
  query ($id: ID!) {
    category(id: $id) {
      name
      __typename
    }
  }
`;

export const CATEGORIES_AND_PRODUCTS = gql`
  query {
    categories {
      name
    }

    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        items {
          displayValue
          value
          id
          __typename
        }
        name
        type
        __typename
      }
      prices {
        amount
        currency {
          label
          symbol
          __typename
        }
        __typename
      }
      brand
      __typename
    }
  }
`;
