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
      accessToken,
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
      try {
         const userData = localStorage.getItem("userProfile");
         if (userData) {
            dataUserLocalstorage = JSON.parse(userData);
            if (dataUserLocalstorage.username) {
               setUsernameLogin(dataUserLocalstorage.username);
            }
            setLoginSuccessful(true);

            // try {
            //    accessToken
            //    // จะเช็คว่ามี accessToken ไหม
            // } catch (error) {
            //    console.log("Token expired : " + error);
            //    setLoginSuccessful(false);
            // }
         } else {
            // กรณีที่ข้อมูลใน localStorage เสียหายหรือไม่ใช่ JSON
            console.error("Failed to parse user data from localStorage");
            setLoginSuccessful(false);
         }
      } catch (error) {
         console.log("not login : " + error);
         setLoginSuccessful(false);
      }
   }, [, accessToken]);

   return (
      <div className="sticky top-0 z-30">
         <header className="flex items-center justify-between bg-[var(--dark-green)] px-10 py-3 border-b border-solid border-b-[#E5E8EB] ">
            <div className="flex items-center gap-8">
               <Link
                  href="#"
                  className="btn flex items-center gap-3  text-white cursor-pointer"
               >
                  <FontAwesomeIcon className="h-[16px] " icon={faMugSaucer} />
                  <h2 className="w-fit text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                     Content Hub
                  </h2>
               </Link>
               <div className="flex items-center gap-[30px]">
                  <Link className="btn content-text cursor-pointer" href="#">
                     Article
                  </Link>
                  <Link className="btn content-text cursor-pointer" href="#">
                     Contact Admin
                  </Link>
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
                        className="btn z-30 login-btn-text py-2 px-6 rounded-[8px] bg-[var(--dark-green)] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]"
                        onClick={() => setToggle((value) => !value)}
                     >
                        {usernameLogin}
                     </button>
                     {toggle && (
                        <div className="absolute -z-10 top-9 left-0 flex flex-col items-center pt-1 bg-[var(--forest-green)] w-full h-fit border-1 border-[var(--green-btn)] rounded-b-[8px] ">
                           <button className="btn py-1 hover:bg-[var(--dark-green)] hover:border-1 hover:border-[var(--green-btn)] w-full ">
                              Profile
                           </button>
                           <button
                              className="btn py-1 hover:bg-[var(--dark-green)] hover:border-1 hover:border-[var(--green-btn)] w-full "
                              onClick={refresh}
                           >
                              Refresh
                           </button>
                           <button
                              className="btn py-1 hover:bg-[var(--dark-green)] hover:border-1 hover:border-[var(--green-btn)] w-full rounded-b-[8px]"
                              onClick={logout}
                           >
                              Logout
                           </button>
                        </div>
                     )}
                  </div>
               ) : (
                  <button
                     className="btn z-0 login-btn-text py-2 px-6 rounded-[8px] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]"
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
