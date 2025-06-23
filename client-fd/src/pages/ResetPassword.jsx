import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosToastError, AxiosToastSuccess } from "../utils/AxiosToastBox";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const valideData = Object.values(data).every(ev=>ev);



  const handleChange = (e)=>{
    const {name,value} = e.target;

    setData((prev)=>{
        return{
            ...prev,
            [name]:value
        }
    })
  }

  const handleSubmit= async(e)=>{
    e.preventDefault()
    
    try{
        const response = await Axios({
            url: summaryApi.resetPassword.endpoint,
            method: summaryApi.resetPassword.method,
            data : data
        })

        if(response.data.error){
            AxiosToastError(response)
        }
        if(response.data.success=== true){
            AxiosToastSuccess(response)

            navigate("/login")
        }
    }catch(err){
        AxiosToastError(err)
    }
  }
  return (
    <section className="w-full container mx-auto mt-8 p-4" >
      <div className="grid gap-4 container mx-auto roudned max-w-lg p-4 bg-white">
        <div className="font-semibold">Forget Password</div>
        <form className="grid gap-4 p-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoFocus
              id="email"
              value={data.email}
              readOnly
              
              className="border rounded p-1 bg-blue-50 border-neutral-400 "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="npass">New Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your New Password"
              id="npass"
              value={data.password}
              autoFocus
              onChange={handleChange}
              className="border rounded p-1 bg-blue-50 border-neutral-400 "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="cpass">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter your New Password"
              id="cpass"
              value={data.confirmPassword}
              onChange={handleChange}
              
              className="border rounded p-1 bg-blue-50 border-neutral-400 "
            />
          </div>

          <button
            className={` ${
              valideData ? "bg-green-800 hover:bg-green-700" : "bg-gray-600"
            } w-full mt-2  text-white p-2 rounded font-semibold `}
          >
            Reset Password
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

export default ResetPassword;
