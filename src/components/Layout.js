'use client'

import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import Header from "./Header";
const Footer = dynamic(() => import("./Footer"), { ssr: false });


export default function Layout({ children, currentPage }) {
  const logged = false;

  useEffect(() => {
    if (!localStorage.getItem("order")) {
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
  });

  return (
    <>
      <Header logged={logged} />
      {children}
      <Footer logged={logged} currentPage={currentPage} />
    </>
  );
}
