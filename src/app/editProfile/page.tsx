"use client";
import React from "react";
import Image from "next/image";
import { getUserLocalStorage } from "@/lib/getUserLocalStorage";
import { useEffect, useState } from "react";

export default function Page() {
   const [username, setUsername] = useState<string | null>(null);
   const [userImage, setUserImage] = useState<string | null>(null);
   const [userEmail, setUserEmail] = useState<string | null>(null);
   useEffect(() => {
      const userProfile = getUserLocalStorage();
      if (userProfile) {
         setUsername(userProfile.username);
         setUserEmail(userProfile.email);
         if (userProfile.profile_picture_url) {
            setUserImage(userProfile.profile_picture_url);
         }
      }
   }, []);

   return (
      <div className="flex flex-row mx-5  w-full">
         <section className="flex flex-col gap-3 justify-center items-center w-fit">
            {userImage ? (
               <Image
                  src={userImage}
                  alt={username ? username : "username"}
                  width={120}
                  height={120}
                  className="rounded-full"
               ></Image>
            ) : (
               <h1>Image Profile</h1>
            )}
            <button className="btns button-link w-full whitespace-nowrap">
               Change Profile
            </button>
            <button className="btns button-link w-full whitespace-nowrap">
               Change Password
            </button>
         </section>
         <div className="border-l-1 border-[#c3c3c375] h-full mx-5"></div>
         <section className="w-full py-5 flex flex-col items-center gap-6 ">
            <h1 className="second-title ">Edit your account</h1>
            <label
               className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
                                    focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] w-full max-w-[400px]  
                                          `}
            >
               <input
                  name="email"
                  type="email"
                  // ref={loginRegister("email").ref}
                  // onChange={(e) => {
                  //    setErrorAlertLogin(false);
                  //    loginRegister("email").onChange(e);
                  // }}
                  // onBlur={loginRegister("email").onBlur}
                  placeholder={"Email"}
                  value={userEmail ? userEmail : ""}
                  onChange={(e) => {
                     setUserEmail(e.target.value);
                  }}
                  className="w-full content-text placeholder:description-text focus:outline-0 "
               />
            </label>
            <label
               className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px] focus:outline-none focus-within:border-1 
                  focus-within:border-[var(--pale-green)] w-full max-w-[400px] `}
            >
               <input
                  name="username"
                  type="text"
                  // ref={loginRegister("email").ref}
                  // onChange={(e) => {
                  //    setErrorAlertLogin(false);
                  //    loginRegister("email").onChange(e);
                  // }}
                  // onBlur={loginRegister("email").onBlur}
                  placeholder={"username"}
                  value={username ? username : ""}
                  onChange={(e) => {
                     setUsername(e.target.value);
                  }}
                  className="w-full content-text placeholder:description-text focus:outline-0 "
               />
            </label>
            <button className="btns button-link  w-full max-w-[400px] ">
               Change your profile
            </button>
         </section>
      </div>
   );
}
