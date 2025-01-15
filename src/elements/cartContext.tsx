import { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  itemsCount: number;
  updateItemsCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: React.ReactElement[] | React.ReactElement;
};

export function CartProvider({ children }: CartProviderProps) {
  const [itemsCount, setItemsCount] = useState(0);

  const getItemsCountFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const cartItems = JSON.parse(storedCart);
        return Array.isArray(cartItems) ? cartItems.length : 0;
      } catch {
        return 0;
      }
    }
    return 0;
  };

  const updateItemsCount = () => {
    setItemsCount(getItemsCountFromStorage());
  };

  useEffect(() => {
    updateItemsCount();
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <CartContext.Provider value={{ itemsCount, updateItemsCount }}>{children}</CartContext.Provider>;
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
