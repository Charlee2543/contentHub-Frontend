"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import React from "react";

function Breadcrumbs() {
   const pathName = usePathname();
   console.log("pathName: ", pathName);
   const pathNames = pathName.split("/").filter((p) => p); // Filter out empty strings
   return (
      <nav aria-label="Breadcrumb">
         <ol className="flex space-x-2 m-4">
            <li className="flex items-center">
               <Link href="/">
                  <span className="text-blue-500 hover:underline">Home</span>
               </Link>
               {pathNames.length > 0 && <span className="mx-2">/</span>}
            </li>
         </ol>
      </nav>
   );
}

export default Breadcrumbs;
