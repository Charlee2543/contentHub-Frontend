import axios, { AxiosResponse } from "axios";
import { dataRegisterType, dataLoginType } from "@/types/type";
const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

export const registerApi = async (
   dataUser: dataRegisterType
): Promise<AxiosResponse<unknown>> => {
   try {
      const response = await axios.post(`${API_URL}/user/`, dataUser);
      // console.log("success register", response);
      return response;
   } catch (error) {
      // console.error("Error register", error);
      throw error;
   }
};

export const loginApi = async (
   dataUser: dataLoginType
): Promise<AxiosResponse<unknown>> => {
   try {
      const response = await axios.post(`${API_URL}/user/login/`, dataUser, {
         withCredentials: true, // ส่ง/รับ cookie
      });

      // console.log("success login", response);
      return response;
   } catch (error) {
      // console.error("Error login", error);
      throw error;
   }
};
