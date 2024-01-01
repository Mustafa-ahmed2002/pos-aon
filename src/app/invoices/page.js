"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/header";
import AppContainer from "@/components/Contaner/container";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const getInvoices = async () => {
    let url = "http://localhost:3000/api/invoice";

    try {
      let res = await fetch(url);
      let jsonData = await res.json();
      setInvoices(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div>
      <Header />
      <AppContainer width={800}>
        <div style={{ display: "block" }}>
          {invoices.map((data) => (
            <Modal key={data.id} {...data} />
          ))}
        </div>
      </AppContainer>
    </div>
  );
};

export default Invoices;
