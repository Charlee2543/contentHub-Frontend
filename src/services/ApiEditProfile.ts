import { useAuth } from "@/lib/authLoginLogout";
import { UserProfile, ResponseUserProfile } from "@/types/type";
// import { UUID } from "crypto";
export const ApiEditProfile = () => {
   const { api } = useAuth();
   const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

   const getUserProfile = async (
      data: string,
   ): Promise<ResponseUserProfile> => {
      const response = await api.get<ResponseUserProfile>(
         `${API_URL}/user/${data}/`,
      );
      return response.data;
   };

   const putUserProfile = async (
      data: UserProfile,
   ): Promise<ResponseUserProfile> => {
      console.log("putUserProfile ");
      console.log("data: ", data);
      const response = await api.put<ResponseUserProfile>(
         `${API_URL}/user/editProfile/`,
         { data },
      );
      return response.data;
   };

   return { getUserProfile, putUserProfile };
};
