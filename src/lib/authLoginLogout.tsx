"use client";
import React, {
   createContext,
   useContext,
   useState,
   ReactNode,
   Dispatch,
   SetStateAction,
} from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse, AxiosError } from "axios";
import { userToken, userProfile } from "@/types/type";
import { RemoveUserProfile } from "./validate";
import { buildApi } from "./apiValidateToken";
const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

interface responseErrorTypeLogin {
   non_field_errors: string[];
}

type LoginStatus = "login" | "register" | null;

type AuthContextType = {
   api: ReturnType<typeof buildApi>;
   accessToken: string | null;
   resetAccessToken: () => void;
   refresh: () => Promise<string | null>;
   login: (
      email: string,
      password: string
   ) => Promise<AxiosResponse<userToken> | AxiosError<responseErrorTypeLogin>>;
   logout: () => Promise<void>;
   statusOpen: boolean;
   setStatusOpen: Dispatch<SetStateAction<boolean>>;
   statusLogin: LoginStatus;
   setStatusLogin: Dispatch<SetStateAction<LoginStatus>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [accessToken, setAccessToken] = useState<string | null>(null);
   // const [dataUserProfile, setDataUserProfile] = useState<>();
   // console.log("accessToken: ", accessToken);

   const resetAccessToken = () => {
      setAccessToken(null);
   };
   // การตั้งค่าเปิดปิด login
   const [statusLogin, setStatusLogin] = useState<LoginStatus>("login");
   const [statusOpen, setStatusOpen] = useState<boolean>(false);

   const login = async (email: string, password: string) => {
      try {
         const res = await axios.post<userToken>(
            `${API_URL}/user/login/`,
            { email: email, password: password },
            {
               withCredentials: true, // ส่ง/รับ cookie
            }
         );
         //   if (!res.ok) throw new Error("login failed");
         const data = res; //as AxiosResponse<userToken>; // { access: "..." }
         console.log("data: ", data);
         const dataUser: userProfile = {
            user_id: data.data.user_id,
            username: data.data.username,
            email: data.data.email,
            profile_picture_url: data.data.profile_picture_url,
            created_at: data.data.created_at,
            updated_at: data.data.updated_at,
         };
         localStorage.setItem("userProfile", JSON.stringify(dataUser));
         setAccessToken(data.data.access);
         return res as AxiosResponse<userToken>;
      } catch (error) {
         console.error("Error login:", error);
         return error as AxiosError<responseErrorTypeLogin>;
      }
   };

   const refresh = async (): Promise<string | null> => {
      const res = await fetch(`${API_URL}/user/token/refresh/`, {
         method: "POST",
         credentials: "include", // ส่ง cookie refresh อัตโนมัติ
      });
      console.log("res: ", res);
      if (!res.ok) {
         // ลบข้อมูลใน localstorage
         setAccessToken(null);
         console.log("resno nok: non ok token ");
         return null;
      }
      // เช็ค UUID ใน localstorage ตรงกับ token ไหม ไม่ตรงให้แทนที่่
      const data = await res.json();
      console.log("data: ", data);
      setAccessToken(data.access);
      return data.access;
   };

   const logout = async () => {
      const res = await axios.post(`${API_URL}/user/logout/`, {
         withCredentials: true, // ส่ง/รับ cookie
      });
      console.log("res: ", res);
      Cookies.remove("refresh", { path: "/", domain: "localhost" });
      resetAccessToken();
      localStorage.removeItem("userProfile");
      // window.location.reload();
   };

   const api = buildApi(() => accessToken, refresh);

   return (
      <AuthContext.Provider
         value={{
            accessToken,
            resetAccessToken,
            login,
            refresh,
            logout,
            statusOpen,
            setStatusOpen,
            statusLogin,
            setStatusLogin,
            api,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
   return ctx;
};
