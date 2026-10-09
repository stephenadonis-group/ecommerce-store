# Frontend-Backend Integration Design Spec

## Overview
Swap NovaStore React frontend from dummyjson.com to Spring Boot backend. Add auth UI, server-side filtering, persistent cart/wishlist, order placement, reviews UI, and product data seeding.

## Key Decisions
- Approach: Incremental swap (app stays working at each step)
- JWT in localStorage key `novastore_token`
- Server-side filtering via GET /api/products with all query params
- Guest cart/wishlist in localStorage, merged on login
- Reviews fetched separately (backend ProductResponse has no reviews field)
- Product data seeded from dummyjson via Spring Boot CommandLineRunner

## New Files
- src/api/axios.js - axios instance + JWT interceptors
- src/api/endpoints.js - resource wrappers
- src/Pages/Login.jsx, Register.jsx - auth forms
- src/Pages/Orders.jsx - order history
- src/Redux/Slices/authSlice.js, cartSlice.js, wishlistSlice.js
- src/Compmonents/Reviews/ReviewSection.jsx
- backend seed DataSeeder.java + max-price endpoint

## Modified Files
- productsSlice.js, homePageSlice.js, productsIdSlice.js (swap data source)
- App.jsx (routes, auth boot)
- Headers (sign-in UI), Cart pages (server cart), Checkout (real order), ProductDetails (reviews fix), ProductCard, Store.js
