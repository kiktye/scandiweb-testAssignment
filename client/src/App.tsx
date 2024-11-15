import React, { useState } from "react";

import Layout from "./components/layout";
import Home from "./pages/home";
import Detail from "./pages/detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Routes>
        <Route path="/" element={<Layout selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}/>}>
          <Route index element={<Home category={selectedCategory} />} />
          <Route path="/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
