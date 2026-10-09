import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { cartAPI } from "../../api/endpoints";

const GUEST_CART_KEY = "novastore_cart";

function isLoggedIn() {
  return Boolean(localStorage.getItem("novastore_token"));
}

function loadGuestCart() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveGuestCart(items) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

function normalize(response) {
  return response.items.map((item) => ({
    id: item.productId,
    quantity: item.quantity,
  }));
}

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  if (!isLoggedIn()) {
    return loadGuestCart();
  }
  const data = await cartAPI.get();
  return normalize(data);
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity }) => {
    if (!isLoggedIn()) {
      const items = loadGuestCart();
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ id: product.id, quantity });
      }
      saveGuestCart(items);
      return items;
    }
    const data = await cartAPI.addItem(product.id, quantity);
    return normalize(data);
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }) => {
    if (!isLoggedIn()) {
      const items = loadGuestCart();
      const item = items.find((entry) => entry.id === id);
      if (item) item.quantity = quantity;
      saveGuestCart(items);
      return items;
    }
    const data = await cartAPI.updateItem(id, quantity);
    return normalize(data);
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    if (!isLoggedIn()) {
      const items = loadGuestCart().filter((item) => item.id !== id);
      saveGuestCart(items);
      return items;
    }
    const data = await cartAPI.removeItem(id);
    return normalize(data);
  },
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  if (!isLoggedIn()) {
    saveGuestCart([]);
    return [];
  }
  const data = await cartAPI.get();
  await Promise.all(
    data.items.map((item) => cartAPI.removeItem(item.productId)),
  );
  return [];
});

export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async () => {
    const guestItems = loadGuestCart();
    const failed = [];
    for (const item of guestItems) {
      try {
        await cartAPI.addItem(item.id, item.quantity);
      } catch {
        failed.push(item);
      }
    }
    saveGuestCart(failed);
    const data = await cartAPI.get();
    return normalize(data);
  },
);

const initialState = {
  shopCart: [],
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setItems = (state, action) => {
      state.shopCart = action.payload;
      state.status = "succeeded";
    };
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, setItems)
      .addCase(addToCart.fulfilled, setItems)
      .addCase(updateQuantity.fulfilled, setItems)
      .addCase(removeFromCart.fulfilled, setItems)
      .addCase(clearCart.fulfilled, setItems)
      .addCase(mergeGuestCart.fulfilled, setItems);
  },
});

export const selectCartCount = createSelector(
  [(state) => state.cart.shopCart],
  (shopCart) => shopCart.reduce((total, item) => total + item.quantity, 0),
);

export default cartSlice.reducer;
