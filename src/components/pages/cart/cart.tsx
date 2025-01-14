import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { CartItem } from "@/shared/models/cartItems";
import CartTable from "./cartTable";
import * as styles from "./cart.module.scss";
import DialogSection from "./dialog";

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  function calculateTotalCost(items: CartItem[]) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalCost(total);
  }

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);

        if (Array.isArray(parsedCart)) {
          const updatedCart = parsedCart.map((item: CartItem) => ({
            ...item,
            price: Number(item.price),
            date: item.date,
            availablePlatforms: item.availablePlatforms,
          }));

          setCartItems(updatedCart);
          calculateTotalCost(updatedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    // eslint-disable-next-line no-restricted-globals
    if (quantity <= 0 || isNaN(quantity)) {
      console.error("Invalid quantity value:", quantity);
      return;
    }

    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item));
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalCost(updatedCart);
  };

  const handlePlatformChange = (id: number, platform: string) => {
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, platform } : item));
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveSelectedItems = () => {
    if (selectedItems.length === 0) return;

    const updatedCart = cartItems.filter((item) => !selectedItems.includes(item.id));
    setCartItems(updatedCart);
    setSelectedItems([]);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalCost(updatedCart);
  };

  const toggleSelection = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((itemId) => itemId !== id) : [...prevSelected, id],
    );
  };

  const handleBuy = () => {
    if (cartItems.length > 0) {
      setOpenDialog(false);
      localStorage.removeItem("cart");
      setCartItems([]);
      setTotalCost(0);
      alert("Thank you for your purchase!");
      navigate("/");
    } else {
      alert("Nothing to purchase!");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Cart</h2>
      <CartTable
        cartItems={cartItems}
        selectedItems={selectedItems}
        onQuantityChange={handleQuantityChange}
        onPlatformChange={handlePlatformChange}
        onToggleSelection={toggleSelection}
        onRemoveSelectedItems={handleRemoveSelectedItems}
      />
      <div className={styles.buy}>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        <p>Your balance: ${totalCost.toFixed(2)}</p>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} className={styles.buyBtn}>
          Buy
        </Button>
      </div>

      <DialogSection open={openDialog} onClose={() => setOpenDialog(false)} onConfirm={handleBuy} />
    </div>
  );
}

export default Cart;
