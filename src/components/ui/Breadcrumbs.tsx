"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import React from "react";

// Helper function to capitalize the first letter of a string
const capitalize = (s: string) => {
   if (typeof s !== "string") return "";
   return s.charAt(0).toUpperCase() + s.slice(1); // ทำตัวแรกให้เป็นตัวใหญ่ slice ตามด้วยข้อความตั้งแต่ตัว index ที่ 1
};

function Breadcrumbs() {
   const decodeParam = usePathname();
   const pathName = decodeURIComponent(decodeParam);
   // console.log("pathName: ", pathName);
   const splitParam = pathName.split("/").filter((p) => p); // Filter out empty strings

   // console.log("pathNames: ", pathNames);
   // const splitParam = decodeParam.split("--");

   return (
      <nav aria-label="Breadcrumb">
         <ol className="flex space-x-2 m-4">
            <li className="flex items-center">
               <Link href="/" className="btn tag-text">
                  <span className="hover:text-[var(--green-btn)] hover:underline">
                     Home
                  </span>
               </Link>
               {splitParam.length > 0 && <span className="mx-2">/</span>}
            </li>
            {splitParam.map((value, index) => {
               const isLast = index === splitParam.length - 1;
               const href = `/${splitParam.slice(0, index + 1).join("/")}`; //ดูแต่ละindex ตั้งแต่ต้นแล้วมา join ด้วย /

               const splitParamArraay = value.split("--"); //ตัดให้เหลือชื่อ
               const objectParam = {
                  title: splitParamArraay[0],
                  article_id: Number(splitParamArraay[1]),
               }; /*objectParam={"title": "มะกอกน้ำ","article_id": 7}*/

               const name = capitalize(objectParam.title.replace(/-/g, " ")); //ปนะมาณตัดช่องว่าง replace

               return (
                  <li key={index} className="flex items-center">
                     {isLast ? (
                        // Current page is not a link
                        <span
                           style={{ color: "var(--white-text)" }}
                           className="tag-text"
                        >
                           {name}
                        </span>
                     ) : (
                        // Other pages are links
                        <Link href={href} className="btn tag-text">
                           <span className="hover:text-[var(--green-btn)] hover:underline">
                              {name}
                           </span>
                        </Link>
                     )}
                     {!isLast && <span className="mx-2">/</span>}
                  </li>
               );
            })}
         </ol>
      </nav>
   );
}

export default Breadcrumbs;
