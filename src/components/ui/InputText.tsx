// import React, { Dispatch, SetStateAction } from "react";
import { ReactNode } from "react";

interface inputTextType {
   idInput?: string;
   typeInput: string;
   valueText: string;
   setValueText: (valeu: string) => void;
   placeholder: string;
   icon?: ReactNode;
   stlyeTailwind?: string;
   bgColor?: string;
}

function InputText({
   idInput,
   typeInput,
   valueText,
   setValueText,
   placeholder,
   icon,
   stlyeTailwind,
   bgColor,
}: inputTextType) {
   return (
      <label
         tabIndex={0}
         className={`${stlyeTailwind ?? ""} 
             flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] rounded-[8px]
            focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)] `}
         style={{ backgroundColor: bgColor }}
      >
         {icon && <span className="description-text pr-2">{icon}</span>}
         <input
            id={idInput}
            type={typeInput}
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            placeholder={placeholder}
            className="w-full content-text placeholder:description-text focus:outline-0 "
         />
      </label>
   );
}

export default InputText;
