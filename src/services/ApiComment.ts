import { useAuth } from "@/lib/authLoginLogout";
import { CommentCreate, ArticleComment } from "@/types/type";
import axios from "axios";

export const ApiComment = () => {
   const { api } = useAuth();
   const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

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

   async function createComment(data: CommentCreate): Promise<ArticleComment> {
      const response = await api.post<ArticleComment>(
         `${API_URL}/commentPost/`,
         data
      );
      return response.data;
   }

   async function replyToComment(
      parentId: number,
      content: string
   ): Promise<ArticleComment> {
      const response = await api.post<ArticleComment>(
         `${API_URL}/commentPost/${parentId}/reply/`,
         {
            method: "POST",
            body: JSON.stringify({ content }),
         }
      );
      return response.data;
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
