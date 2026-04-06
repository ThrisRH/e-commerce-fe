// utils/add-to-cart.js
import { enqueueSnackbar } from "notistack";

const SESSION_KEY = "cart";

/**
 * @param {Event | null} e
 * @param {Array} items
 */
export const handleAddToCart = (items, e = null) => {
  if (e?.preventDefault) e.preventDefault();

  const cart = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]");

  items.forEach((item) => {
    const existing = cart.find((c) => c.id === item.productId);
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      cart.push({ id: item.productId, quantity: item.quantity || 1 });
    }
  });

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));

  enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng", { variant: "success" });
};
