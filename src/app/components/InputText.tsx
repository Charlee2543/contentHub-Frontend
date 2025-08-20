import React, { Dispatch, SetStateAction } from "react";

interface inputTextType {
   idInput?: string;
   width: string;
   typeInput: string;
   valueText: string;
   setValueText: Dispatch<SetStateAction<string>>;
   placeholder: string;
   icon?: string;
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
   width,
}: inputTextType) {
   return (
      <div
         tabIndex={0}
         className={`${stlyeTailwind ?? ""} 
            w-[${width}] flex  items-center px-4 py-3 bg-[var(--forest-green)] h-[40px] box-border rounded-[8px]
            focus:outline-none focus-within:border-1 focus-within:border-[var(--pale-green)]`}
         style={{ backgroundColor: bgColor }}
      >
         {icon && <span className="description-text pr-2">{icon}asd</span>}
         <input
            id={idInput}
            type={typeInput}
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            placeholder={placeholder}
            className="content-text placeholder:description-text focus:outline-0 "
         />
      </div>
   );
}

export default InputText;
