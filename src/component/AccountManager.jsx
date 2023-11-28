import { Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../constant/constant";

const AccountManager = () => {
  const [reload, setReload] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "101",
  });
  const [updateUserPassword, setUpdateUserPassword] = useState({
    id: null,
    password: "",
  });
  const [changePasswordForUser, setChangePasswordForUser] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [isShowChangePass, setIsShowChangePass] = useState(false);

  const getAllUsers = () => {
    axios.get(BASE_URL + "/users").then((res) => {
      const sortList = res.data.sort((a, b) => a.id - b.id);
      setListUsers(sortList);
    });
  };

  const createUser = () => {
    try {
      axios
        .post(BASE_URL + "/users", {
          username: newUser.username,
          password: newUser.password,
          role: newUser.role,
        })
        .then(() => {
          setReload(Date.now());
          setNewUser({
            username: "",
            password: "",
            role: "",
          });
          toast.success("Create account successfully!");
        });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteUser = (id) => {
    try {
      axios.delete(`${BASE_URL}/users/${id}`).then(() => {
        setReload(Date.now());
        toast.success("User deletion successful!");
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateUser = (id, newPassword) => {
    try {
      axios
        .put(`${BASE_URL}/users/${id}`, {
          password: newPassword,
        })
        .then(() => {
          setReload(Date.now());
          setUpdateUserPassword({
            id: null,
            password: "",
          });
          toast.success("Corrected user's password successfully!");
        });
    } catch (e) {
      console.error(e);
    }
  };

  const changePassword = (currentPassword, newPassword) => {
    axios.get(BASE_URL + "/users").then((res) => {
      const listUsername = res.data.map((item) => item.username);
      let indexUser = listUsername.indexOf(localStorage.getItem("currentUser"));
      if (
        res.data[indexUser].password === changePasswordForUser.currentPassword
      ) {
        updateUser(res.data[indexUser].id, changePasswordForUser.newPassword);
      } else toast.error("Wrong current password!");
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [reload]);

  return (
    <div className="w-screen max-w-screen min-h-screen h-fit pb-20 bg-yellow-100 flex flex-col items-center">
      <div className="flex flex-col gap-y-1 mt-[10%]">
        <h1 className="text-5xl font-semibold text-blue-700 mb-2">
          Your Information
        </h1>
        <div className="font-medium pl-[20%]">
          Username: {localStorage.getItem("currentUser")}
        </div>
        <div className="font-medium pl-[20%]">
          <button
            onClick={() => setIsShowChangePass(!isShowChangePass)}
            className="mt-1 rounded-md bg-cyan-500 font-medium px-2 py-1 border-[1px] border-red-500"
          >
            Click here to change password
          </button>
        </div>
        {isShowChangePass && (
          <div className="flex flex-col gap-y-1 mt-4">
            <div className="flex items-center justify-center">
              <span className="font-medium w-[40%]">Current password: </span>
              <input
                type="text"
                className="border-[1px] px-2 py-0.5 border-black rounded-md w-[55%]"
                placeholder="Enter current password"
                value={changePasswordForUser.currentPassword}
                onChange={(e) =>
                  setChangePasswordForUser({
                    ...changePasswordForUser,
                    currentPassword: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    changePassword();
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <span className="font-medium w-[40%]">New password: </span>
              <input
                type="text"
                className="border-[1px] px-2 py-0.5 border-black rounded-md w-[55%]"
                placeholder="Enter new password"
                value={changePasswordForUser.newPassword}
                onChange={(e) =>
                  setChangePasswordForUser({
                    ...changePasswordForUser,
                    newPassword: e.target.value,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    changePassword();
                  }
                }}
              />
            </div>
            <button
              onClick={createUser}
              className="mt-1 rounded-md bg-cyan-500 font-medium px-2 py-1 w-[20%] ml-[40%] border-[1px] border-red-500"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {localStorage.getItem("role") === "101" && (
        <div className="flex flex-col gap-y-1 mt-10">
          <h1 className="text-5xl font-semibold text-blue-700 mb-2">
            Create New Account
          </h1>
          <div className="flex items-center ml-[15%]">
            <span className="font-medium w-[20%]">Name: </span>
            <input
              type="text"
              className="border-[1px] px-2 py-0.5 border-black rounded-md w-[45%]"
              placeholder="Enter Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createUser();
                }
              }}
            />
          </div>
          <div className="flex items-center ml-[15%]">
            <span className="font-medium w-[20%]">Password: </span>
            <input
              type="text"
              className="border-[1px] px-2 py-0.5 border-black rounded-md w-[45%]"
              placeholder="Enter Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createUser();
                }
              }}
            />
          </div>
          <div className="flex items-center ml-[15%]">
            <span className="font-medium w-[20%]">Role: </span>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border-[1px] px-2 py-0.5 border-black rounded-md w-[45%]"
            >
              <option value="101">Admin</option>
              <option value="102">User</option>
            </select>
          </div>
          <button
            onClick={createUser}
            className="mt-1 rounded-md bg-cyan-500 font-medium px-2 py-1 w-[20%] ml-[40%] border-[1px] border-red-500"
          >
            Create
          </button>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-5xl font-semibold text-blue-700">
          List of Users
        </h1>
        {localStorage.getItem("role") === "101" ? (
          <table>
            <thead>
              <tr>
                <th className="border px-4 py-2 border-black">No</th>
                <th className="border px-4 py-2 border-black">Username</th>
                <th className="border px-4 py-2 border-black">Password</th>
                <th className="border px-4 py-2 border-black">Role</th>
                <th className="border px-4 py-2 border-black">Update</th>
                <th className="border px-4 py-2 border-black">Delete</th>
              </tr>
            </thead>
            <tbody>
              {listUsers.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 border-black">{index + 1}</td>
                  <td className="border px-4 py-2 border-black">
                    {item.username}
                  </td>
                  <td className="border px-4 py-2 border-black">
                    {item.password}
                  </td>
                  <td className="border px-4 py-2 border-black">
                    {item.role === "101" ? "Admin" : "User"}
                  </td>
                  <td className="border px-4 py-2 border-black bg-green-500 text-white">
                    <input
                      type="text"
                      className="border-[1px] pl-2 py-0.5 border-black rounded-md w-[130px] mr-2 text-black"
                      placeholder="New Password"
                      value={
                        updateUserPassword.id === item.id
                          ? updateUserPassword.password
                          : ""
                      }
                      onChange={(e) =>
                        setUpdateUserPassword({
                          id: item.id,
                          password: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateUser(item.id, updateUserPassword.password);
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        updateUser(item.id, updateUserPassword.password)
                      }
                    >
                      Update
                    </button>
                  </td>
                  <td className="border px-4 py-2 border-black bg-red-500 text-white">
                    <Popconfirm
                      title="Are you sure to delete this user?"
                      onConfirm={() => deleteUser(item.id)}
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
        ) : (
          <table>
            <thead>
              <tr>
                <th className="border px-4 py-2 border-black">No</th>
                <th className="border px-4 py-2 border-black">Username</th>
                <th className="border px-4 py-2 border-black">Role</th>
              </tr>
            </thead>
            <tbody>
              {listUsers.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 border-black">{index + 1}</td>
                  <td className="border px-4 py-2 border-black">
                    {item.username}
                  </td>
                  <td className="border px-4 py-2 border-black">
                    {item.role === "101" ? "Admin" : "User"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AccountManager;
