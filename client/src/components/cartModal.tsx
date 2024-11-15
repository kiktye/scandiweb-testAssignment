import { useSelector } from "react-redux";
import CartItem from "./cartItem";
import { GET_PRODUCTS } from "../graphQL/Query";
import { useQuery } from "@apollo/client";
import React from "react";

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  const { data } = useQuery(GET_PRODUCTS);
  const carts = useSelector((store: any) => store.cart.items);
  

  const calculateTotal = () => {
    return carts.reduce((total: number, cartItem: any) => {
      const product = data?.products.find(
        (product: any) => product.id === cartItem.id
      );
      if (!product) return total;

      const price = product.prices[0]?.amount || 0;
      return total + price * cartItem.quantity;
    }, 0);
  };

  return (
    <div className="absolute right-[-20px] z-50">
      <div className="bg-zinc-50 p-6 w-[22.5rem] shadow-lg relative">
        <div className="mb-4 flex space-x-2 items-center">
          <h2 className="text-lg font-bold">My Bag,</h2>
          <p className="text-gray-600">
            {carts.length} {carts.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-8 max-h-[25rem] overflow-y-scroll">
          {carts.map((cartItem: any) => {
            const product = data?.products.find(
              (product: any) => product.id === cartItem.id
            );

            if (!product) return null;


            return (
              <CartItem
                key={cartItem.uniqueKey}
                data={{
                  ...product,
                  quantity: cartItem.quantity,
                  attributes: cartItem.attributes,
                  allAttributes: product.attributes,
                }}
              />
            );
          })}
        </div>

        <div className="pt-4 my-4">
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold">
            ${calculateTotal().toFixed(2)}
            </span>
          </div>

          <button className="w-full bg-[#50ac69] uppercase tracking-wider text-white py-2 hover:bg-[#4c9b5f]">
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
