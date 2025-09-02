import axios from "axios";
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
      const token = getAccessToken();
      if (token && config.headers) {
         // แก้ไข: ใช้ .set() เพื่อกำหนดค่า header
         config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
   });

   api.interceptors.response.use(
      (r) => r,
      async (error) => {
         // เมื่อ acccess หมดอายุจะทำ refreshToken ต่ออายุ acccess
         const originalRequest = error.config;
         if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccess = await refreshFn(); // จะทำ fetch('/api/token/refresh/', {credentials:'include'})
            if (newAccess) {
               originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
               return api(originalRequest);
            }
         }
         return Promise.reject(error);
      }
   );

   return api;
}
