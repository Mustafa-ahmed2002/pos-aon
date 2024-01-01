"use client";
import React from "react";
const dayjs = require("dayjs");
dayjs().format();
import Header from "../Header/header";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function App(data) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} style={{ margin: 4 }}>
        Invoice {data.id}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Invoice {data.id}
              </ModalHeader>
              <ModalBody>
                <div>
                  {data.items.cart.map((e, i) => (
                    <div key={i}>
                      <h1>
                        {e.product.name}: {e.product.price} | عدد: {e.qt}| تاريخ
                        الطلب :{dayjs(data.date).format("YYYY/MM/DD")}
                      </h1>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
