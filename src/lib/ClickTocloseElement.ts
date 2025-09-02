"use client";
import { RefObject, useEffect } from "react";

/* การใช้งาน 
  const [toggle, setToggle] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); 
  ClickTocloseElement(modalRef, setToggle);
  
          <div ref={modalRef}>
          This is my modal content.
        </div>*/

export const ClickTocloseElement = (
   refElement: RefObject<HTMLDivElement | null>, // refElement ควรเป็น RefObject
   setToggle: React.Dispatch<React.SetStateAction<boolean>>
) => {
   // refElement = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const closePage = () => {
         setToggle(false);
      };

      // handler สำหรับตรวจจับการคลิก
      const handleClickOutside = (event: MouseEvent) => {
         if (
            refElement.current &&
            !refElement.current.contains(event.target as Node) // ดูว่าหากการคลิกเมาร์ไม่ตรงกับกรอบที่ ref ไว้ให้ declare function
         ) {
            closePage(); // ถ้าคลิกนอก modal → ปิด
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [refElement, setToggle]);
};
