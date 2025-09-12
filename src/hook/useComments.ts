import { useState, useEffect } from "react";
import { ArticleComment, CommentCreate } from "@/types/type";
import { ApiComment } from "@/services/ApiComment";

export const useComments = (articleId: number) => {
   const [comments, setComments] = useState<ArticleComment[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const { createComment, replyToComment, getCommentsByArticle } = ApiComment();
   const [oneTimeLoad, setOneTimeLoad] = useState<boolean>(false);
   // console.log("oneTimeLoad: ", oneTimeLoad);

   useEffect(() => {
      const fetchComments = async () => {
         // console.log("comments.length: ", comments.length);
         if (comments.length === 0 && oneTimeLoad) {
            setOneTimeLoad(false);
            try {
               // console.log("useComments  getCommentsByArticle ");
               setLoading(true);
               //  ดึงข้อมูลจาก server
               const data = await getCommentsByArticle(articleId);
               setComments(data);
               setError(null);
            } catch (err) {
               setError(
                  err instanceof Error ? err.message : "Failed to load comments"
               );
            } finally {
               setLoading(false);
            }
         } else {
            // console.log("There is already comments information. ");
         }
      };
      if (articleId) {
         fetchComments();
      }
   }, [articleId, comments.length, getCommentsByArticle, oneTimeLoad]);

   const addComment = async (commentData: CommentCreate) => {
      try {
         const newComment = await createComment(commentData);
         console.log("newComment: ", newComment);
         // เพิ่ม comment ใหม่ที่ด้านบนของรายการ
         setComments((prev) => [newComment, ...prev]);
         return newComment;
      } catch (err) {
         setError(err instanceof Error ? err.message : "Failed to add comment");
         throw err;
      }
   };

   const replyComment = async (
      parentId: number,
      content: string,
      article: number
   ) => {
      try {
         const reply = await replyToComment(parentId, content, article);
         console.log("reply: ", reply);
         // เพิ่ม reply ในรายการ replies ของ parent comment
         setComments((prev) =>
            prev.map((comment) =>
               comment.id === parentId
                  ? {
                       ...comment,
                       replies: [...comment.replies, reply],
                       replies_count: comment.replies_count + 1,
                    }
                  : comment
            )
         );
         return reply;
      } catch (err) {
         setError(err instanceof Error ? err.message : "Failed to reply");
         throw err;
      }
   };

   return {
      comments,
      loading,
      error,
      addComment,
      replyComment,
      setOneTimeLoad,
      // refetch: fetchComments,
   };
};
