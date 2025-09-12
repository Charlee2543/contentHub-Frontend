import { getUserLocalStorage } from "@/lib/getUserLocalStorage";
import React, { useState } from "react";
import Image from "next/image";

interface CommentFormProps {
   onSubmit: (content: string) => Promise<void>;
   placeholder?: string;
   buttonText?: string;
   isReply?: boolean;
   onCancel?: () => void;
   userInitial?: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({
   onSubmit,
   placeholder = "Add a comment",
   buttonText = "Post",
   isReply = false,
   onCancel,
   userInitial = "Gr",
}) => {
   const [content, setContent] = useState("");
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!content.trim()) return;

      try {
         setLoading(true);
         await onSubmit(content);
         setContent("");
      } catch (error) {
         console.error("Error submitting comment:", error);
      } finally {
         setLoading(false);
      }
   };
   const userProfile = getUserLocalStorage();

   return (
      <div className={`flex items-start gap-3 ${isReply ? "ml-12 mt-3" : ""}`}>
         {/* User Avatar */}
         <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-[var(--mint-green)] rounded-full flex items-center justify-center">
               {userProfile ? (
                  <Image
                     className="rounded-full"
                     src={userProfile.profile_picture_url}
                     alt={userProfile.username}
                     width={30}
                     height={30}
                  ></Image>
               ) : (
                  <span className="text-[16px] font-semibold text-[var(--forest-green)]">
                     {userInitial}
                  </span>
               )}
            </div>
         </div>

         {/* Comment Input */}
         <form
            onSubmit={handleSubmit}
            className="flex-1 flex items-center gap-2"
         >
            <input
               type="text"
               value={content}
               onChange={(e) => setContent(e.target.value)}
               placeholder={placeholder}
               className="flex-1 bg-[var(--forest-green)] border border-[var(--forest-green)] rounded-lg px-4 py-2 text-white placeholder-[var(--pale-green)] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
               disabled={loading}
            />
            <button
               type="submit"
               disabled={!content.trim() || loading}
               className="btnc px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
               {loading ? "..." : buttonText}
            </button>
            {isReply && onCancel && (
               <button
                  type="button"
                  onClick={onCancel}
                  className="btnc px-1 py-2 text-gray-400 hover:text-white"
               >
                  Cancel
               </button>
            )}
         </form>
      </div>
   );
};
