import { ClickTocloseElement } from "@/lib/ClickTocloseElement";
import React, { Dispatch, SetStateAction, useRef } from "react";
interface loginOageType {
   massage: string;
   statusOpen: boolean;
   setStatusOpen: Dispatch<SetStateAction<boolean>>;
}

/*  การใช้งาน
const [statusOpen,setStatusOpen]=useState<boolean>(false)
*/

function AlertMassege({ statusOpen, setStatusOpen, massage }: loginOageType) {
   const modalRef = useRef<HTMLDivElement>(null);
   ClickTocloseElement(modalRef, setStatusOpen);
   return (
      <div
         className={`transition-all transition-discrete ${
            statusOpen ? " inline opacity-100 " : " hidden opacity-0 "
         } absolute z-2 w-[100vw] h-[100vh] overflow-clip bg-[#3d3d3d69] 
            flex items-start justify-center`}
      >
         <p
            ref={modalRef}
            className="mt-10 px-8 py-5 bg-[var(--dark-green)] rounded-lg shadow-lg "
         >
            {" "}
            Alert Massage{massage}
         </p>
      </div>
   );
}

export default AlertMassege;
