"use client";
import { getUserLocalStorage } from "@/lib/getUserLocalStorage";
import Link from "next/link";
import { useEffect, useState } from "react";

function SidebarProfile() {
   const [username, setUsername] = useState<string | null>(null);
   useEffect(() => {
      const username = getUserLocalStorage().username;
      if (username) {
         setUsername(username);
      }
   }, []);

   return (
      <div className="flex flex-col p-4 max-w-[320px] min-w-fit w-[35%] gap-4 ">
         <h1 className="user-name ">
            {username ? username : "unknownUsername"}
         </h1>
         <div className="">
            <Link
               href={"/editProfile"}
               className="btn flex justify-start bg-[var(--forest-green)] rounded-[12px] px-3 py-2 w-full "
            >
               UserProfile
            </Link>
         </div>
      </div>
   );
}

export default SidebarProfile;
