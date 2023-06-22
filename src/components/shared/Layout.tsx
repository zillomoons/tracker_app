import React from "react";
import { Header } from "~/components/Header";
import Sidebar from "~/components/sidebar/Sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-screen min-h-screen bg-white text-black">
      <Header />
      <div className="grid h-screen w-screen grid-cols-12 gap-x-5 pt-12">
        <div className="col-span-7 col-start-2 flex flex-col gap-5 font-bold">
          {children}
        </div>
        <aside className="col-span-3 col-start-9">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};
