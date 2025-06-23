import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <section>
      <Header />
      <section className="h-145">
        <Outlet />
      </section>

      <Footer />
      <Toaster/>
    </section>
  );
};

export default App;
