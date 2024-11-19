import { useState } from "react";
import parse from "html-react-parser";
import { addToCart } from "../stores/cart";
import { useDispatch } from "react-redux";

interface AttributeItem {
  displayValue: string;
  value: string;
  id: number;
}

interface Attribute {
  id: number;
  name: string;
  type: string;
  items: AttributeItem[];
}

interface Price {
  amount: number;
  currency: {
    label: string;
    symbol: string;
  };
}

interface Product {
  id: number;
  product_id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: Attribute[];
  prices: Price[];
  brand: string;
}

interface DetailsProps {
  product: Product;
}

function ProductDetails({ product }: DetailsProps) {
  const dispatch = useDispatch();

  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  const handleAttributeSelect = (attributeId: string, itemId: string) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [attributeId]: itemId,
    });
  };

  // define selected attributes
  const allSelectedAttributes = product?.attributes?.every(
    (attribute) => selectedAttributes[attribute.name]
  );

  const handleAddToCart = () => {
    // if all attributes are selected and product is in stock, generate a unique key and dispatch to cart
    if (allSelectedAttributes && product.inStock) {
      // unique key to identify the products in the cart for quantity, removing, updating etc..

      const uniqueKey = `${product.product_id}-${JSON.stringify(
        selectedAttributes
      )}`;

      dispatch(
        addToCart({
          uniqueKey,
          id: product.id,
          product_id: product.product_id,
          name: product.name,
          quantity: 1,
          attributes: selectedAttributes,
        })
      );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{product.name}</h1>

      {/* Attributes and Items */}
      {product.attributes.map((attribute) => {
        // convert attribute name to kebab case as required
        const kebabCaseAttrName = attribute.name
          .toLowerCase()
          .replace(/\s+/g, "-");

        return (
          <div
            key={attribute.id}
            data-testid={`product-attribute-${kebabCaseAttrName}`}
          >
            <h3 className="text-lg font-medium">
              {attribute.name.toUpperCase()}:
            </h3>

            {attribute.items.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  handleAttributeSelect(attribute.name, item.value)
                }
                // if the attribute name is color, set the background color of the button to the value of the item
                // if attribute is not color, set the background color of selected attribute to be black/dark
                // if is selected and its color, set the border to be green
                className={`p-2.5 m-1 cursor-pointer ${
                  attribute.name.toLowerCase() === "color"
                    ? `bg-[${item.value}]`
                    : "bg-zinc-50??"
                } ${
                  selectedAttributes[attribute.name] === item.value
                    ? attribute.name.toLowerCase() === "color"
                      ? "border-2 border-green-500 p-3"
                      : "border-2 border-black bg-gray-800 text-white"
                    : "border border-gray-800"
                }`}
                style={
                  attribute.name.toLowerCase() === "color" &&
                  /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(item.value)
                    ? { backgroundColor: item.value }
                    : undefined
                }
              >
                {/* display value of the item */}
                {attribute.name.toLowerCase() !== "color"
                  ? item.displayValue
                  : ""}
              </button>
            ))}
          </div>
        );
      })}

      {/* Product Pricing */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">PRICE:</h3>
        <p className="font-bold text-xl">
          {product.prices[0].currency.symbol}
          {product.prices[0].amount}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        className={`uppercase tracking-wider font-medium px-8 py-3 drop-shadow-md text-white ${
          allSelectedAttributes && product.inStock
            ? "bg-[#50ac69]"
            : "bg-gray-500 cursor-default"
        }`}
        // disabled if all attributes are not selected or product is out of stock
        disabled={!allSelectedAttributes || !product.inStock}
        onClick={handleAddToCart}
        data-testid="add-to-cart"
      >
        add to cart
      </button>

      {/* Product Description set as HTML according to the specification and DB content provided */}
      <div className="product-description" data-testid="product-description">
        {parse(product.description)}
      </div>
    </div>
  );
}
export default ProductDetails;
