import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const LayoutHome = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex max-w-screen min-h-screen h-fit relative">
      <div className="absolute flex gap-x-4 mb-10 text-2xl font-semibold justify-center w-full top-[100px]">
        <button
          className={
            location.pathname === "/product" && "underline text-red-500"
          }
          onClick={() => navigate("/product")}
        >
          Products
        </button>
        <button
          className={
            location.pathname === "/account-manager" && "underline text-red-500"
          }
          onClick={() => navigate("/account-manager")}
        >
          Account manager
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default LayoutHome;
