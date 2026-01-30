import SidebarProfile from "@/components/SidebarProfile";

export default function Template({ children }: { children: React.ReactNode }) {
   return (
      <div className=" flex flex-row p-5">
         <SidebarProfile />
         {children}
      </div>
   );
}
