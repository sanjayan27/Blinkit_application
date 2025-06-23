import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios.js";
import summaryApi, { baseUrl } from "../common/summaryApi.js";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { AxiosToastError, AxiosToastSuccess } from "../utils/AxiosToastBox.js";

const Register = () => {
  const navigate = useNavigate()
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const validevalue = Object.values(registerValues).every((ev) => ev);
  const storeValue = (e) => {
    const { name, value } = e.target;
    setRegisterValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerValues.password !== registerValues.confirmPassword) {
      return toast.error("password and confirm password must be same");
    }
    try {
      const response = await Axios({
        method: summaryApi.register.method,
        url: summaryApi.register.endpoint,
        data: registerValues,
      });
      if(response.data.error === true){
        return AxiosToastError(error);
      }
      if(response.data.success === true) {
        AxiosToastSuccess(response);
        // resetting state
        setRegisterValues({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login")
        console.log(response)
      }
    } catch (error) {
       AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto p-4">
      <div className="bg-white w-full max-w-lg mx-auto p-4 rounded mt-4">
        <p>Welcome to blinkit</p>
        <form
          action="name"
          className="grid gap-4 mt-5 p-2"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Enter your Name"
              autoFocus
              id="name"
              name="name"
              value={registerValues.name}
              onChange={storeValue}
              className="border bg-blue-50 border-neutral-300 p-1 rounded-sm"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter your Email"
              id="email"
              name="email"
              value={registerValues.email}
              onChange={storeValue}
              className="border bg-blue-50 border-neutral-300 p-1 rounded-sm"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={registerValues.password}
              onChange={storeValue}
              className="border bg-blue-50 border-neutral-300 p-1 rounded-sm"
            />
            {/* <FaEye/> */}
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm your password"
              id="confirmPassword"
              name="confirmPassword"
              value={registerValues.confirmPassword}
              onChange={storeValue}
              className="border bg-blue-50 border-neutral-300 p-1 rounded-sm"
            />
          </div>
          <button
            className={`${
              validevalue
                ? "bg-green-800 hover:bg-green-700 cursor-pointer"
                : "bg-gray-600 cursor-not-allowed"
            } w-full tracking-wide py-2 mt-2 text-white font-semibold rounded`}
          >
            Register
          </button>
        </form>
        <p className="p-2">Already have an account ? <Link to={"/login"} className="font-semibold text-blue-950 hover:text-blue-900">Login</Link></p>
      </div>
    </section>
  );
};

export default Register;
