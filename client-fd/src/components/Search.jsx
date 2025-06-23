import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Search = ({ isMobile }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";

    setIsSearchPage(isSearch);
  }, [location]);

  const RedirectTonextPageNavigation = () => {
    navigate("/search");
  };

  //function to redirect home page
  const RedirectToHomePage = () => {
    navigate("/");
  };

  return (
    <div className=" min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-lg flex items-center text-neutral-600  border overflow-hidden border-neutral-600 bg-slate-50 group focus-within:border-amber-500">
      <button className="flex cursor-pointer justify-center items-center px-3 group-focus-within:text-amber-500">
        {
          !(isSearchPage && isMobile) ? (
            <FaSearch size={22} />
          ) : (
            <Link to={"/"} >
              <IoMdArrowBack size={22} />
            </Link>
          )
        }
      </button>
      <div className="w-full h-full">
        {!isSearchPage ? (
          //is search page is false
          <div
            className="w-full h-full flex  items-center"
            onClick={RedirectTonextPageNavigation}
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "wheat"',

                1000,
                'Search "bags"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //is search page is true
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more"
              autoFocus
              className="bg-transparent w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
