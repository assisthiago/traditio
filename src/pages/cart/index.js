import { Container, Card, Stack, Button, Form, InputGroup, Offcanvas, FloatingLabel } from "react-bootstrap";

import Layout from "@/components/Layout";

import { CART } from "@/fixtures/models";
import { useState } from "react";
import { TicketPerforatedFill } from "react-bootstrap-icons";

export default function Cart() {
  const logged = true;

  const [showRemoveOffcanvas, setShowRemoveOffcanvas] = useState(false);
  const [showCouponOffcanvas, setShowCouponOffcanvas] = useState(false);
  const [product, setProduct] = useState(null);

  const handleProduct = (product) => {
    setProduct(product);
    setShowRemoveOffcanvas(true);
  };

  return (
    <>
      <Layout logged={logged} currentPage="cart">
        <Container fluid>
          {CART.products.map((product, i) => (
            <Card key={i} border="light" className="shadow-lg mb-3">
              <Card.Header className="small">
                <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                  <Card.Text className="mb-0 fw-bold">{product.name}</Card.Text>
                  <Card.Text className="mb-0">R${product.price}</Card.Text>
                </Stack>
              </Card.Header>
              <Card.Body className="small">
                {product.additionals.map((additional, j) => (
                  <Stack key={j} direction="horizontal" gap={2} className="justify-content-between align-items-start mb-2">
                    <Card.Text className="mb-0">{additional.quantity}x {additional.name}</Card.Text>
                    <Card.Text className="mb-0">R${additional.price}</Card.Text>
                  </Stack>
                ))}
                <hr />
                <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                  <Card.Text className="mb-0">Valor</Card.Text>
                  <Card.Text className="mb-0">R${product.total}</Card.Text>
                </Stack>
              </Card.Body>
              <Card.Footer>
                <Stack direction="horizontal" gap={2} className="justify-content-between">
                  <div className="d-flex justify-content-end w-90px">
                    <InputGroup className="shadow-lg" size="sm">
                      <Button variant="light">-</Button>
                      <Form.Control type="number" className="border-light text-center" value={product.quantity} />
                      <Button variant="primary">+</Button>
                    </InputGroup>
                  </div>
                  <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button variant="outline-danger" size="sm" onClick={() => handleProduct(product)}>
                      Remover
                    </Button>
                    <Button variant="link" size="sm" className="text-decoration-none">
                      Editar
                    </Button>
                  </Stack>
                </Stack>
              </Card.Footer>
            </Card>
          ))}
          <hr />
          <Button
            variant="warning"
            size="sm"
            className="w-100 shadow d-flex justify-content-center align-items-center"
            onClick={() => setShowCouponOffcanvas(true)}
          >
            <TicketPerforatedFill size={20} className="me-2" />
            <span>Aplicar cupom</span>
          </Button>
          <Card className="shadow mt-2 small border-light">
            <Card.Body>
              <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                <Card.Text className="mb-0">Cupom</Card.Text>
                <Card.Text className="mb-0">-R$9999.99</Card.Text>
              </Stack>
            </Card.Body>
          </Card>
          <hr />
          <Card className="shadow border-light mb-2">
            <Card.Header className="small">Resumo</Card.Header>
            <Card.Body>
              <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                <Card.Text className="mb-0">Entrega</Card.Text>
                <Card.Text className="mb-0">R$9999.99</Card.Text>
              </Stack>
              <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                <Card.Text className="mb-0 fw-bold">Total</Card.Text>
                <Card.Text className="mb-0 fw-bold">R$9999.99</Card.Text>
              </Stack>
            </Card.Body>
            <Card.Footer className="small">
              Deseja finalizar compra?
            </Card.Footer>
          </Card>
          <Button variant="primary" className="w-100 shadow-lg mb-3">Finalizar compra</Button>
        </Container>
      </Layout>

      {/* Remove */}
      <Offcanvas show={showRemoveOffcanvas} onHide={() => setShowRemoveOffcanvas(false)} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Deseja remover este produto?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p><small className="text-muted">{product?.quantity} unidade(s)</small> de <strong>{product?.name}</strong>.</p>
          <Button variant="danger" size="sm" className="w-100 shadow" onClick={() => setShowRemoveOffcanvas(false)}>Remover</Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Coupon */}
      <Offcanvas show={showCouponOffcanvas} onHide={() => setShowCouponOffcanvas(false)} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Deseja aplicar um cupom?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FloatingLabel controlId="coupon" label="Cupom" className="mb-3">
            <Form.Control type="text" placeholder="Digite o cupom" />
          </FloatingLabel>
          <Button variant="warning" size="sm" className="w-100 shadow" onClick={() => setShowCouponOffcanvas(false)}>Aplicar</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
