import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytlogo from "../assets/logo.png"; // YouTube logo import
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/ContextApi";
import Loader from "../shared/loader";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, mobileMenu, setMobileMenu } = useContext(Context);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <div className="sticky top-0 z-20 flex flex-row items-center justify-between min-h-20 px-4 md:px-5 bg-white dark:bg-black">
      {loading && <Loader />}

      <div className="flex items-center">
        {pageName !== "video" && (
          <div
            className="flex md:hidden md:mr-6 mr-4 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#8888]/[0.6]"
            onClick={mobileMenuToggle}
          >
            {mobileMenu ? (
              <CgClose className="dark:text-white text-black text-xl" />
            ) : (
              <SlMenu className="dark:text-white text-black text-xl" />
            )}
          </div>
        )}
        {/* YouTube logo */}
        <Link to="/" className="flex items-center">
          <img src={ytlogo} alt="YouTube Logo" className="h-10" />
        </Link>
      </div>

      <div className="group flex items-center my-1 mr-7">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#888888] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-black dark:text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-black dark:text-white pr-5 pl-5  md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder="Search"
            value={searchQuery}
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#888888] rounded-r-3xl bg-white/[0.1] dark:bg-black/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-black dark:text-white text-xl" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <RiVideoAddLine className="text-black dark:text-white text-xl cursor-pointer" />
          </div>
          <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
            <FiBell className="text-black dark:text-white text-xl cursor-pointer" />
          </div>
        </div>
        <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-white flex h-10 w-10 justify-center items-center font-bold overflow-hidden rounded-full md:ml-4 mx-1 shadow-lg">
          AL
        </span>
      </div>
    </div>
  );
};

export default Header;
