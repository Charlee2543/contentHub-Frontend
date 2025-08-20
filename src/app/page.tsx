"use client";
import Image from "next/image";
import ButtonLink from "./components/ButtonLink";
import InputText from "./components/InputText";
import { useState } from "react";
import InputNumber from "./components/InputNumber";

export default function Home() {
   const [searchInput, setSearchInput] = useState<string>("");
   const [searchNumberInput, setSearchNumberInput] = useState<number | null>(
      null
   );
   // const searching = (inputSearch: string) => {
   //    setSearchInput(inputSearch);
   // };
   return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
         <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <InputNumber
               width={"50%"}
               typeInput={"tel"}
               valueNumber={searchNumberInput}
               setValueNumber={setSearchNumberInput}
               placeholder={"Search  number..."}
            />
            <InputText
               width={"50%"}
               typeInput={"text"}
               valueText={searchInput}
               setValueText={setSearchInput}
               placeholder={"Search  articles..."}
            />
            <Image
               className="dark:invert"
               src="/next.svg"
               alt="Next.js logo"
               width={180}
               height={38}
               priority
            />
            <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
               <li className="tracking-[-.01em]">
                  Save and see your changes instantly.
               </li>
               <li className="feature-title">test-text</li>
               <li className="second-title">test-text</li>
               <li className="tag-text">test-text</li>
               <li className="description-text">test-text</li>
               <li className="btn login-btn-text">test-text</li>
               <li className="content-text">test-text content-text</li>
               <li className="user-name">test-text </li>
               <li className="chat-me ">test-text </li>
               <li className="button-link">test-text </li>
            </ol>
            <ButtonLink
               functionOut={() => alert("test ButtonLink")}
               textButton={"test ButtonLink"}
               marginXY={"10 20"}
            />
         </main>
      </div>
   );
}
