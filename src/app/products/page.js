"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import AppContainer from "@/components/Contaner/container";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  In,
} from "@nextui-org/react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const [AddProduct, setAddProduct] = useState("");
  const getProducts = async () => {
    let url = "/api/products";

    try {
      let res = await fetch(url);
      let jsonData = await res.json();
      setProducts(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  const filtereData = products.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
  const handleAdd = async () => {
    let res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: AddProduct,
        image: "https://picsum.photos/100/200",
        price: 1200000,
        categoryId: 6,
      }),
    });
    if (res.ok) {
      console.log("product added");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <Header />

      <AppContainer width={1300}>
        <input
          type="search"
          style={{ border: " solid ", borderRadius: 0, display: "block" }}
          placeholder="Search For Product"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <input
          type="search"
          style={{ border: " solid ", borderRadius: 0 }}
          placeholder="Enter The Product"
          onChange={(e) => setAddProduct(e.target.value)}
          value={AddProduct}
        />
        <Button onClick={handleAdd}>Add Product</Button>
        <div style={{ marginTop: 100 }}>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {filtereData.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.name}
                    className="w-full object-cover h-[140px]"
                    src={item.image}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{item.name}</b>
                  <p className="text-default-500">{item.price}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default Products;
