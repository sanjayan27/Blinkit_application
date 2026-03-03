import React, { useState } from "react";
import { AxiosToastError, AxiosToastSuccess } from "../utils/AxiosToastBox";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import fetchingUserDetails from "../utils/fetchingUserDetails";


const Login = () => {
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const valideData = Object.values(data).every((ev) => ev);
  const dispatch = useDispatch();




  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await Axios({
        url: summaryApi.login.endpoint,
        method: summaryApi.login.method,
        data: data,
      });
      
      if (response.data.success === true) {
        AxiosToastSuccess(response);
        setIncorrectPassword(false);
        localStorage.setItem('accessToken',response.data.data.accessToken)
        localStorage.setItem('refreshToken',response.data.data.refreshToken)
        const fetchedUserDetails = await fetchingUserDetails();
        dispatch(setUserDetails(fetchedUserDetails.data));
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
      if (response.data.error === true) {
        AxiosToastError(response);
      }
    } catch (error) {
      toast.error("Email is not Registered");
    } finally {
      setIsLoading(false);
    }
  };






  return (
    <section className="w-full container mx-auto mt-8">
      <div className="grid gap-4 container mx-auto max-w-lg p-4 bg-white">
        <div>Login to blinkit</div>
        <form className="grid gap-4 p-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoFocus
              id="email"
              value={data.email}
              onChange={handleChange}
              className="border rounded p-1 bg-blue-50 border-neutral-400 "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              id="password"
              value={data.password}
              onChange={handleChange}
              className={`${
                !incorrectPassword
                  ? "border border-neutral-400"
                  : "  border-2 border-red-700"
              } rounded p-1 bg-blue-50  `}
            />
            <p>
              <Link to={"/forget-password"} className="text-blue-900 ml-auto">
                Forget password?{" "}
              </Link>
            </p>
          </div>
          <button
          className={` ${
            valideData ? "bg-green-800 hover:bg-green-700" : "bg-gray-600"
          } w-full mt-2 text-white p-2 rounded font-semibold flex justify-center items-center`}
          disabled={isLoading}
        >
          {isLoading ? <p>Logging in...!</p> : <p>Login</p>}
        </button>
        </form>
        
        <div>
          <p>
            Don't have an account?{" "}
            <Link to={"/register"} className="font-semibold text-blue-900">
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
