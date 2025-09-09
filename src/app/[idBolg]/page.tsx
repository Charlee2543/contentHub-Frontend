"use client";
import { use, useEffect, useState } from "react";
import { useBlog } from "@/lib/BlogContext";
import { useAuth } from "@/lib/authLoginLogout";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import axios from "axios";
import { postType } from "@/types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faHeart } from "@fortawesome/free-regular-svg-icons";
import Loading from "@/components/ui/Loading";
import { datePassed } from "@/lib/datetime";
import { CommentsSection } from "@/components/CommentSection";

export default function Home({
   params,
}: {
   params: Promise<{ idBolg: string }>;
}) {
   const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;
   const [dataBlog, setDataBlog] = useState<postType>();
   console.log("dataBlog: ", dataBlog);
   const datePass = dataBlog?.created_at ?? null;
   const updateAt = dataBlog?.updated_at ?? null;
   console.log("dataBlog?.updated_at: ", dataBlog?.updated_at);
   const { api } = useAuth();
   const { blogs } = useBlog();
   const { idBolg } = use(params);

   const [usernameLogin, setUsernameLogin] = useState<string>("unknown user");
   useEffect(() => {
      let dataUserLocalstorage = null;
      const userData = localStorage.getItem("userProfile");
      if (userData) {
         try {
            dataUserLocalstorage = JSON.parse(userData);
            if (dataUserLocalstorage.username) {
               setUsernameLogin(dataUserLocalstorage.username);
            }
         } catch (error) {
            console.log("Failed to parse user data from localStorage", error);
         }
      }
   }, [,]);

   const decodeParam = decodeURIComponent(idBolg);
   const splitParam = decodeParam.split("--");
   const objectParam = {
      title: splitParam[0],
      article_id: Number(splitParam[1]),
   };

   // && (!dataBlog || Object.keys(dataBlog).length === 0)
   useEffect(() => {
      const fetch = async () => {
         try {
            const res = await axios.get(
               `${API_URL}/posts/${objectParam.article_id}`
            );
            setDataBlog(res.data);
         } catch (error) {
            console.error("Error fetching posts:", error);
         }
      };
      if (blogs.length > 0) {
         console.log("true blogs");
         const data = blogs.find((value) => {
            return value.article_id === objectParam.article_id;
         });
         // console.log("data: ", data);

         setDataBlog(data);
      } else if (
         blogs.length === 0 &&
         (!dataBlog || Object.keys(dataBlog).length === 0)
      ) {
         console.log("false blogs");
         fetch();
      }
   }, [API_URL, blogs, dataBlog, objectParam.article_id]);

   const sendComment = async () => {
      console.log("sendComment: ");
      try {
         const res = await api.get(`${API_URL}/actionPost/`);
         console.log("res: ", res);
         // setDataBlog(res.data);
      } catch (error) {
         console.error("Error fetching posts:", error);
      }
   };
   if (dataBlog) {
      return (
         <div className="m-y-5 mx-[160px] flex flex-col ">
            <Breadcrumbs />
            <section
               key={dataBlog.article_id}
               className=" w-full h-fit flex flex-col justify-start items-start "
            >
               <h1 className="feature-title mt-5 mx-4">{dataBlog.title}</h1>
               <p className="tag-text mt-3 m-b1 mx-4">
                  Published by {dataBlog.author_username} ·
                  {datePass ? datePassed(datePass) : "DD/MM/YY"}
               </p>{" "}
               <p className="tag-text mb-4 mx-4">
                  Updated :{updateAt ? "  " + datePassed(updateAt) : "DD/MM/YY"}
               </p>
               <div className="relative w-full h-[60vh] max-h-[650px]">
                  <Image
                     className="absolute"
                     style={{ objectFit: "cover" }}
                     src={dataBlog.picture}
                     alt={dataBlog.title}
                     fill={true}
                     sizes="(max-width: 1200px) 100vw, 70vw "
                     // height={256}
                  />
               </div>
               <p
                  style={{ textIndent: "2em" }}
                  className="description-text w-fit mt-3 my-7 mx-4"
               >
                  {dataBlog.content}
               </p>
               <div className="flex tag-text w-[55%]  mx-7 gap-10 ">
                  <div className="btnc flex items-center gap-2 hover:text-red-500">
                     <button type="button" onClick={sendComment}>
                        <FontAwesomeIcon
                           icon={faHeart}
                           className="text-[24px] "
                        />
                     </button>
                     <span>5</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <FontAwesomeIcon
                        icon={faCommentDots}
                        className="text-[24px]"
                     />
                     <span>10</span>
                  </div>
               </div>
            </section>
            <section>
               <p className="feature-title mt-8">Comments</p>
               <CommentsSection
                  articleId={objectParam.article_id}
                  currentUserInitial={
                     usernameLogin.charAt(0).toUpperCase() +
                     usernameLogin.charAt(1)
                  }
               />
            </section>
         </div>
      );
   } else {
      return (
         <div>
            <Loading />{" "}
         </div>
      );
   }
}
