'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar, Container, Stack, Button, Badge } from "react-bootstrap";
import { BagFill, InfoCircleFill, Clipboard2Fill, Bag, CollectionFill } from "react-bootstrap-icons";

export default function Footer({ logged = false, currentPage = "products" }) {

  // State and Effect
  const [lengthProductsInCart, setLengthProductsInCart] = useState(0);
  useEffect(() => {
    const order = localStorage.getItem("order") ? JSON.parse(localStorage.getItem("order")) : null;
    setLengthProductsInCart(order?.products?.length > 0 ? order.products.length : 0);
  }, [localStorage?.getItem("order")]);

  return (
    <Navbar fixed="bottom" className="bg-white flex-column py-0 shadow-lg" id="footer">
      <Container fluid className="py-1">
        <Stack direction="horizontal" className="justify-content-around w-100">
          <Button
            variant="link"
            size="sm"
            className="text-decoration-none"
            active={currentPage === 'products'}
          >
            <Link href="/" className="text-decoration-none">
              <CollectionFill size={20} className="mb-1" />
              <small className="d-block fs-small text-black">Produtos</small>
            </Link>
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-decoration-none"
            active={currentPage === 'orders'}
            disabled={!logged}
          >
            <Link href="/orders" className="text-decoration-none">
              <Clipboard2Fill size={20} className="mb-1" />
              <small className="d-block fs-small text-black">Pedidos</small>
            </Link>
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-decoration-none"
            active={currentPage === 'cart'}
            disabled={lengthProductsInCart === 0}
          >
            <Link href="/cart" className="text-decoration-none">
              {lengthProductsInCart === 0 ? (
                <Bag size={20} className="mb-1" />
              ) : (
                <div className="position-relative">
                  <BagFill size={20} className="mb-1" />
                  <Badge bg="warning" className="position-absolute top-50 start-50 translate-middle text-black">
                    {lengthProductsInCart}
                  </Badge>
                </div>
              )}
              <small className="d-block fs-small text-black">Carrinho</small>
            </Link>
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-decoration-none"
            active={currentPage === 'info'}
          >
            <Link href="/info" className="text-decoration-none">
              <InfoCircleFill size={20} className="mb-1" />
              <small className="d-block fs-small text-black">Info</small>
            </Link>
          </Button>
        </Stack>
      </Container>
    </Navbar>
  )
}
