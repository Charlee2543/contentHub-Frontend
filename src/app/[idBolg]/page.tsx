"use client";
import { use, useEffect, useState } from "react";
import { useBlog } from "@/lib/BlogContext";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import axios from "axios";
import { postType } from "@/types/type";

export default function Home({
   params,
}: {
   params: Promise<{ idBolg: string }>;
}) {
   const [dataBlog, setDataBlog] = useState<postType>();
   // console.log("dataBlog: ", dataBlog);
   const { blogs } = useBlog();
   const { idBolg } = use(params);

   const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;

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
   if (dataBlog) {
      return (
         <div className="m-y-5 mx-[160px] flex flex-col ">
            <Breadcrumbs />
            <section
               key={dataBlog.article_id}
               className=" w-full h-fit flex flex-col justify-start items-start "
            >
               <h1 className="feature-title mt-5 mx-4">{dataBlog.title}</h1>
               <p className="tag-text my-3 mx-4">
                  Published by Olivia Harper · 2 days ago test ๆ
               </p>
               <div className="relative w-full h-[60vh] max-h-[650px]">
                  <Image
                     className="absolute"
                     style={{ objectFit: "cover" }}
                     src={dataBlog.picture}
                     alt={dataBlog.title}
                     fill={true}
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     // height={256}
                  />
               </div>
               <p
                  style={{ textIndent: "2em" }}
                  className="description-text w-fit my-3 mx-4"
               >
                  {dataBlog.content}
               </p>
               <div className="flex  w-[55%] list-inside list-decimal p-4 gap-1  text-sm/6 text-center sm:text-left ">
                  <div className="flex items-end justify-between">
                     icon love <span>5</span>
                  </div>
                  <div className="flex items-end justify-between">
                     icon comment <span>10</span>
                  </div>
               </div>
            </section>
            <section className="feature-title">comments</section>
         </div>
      );
   } else {
      return (
         <div className="feature-title flex justify-center items-center h-[80vh] w-[100vw] ">
            Please Wait While Loading . . .
            {/* <button className="btn" onClick={fetch}>
               Fetch
            </button> */}
         </div>
      );
   }
}
