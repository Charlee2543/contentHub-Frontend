"use client";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
function Navbar() {
   const router = useRouter();

   return (
      <header className="flex items-center justify-between bg-[var(--dark-green)] px-10 py-3 border-b border-solid border-b-[#E5E8EB]  sticky top-0">
         <div className="flex items-center gap-8">
            <Link
               href="#"
               className="flex items-center gap-3  text-white cursor-pointer"
            >
               <FontAwesomeIcon className="h-[16px] " icon={faMugSaucer} />
               <h2 className="w-fit text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                  Content Hub
               </h2>
            </Link>
            <div className="flex items-center gap-[30px]">
               <Link className="content-text cursor-pointer" href="#">
                  Article
               </Link>
               <Link className="content-text cursor-pointer" href="#">
                  Contact Admin
               </Link>
            </div>
         </div>
         <div className="flex flex-1 justify-end gap-8">
            <button
               className="btn login-btn-text py-2 px-6 rounded-[8px] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]"
               onClick={() => router.push(`/`)}
            >
               เข้าสูระบบ
            </button>
         </div>
      </header>
   );
}

export default Navbar;
