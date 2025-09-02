import React, { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import InputText from "./ui/InputText";
import { registerApi, loginApi } from "@/services/user";
import { dataRegisterType, dataLoginType, userProfile } from "@/types/type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   registerSchema,
   RegisterType,
   loginSchema,
   loginType,
} from "@/lib/zodValidation";
import { AxiosResponse, AxiosError } from "axios";
import { useAuth } from "@/lib/authLoginLogout";

type LoginStatus = "login" | "register" | null;

interface loginOageType {
   statusOpen: boolean;
   setStatusOpen: Dispatch<SetStateAction<boolean>>;
   statusLogin: LoginStatus;
   setStatusLogin: Dispatch<SetStateAction<LoginStatus>>;
   declareLogin: () => void;
   declareRegister: () => void;
}

interface responseErrorTypeLogin {
   non_field_errors: string[];
}
interface responseErrorTyperegister {
   [key: string]: string[];
}

// interface changeDataType<T> {
//    setValue: T;
//    funtionSet: React.Dispatch<React.SetStateAction<T>>;
//    keyValuaSet: keyof T; // ให้เลือก key ของ object
// }

function LoginPage({
   statusLogin,
   setStatusLogin,
   declareLogin,
   declareRegister,
   statusOpen,
   setStatusOpen,
}: loginOageType) {
   // const [dataLogin, setDataLogin] = useState<dataLoginType>({
   //    email: "",
   //    password: "",
   // });
   // const [dataRegister, setDataRegister] = useState<dataRegisterType>({
   //    username: "",
   //    email: "",
   //    password: "",
   // });
   const { login, refresh, logout, accessToken } = useAuth();
   const [errorAlertLogin, setErrorAlertLogin] = useState<boolean>(false);

   // เก็บ data ของ register
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm<RegisterType>({
      resolver: zodResolver(registerSchema),
   });

   // เก็บ data ของ login
   const {
      register: loginRegister,
      handleSubmit: handleLoginSubmit,
      formState: { errors: loginErrors },
      reset: resetLogin,
   } = useForm<loginType>({
      resolver: zodResolver(loginSchema),
   });

   //  ปิดเมื่อclick นอก element ทำเป็น custom hook ได้
   const closeLoginpage = () => {
      setStatusOpen(false);
   };

   const modalRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const closePage = () => {
         setStatusOpen(false);
      };

      // handler สำหรับตรวจจับการคลิก
      const handleClickOutside = (event: MouseEvent) => {
         if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node) // ดูว่าหากการคลิกเมาร์ไม่ตรงกับกรอบที่ ref ไว้ให้ declare function
         ) {
            closePage(); // ถ้าคลิกนอก modal → ปิด
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [setStatusOpen]);

   // การเปลี่ยนค่า login

   const declareLoginWeb = async (dataLogin: dataLoginType) => {
      // try {
      // แก้ให้ status 201 ถึงไปหน้า login
      const result = await login(dataLogin.email, dataLogin.password);
      console.log("success login:", result);
      const dataUser = result as unknown as AxiosResponse<userProfile>;
      if (result.status === 200) {
         alert(`Success Login Welcome \n${dataUser.data.username}`);
         resetLogin({
            email: "",
            password: "",
         });
         setStatusOpen(false);
      } else {
         const dataError = result as AxiosError<responseErrorTypeLogin>;
         if (dataError.response) {
            console.log(
               "dataError: ",
               dataError.response.data.non_field_errors
            );
            alert(
               `error login \n${dataError.response.data.non_field_errors.join(
                  "\n"
               )}`
            );
         } else {
            console.error("Unexpected error:", dataError);
         }
      }
      // } catch (error) {
      //    console.error("Error login:", error);
      //    const responseError = error as AxiosError<responseErrorTypeLogin>;
      //    setErrorAlertLogin(true);
      //    if (responseError.response) {
      //       console.log(
      //          "responseError: ",
      //          responseError.response.data.non_field_errors
      //       );
      //       alert(
      //          `error login \n${responseError.response.data.non_field_errors.join(
      //             "\n"
      //          )}`
      //       );
      //    } else {
      //       console.error("Unexpected error:", error);
      //    }
      // }
   };

   // การเปลียนค่า register
   const declareRegisterUp = async (dataRegister: dataRegisterType) => {
      try {
         // แก้ให้ status 201 ถึงไปหน้า login
         const result = await registerApi(dataRegister);
         console.log("success register:", result);
         if (result.status === 201) {
            alert("success register");
            reset({
               username: "",
               email: "",
               password: "",
               confirmPassword: "",
            });
            setStatusLogin("login");
         }
      } catch (error) {
         console.error("Error register:", error);
         const responseError = error as AxiosError<responseErrorTyperegister>;
         if (responseError.response) {
            const data = responseError.response.data;
            console.log("responseError: ", responseError.response.data);
            const messages = Object.entries(data)
               .map(([key, errors]) => `${key}: ${errors.join(", ")}`)
               .join("\n");
            alert(`error register \n${messages}`);
         } else {
            console.error("Unexpected error:", error);
         }
         console.error("Error register:", error);
      }
   };

   return statusOpen ? (
      <div className="absolute z-2 w-[100vw] h-[100vh] overflow-clip bg-[#3d3d3d69] flex items-start justify-center">
         <section
            ref={modalRef}
            className="relative w-full max-w-[480px] h-[400px]  mt-10 px-8 py-5 bg-[var(--dark-green)] rounded-lg shadow-lg "
         >
            {statusLogin === "login" ? (
               <form
                  onSubmit={handleLoginSubmit(declareLoginWeb)}
                  className="flex flex-col justify-around items-center w-full h-full gap-4"
               >
                  <button
                     className="btn absolute right-4 top-2 hover:text-red-400"
                     onClick={closeLoginpage}
                  >
                     X
                  </button>
                  <h1 className="feature-title text-center">Welcome back</h1>
                  <div className=" w-full max-w-[400px]">
                     <p>Email</p>
                     {/* <InputText
                        typeInput={"email"}
                        valueText={dataLogin.email}
                        setValueText={changeLoginEmail}
                        placeholder={"email"}
                        stlyeTailwind="w-full  my-2"
                     /> */}
                     <label
                        tabIndex={0}
                        className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
                                    focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] w-full max-w-[400px]  
                                    ${
                                       errorAlertLogin
                                          ? "border-red-500 border-2 "
                                          : ""
                                    }`}
                     >
                        <input
                           name="email"
                           type="email"
                           ref={loginRegister("email").ref}
                           onChange={(e) => {
                              setErrorAlertLogin(false);
                              loginRegister("email").onChange(e);
                           }}
                           onBlur={loginRegister("email").onBlur}
                           placeholder={"Email"}
                           className="w-full content-text placeholder:description-text focus:outline-0 "
                        />
                     </label>
                     {loginErrors.email && (
                        <p className="text-red-500 text-sm">
                           {loginErrors.email.message}
                        </p>
                     )}
                  </div>
                  <div className=" w-full max-w-[400px]">
                     <p>Password</p>
                     {/* <InputText
                        typeInput={"Password"}
                        valueText={dataLogin.password}
                        setValueText={changeLoginPassword}
                        placeholder={"Password"}
                        stlyeTailwind="w-full  my-2"
                     /> */}
                     <label
                        tabIndex={0}
                        className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
                                    focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] w-full max-w-[400px]  
                                    ${
                                       errorAlertLogin
                                          ? "border-red-500 border-2 "
                                          : ""
                                    }`}
                     >
                        <input
                           name="password"
                           type="password"
                           ref={loginRegister("password").ref}
                           onChange={(e) => {
                              setErrorAlertLogin(false);
                              loginRegister("password").onChange(e);
                           }}
                           onBlur={loginRegister("password").onBlur}
                           placeholder={"password"}
                           className="w-full content-text placeholder:description-text focus:outline-0 "
                        />
                     </label>
                     {loginErrors.password && (
                        <p className="text-red-500 text-sm">
                           {loginErrors.password.message}
                        </p>
                     )}
                     <p className="tag-text">Forgot password?</p>
                  </div>
                  <button
                     type="submit"
                     className=" button-link w-full mt-2"
                     // onClick={() => declareLogin()}
                  >
                     Login
                  </button>
                  <button
                     className=" btn tag-text "
                     onClick={() => setStatusLogin("register")}
                  >
                     <p>Don ot have an account? Sign up</p>
                  </button>
                  {/* <button
                     type="button"
                     className=" button-link w-full mt-2"
                     onClick={() => logout()}
                  >
                     Logout
                  </button>
                  <button
                     type="button"
                     className=" button-link w-full mt-2"
                     onClick={() => refresh()}
                  >
                     Refresh
                  </button> */}
               </form>
            ) : statusLogin === "register" ? (
               <form
                  onSubmit={handleSubmit(declareRegisterUp)}
                  className="flex flex-col justify-start items-center w-full gap-6 "
               >
                  <button
                     className="btn absolute right-4 top-2 hover:text-red-400"
                     onClick={closeLoginpage}
                  >
                     X
                  </button>
                  <h1 className="feature-title">Create your account</h1>
                  <div className="flex flex-col gap-3 mb- w-full max-w-[350px] ">
                     <div>
                        <label
                           tabIndex={0}
                           className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
            focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] w-full max-w-[400px]  `}
                        >
                           <input
                              name="username"
                              ref={register("username").ref}
                              onChange={register("username").onChange}
                              onBlur={register("username").onBlur}
                              placeholder={"Full Name"}
                              className="w-full content-text placeholder:description-text focus:outline-0 "
                           />
                        </label>
                        {errors.username && (
                           <p className="text-red-500 text-sm">
                              {errors.username.message}
                           </p>
                        )}
                     </div>
                     <div>
                        <label
                           tabIndex={0}
                           className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
            focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] w-full max-w-[400px]  `}
                        >
                           <input
                              name="email"
                              ref={register("email").ref}
                              onChange={register("email").onChange}
                              onBlur={register("email").onBlur}
                              placeholder={"email"}
                              className="w-full content-text placeholder:description-text focus:outline-0 "
                           />
                        </label>
                        {errors.email && (
                           <p className="text-red-500 text-sm">
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                     <div>
                        <label
                           tabIndex={0}
                           className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
            focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] w-full max-w-[400px]  `}
                        >
                           <input
                              type="password"
                              name="password"
                              ref={register("password").ref}
                              onChange={register("password").onChange}
                              onBlur={register("password").onBlur}
                              placeholder={"password"}
                              className="w-full content-text placeholder:description-text focus:outline-0 "
                           />
                        </label>
                        {errors.password && (
                           <p className="text-red-500 text-sm">
                              {errors.password.message}
                           </p>
                        )}
                     </div>
                     <div>
                        <label
                           tabIndex={0}
                           className={`flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
            focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] w-full max-w-[400px]  `}
                        >
                           <input
                              type="password"
                              name="confirmPassword"
                              ref={register("confirmPassword").ref}
                              onChange={register("confirmPassword").onChange}
                              onBlur={register("confirmPassword").onBlur}
                              placeholder={"confirmPassword"}
                              className="w-full content-text placeholder:description-text focus:outline-0 "
                           />
                        </label>
                        {errors.confirmPassword && (
                           <p className="text-red-500 text-sm">
                              {errors.confirmPassword.message}
                           </p>
                        )}
                     </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-[400px]">
                     <button type="submit" className=" button-link ">
                        Sign Up
                     </button>
                     <button
                        className=" btn tag-text "
                        onClick={() => setStatusLogin("login")}
                     >
                        <p>Already have an account? Log in</p>
                     </button>
                  </div>
               </form>
            ) : (
               <div></div>
            )}
         </section>
      </div>
   ) : (
      <div></div>
   );
}

export default LoginPage;
