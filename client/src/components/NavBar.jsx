
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "../store/Auth";
import logo from "../assets/logo.png";

const NavBar = () => {
  const { isLoggedIn, user } = useAuth();
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="bg-[#0B0C10] md:bg-transparent p-4">
        <div className="max-w-[1240px] py-[5px] flex justify-between items-center mx-auto">
          <div className="font-bold text-white text-[20px] font-montserrat sans-serif letter-spacing-0.34rem flex items-center">
            <img src={logo} className="w-8 h-8 rounded-full mr-2" />
            CAREER TRACKER
          </div>
          {toggle ? (
            <AiOutlineClose
              onClick={() => setToggle(!toggle)}
              className="text-white text-2xl hover:text-[#66FCF1] md:hidden block"
            />
          ) : (
            <AiOutlineMenu
              onClick={() => setToggle(!toggle)}
              className="text-white text-2xl hover:text-[#66FCF1] md:hidden block"
            />
          )}

          <ul className="hidden md:flex text-white gap-10">
            <li>
              <NavLink to="/" className="hover:text-[#66FCF1]">
                Home
              </NavLink>
            </li>
           
            <li>
              <NavLink to="/contact" className="hover:text-[#66FCF1]">
                Contact
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                {user.isAdmin && (
                  <li>
                    <NavLink to="/admin" className="hover:text-[#66FCF1]">
                      Admin
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/logout" className="hover:text-[#66FCF1]">
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="hover:text-[#66FCF1]">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="hover:text-[#66FCF1]">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul
            className={`duration-500 md:hidden text-white bg-[#0B0C10] fixed top-[78px] w-full h-screen text-center py-5 ${
              toggle ? "left-[0%]" : "left-[100%]"
            }`}
          >
            <li className="mt-5">
              <NavLink to="/" className="hover:text-[#66FCF1]">
                Home
              </NavLink>
            </li>
            <li className="mt-5">
              <NavLink to="/about" className="hover:text-[#66FCF1]">
                About
              </NavLink>
            </li>
            <li className="mt-5">
              <NavLink to="/service" className="hover:text-[#66FCF1]">
                Services
              </NavLink>
            </li>
            <li className="mt-5">
              <NavLink to="/contact" className="hover:text-[#66FCF1]">
                Contact
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                {user.isAdmin && (
                  <li className="mt-5">
                    <NavLink to="/admin" className="hover:text-[#66FCF1]">
                      Admin
                    </NavLink>
                  </li>
                )}
                <li className="mt-5">
                  <NavLink to="/logout" className="hover:text-[#66FCF1]">
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="mt-5">
                  <NavLink to="/login" className="hover:text-[#66FCF1]">
                    Login
                  </NavLink>
                </li>
                <li className="mt-5">
                  <NavLink to="/register" className="hover:text-[#66FCF1]">Register</NavLink></li>
              </>
              )
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;