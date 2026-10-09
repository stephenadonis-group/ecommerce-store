import api from "./axios";

export const authAPI = {
  login: (data) => api.post("/api/auth/login", data).then((r) => r.data),
  register: (data) => api.post("/api/auth/register", data).then((r) => r.data),
  getCurrentUser: () => api.get("/api/auth/me").then((r) => r.data),
};

export const productsAPI = {
  getAll: (params) => api.get("/api/products", { params }).then((r) => r.data),
  getById: (id) => api.get(`/api/products/${id}`).then((r) => r.data),
  getMaxPrice: () => api.get("/api/products/max-price").then((r) => r.data),
};

export const categoriesAPI = {
  getAll: () => api.get("/api/categories").then((r) => r.data),
};

export const cartAPI = {
  get: () => api.get("/api/cart").then((r) => r.data),
  addItem: (productId, quantity) =>
    api.post("/api/cart/items", { productId, quantity }).then((r) => r.data),
  updateItem: (productId, quantity) =>
    api.put(`/api/cart/items/${productId}`, { quantity }).then((r) => r.data),
  removeItem: (productId) =>
    api.delete(`/api/cart/items/${productId}`).then((r) => r.data),
};

export const ordersAPI = {
  place: (data) => api.post("/api/orders", data).then((r) => r.data),
  getAll: () => api.get("/api/orders").then((r) => r.data),
  getById: (id) => api.get(`/api/orders/${id}`).then((r) => r.data),
};

export const wishlistAPI = {
  get: () => api.get("/api/wishlist").then((r) => r.data),
  toggle: (productId) =>
    api.post(`/api/wishlist/${productId}`).then((r) => r.data),
  remove: (productId) => api.delete(`/api/wishlist/${productId}`).then((r) => r.data),
};

export const reviewsAPI = {
  getByProduct: (productId) =>
    api.get(`/api/products/${productId}/reviews`).then((r) => r.data),
  add: (productId, data) =>
    api.post(`/api/products/${productId}/reviews`, data).then((r) => r.data),
};
