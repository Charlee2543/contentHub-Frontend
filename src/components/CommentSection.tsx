import React, { useEffect } from "react";
import { useComments } from "@/hook/useComments";
import { CommentForm } from "@/components/ui/comment/CommentForm";
import { CommentItem } from "@/components/ui/comment/CommentItem";
import { ArticleComment } from "@/types/type";

interface CommentsSectionProps {
   articleId: number;
   currentUserInitial?: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
   articleId,
   currentUserInitial = "Gr",
}) => {
   const {
      comments,
      loading,
      error,
      addComment,
      replyComment,
      setOneTimeLoad,
   } = useComments(articleId);

   useEffect(() => {
      setOneTimeLoad(true);
   }, [setOneTimeLoad]);

   // console.log("comments: ", comments);
   const handleNewComment = async (content: string) => {
      await addComment({ article: articleId, content });
   };

   if (loading) {
      return (
         <div className="bg-[var(--dark-green)] rounded-lg p-6">
            <div className="text-center py-8">
               <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
               <p className="mt-2 text-gray-400">Loading comments...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="bg-[var(--dark-green) rounded-lg p-6">
            <div className="text-center py-8 text-red-400">
               <p>Error loading comments: {error}</p>
            </div>
         </div>
      );
   }

   // Flatten comments and replies for display
   const allComments: Array<{ comment: ArticleComment; isReply: boolean }> = [];

   comments.forEach((comment) => {
      allComments.push({ comment, isReply: false });
      comment.replies?.forEach((reply: ArticleComment) => {
         allComments.push({ comment: reply, isReply: true });
      });
   });

   return (
      <div className="rounded-lg py-7 mb-8 ">
         {/* <h3 className="text-xl font-semibold text-white mb-6">Comments</h3> */}

         <div className="space-y-4">
            {/* All Comments and Replies */}
            {allComments.map(({ comment, isReply }) => (
               <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={replyComment}
                  article={articleId}
                  isReply={isReply}
                  currentUserInitial={currentUserInitial}
               />
            ))}

            {/* New Comment Form */}
            <div className="border-t border-gray-700 pt-4">
               <CommentForm
                  onSubmit={handleNewComment}
                  userInitial={currentUserInitial}
               />
            </div>
         </div>
      </div>
   );
};
