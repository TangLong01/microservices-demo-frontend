import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../constant/constant";

const Login = () => {
  const navigate = useNavigate();
  const [inputUser, setInputUser] = useState({ username: "", password: "" });

  const handleLogin = () => {
    axios.get(BASE_URL + "/users").then((res) => {
      const listUsername = res.data.map((item) => item.username);
      let indexUser = listUsername.indexOf(inputUser.username);
      if (indexUser !== -1) {
        if (res.data[indexUser].password === inputUser.password) {
          navigate("/product");
          localStorage.setItem("role", res.data[indexUser].role);
          localStorage.setItem("currentUser", inputUser.username);
        } else toast.error("Wrong password!");
      } else toast.error("This username does not exist!");
    });
  };

  return (
    <div className="w-screen max-w-screen min-h-screen h-fit pb-20 bg-yellow-100 flex flex-col items-center">
      <div className="flex flex-col gap-y-1 mt-[10%]">
        <h1 className="text-5xl font-semibold text-blue-700 mb-2 flex justify-center">
          Login
        </h1>
        <div className="flex items-center">
          <span className="font-medium w-[35%]">Username: </span>
          <input
            type="text"
            className="border-[1px] px-2 py-0.5 border-black rounded-md w-[65%]"
            placeholder="Enter Username"
            value={inputUser.username}
            onChange={(e) =>
              setInputUser({ ...inputUser, username: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
        <div className="flex items-center">
          <span className="font-medium w-[35%]">Password: </span>
          <input
            type="text"
            className="border-[1px] px-2 py-0.5 border-black rounded-md w-[65%]"
            placeholder="Enter Password"
            value={inputUser.password}
            onChange={(e) =>
              setInputUser({ ...inputUser, password: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
        </div>
        <button
          onClick={handleLogin}
          className="mt-1 rounded-md bg-cyan-500 font-medium px-2 py-1 w-[20%] ml-[40%] border-[1px] border-red-500"
        >
          Login
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
