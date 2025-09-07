import React from "react";

function Loading() {
   return (
      <div>
         <div className="feature-title flex justify-center items-center h-[80vh] w-[100vw] ">
            <div className=" flex items-end ">
               <p className="">Please Wait While Loading</p>
               <p className="loading loading-dots loading-xl indent-8 ml-3"></p>
            </div>
         </div>
      </div>
   );
}

export default Loading;
