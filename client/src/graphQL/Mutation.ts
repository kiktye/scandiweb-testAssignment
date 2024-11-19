import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder(
    $products: [ProductInput!]!
    $status: String
    $total_price: Float
    $order_date: String
  ) {
    createOrder(
      products: $products
      status: $status
      total_price: $total_price
      order_date: $order_date
    ) {
      products
      status
      total_price
      order_date
    }
  }
`;
