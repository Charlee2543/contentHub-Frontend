"use client";

import React, {
   createContext,
   Dispatch,
   ReactNode,
   SetStateAction,
   useContext,
   useState,
} from "react";
import { postType } from "@/types/type";

type BlogContextType = {
   blogs: postType[];
   setBlogs: Dispatch<SetStateAction<postType[]>>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
   const [blogs, setBlogs] = useState<postType[]>([]);
   console.log("blogs: ", blogs);
   return (
      <BlogContext.Provider
         value={{
            blogs,
            setBlogs,
         }}
      >
         {children}
      </BlogContext.Provider>
   );
};

export const useBlog = () => {
   const blog = useContext(BlogContext);
   if (blog === undefined) {
      // เพิ่มการตรวจสอบและ throw error
      throw new Error("useBlog must be used within a BlogProvider");
   }
   return blog;
};
