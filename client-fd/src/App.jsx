import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import fetchingUserDetails from "./utils/fetchingUserDetails";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

 const userData = async () => {
    try {
      const response = await fetchingUserDetails();
      const data = response.data;
      dispatch(setUserDetails(data));
      

    } catch (err) {
      console.log("user Not Found", err);
      toast.error("User not found, please login again");
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <section>
      <Header />
      <section className="h-145">
        <Outlet />
      </section>

      <Footer />
      <Toaster />
    </section>
  );
}

export default App;
