"use client";
import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

import Sidebar from "@/src/components/UI/Sidebar";
import Container from "@/src/components/UI/Container";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Container>
      <div className="my-3 h-4  flex w-full gap-12 relative">
        <button
          className="fixed top-24 left-4 md:hidden p-2 text-default-0 "
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <PanelRightOpen /> : <PanelRightClose />}
        </button>

        <div
          className={`fixed left-0 mt-4 w-2/5 h-full shadow-lg z-50 transform transition-transform duration-300 
            ${isSidebarOpen ? "translate-x-0 bg-default-900/5 fixed  z-50 backdrop-blur-md px-4" : "-translate-x-full"} md:relative md:translate-x-0 md:block`}
        >
          <div className="flex md:hidden justify-start p-4 bg-default-100 rounded-t-md">
            <button className="text-default-0" onClick={toggleSidebar}>
              <PanelRightOpen />
            </button>
          </div>
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5">{children}</div>
      </div>
    </Container>
  );
};

export default Layout;
