import React, { useEffect, useRef, useState } from "react";
import { AxiosToastError, AxiosToastSuccess } from "../utils/AxiosToastBox";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpValidation = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const  inputRef = useRef([])
  const valideData = data.every((ev) => ev);

  useEffect(()=>{
    if(!(location?.state?.email)){
      navigate("/forget-password")
    }
    console.log(location.state.email)
  },[])



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await Axios({
        url: summaryApi.otpVerification.endpoint,
        method: summaryApi.otpVerification.method,
        data: {
          otp: data.join(""),
          email: location?.state?.email
        },
      });
      navigate("/reset-password",{

        state: {
          data : response.data,
          email : location?.state?.email
        }

      })
      setData(["","","","","",""])
      if (response.data.error) {
        AxiosToastError(response);
      }

      if (response.data.success) {
        AxiosToastSuccess(response);
      }
    } catch (error) {
      AxiosToastError(error);
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="w-full container mx-auto mt-8">
      <div className="grid gap-4 container mx-auto roudned max-w-lg p-4 bg-white">
        <div className="font-semibold">Verify Your OTP</div>
        <form className="grid gap-4 p-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP:</label>

            <div className="flex gap-2">
              {data.map((element, index) => {
                return (
                  <input
                  key={index}
                    type="text"
                    maxLength={1}
                    id="otp"
                    ref={(ref)=>{
                      inputRef.current[index] = ref
                      return ref
                    }}
                    value={data[index]}
                    onChange={(e)=>{
                      const value = e.target.value
                      const newData = [...data]
                      newData[index] = value
                      setData(newData)
                      if(value && index < 5){
                        inputRef.current[index + 1].focus()
                      }

                    }}
                    className="text-center border mt-3 rounded w-full max-w-14 p-1 bg-blue-50 border-neutral-400 "
                  />
                );
              })}
            </div>
          </div>

          <button
            className={` ${
              valideData ? "bg-green-800 hover:bg-green-700" : "bg-gray-600"
            } w-full mt-2  text-white p-2 rounded font-semibold `}
          >
            {isLoading ? "Verifying OTP...!":"Verify OTP"}

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

export default OtpValidation;
