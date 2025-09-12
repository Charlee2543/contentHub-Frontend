"use client";
// import Image from "next/image";
import ButtonLink from "../components/ui/ButtonLink";
import InputText from "../components/ui/InputText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { postType } from "@/types/type";
import axios from "axios";
import { useBlog } from "@/lib/BlogContext";
import Image from "next/image";
import Link from "next/link";

//  refecter แก้ useState ไป component อื่น เปลี่ยนเป็น use Server

export default function Home() {
   const { blogs, setBlogs } = useBlog();

   // console.log("accessToken: ", accessToken);
   const router = useRouter();
   const [searchInput, setSearchInput] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const [pageError, setPageErro] = useState<boolean>(false);

   const searching = (inputSearch: string) => {
      setSearchInput(inputSearch);
   };

   const truncateText = (text: string, maxLength: number) => {
      if (text.length > maxLength) {
         return text.substring(0, maxLength) + "...";
      }
      return text;
   };

   useEffect(() => {
      const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;
      const setBlogPostFromFetch = (blog: postType[]) => setBlogs(blog);
      const fetchPost = async () => {
         setLoading(true);
         try {
            setPageErro(false);
            if (!API_URL) {
               throw new Error("API URL is not defined.");
            }

            const response = await axios.get(`${API_URL}/posts/`);
            const posts = response.data;
            console.log("Fetched posts:", posts);
            setBlogPostFromFetch(posts);
            setLoading(false);
         } catch (error) {
            setLoading(false);
            setPageErro(true);
            console.error("Error fetching posts:", error);
         }
      };
      fetchPost();
   }, [setBlogs]);

   return (
      <main className="w-full flex justify-center ">
         <div className="flex flex-col items-start w-full max-w-[960px] gap-[32px] mx-[160px] my-4   ">
            <section></section>
            <InputText
               icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
               typeInput={"text"}
               valueText={searchInput}
               setValueText={searching}
               placeholder={"Search  articles..."}
               stlyeTailwind="my-3   w-full "
            />
            <h1 className="feature-title">Featured Articles</h1>
            {pageError ? (
               <div className="mt-10 flex justify-center items-center h-fit w-full gap-3 second-title">
                  ขออภัย server ยังไม่ทำงาน{" "}
                  <ButtonLink
                     onClick={() => {
                        window.location.reload();
                     }}
                     textButton={"Reload หน้าใหม่อีกครั้ง"}
                     paddinXY={""}
                     width={""}
                     stlyeTailwind={" second-title "}
                  />{" "}
               </div>
            ) : loading ? (
               Array.from({ length: 3 }).map((_, index) => (
                  <div
                     key={index}
                     className="animate-pulse w-full h-[256px] flex justify-start items-start "
                  >
                     <div className="skeleton relative  w-[50%] h-full bg-[var(--forest-green)]"></div>
                     <div className="flex flex-col w-[50%] h-full  p-4 gap-2 ">
                        <p className="skeleton  h-[24px] w-[60%] max-w-[300px] bg-[var(--forest-green)]"></p>
                        <div className="skeleton second-title h-[30px] w-full bg-[var(--forest-green)]"></div>
                        <div className="flex items-end h-full justify-between truncate gap-2">
                           <p className="skeleton w-full h-full bg-[var(--forest-green)]"></p>
                           {/* <p className="skeleton w-[120px] h-[40px] bg-[var(--forest-green)]"></p> */}
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               blogs.map((blog) => {
                  return (
                     <div
                        key={blog.article_id}
                        className=" w-full h-[256px] flex justify-start items-start "
                     >
                        <Link
                           href={`/${blog.title}--${encodeURIComponent(
                              blog.article_id
                           )}`}
                           className="relative btnc w-[45%] h-full "
                        >
                           <Image
                              className=" rounded-[8px] "
                              style={{ objectFit: "cover" }}
                              src={blog.picture}
                              alt={blog.title}
                              priority={false} //ให้โหลดรูปภาพไว้ล่วงหน้าไหม ไม่
                              fill={true}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" //เมื่อ รูปมีขนาดไฟล์ จะโหลดไฟล์มาขนาดเท่าไหร่ ป้องกันการโหลดไฟล์ใหญ่

                              // width={464}
                              // height={256}
                           />
                        </Link>
                        <div className="flex flex-col w-[55%] h-full list-inside list-decimal p-4 gap-1  text-sm/6 text-center sm:text-left ">
                           <p className="tag-text">Marketing</p>
                           <Link
                              href={`/${blog.title}--${encodeURIComponent(
                                 blog.article_id
                              )}`}
                              className="second-title "
                           >
                              {blog.title}
                           </Link>
                           <div className="flex items-end justify-between truncate">
                              <p className="description-text w-fit ">
                                 {truncateText(blog.content, 200)}
                              </p>
                              <ButtonLink
                                 onClick={() => {
                                    const encodedTId = encodeURIComponent(
                                       blog.article_id
                                    );
                                    return router.push(
                                       `/${blog.title}--${encodedTId}`
                                    );
                                 }}
                                 textButton={"Read More"}
                                 paddinXY={"1px 8px"}
                                 width={"120px"}
                                 stlyeTailwind="  box-border  "
                              />
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
         </div>
      </main>
   );
}
