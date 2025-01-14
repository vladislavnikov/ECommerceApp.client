import Button from "@mui/material/Button";
import { CartItem } from "@/shared/models/cartItems";
import * as styles from "./cart.module.scss";

interface CartTableProps {
  cartItems: CartItem[];
  selectedItems: number[];
  onQuantityChange: (id: number, quantity: number) => void;
  onPlatformChange: (id: number, platform: string) => void;
  onToggleSelection: (id: number) => void;
  onRemoveSelectedItems: () => void;
}

function CartTable({
  cartItems,
  selectedItems,
  onQuantityChange,
  onPlatformChange,
  onToggleSelection,
  onRemoveSelectedItems,
}: CartTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Platform</th>
          <th>Order Date</th>
          <th>Amount</th>
          <th>Price ($)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <select value={item.platform} onChange={(e) => onPlatformChange(item.id, e.target.value)}>
                {item.availablePlatforms && item.availablePlatforms.length > 0 ? (
                  item.availablePlatforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))
                ) : (
                  <option value="">No Platforms Available</option>
                )}
              </select>
            </td>
            <td>{new Date(item.date).toLocaleDateString()}</td>
            <td>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
              />
            </td>
            <td>{item.price.toFixed(2)}</td>
            <td>
              <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => onToggleSelection(item.id)} />
            </td>
          </tr>
        ))}
        {cartItems.length > 0 && (
          <tr>
            <td colSpan={5} />
            <td>
              <Button variant="contained" color="secondary" onClick={onRemoveSelectedItems} className={styles.removeBtn}>
                Remove
              </Button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CartTable;
