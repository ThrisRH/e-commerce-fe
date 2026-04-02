import { enqueueSnackbar } from "notistack";

const SESSION_KEY = "cart";

export const handleAddToCart = (e, product, quantity) => {
  e.preventDefault();

  const cart = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "[]");
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: product.id, quantity });
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("cart-updated"));

  enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng", { variant: "success" });
};
