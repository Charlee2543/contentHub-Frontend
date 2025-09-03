"use client";
// import Image from "next/image";
import ButtonLink from "../components/ui/ButtonLink";
import InputText from "../components/ui/InputText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postType } from "@/types/type";
import axios from "axios";
import { useBlog } from "@/lib/BlogContext";
import Image from "next/image";

//  refecter แก้ useState ไป component อื่น เปลี่ยนเป็น use Server

export default function Home() {
   const { blogs, setBlogs } = useBlog();

   // console.log("accessToken: ", accessToken);
   const router = useRouter();
   const [searchInput, setSearchInput] = useState<string>("");

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
         try {
            if (!API_URL) {
               throw new Error("API URL is not defined.");
            }

            const response = await axios.get(`${API_URL}/posts/`);
            const posts = response.data;
            console.log("Fetched posts:", posts);
            setBlogPostFromFetch(posts);
         } catch (error) {
            console.error("Error fetching posts:", error);
         }
      };
      fetchPost();
   }, [setBlogs]);

   return (
      <main className="w-full flex justify-center">
         <div className="flex flex-col items-start w-full max-w-[960px] gap-[32px] mx-[160px] my-4   ">
            <InputText
               icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
               typeInput={"text"}
               valueText={searchInput}
               setValueText={searching}
               placeholder={"Search  articles..."}
               stlyeTailwind="my-3   w-full "
            />
            <h1 className="feature-title">Featured Articles</h1>
            {blogs.map((blog) => {
               return (
                  <div
                     key={blog.article_id}
                     className=" w-full h-[256px] flex justify-start items-start "
                  >
                     <div className="relative w-[45%] h-full ">
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
                     </div>
                     <div className="flex flex-col w-[55%] list-inside list-decimal p-4 gap-1  text-sm/6 text-center sm:text-left ">
                        <p className="tag-text">Marketing</p>
                        <p className="second-title">{blog.title}</p>
                        <div className="flex items-end justify-between">
                           <p className="description-text w-fit">
                              {truncateText(blog.content, 200)}
                           </p>
                           <ButtonLink
                              functionOut={() => {
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
            })}
         </div>
      </main>
   );
}
