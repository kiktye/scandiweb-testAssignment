import { Link } from "react-router-dom";
import Cart from "../assets/cart";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart";

const ProductCard = (props: any) => {
  const { id, product_id, name, inStock, gallery, prices, attributes } =
    props.data;

  const dispatch = useDispatch();

  // assign default attributes to product for quick-shop action
  const getDefaultAttributes = (attributes: any) => {
    return attributes.reduce((acc: any, attribute: any) => {
      acc[attribute.name] = attribute.items[0]?.value;
      return acc;
    }, {});
  };

  const handleAddToCart = () => {
    const defaultAttributes = getDefaultAttributes(attributes);
    // unique key to identify the products in the cart for quantity, removing, updating etc..
    const uniqueKey = `${product_id}-${JSON.stringify(defaultAttributes)}`;

    dispatch(
      addToCart({
        uniqueKey,
        id,
        product_id,
        name,
        quantity: 1,
        attributes: defaultAttributes,
      })
    );

    // scrolls to the top when the modal opens
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // kebab case to meet data-testid requirements
  const kebabCaseProductName = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className="relative group hover:shadow-lg hover:p-4 transition-all duration-300"
      data-testid={`product-${kebabCaseProductName}`}
    >
      {/* Image (if not inStock then its gray) that leads to product details page */}
      <Link to={`/${id}`} className="relative block">
        <img
          src={gallery[0]}
          className={`w-full h-80 object-cover object-top ${
            !inStock ? "grayscale" : ""
          }`}
          alt={name}
        />
        {/* display out of stock message */}
        {!inStock && (
          <div className="absolute inset-0 bg-gray-600 bg-opacity-10 flex justify-center items-center">
            <span className="text-gray-500 font-normal text-xl uppercase tracking-widest">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* if in stock then show add to cart button ( quick-shop function) */}
      {inStock && (
        <div className="absolute bottom-[4rem] right-[1.8rem] bg-[#52D67A] rounded-full w-10 h-10 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={handleAddToCart}>
            <Cart width={17} height={17} color="#FFF" />
          </button>
        </div>
      )}

      {/* name and price of product */}
      <h3 className="mt-4">{name}</h3>
      <h4 className="font-medium italic">
        {prices[0].currency.symbol}
        {prices[0].amount}
      </h4>
    </div>
  );
};
export default ProductCard;
