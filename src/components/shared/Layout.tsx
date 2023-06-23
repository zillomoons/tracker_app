import React from "react";
import { Header } from "~/components/Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full">
      <Header />
      {children}
    </div>
  );
};
