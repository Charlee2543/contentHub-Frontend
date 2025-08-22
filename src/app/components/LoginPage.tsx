import React, { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import InputText from "./InputText";

type LoginStatus = "login" | "register" | null;

interface loginOageType {
   statusOpen: boolean;
   setStatusOpen: Dispatch<SetStateAction<boolean>>;
   statusLogin: LoginStatus;
   setStatusLogin: Dispatch<SetStateAction<LoginStatus>>;
   declareLogin: () => void;
   declareRegister: () => void;
}
// interface changeDataType<T> {
//    setValue: T;
//    funtionSet: React.Dispatch<React.SetStateAction<T>>;
//    keyValuaSet: keyof T; // ให้เลือก key ของ object
// }
interface dataLoginType {
   email: string;
   password: string;
}

interface dataRegisterType {
   username: string;
   email: string;
   password: string;
}

function LoginPage({
   statusLogin,
   setStatusLogin,
   declareLogin,
   declareRegister,
   statusOpen,
   setStatusOpen,
}: loginOageType) {
   const [dataLogin, setDataLogin] = useState<dataLoginType>({
      email: "",
      password: "",
   });
   const [dataRegister, setDataRegister] = useState<dataRegisterType>({
      username: "",
      email: "",
      password: "",
   });

   const [confirmPassword, setConfirmPassword] = useState<string>("");

   // const changeData = <T,>({
   //    setValue,
   //    funtionSet,
   //    keyValuaSet,
   // }: changeDataType<T>) => {
   //    funtionSet((value) => ({ ...value, [keyValuaSet]: setValue }));
   // };
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

   // การเปปลี่ยนแปลงลองแก้เป็น oop ได้
   // การเปลี่ยนค่า login
   const changeLoginEmail = (setEmail: string) => {
      setDataLogin((value) => ({ ...value, email: setEmail }));
   };
   const changeLoginPassword = (setPassword: string) => {
      setDataLogin((value) => ({ ...value, password: setPassword }));
   };
   // การเปลียนค่า register
   const changeRegisterUsername = (setUsername: string) => {
      setDataRegister((value) => ({ ...value, username: setUsername }));
   };
   const changeRegisterEmail = (setEmail: string) => {
      setDataRegister((value) => ({ ...value, email: setEmail }));
   };
   const changeRegisterPassword = (setPassword: string) => {
      setDataRegister((value) => ({ ...value, password: setPassword }));
   };
   const checkConfirmPassword = (checkPassword: string) => {
      setConfirmPassword(checkPassword);
   };

   return statusOpen ? (
      <div className="absolute z-2 w-[100vw] h-[100vh] overflow-clip bg-[#3d3d3d69] flex items-start justify-center">
         <section
            ref={modalRef}
            className="relative w-full max-w-[480px] mt-10 px-8 py-5 bg-[var(--dark-green)] rounded-lg shadow-lg "
         >
            {statusLogin === "login" ? (
               <div className="flex flex-col justify-start items-center w-full gap-4 ">
                  <button
                     className="btn absolute right-4 top-2 hover:text-red-400"
                     onClick={closeLoginpage}
                  >
                     X
                  </button>
                  <h1 className="feature-title text-center">Welcome back</h1>
                  <div className=" w-full max-w-[400px] ">
                     <p>Email</p>
                     <InputText
                        typeInput={"email"}
                        valueText={dataLogin.email}
                        setValueText={changeLoginEmail}
                        placeholder={"email"}
                        stlyeTailwind="w-full  my-2"
                     />
                  </div>
                  <div className=" w-full max-w-[400px]">
                     <p>Password</p>
                     <InputText
                        typeInput={"Password"}
                        valueText={dataLogin.password}
                        setValueText={changeLoginPassword}
                        placeholder={"Password"}
                        stlyeTailwind="w-full  my-2"
                     />
                     <p className="tag-text">Forgot password?</p>
                  </div>
                  <button
                     className=" button-link w-full"
                     onClick={() => declareLogin()}
                  >
                     Login
                  </button>
                  <button
                     className=" btn tag-text "
                     onClick={() => setStatusLogin("register")}
                  >
                     <p>Don ot have an account? Sign up</p>
                  </button>
               </div>
            ) : statusLogin === "register" ? (
               <div className="flex flex-col justify-start items-center w-full gap-6 ">
                  <button
                     className="btn absolute right-4 top-2 hover:text-red-400"
                     onClick={closeLoginpage}
                  >
                     X
                  </button>
                  <h1 className="feature-title">Create your account</h1>
                  <div className="flex flex-col gap-3 mb- w-full max-w-[350px] ">
                     <InputText
                        typeInput={"text"}
                        valueText={dataRegister.username}
                        setValueText={changeRegisterUsername}
                        placeholder={"Full Name"}
                        stlyeTailwind="w-full max-w-[400px] "
                     />
                     <InputText
                        typeInput={"email"}
                        valueText={dataRegister.email}
                        setValueText={changeRegisterEmail}
                        placeholder={"email"}
                        stlyeTailwind="w-full max-w-[400px] "
                     />

                     <InputText
                        typeInput={"Password"}
                        valueText={dataRegister.password}
                        setValueText={changeRegisterPassword}
                        placeholder={"Password"}
                        stlyeTailwind="w-full max-w-[400px] "
                     />
                     <InputText
                        typeInput={"Password"}
                        valueText={confirmPassword}
                        setValueText={checkConfirmPassword}
                        placeholder={"Confirm Password"}
                        stlyeTailwind="w-full max-w-[400px] "
                     />
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-[400px]">
                     <button
                        className=" button-link "
                        onClick={() => declareRegister()}
                     >
                        Sign Up
                     </button>
                     <button
                        className=" btn tag-text "
                        onClick={() => setStatusLogin("login")}
                     >
                        <p>Already have an account? Log in</p>
                     </button>
                  </div>
               </div>
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
