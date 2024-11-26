import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { CATEGORIES } from "../graphQL/Query";

import { Link } from "react-router-dom";
import Logo from "../assets/logo";
import Cart from "../assets/cart";
import CartModal from "./cartModal";

const Header = ({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) => {
  // Categories
  const { data } = useQuery(CATEGORIES);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  const categories = data?.categories || [];

  // Cart
  const [totalQuantity, setTotalQuantity] = useState(0);
  const carts = useSelector((store: any) => store.cart.items);

  // previous cart length to check if the cart has been updated
  const prevCartLength = useRef(carts.length);

  useEffect(() => {
    let total = 0;
    carts.forEach((item: any) => (total += item.quantity));

    // total quantity of items in the cart
    setTotalQuantity(total);

    // if the cart has been updated open the cart modal
    if (carts.length > prevCartLength.current) {
      setIsCartModalOpen(true);
    }

    prevCartLength.current = carts.length;
  }, [carts]);

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // disable scrolling when cart modal is open
  useEffect(() => {
    document.body.style.overflow = isCartModalOpen ? "hidden" : "auto";
  }, [isCartModalOpen]);

  const handleCartClick = () => {
    setIsCartModalOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center mb-5 p-4">
      {/* Render Categories and each category leads to the home page with category selected */}
      <div className="flex space-x-4">
        {categories.map((category: { name: string }) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            onClickCapture={isCartModalOpen ? handleCartClick : undefined}
            className={`relative pb-2 ${
              activeCategory === category.name
                ? "after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#5AEE87] text-[#5AEE87]"
                : ""
            }`}
          >
            <h1 className="font-medium tracking-wider">
              <Link
                to="/"
                data-testid={
                  activeCategory === category.name
                    ? 'active-category-link'
                    : 'category-link'
                }
              >
                {category.name.toUpperCase()}
              </Link>
            </h1>
          </button>
        ))}
      </div>

      {/* Logo to Homepage */}
      <Link to="/">
        <div onClick={isCartModalOpen ? handleCartClick : undefined}>
          <Logo />
        </div>
      </Link>

      {/* Cart Button and CartModal*/}
      <div className="relative">
        <button
          onClick={handleCartClick}
          className="w-10 h-10 rounded-full flex justify-center items-center relative"
          data-testid='cart-btn'
        >
          <Cart width={24} height={24} color="#43464E" />
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-sm font-semibold rounded-full w-5 h-5 flex justify-center items-center">
              {totalQuantity}
            </span>
          )}
        </button>

        {isCartModalOpen && (
          <>
            <div
              className="fixed top-[77px] inset-0 bg-black bg-opacity-50 z-40"
              onClick={handleCartClick}
            ></div>

            <CartModal onClose={handleCartClick} />
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
