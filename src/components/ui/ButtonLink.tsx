"use client";

import React from "react";
interface buttonLinkType {
   onClick: () => void;
   textButton: string;
   paddinXY: string;
   stlyeTailwind?: string;
   bgColor?: string;
   width: string;
}

function ButtonLink({
   onClick,
   stlyeTailwind,
   textButton,
   paddinXY,
   bgColor,
   width,
}: buttonLinkType) {
   // function , ความกว้าง , background color text
   return (
      <button
         onClick={onClick}
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
