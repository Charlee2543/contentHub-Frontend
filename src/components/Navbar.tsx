"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { ClickTocloseElement } from "@/lib/ClickTocloseElement";
// import { useRouter } from "next/navigation";

import LoginPage from "./LoginPage";
import { useAuth } from "@/lib/authLoginLogout";
function Navbar() {
   const {
      logout,
      refresh,
      statusOpen,
      setStatusOpen,
      statusLogin,
      setStatusLogin,
      // accessToken,
   } = useAuth();
   // const router = useRouter();

   const statusSetLogin = () => {
      setStatusOpen(true);
      setStatusLogin("login");
   };
   const declareLogin = () => alert("Login");
   const declareRegister = () => alert("Register");

   const [toggle, setToggle] = useState(false);
   const modalRef = useRef<HTMLDivElement>(null);
   ClickTocloseElement(modalRef, setToggle);

   // เช็คว่าเคย login ไหม
   const [loginSuccessful, setLoginSuccessful] = useState<boolean>(false);
   const [usernameLogin, setUsernameLogin] = useState<string>("unknown user");
   useEffect(() => {
      let dataUserLocalstorage = null;
      const userData = localStorage.getItem("userProfile");
      if (userData) {
         try {
            dataUserLocalstorage = JSON.parse(userData);
            if (dataUserLocalstorage.username) {
               setUsernameLogin(dataUserLocalstorage.username);
               setLoginSuccessful(true);
            }
         } catch (error) {
            console.log("Failed to parse user data from localStorage", error);
            setLoginSuccessful(false);
         }
      }
   }, []);

   return (
      <div className="sticky top-0 z-30 w-full">
         <header className="flex items-center justify-between bg-[var(--dark-green)] px-10 py-3 border-b border-solid border-b-[#E5E8EB] ">
            <div className="flex items-center gap-8">
               <Link
                  href="/"
                  className="btnc flex items-center gap-3  text-white hover:text-[var(--green-btn)] hover:underline"
               >
                  <FontAwesomeIcon className="h-[16px] " icon={faMugSaucer} />
                  <h2 className="w-fit  text-lg font-bold leading-tight tracking-[-0.015em]  ">
                     Content Hub
                  </h2>
               </Link>
               <div className="flex items-center gap-[30px]">
                  <Link className="btnc content-text   " href="/">
                     <span className="hover:text-[var(--green-btn)] hover:underline">
                        Article
                     </span>
                  </Link>
                  {/* <Link className="btnc content-text cursor-pointer" href="/">
                     Contact Admin
                  </Link> */}
               </div>
            </div>
            <div className="flex flex-1 justify-end gap-8">
               {loginSuccessful ? (
                  <div
                     ref={modalRef}
                     style={{ transition: "all 0.3s ease scale(0.98)" }}
                     className="relative w-fit  z-0"
                  >
                     <button
                        className={`avatar avatar-placeholder `}
                        //  z-30 login-btn-text py-2 px-6 rounded-[8px] bg-[var(--dark-green)] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]
                        onClick={() => setToggle((value) => !value)}
                     >
                        {/* text-center align-middle  */}
                        <div className="btnc login-btn-text relative flex items-center justify-centers h-fit min-h-[30px] rounded-full bg-[var(--dark-green)] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]">
                           <span
                           // className="absolute top-[0px] left-[7px]"
                           // className="border"
                           >
                              {usernameLogin.charAt(0).toUpperCase() +
                                 usernameLogin.charAt(1)}
                           </span>
                        </div>
                     </button>
                     {/* {toggle && ( */}
                     <div
                        className={`transition-all transition-discrete ${
                           toggle ? " block opacity-100 " : " hidden opacity-0 "
                        } absolute -z-10 top-[15px] right-[15px] flex flex-col items-center  bg-[var(--forest-green)] w-[140px] h-fit border-1 border-[var(--green-btn)] rounded-[8px]`}
                     >
                        <button className="btnc py-1 hover:bg-[var(--dark-green)] hover:border-1 hover:border-[var(--green-btn)] w-full rounded-t-[8px]">
                           Profile
                        </button>
                        <button
                           className="btnc py-1 hover:bg-[var(--dark-green)] hover:border-1 hover:border-[var(--green-btn)] w-full "
                           onClick={refresh}
                        >
                           Refresh
                        </button>
                        <button
                           className="btnc py-1 hover:bg-[var(--dark-green)] hover:border-1 hover:border-[var(--green-btn)] w-full rounded-b-[8px]"
                           onClick={logout}
                        >
                           Logout
                        </button>
                     </div>
                     {/* )} */}
                  </div>
               ) : (
                  <button
                     className="btnc z-0 login-btn-text py-2 px-6 rounded-[8px] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]"
                     onClick={() => statusSetLogin()}
                  >
                     เข้าสูระบบ
                  </button>
               )}
            </div>
         </header>
         <LoginPage
            statusLogin={statusLogin}
            setStatusLogin={setStatusLogin}
            declareLogin={declareLogin}
            declareRegister={declareRegister}
            statusOpen={statusOpen}
            setStatusOpen={setStatusOpen}
         />
      </div>
   );
}

export default Navbar;
