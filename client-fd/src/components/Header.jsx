import React, { useState } from "react";
import Search from "./Search";
import blinketLogo from "../assets/blinkit-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { IoCart } from "react-icons/io5";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserDetails from "./UserDetails";



const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
  };
  const [openUserDetail, setOpenUserDetail] = useState(false);

  const user = useSelector((state) => state?.user);
  
  // Check if the current page is the search page
  const isSearchPage = location.pathname === "/search";
  
  const closeUserMenuHandler =()=>{
    setOpenUserDetail(false);
  }
  const handleIconClick = ()=>{
    if(!user?._id){
      navigate("/login")
    }
  }

  return (
    <header className=" w-full  h-24 sticky top-0 lg:h-20 lg:shadow-md flex flex-col justify-center bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container flex justify-between h-14  lg:h-full mx-auto items-center px-2">
          <Link to="/" className=" w-fit">
            <img
              src={blinketLogo}
              width={170}
              height={60}
              className="hidden lg:block"
            />
            <img
              src={blinketLogo}
              width={120}
              height={60}
              className="lg:hidden"
            />
          </Link>
          <div className="hidden lg:block">
            <Search />
          </div>
          <div className=" text-neutral-600">
            <div className=" lg:hidden">
              {/* user icon for mobile */}
              {
                user?._id ? (
                  <img src={user.avatar} alt="" className = "w-10 h-10 rounded-4xl"/>
                ):(<FaRegCircleUser size={26} onClick={()=>handleIconClick()} className="cursor-pointer"/>)
              }
              
            </div>
            {/* login and cart for desktop */}
            <div className="hidden lg:flex gap-10 items-center">
              {user?._id ? (
                <div className="relative">
                  <div className="flex  items-center gap-2 cursor-pointer " onClick={()=> setOpenUserDetail(!openUserDetail)}>
                    <p>Account</p>
                    {openUserDetail ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  <div className="absolute top-16 right-0  ">
                    {openUserDetail ? (
                      <div className="bg-white rounded p-4 min-w-52 shadow-lg ">
                        <UserDetails close={closeUserMenuHandler}/>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg cursor-pointer"
                >
                  Login
                </button>
              )}
              <button className="flex items-center gap-1 bg-green-800 text-white py-2 px-3 rounded-sm hover:bg-green-700 cursor-pointer">
                <div className="animate-bounce">
                  <IoCart size={28} />
                </div>
                <div>
                  <p className="font-semibold">My Cart</p>
                  {/* <p>1 item</p>
                <p>my cart</p> */}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden ">
        <Search isSearch={isSearchPage} isMobile={isMobile} />
      </div>
    </header>
  );
};

export default Header;
