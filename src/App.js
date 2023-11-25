import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Popconfirm, Spin } from "antd";

if (typeof window !== "undefined") {
  injectStyle();
}

function App() {
  const BASE_URL = "https://microservice-demo-backend.onrender.com";
  const [reload, setReload] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [updateProductPrice, setUpdateProductPrice] = useState({
    id: null,
    price: "",
  });

  const getAllProducts = () => {
    axios.get(BASE_URL + "/products").then((res) => setProducts(res.data));
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

    setTimeout(() => {
      setLoading(true);
    }, 500);
    clearTimeout();
  }, [reload]);

  return (
    <>
      {loading ? (
        <div className="w-screen h-screen bg-yellow-100 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-y-1">
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

          <h1 className="mt-10 mb-4 text-5xl font-semibold text-blue-700">
            List of Products
          </h1>

          <table>
            <thead>
              <tr>
                <th className="border px-4 py-2 border-black">No</th>
                <th className="border px-4 py-2 border-black">Name</th>
                <th className="border px-4 py-2 border-black">Price</th>
                <th className="border px-4 py-2 border-black">Update</th>
                <th className="border px-4 py-2 border-black">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 border-black">{index + 1}</td>
                  <td className="border px-4 py-2 border-black">{item.name}</td>
                  <td className="border px-4 py-2 border-black">
                    {item.price}$
                  </td>
                  <td className="border px-4 py-2 border-black bg-green-500 text-white">
                    <input
                      type="number"
                      className="border-[1px] px-2 py-0.5 border-black rounded-md w-[100px] mr-2 text-black"
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
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      ) : (
        <div className="w-screen h-screen bg-yellow-100 flex flex-col justify-center items-center">
          <Spin size="large" />
        </div>
      )}
    </>
  );
}

export default App;
