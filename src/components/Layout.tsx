
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const Layout = () => {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
