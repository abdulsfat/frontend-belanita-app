"use client";

import "./dashboard.css";
import initializeApp from "./lib/init-app";
import StoreProvider from "./StoreProvider";
import { useRef } from "react";
import Header from "./containers/header";
import LeftSidebar from "./containers/left-sidebar";
import RightSidebar from "./containers/right-sidebar";
import { ToastContainer } from "react-toastify";

// Initialize different libraries
initializeApp();
console.log("admin layout...");

export default function AdminLayout({ children }) {
  console.log("admin layout...");

  const mainContentRef = useRef(null);

  return (
    <StoreProvider>
      <div className="drawer lg:drawer-open">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="flex flex-col drawer-content ">
          <Header contentRef={mainContentRef} />
          <main className="flex-1 px-6 pt-4 overflow-y-auto md:pt-4 bg-base-200" ref={mainContentRef}>
            {children}
            <div className="h-16"></div>
          </main>
        </div>
        <LeftSidebar />
      </div>

      <RightSidebar />

      <ToastContainer />
    </StoreProvider>
  );
}
