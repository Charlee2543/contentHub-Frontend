"use client";

import React from "react";
interface buttonLinkType {
   functionOut: () => void;
   textButton: string;
   paddinXY: string;
   stlyeTailwind?: string;
   bgColor?: string;
   width: string;
}

function ButtonLink({
   functionOut,
   stlyeTailwind,
   textButton,
   paddinXY,
   bgColor,
   width,
}: buttonLinkType) {
   // function , ความกว้าง , background color text
   return (
      <button
         onClick={functionOut}
         style={{
            backgroundColor: bgColor ?? "",
            padding: paddinXY,
            width: width,
         }}
         className={`button-link ${stlyeTailwind ?? ""} `}
      >
         {textButton}
      </button>
   );
}

export default ButtonLink;
