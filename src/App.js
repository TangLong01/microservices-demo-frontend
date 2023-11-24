import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const BASE_URL = "http://localhost:3001";
  const [reload, setReload] = useState("");
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
        });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteProduct = (id) => {
    try {
      axios
        .delete(`${BASE_URL}/products/${id}`)
        .then(() => setReload(Date.now()));
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
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [reload]);

  return (
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
          />
        </div>
        <div className="flex items-center ml-[15%]">
          <span className="font-medium w-[20%]">Price: </span>
          <input
            type="text"
            className="border-[1px] px-2 py-0.5 border-black rounded-md w-[50%]"
            placeholder="Enter Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>
        <button
          onClick={createProduct}
          className="mt-1 rounded-md bg-cyan-500 font-medium px-2 py-1 w-[20%] ml-[40%]"
        >
          Add
        </button>
      </div>

      <h1 className="mt-10 mb-2 text-5xl font-semibold text-blue-700">
        List of Products
      </h1>

      <table>
        <thead>
          <tr>
            <th className="border px-4 py-2 border-black">Id</th>
            <th className="border px-4 py-2 border-black">Name</th>
            <th className="border px-4 py-2 border-black">Price</th>
            <th className="border px-4 py-2 border-black">Update</th>
            <th className="border px-4 py-2 border-black">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 border-black">{item.id}</td>
              <td className="border px-4 py-2 border-black">{item.name}</td>
              <td className="border px-4 py-2 border-black">{item.price}</td>
              <td className="border px-4 py-2 border-black bg-green-500 text-white">
                <input
                  type="text"
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
                />
                <button onClick={() => updateProduct(item.id)}>Update</button>
              </td>
              <td className="border px-4 py-2 border-black bg-red-500 text-white">
                <button onClick={() => deleteProduct(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
