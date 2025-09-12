import React, { useState } from "react";
import { ArticleComment } from "@/types/type";
import Image from "next/image";
import { CommentForm } from "./CommentForm";
import { datePassed } from "@/lib/datetime";

interface CommentItemProps {
   comment: ArticleComment;
   onReply: (
      parentId: number,
      content: string,
      article: number
   ) => Promise<ArticleComment>;
   isReply?: boolean;
   currentUserInitial?: string;
   article: number;
}

export const CommentItem: React.FC<CommentItemProps> = ({
   comment,
   onReply,
   isReply = false,
   currentUserInitial = "gr",
   article,
}) => {
   const [showReplyForm, setShowReplyForm] = useState(false);

   const handleReply = async (content: string) => {
      await onReply(comment.id, content, article);
      setShowReplyForm(false);
   };

   const getDisplayName = (username: string) => {
      // const fullName = `${user.first_name} ${user.last_name}`.trim();
      if (username) {
         return username;
      }
      return null;
   };

   // ทำ icon หน้าชื่อ user
   const getUserInitial = (user: string) => {
      const displayName = getDisplayName(user);
      if (displayName) {
         // const
         return (
            displayName.charAt(0).toUpperCase() +
            displayName.substring(1, displayName.length)
         );
      }
      return null;
   };

   const usernameComment = getUserInitial(comment.username);
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
                  className={`relative flex justify-center items-center text-center align-middle rounded-full login-btn-text w-[30px] h-[30px] bg-[var(--dark-green)] border-1 border-[var(--green-btn)] hover:text-[#6cdb98] hover:border-[#6cdb98]`}
                  // ${getAvatarColor(comment.user.user_id )}
               >
                  {comment.picture ? (
                     <Image
                        className="rounded-full"
                        src={comment.picture}
                        alt={usernameComment ? usernameComment : "username"}
                        width={30}
                        height={30}
                     ></Image>
                  ) : (
                     <span className="">
                        {usernameComment
                           ? usernameComment.charAt(0) +
                             usernameComment.charAt(1)
                           : "Gr"}
                     </span>
                  )}
               </div>
            </div>

            {/* Comment Content */}
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">
                     {usernameComment ? usernameComment : "username"}
                     {}
                  </span>
                  <span className="text-gray-400 text-sm">
                     {datePassed(comment.created_at)}
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
