import axios from "axios";
import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

export function buildApi(
   getAccessToken: () => string | null,
   refreshFn: () => Promise<string | null>
) {
   const api = axios.create({
      baseURL: API_URL,
      withCredentials: true, // ให้ browser ส่ง cookie
   });

   api.interceptors.request.use((config) => {
      // การแนบ access token ไปกับ headers Bearer
      console.log("config: ", config);
      const token = getAccessToken();
      console.log("token: ", token);
      if (token && config.headers) {
         // แก้ไข: ใช้ .set() เพื่อกำหนดค่า header
         config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
   });

   api.interceptors.response.use(
      (r) => r,
      async (error) => {
         console.log("error: ", error);
         // เมื่อ acccess หมดอายุจะทำ refreshToken ต่ออายุ acccess
         const originalRequest = error.config;
         if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // originalRequest._retry คือสิงที่สร้างขึ้นมาเอง ในตอนแรกจะเป็น undefined หลักจะ reset จะเป็น true
            const newAccess = await refreshFn(); // จะทำ fetch('/api/token/refresh/', {credentials:'include'})
            if (newAccess) {
               console.log("newAccess: ", newAccess);
               originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
               return api(originalRequest);
            } else {
               console.log("reject refreshToken");
               localStorage.removeItem("userProfile");
               Cookies.remove("refresh");
               alert("token หมดอายุ โปรด login ใหม่");
               window.location.reload();
            }
         }
         return Promise.reject(error);
      }
   );

   return api;
}
