import { useAuth } from "@/lib/authLoginLogout";
import { CommentCreate, ArticleComment } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

export const ApiComment = () => {
   const { api } = useAuth();
   const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

   // หา id user
   const [userIdLogin, setUserIdLogin] = useState<string>("unknown user");

   useEffect(() => {
      let dataUserLocalstorage = null;
      const userData = localStorage.getItem("userProfile");
      if (userData) {
         try {
            dataUserLocalstorage = JSON.parse(userData);
            if (dataUserLocalstorage.user_id) {
               setUserIdLogin(dataUserLocalstorage.user_id);
               // setLoginSuccessful(true);
            }
         } catch (error) {
            console.error("Failed to parse user data from localStorage", error);
            // setLoginSuccessful(false);
         }
      }
   }, []);

   async function getCommentsByArticle(
      articleId: number
   ): Promise<ArticleComment[]> {
      console.log("declear getCommentsByArticle");
      try {
         const response = await axios.get<ArticleComment[]>(
            `${API_URL}/commentPost/?article_id=${articleId}`
         );
         console.log("response getCommentsByArticle : ", response);
         return response.data;
      } catch (error) {
         console.error(" getCommentsByArticle error: ", error);
         return [];
      }
   }

   async function createComment(data: CommentCreate): // Promise<string>
   Promise<ArticleComment> {
      console.log("API createComment data: ", data);
      const response = await api.post<ArticleComment>(
         `${API_URL}/commentPost/`,
         { ...data, user: userIdLogin }
      );
      return response.data;
      // return "completed createComment";
   }

   async function replyToComment(
      parentId: number,
      content: string,
      article: number
   ): //  Promise<string>
   Promise<ArticleComment> {
      const response = await api.post<ArticleComment>(
         `${API_URL}/commentPost/${parentId}/reply/`,
         {
            content,
            article: article,
            user: userIdLogin,
         }
      );
      return response.data;
      // return "completed replyToComment";
   }

   // setToken(token: string) {
   //    this.token = token;
   //    if (typeof window !== "undefined") {
   //       localStorage.setItem("auth_token", token);
   //    }
   // }
   return {
      getCommentsByArticle,
      createComment,
      replyToComment,
   };
};

// export const apiClient = new ApiClient(API_BASE_URL);
// function getCommentsByArticle(articleId: any, number: any) {
//    throw new Error("Function not implemented.")
// }
