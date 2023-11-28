import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Popconfirm } from "antd";
import { BASE_URL } from "../constant/constant";

const Product = () => {
  const [reload, setReload] = useState("");
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [updateProductPrice, setUpdateProductPrice] = useState({
    id: null,
    price: "",
  });

  const getAllProducts = () => {
    axios.get(BASE_URL + "/products").then((res) => {
      const sortList = res.data.sort((a, b) => a.id - b.id);
      setProducts(sortList);
    });
  };

  const createProduct = () => {
    try {
      axios
        .post(BASE_URL + "/products", {
          name: newProduct.name,
          price: newProduct.price,
        })
        .then(() => {
          setReload(Date.now());
          setNewProduct({ name: "", price: "" });
          toast.success("Added product successfully!");
        });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = (id) => {
    try {
      axios.delete(`${BASE_URL}/products/${id}`).then(() => {
        setReload(Date.now());
        toast.success("Product deletion successful!");
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateProduct = (id) => {
    try {
      axios
        .put(`${BASE_URL}/products/${id}`, {
          price: updateProductPrice.price,
        })
        .then(() => {
          setReload(Date.now());
          setUpdateProductPrice("");
          toast.success("Corrected product price successfully!");
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [reload]);

  return (
    <div className="w-screen max-w-screen min-h-screen h-fit pb-20 bg-yellow-100 flex flex-col items-center">
      {localStorage.getItem("role") === "101" && (
        <div className="flex flex-col gap-y-1 mt-[10%]">
          <h1 className="text-5xl font-semibold text-blue-700 mb-2">
            Add New Product
          </h1>
          <div className="flex items-center ml-[15%]">
            <span className="font-medium w-[20%]">Name: </span>
            <input
              type="text"
              className="border-[1px] px-2 py-0.5 border-black rounded-md w-[50%]"
              placeholder="Enter Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createProduct();
                }
              }}
            />
          </div>
          <div className="flex items-center ml-[15%]">
            <span className="font-medium w-[20%]">Price: </span>
            <input
              type="number"
              className="border-[1px] px-2 py-0.5 border-black rounded-md w-[50%]"
              placeholder="Enter Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createProduct();
                }
              }}
            />
          </div>
          <button
            onClick={createProduct}
            className="mt-1 rounded-md bg-cyan-500 font-medium px-2 py-1 w-[20%] ml-[40%] border-[1px] border-red-500"
          >
            Add
          </button>
        </div>
      )}

      <div
        className={`${
          localStorage.getItem("role") === "101" ? "mt-10" : "mt-[10%]"
        } flex flex-col items-center justify-center`}
      >
        <h1 className="mb-4 text-5xl font-semibold text-blue-700">
          List of Products
        </h1>
        <table>
          <thead>
            <tr>
              <th className="border px-4 py-2 border-black">No</th>
              <th className="border px-4 py-2 border-black">Name</th>
              <th className="border px-4 py-2 border-black">Price</th>
              {localStorage.getItem("role") === "101" && (
                <th className="border px-4 py-2 border-black">Update</th>
              )}
              {localStorage.getItem("role") === "101" && (
                <th className="border px-4 py-2 border-black">Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 border-black">{index + 1}</td>
                <td className="border px-4 py-2 border-black">{item.name}</td>
                <td className="border px-4 py-2 border-black">{item.price}$</td>
                {localStorage.getItem("role") === "101" && (
                  <td className="border px-4 py-2 border-black bg-green-500 text-white">
                    <input
                      type="number"
                      className="border-[1px] pl-2 py-0.5 border-black rounded-md w-[100px] mr-2 text-black"
                      placeholder="New Price"
                      value={
                        updateProductPrice.id === item.id
                          ? updateProductPrice.price
                          : ""
                      }
                      onChange={(e) =>
                        setUpdateProductPrice({
                          id: item.id,
                          price: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateProduct(item.id);
                        }
                      }}
                    />
                    <button onClick={() => updateProduct(item.id)}>
                      Update
                    </button>
                  </td>
                )}
                {localStorage.getItem("role") === "101" && (
                  <td className="border px-4 py-2 border-black bg-red-500 text-white">
                    <Popconfirm
                      title="Are you sure to delete this product?"
                      onConfirm={() => deleteProduct(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button>Delete</button>
                    </Popconfirm>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
