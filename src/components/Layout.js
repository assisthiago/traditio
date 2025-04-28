import 'bootstrap/dist/css/bootstrap.min.css';
import { use, useEffect } from 'react';

import Footer from "./Footer";
import Header from "./Header";


export default function Layout({ children, currentPage }) {
  const logged = false;
  const productsInCart = 0;

  useEffect(() => {
    if (localStorage.getItem("order") === null) {
      localStorage.setItem("order", JSON.stringify({
        status: "creating",
        observation: "",
        products: [],
        user: null,
        address: null,
        products: null,
        payment_method: null,
        delivery: null,
        delivery_fee: null,
        delivery_forecast: null,
        total: null,
      }));
    }


    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Perform any necessary actions when the user is logged in
      console.log('User is logged in');
    } else {
      // Perform any necessary actions when the user is not logged in
      console.log('User is not logged in');
    }
  }, []);

  return (
    <>
      <Header logged={logged} />
      {children}
      <Footer logged={logged} currentPage={currentPage} productsInCart={productsInCart} />
    </>
  );
}
