"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";
import LoginPage from "./LoginPage";
function Navbar() {
   type LoginStatus = "login" | "register" | null;

   // const router = useRouter();
   const [statusLogin, setStatusLogin] = useState<LoginStatus>("login");
   const [statusOpen, setStatusOpen] = useState<boolean>(false);

   const statusSetLogin = () => {
      setStatusOpen(true);
      setStatusLogin("login");
   };
   const declareLogin = () => alert("Login");
   const declareRegister = () => alert("Register");

   return (
      <div className="sticky top-0">
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
                     1a Contact Admin
                  </Link>
               </div>
            </div>
            <div className="flex flex-1 justify-end gap-8">
               <button
                  className="btn login-btn-text py-2 px-6 rounded-[8px] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]"
                  onClick={() => statusSetLogin()}
               >
                  เข้าสูระบบ
               </button>
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
