import { useDispatch } from "react-redux";

type Attribute = {
  id: number;
  name: string;
  items: { id: number; displayValue: string; value: string }[];
};

type Price = {
  currency: { symbol: string };
  amount: number;
};

type CartItemProps = {
  data: {
    id: number;
    product_id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    prices: Price[];
    allAttributes: Attribute[];
    attributes: { [key: string]: string };
    quantity: number;
    uniqueKey: string;
  };
};

const CartItem = (props: CartItemProps) => {
  const {
    uniqueKey,
    id,
    name,
    gallery,
    prices,
    allAttributes,
    attributes,
    quantity,
  } = props.data;

  const dispatch = useDispatch();

  const handlePlusQuantity = () => {
    dispatch({ type: "cart/plusQuantity", payload: uniqueKey });
  };

  const handleMinusQuantity = () => {
    if (quantity > 1) {
      dispatch({ type: "cart/minusQuantity", payload: uniqueKey });
    } else {
      dispatch({ type: "cart/removeItem", payload: uniqueKey });
    }
  };

  return (
    <div className="flex items-center justify-around space-x-4">
      <div className="flex flex-col items-start space-y-4">
        {/* product name and price */}
        <h3 className="text-xl tracking-widest">{name}</h3>
        <p className="font-medium text-lg" data-testid="cart-item-amount">
          {prices[0].currency.symbol}
          {(prices[0].amount * quantity).toFixed(2)}
        </p>

        {/* attrs */}
        <div className="flex flex-col space-y-4">
          {allAttributes.map((attribute) => {
            const kebabCaseAttrName = attribute.name
              .toLowerCase()
              .replace(/\s+/g, "-");

            return (
              <div
                key={attribute.id}
                className="flex flex-col"
                data-testid={`cart-item-attribute-${kebabCaseAttrName}`}
              >
                <h1 className="text-sm font-medium">
                  {attribute.name.toUpperCase()}:
                </h1>

                {/* Attr Items */}
                <div className="flex space-x-2">
                  {attribute.items.map((item) => {
                    const isSelected =
                      attributes[attribute.name] === item.value;
                    const isColorAttribute =
                      attribute.name.toLowerCase() === "color";

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          dispatch({
                            type: "cart/updateAttribute",
                            payload: {
                              id,
                              attributeName: attribute.name,
                              value: item.value,
                            },
                          });
                        }}
                        className={`p-1 border text-xs ${
                          isColorAttribute
                            ? "border-gray-300"
                            : isSelected
                            ? "bg-gray-900 text-white"
                            : "bg-zinc-50 text-black"
                        } ${
                          isColorAttribute && isSelected
                            ? "outline outline-2 outline-green-500 p-1.5"
                            : ""
                        }`}
                        style={
                          isColorAttribute &&
                          /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(item.value)
                            ? { backgroundColor: item.value }
                            : undefined
                        }
                        data-testid={`cart-item-attribute-${kebabCaseAttrName}-${item.value
                          .toLowerCase()
                          .replace(/\s+/g, "-")}${
                          isSelected ? "-selected" : ""
                        }`}
                      >
                        {!isColorAttribute ? item.displayValue : ""}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Quantity controls */}
      <div className="flex flex-col items-center space-y-6">
        <button
          className="p-1 border border-black hover:bg-gray-500 hover:text-white"
          onClick={handlePlusQuantity}
          data-testid="cart-item-amount-increase"
        >
          +
        </button>
        <p>{quantity}</p>
        <button
          className="p-1 border border-black hover:bg-gray-500 hover:text-white"
          onClick={handleMinusQuantity}
          data-testid="cart-item-amount-decrease"
        >
          -
        </button>
      </div>

      <img src={gallery[0]} className="w-32" alt="Product" />
    </div>
  );
};

export default CartItem;
