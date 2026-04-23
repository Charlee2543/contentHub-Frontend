"use client";
import React from "react";
import Image from "next/image";
import { getUserLocalStorage } from "@/lib/getUserLocalStorage";
import { useEffect, useState } from "react";
import { ApiEditProfile } from "@/services/ApiEditProfile";
import { UserProfile } from "@/types/type";
import AlertMassege from "@/components/AlertMassege";

export default function Page() {
   const { getUserProfile, putUserProfile } = ApiEditProfile();
   // const [userUUID, setUserUUID] = useState<string | null>(null);
   const [userRequestProfile, setUserRequestProfile] = useState<UserProfile>({
      username: "",
      email: "",
      userId: "",
   });
   const [userImage, setUserImage] = useState<string | null>(null);
   //  message alert

   /* 
   function insert message alert to array
   function import message to show alert 
   useEffect remove alert text
   
   */
   const [textAlert, setTextAlert] = useState<string>(``);
   // console.log("textAlert: ", textAlert);
   const [statusOpenAlert, setStatusOpenAlert] = useState<boolean>(false);
   // console.log("statusOpenAlert: ", statusOpenAlert);
   // เมื่อมีแจ้งเตือน ให้ทำการเพิ่มแจ้งเตื่อนยไป useState แล้ว set alert ture
   const messageAlert = (message: string) => {
      setTextAlert((prev) => prev + `\n` + message);
      setStatusOpenAlert(true);
   };
   // เมื่อ statusOpenAlert เป็น false ให้ textAlert []
   useEffect(() => {
      if (statusOpenAlert === false && textAlert) {
         setTextAlert(``);
      }
   }, [statusOpenAlert, textAlert]);
   //  end message alert
   useEffect(() => {
      const userProfile = getUserLocalStorage();
      console.log("userProfile: ", userProfile);
      if (userProfile) {
         console.log("set data from local");
         setUserRequestProfile({
            ...userRequestProfile,
            username: userProfile.username,
            email: userProfile.email,
            userId: userProfile.user_id,
         });

         if (userProfile.profile_picture_url) {
            setUserImage(userProfile.profile_picture_url);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const getDataUserProfile = async () => {
      if (userRequestProfile.userId) {
         const data = await getUserProfile(userRequestProfile.userId);
         console.log("getUserProfile: ", data);
      }
   };

   const submitEditProfile = async () => {
      console.log("submitEditProfile ");
      if (userRequestProfile.email && userRequestProfile.username) {
         // console.log("userProfile: ", userRequestProfile);
         const data = putUserProfile(userRequestProfile);
         console.log("data: ", data);
         // นำไปแก้ไขที่ localhost
      } else {
         switch (true) {
            case !userRequestProfile.email:
               console.log("ใส่ค่าemail");
               messageAlert("ใส่ค่าemail");
            case !userRequestProfile.username:
               console.log("ใส่ค่าusername");
               messageAlert("ใส่ค่าusername");
            default:
               break;
         }
      }
   };

   // const booleanCheck = true;
   return (
      <div className="flex flex-row justify-center mx-5  w-[70%] ">
         <section className="flex flex-col gap-3 justify-center items-center w-fit ">
            {userImage ? (
               <Image
                  src={userImage}
                  alt={
                     userRequestProfile.username
                        ? userRequestProfile.username
                        : "username"
                  }
                  width={120}
                  height={120}
                  className="rounded-full"
               ></Image>
            ) : (
               <h1>Image Profile</h1>
            )}
            <button
               // onClick={() => putUserProfile()}
               className="btns button-link w-full whitespace-nowrap"
            >
               Change Profile
            </button>
            <button
               onClick={() => getDataUserProfile()}
               className="btns button-link w-full whitespace-nowrap"
            >
               Change Password
            </button>
         </section>
         <div className="border-l-1 border-[#c3c3c375] h-full mx-10 "></div>
         <section className="w-fit py-5 flex flex-col items-center gap-6 ">
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
                  value={
                     userRequestProfile.email ? userRequestProfile.email : ""
                  }
                  onChange={(e) => {
                     setUserRequestProfile({
                        ...userRequestProfile,
                        email: e.target.value,
                     });
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
                  value={
                     userRequestProfile.username
                        ? userRequestProfile.username
                        : ""
                  }
                  onChange={(e) => {
                     setUserRequestProfile({
                        ...userRequestProfile,
                        username: e.target.value,
                     });
                  }}
                  className="w-full content-text placeholder:description-text focus:outline-0 "
               />
            </label>
            <button
               onClick={() => submitEditProfile()}
               className="btns button-link  w-full max-w-[400px] "
            >
               Change your profile
            </button>
            <AlertMassege
               message={textAlert}
               statusOpen={statusOpenAlert}
               setStatusOpen={setStatusOpenAlert}
            />
         </section>
      </div>
   );
}
