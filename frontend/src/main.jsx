import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import AppTheme from "./AppTheme.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppTheme>
          <App />
        </AppTheme>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
