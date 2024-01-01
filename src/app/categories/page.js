"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import AppContainer from "@/components/Contaner/container";
import { Image, Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import styles from "../page.module.css";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState([]);

  const getCategories = async () => {
    try {
      let res = await fetch("/api/categories");
      let jsonData = await res.json();
      setCategories(jsonData);
      console.log(jsonData);
    } catch (error) {}
  };
  const handleAdd = async () => {
    try {
      let res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: value }),
      });
      if (res.ok) {
        console.log("category added");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Header />
      <AppContainer>
        <div className={styles.categories} style={{ display: "flex" }}>
          {categories.map((el, i) => (
            <Card key={i} isPressable>
              <CardBody>
                <p>{el.name}</p>
              </CardBody>
            </Card>
          ))}
          <input
            type="text"
            placeholder="Add Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </AppContainer>
    </>
  );
};

export default Categories;
