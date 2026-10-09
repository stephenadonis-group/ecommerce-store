# Frontend-Backend Integration Implementation Plan

**Goal:** Connect NovaStore React frontend to Spring Boot backend - swap dummyjson for real API, add auth UI, persistent cart/wishlist, orders, reviews, seed data.

**Architecture:** Incremental swap via central axios instance with JWT interceptors. One subsystem per task.

**Spec:** docs/superpowers/specs/2026-09-08-frontend-backend-integration-design.md

## Global Constraints
- Backend at localhost:8080, frontend at localhost:5173
- JWT key: novastore_token
- Server-side filtering: GET /api/products?search&category&minPrice&maxPrice&rating&sort&page&limit=12
- Guest cart/wishlist in localStorage, merged on login
- Backend ProductResponse has no reviews field
- Keep existing MUI patterns

## Tasks

### Task 1: Backend - Max-Price Endpoint + Data Seeder
Files: ProductRepository, ProductService, ProductController (modify), DataSeeder (create)
Produces: GET /api/products/max-price, auto-seed on empty DB

### Task 2: Frontend - Axios Instance + Endpoints Layer
Files: src/api/axios.js (create), src/api/endpoints.js (create)
Produces: api instance with JWT interceptor, authAPI/productsAPI/categoriesAPI/cartAPI/ordersAPI/wishlistAPI/reviewsAPI

### Task 3: Frontend - Auth Slice + Login/Register Pages
Files: authSlice.js, Login.jsx, Register.jsx (create), Store.js, App.jsx, DesktopHeader.jsx, MobileHeader.jsx (modify)
Consumes: authAPI from Task 2
Produces: state.auth, /login /register routes, header sign-in

### Task 4: Frontend - Products to Server-Side Filtering
Files: productsSlice.js, productsIdSlice.js (modify)
Consumes: productsAPI from Task 2
Produces: same state shape so ShowProducts needs no changes

### Task 5: Frontend - Home Page + Categories Swap
Files: homePageSlice.js, CategoriesPage.jsx (modify)
Consumes: productsAPI, categoriesAPI from Task 2

### Task 6: Frontend - Cart Slice (Server + Guest)
Files: cartSlice.js (create), Store.js, homePageSlice.js, DesktopCart.jsx, MobileCart.jsx, DesktopHeader.jsx, MobileHeader.jsx, ProductCard.jsx, ProductsDetails.jsx, CheckOut.jsx (modify)
Consumes: cartAPI from Task 2, auth from Task 3
Produces: state.cart, selectCartCount

### Task 7: Frontend - Wishlist Slice (Server + Guest)
Files: wishlistSlice.js (create), Store.js, homePageSlice.js, Wishlist.jsx, DesktopHeader.jsx, MobileHeader.jsx, ProductCard.jsx, ProductsDetails.jsx, ProductsWishlist.jsx (modify)
Consumes: wishlistAPI from Task 2, auth from Task 3

### Task 8: Frontend - Checkout + Orders Page
Files: CheckOut.jsx, OrderSuccess.jsx (modify), Orders.jsx (create), App.jsx (modify)
Consumes: ordersAPI from Task 2, cart from Task 6, auth from Task 3

### Task 9: Frontend - Reviews UI
Files: ReviewSection.jsx (create), ProductsDetails.jsx (modify)
Consumes: reviewsAPI from Task 2, auth from Task 3

### Task 10: End-to-End Verification
Manual checklist: start MySQL, backend (seeder), frontend, verify all flows
