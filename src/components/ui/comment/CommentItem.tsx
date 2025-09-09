import React, { useState } from "react";
import { ArticleComment } from "@/types/type";

import { CommentForm } from "./CommentForm";

interface CommentItemProps {
   comment: ArticleComment;
   onReply: (parentId: number, content: string) => Promise<ArticleComment>;
   isReply?: boolean;
   currentUserInitial?: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({
   comment,
   onReply,
   isReply = false,
   currentUserInitial = "gr",
}) => {
   const [showReplyForm, setShowReplyForm] = useState(false);

   const handleReply = async (content: string) => {
      await onReply(comment.id, content);
      setShowReplyForm(false);
   };

   const formatTimeAgo = (dateString: string) => {
      const now = new Date();
      const commentDate = new Date(dateString);
      const diffInSeconds = Math.floor(
         (now.getTime() - commentDate.getTime()) / 1000
      );

      if (diffInSeconds < 60) return "just now";
      if (diffInSeconds < 3600)
         return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400)
         return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
   };

   const getDisplayName = (user: ArticleComment["user"]) => {
      // const fullName = `${user.first_name} ${user.last_name}`.trim();
      if (user.username) {
         return user.username;
      }
      return null;
   };

   const getUserInitial = (user: ArticleComment["user"]) => {
      const displayName = getDisplayName(user);
      if (displayName) {
         return displayName.charAt(0).toUpperCase();
      }
      return null;
   };

   const usernameComment = getUserInitial(comment.user);
   // const getAvatarColor = (userId: UUID) => {
   //    // Different colors based on user ID
   //    const colors = [
   //       "bg-blue-500",
   //       "bg-green-500",
   //       "bg-purple-500",
   //       "bg-pink-500",
   //       "bg-indigo-500",
   //    ];
   //    return colors[userId.length % colors.length];
   // };

   return (
      <div className={`${isReply ? "ml-12" : ""}`}>
         <div className="flex items-start gap-3 mb-3">
            {/* User Avatar */}
            <div className="flex-shrink-0">
               <div
                  className={`relative  text-center align-middle rounded-full login-btn-text w-[30px] h-[30px] bg-[var(--dark-green)] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]`}
                  // ${getAvatarColor(comment.user.user_id )}
               >
                  <span className="absolute top-[0px] left-[7px]">
                     {usernameComment
                        ? usernameComment.charAt(0) + usernameComment.charAt(1)
                        : "Gr"}
                  </span>
                  {/* <p className="text-sm font-medium text-white">
                     {usernameComment ? usernameComment : "username"}
                  </p> */}
               </div>
            </div>

            {/* Comment Content */}
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">
                     {comment.user.username
                        ? getDisplayName(comment.user)
                        : "username"}
                     {}
                  </span>
                  <span className="text-gray-400 text-sm">
                     {formatTimeAgo(comment.created_at)}
                  </span>
                  {comment.user.username === "olivia_harper" && (
                     <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                        Founding User
                     </span>
                  )}
               </div>

               <p className="text-gray-300 mb-2 leading-relaxed">
                  {comment.content}
               </p>

               {/* Reply Button */}
               {!isReply && (
                  <button
                     onClick={() => setShowReplyForm(!showReplyForm)}
                     className="text-gray-400 hover:text-white text-sm font-medium"
                  >
                     Reply
                  </button>
               )}
            </div>
         </div>

         {/* Reply Form */}
         {showReplyForm && !isReply && (
            <div className="mb-4">
               <CommentForm
                  onSubmit={handleReply}
                  placeholder="Add a reply..."
                  buttonText="Reply"
                  isReply={true}
                  onCancel={() => setShowReplyForm(false)}
                  userInitial={currentUserInitial}
               />
            </div>
         )}
      </div>
   );
};
