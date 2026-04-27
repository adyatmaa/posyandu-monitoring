import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/bg-grad.svg')] bg-center bg-cover">
      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
