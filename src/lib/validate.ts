/*
login access > set access to context 
> set refresh to cookie > set datauser to local storage

check access > check refresh > remove datauser refresh access

   localStorage.removeItem('yourKeyName');
   value = localStorage.getItem("favoriteNumber") || ""
   */

// ลองแก้เป็น oop ได้

"use client";
import Cookies from "js-cookie";
import { useAuth } from "@/lib/authLoginLogout";
// import { userProfile } from "@/types/type";

export const RemoveUserProfile = () => {
   const { resetAccessToken } = useAuth();
   resetAccessToken();
   localStorage.removeItem("userProfile");
};

export const CheckRefreshtoken = () => {
   const { refresh, setStatusOpen, setStatusLogin } = useAuth();

   const statusSetLogin = () => {
      setStatusOpen(true);
      setStatusLogin("login");
   };

   if (Cookies.get("refresh")) {
      try {
         const refreshToken = async () => {
            const res = await refresh();
            if (res != null) {
               console.log("success refresh login");
            }
         };
         refreshToken();
         // const res = refreshToken();
      } catch (error) {
         console.log("หมดอายุการใช้งาน โปรด login ใหม่อีกครั้ง: ", error);
         RemoveUserProfile();
         // alert("หมดอายุการใช้งาน โปรด login ใหม่อีกครั้ง");
         statusSetLogin();
      }
   }
   // else {
   //    statusSetLogin();
   //    alert("โปรด login ก่อนทำรายการ");
   // }
};
