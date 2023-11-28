import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";
import "tailwindcss/tailwind.css";
import AccountManager from "./component/AccountManager";
import Login from "./component/Login";
import Product from "./component/Product";
import LayoutHome from "./layouts/LayoutHome";

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<LayoutHome />}>
          <Route path="product" element={<Product />} />
          <Route path="account-manager" element={<AccountManager />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
