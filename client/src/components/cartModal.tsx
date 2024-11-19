import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem";

import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS } from "../graphQL/Query";
import { CREATE_ORDER } from "../graphQL/Mutation";
import { emptyCart } from "../stores/cart";

interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  // Product Data
  const { data } = useQuery(GET_PRODUCTS);

  // Create Order mutation and emptying a cart after order is created
  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      dispatch(emptyCart());
      onClose();
    },
  });

  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store: any) => store.cart.items);

  // total quantity of all items in the cart
  useEffect(() => {
    let total = 0;
    carts.forEach((item: any) => (total += item.quantity));

    setTotalQuantity(total);
  }, [carts]);

  // creating an order
  const handleCreateOrder = () => {
    const order = {
      products: carts.map((cartItem: any) => {
        return {
          id: cartItem.id,
          product_id: cartItem.product_id,
          name: cartItem.name,
          quantity: cartItem.quantity,
          attributes: cartItem.attributes,
        };
      }),
      status: "pending",
      total_price: calculateTotal(),
      order_date: new Date().toISOString(),
    };

    createOrder({ variables: { ...order } });
  };

  // total price of all items in the cart
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
    <div className="absolute right-[-30px] z-50">
      <div className="bg-zinc-50 p-6 w-[25.5rem] shadow-lg relative">
        {/* Total items in bags, displayed accordingly to the number of items ( singular, plural ) */}
        <div className="mb-4 flex space-x-2 items-center">
          <h2 className="text-lg font-bold">My Bag,</h2>
          <p className="text-gray-600">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
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
                  uniqueKey: cartItem.uniqueKey,
                  attributes: cartItem.attributes,
                  allAttributes: product.attributes,
                }}
              />
            );
          })}
        </div>

        <div className="pt-4 my-4">
          {/* Displaying the total price of the cart */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold" data-testid="cart-total">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Place Order Button disabled if there are no items in the cart ( gray ) */}
          <button
            className={`w-full ${
              carts.length === 0
                ? "bg-gray-400"
                : "bg-[#4c9b5f] hover:bg-[#3b804b]"
            }  uppercase tracking-wider text-white py-2`}
            disabled={carts.length === 0 || loading}
            onClick={handleCreateOrder}
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
