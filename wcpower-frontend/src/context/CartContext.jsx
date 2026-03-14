import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem("paymentMethod") || "PayPal",
  );
  // 1. Initialize State
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  const [shippingAddress, setShippingAddress] = useState(
    JSON.parse(localStorage.getItem("shippingAddress")) || {},
  );

  // 2. Persist to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    localStorage.setItem("paymentMethod", paymentMethod);
  }, [cartItems, shippingAddress, paymentMethod]);
  // 3. Logic: Add to Cart
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existItem = prev.find((x) => x._id === product._id);
      if (existItem) {
        return prev.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + qty } : x,
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  // 4. Logic: Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x._id !== id));
  };

  // 5. Logic: Save Shipping Address
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
  };

  // 6. Return Provider (This must be INSIDE the CartProvider function)
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        shippingAddress,
        saveShippingAddress,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
