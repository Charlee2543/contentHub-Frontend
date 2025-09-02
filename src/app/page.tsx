"use client";
// import Image from "next/image";
import ButtonLink from "../components/ui/ButtonLink";
import InputText from "../components/ui/InputText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/lib/authLoginLogout";

//  refecter แก้ useState ไป component อื่น เปลี่ยนเป็น use Server
interface Post {
   id: number;
   title: string;
   content: string;
}

export default function Home() {
   const { login, refresh, logout, accessToken } = useAuth();
   // console.log("accessToken: ", accessToken);
   const router = useRouter();
   const [searchInput, setSearchInput] = useState<string>("");
   const [posts, setPosts] = useState<Post[]>([]);

   const searching = (inputSearch: string) => {
      setSearchInput(inputSearch);
   };

   // useEffect(() => {
   //    const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL;
   //    const fetchPost = async () => {
   //       try {
   //          if (!API_URL) {
   //             throw new Error("API URL is not defined.");
   //          }

   //          const response = await axios.get(`${API_URL}/posts`);
   //          const posts = response.data;
   //          console.log("Fetched posts:", posts);
   //       } catch (error) {
   //          console.error("Error fetching posts:", error);
   //       }
   //    };
   //    fetchPost();
   // }, []);

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
            <section className="w-full flex justify-start items-start">
               <img
                  className=""
                  src="https://static.vecteezy.com/system/resources/thumbnails/045/132/934/small_2x/a-beautiful-picture-of-the-eiffel-tower-in-paris-the-capital-of-france-with-a-wonderful-background-in-wonderful-natural-colors-photo.jpg"
                  alt="logotower"
                  width={464}
                  height={256}
               />
               <div className="flex flex-col w-full list-inside list-decimal p-4 gap-1  text-sm/6 text-center sm:text-left ">
                  <p className="tag-text">Marketing</p>
                  <p className="second-title">
                     The Future of AI in Content Creation
                  </p>
                  <div className="flex items-end justify-between">
                     <p className="description-text w-fit">
                        Explore how artificial intelligence is revolutionizing
                        the way content is created, managed, and distributed.
                     </p>
                     <ButtonLink
                        functionOut={() => router.push("/")}
                        textButton={"Read More"}
                        paddinXY={"1px 8px"}
                        width={"120px"}
                        stlyeTailwind="  box-border  "
                     />
                  </div>
               </div>
            </section>
         </div>
      </main>
   );
}
