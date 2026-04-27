import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";   // ✅ add this
import "./index.css";
import App from "./App.jsx";

const storedTheme = localStorage.getItem("theme");
const initialTheme = storedTheme === "dark" ? "dark" : "light";

document.documentElement.setAttribute("data-theme", initialTheme);
document.documentElement.style.colorScheme = initialTheme;
localStorage.setItem("theme", initialTheme);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      
      {/* ✅ Global Toast Container */}
      <Toaster
        position="top-center"   // middle of top
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <App />

    </Provider>
  </BrowserRouter>
);