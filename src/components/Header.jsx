import Logo from "../assets/logo.svg";
import Ring from "../assets/ring.svg";
import Moon from "../assets/icons/moon.svg";
import Sun from "../assets/icons/sun.svg";
import ShoppingCart from "../assets/shopping-cart.svg";
import Cart from "./Cart";
import { useState } from "react";
import { useCart, useTheme } from "../context";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const { state } = useCart();
  const { theme, setTheme } = useTheme();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleThemeChange = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header>
      {showModal && <Cart onClose={handleCloseModal} />}
      <nav className="container flex items-center justify-between space-x-10 py-6">
        <a href="index.html">
          <img src={Logo} width="139" height="26" alt="logo" />
        </a>

        <ul className="flex items-center space-x-5">
          <li>
            <a
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
            >
              <img src={Ring} width="24" height="24" alt="ring" />
            </a>
          </li>
          <li>
            <a
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
              onClick={handleThemeChange}
            >
              <img
                src={theme === "dark" ? Sun : Moon}
                width="24"
                height="24"
                alt="moon"
              />
            </a>
          </li>
          <li>
            <a
              className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
              href="#"
              onClick={handleOpenModal}
            >
              {state.cart.length > 0 && (
                <span className="absolute -top-3 -right-3 h-6 w-6 bg-primary flex items-center justify-center rounded-full">
                  {state.cart.length}
                </span>
              )}
              <img
                src={ShoppingCart}
                width="24"
                height="24"
                alt="shopping-cart"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
