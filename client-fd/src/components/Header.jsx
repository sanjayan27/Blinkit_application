import React from "react";
import Search from "./Search";
import blinketLogo from "../assets/blinkit-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { IoCart } from "react-icons/io5";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const navigate = useNavigate()
  const redirectToLoginPage =()=>{
    navigate("/login")
  }
  const isSearchPage = location.pathname === "/search";

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
              <FaRegCircleUser size={26} />
            </div>
            {/* login and cart for desktop */}
            <div className="hidden lg:flex gap-10 items-center">
              <button onClick={redirectToLoginPage} className="text-lg cursor-pointer" >Login</button>
              <button className="flex items-center gap-1 bg-green-800 text-white py-2 px-3 rounded-sm hover:bg-green-700 cursor-pointer">
                <div className="animate-bounce"><IoCart size={28}/></div>
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
        <Search isSearch={isSearchPage} isMobile={isMobile}/>
      </div>
    </header>
  );
};

export default Header;
