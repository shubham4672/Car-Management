import React from "react";
import logo from "../logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className='navbar bg-slate-900 flex items-center lg:justify-around'>
      <div className='logo flex items-center gap-10'>
        <img src={logo} alt='Logo' className='w-10' />
        <h2 className='logo text-white cursor-pointer'>
          <Link to='/home'>
            Cars<small>Dex</small>
          </Link>
        </h2>
      </div>
      <ul className='nav-links flex text-white'>
        {isLoggedIn ? (
          <>
            <li className='px-8 py-1 hover:bg-slate-800 rounded-full'>
              <Link to='/home'>Home</Link>
            </li>
            <li className='px-8 py-1 hover:bg-slate-800 rounded-full'>
              <Link to='/add-car'>Add Car</Link>
            </li>
            <li className='px-10 mx-5 font-medium bg-red-500 py-1 hover:bg-red-600 rounded-full'>
              <button onClick={handleLogout} className='logout-btn'>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className='px-8 py-1 rounded-full font-medium hover:bg-blue-300 hover:text-black cursor-pointer'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='px-8 font-medium py-1 hover:bg-blue-300 rounded-full hover:text-black cursor-pointer'>
              <Link to='/register'>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
