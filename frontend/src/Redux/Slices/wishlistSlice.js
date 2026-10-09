import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wishlistAPI } from "../../api/endpoints";

const GUEST_WISHLIST_KEY = "novastore_wishlist";

function isLoggedIn() {
  return Boolean(localStorage.getItem("novastore_token"));
}

function loadGuestWishlist() {
  try {
    return JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveGuestWishlist(items) {
  localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items));
}

function toIds(products) {
  return products.map((product) => product.id);
}

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    if (!isLoggedIn()) {
      return loadGuestWishlist();
    }
    const products = await wishlistAPI.get();
    return toIds(products);
  },
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (productId) => {
    if (!isLoggedIn()) {
      const items = loadGuestWishlist();
      const next = items.includes(productId)
        ? items.filter((id) => id !== productId)
        : [...items, productId];
      saveGuestWishlist(next);
      return next;
    }
    const products = await wishlistAPI.toggle(productId);
    return toIds(products);
  },
);

export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async () => {
    if (!isLoggedIn()) {
      saveGuestWishlist([]);
      return [];
    }
    const products = await wishlistAPI.get();
    await Promise.all(
      products.map((product) => wishlistAPI.remove(product.id)),
    );
    return [];
  },
);

export const mergeWishlist = createAsyncThunk(
  "wishlist/mergeWishlist",
  async () => {
    const guestIds = loadGuestWishlist();
    const serverProducts = await wishlistAPI.get();
    const serverIds = toIds(serverProducts);

    for (const id of guestIds) {
      if (!serverIds.includes(id)) {
        try {
          await wishlistAPI.toggle(id);
        } catch {
          // product may no longer exist; skip
        }
      }
    }
    saveGuestWishlist([]);
    const merged = await wishlistAPI.get();
    return toIds(merged);
  },
);

const initialState = {
  items: [],
  status: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setItems = (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    };
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, setItems)
      .addCase(toggleWishlist.fulfilled, setItems)
      .addCase(clearWishlist.fulfilled, setItems)
      .addCase(mergeWishlist.fulfilled, setItems);
  },
});

export default wishlistSlice.reducer;
