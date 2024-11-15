import { Outlet } from "react-router-dom";
import Header from "./header";
import { useState } from "react";

const Layout = ({ selectedCategory, onSelectCategory }: { selectedCategory: string, onSelectCategory: (category: string) => void }) => {

  return (
    <div className="bg-zinc-50">
      <main className="w-[1200px] max-w-full m-auto p-5">
        <Header onSelectCategory={onSelectCategory} />
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
