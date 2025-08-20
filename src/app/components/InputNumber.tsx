import React, { Dispatch, SetStateAction } from "react";

interface inputNumberType {
   idInput?: string;
   width: string;
   typeInput: string;
   valueNumber: number | null;
   setValueNumber: Dispatch<SetStateAction<number | null>>;
   placeholder: string;
   icon?: string;
   stlyeTailwind?: string;
   bgColor?: string;
}

function InputNumber({
   idInput,
   typeInput,
   valueNumber,
   setValueNumber,
   placeholder,
   icon,
   stlyeTailwind,
   bgColor,
   width,
}: inputNumberType) {
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
            value={valueNumber ? valueNumber : ""}
            onChange={(e) => setValueNumber(Number(e.target.value))}
            placeholder={placeholder}
            className="content-text placeholder:description-text focus:outline-0 "
         />
      </div>
   );
}

export default InputNumber;
