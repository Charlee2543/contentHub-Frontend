import Navbar from "@/components/Navbar";

export default function Template({ children }: { children: React.ReactNode }) {
   return (
      <div className="h-screen flex flex-col">
         <nav className="sticky top-0 z-30 w-full">
            <Navbar />
         </nav>
         <section className="h-full">{children}</section>
      </div>
   );
}
