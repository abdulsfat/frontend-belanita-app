import { Header } from "@/app/_components";
import React from "react";

export const MainLayout = ({ children }) => (
    <div>
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
    </div>
);
