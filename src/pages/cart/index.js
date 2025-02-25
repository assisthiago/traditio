'use client';

import { Container, Card, Stack, Button, Form, InputGroup, Offcanvas, FloatingLabel, Tabs, Tab } from "react-bootstrap";

import Layout from "@/components/Layout";

import { CART } from "@/fixtures/models";
import { useState } from "react";
import { TicketPerforatedFill } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";

export default function Cart() {
  const logged = true;
  const router = useRouter()

  const [showRemoveOffcanvas, setShowRemoveOffcanvas] = useState(false);
  const [showCouponOffcanvas, setShowCouponOffcanvas] = useState(false);
  const [product, setProduct] = useState(null);
  const [key, setKey] = useState('card');

  const handleProduct = (product) => {
    setProduct(product);
    setShowRemoveOffcanvas(true);
  };

  const handleCart = () => {
    router.push('/orders/1');
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
          <Card className="shadow border-light small">
            <Card.Header className="small">Endereço de entrega</Card.Header>
            <Card.Body>
              <Card.Text className="mb-0">Lorem Ipsum Dolor Sit Amet, 9999</Card.Text>
              <Card.Text className="mb-0">Lorem Ipsum - SA</Card.Text>
              <Card.Text className="mb-0">CEP: 99999-999</Card.Text>
            </Card.Body>
          </Card>
          <hr />
          <Card className="shadow border-light small">
            <Card.Header className="small">Pagamento</Card.Header>
            <Card.Body>
              <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                justify
              >
                <Tab eventKey="card" title="Cartão">
                  <Card className="border-top-0 rounded-top-0">
                    <Card.Body>
                      <FloatingLabel controlId="card" label="Selecione o modo de pagamento" className="mb-2">
                        <Form.Select aria-label="Selecione o modo de pagamento" className="shadow border-light">
                          <option value="debit">Débito</option>
                          <option value="credit">Crédito</option>
                          <option value="vr">Vale-refeição</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="card" label="Selecione a bandeira do cartão">
                        <Form.Select aria-label="Selecione a bandeira do cartão" className="shadow border-light">
                          <option value="master">Mastercard</option>
                          <option value="visa">Visa</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Card.Body>
                  </Card>
                </Tab>
                <Tab eventKey="money" title="PIX | Dinheiro">
                  <Card className="border-top-0 rounded-top-0">
                    <Card.Body>
                      <FloatingLabel controlId="card" label="Selecione o modo de pagamento" className="mb-2">
                        <Form.Select aria-label="Selecione o modo de pagamento" className="shadow border-light">
                          <option value="pix">PIX</option>
                          <option value="money">Dinheiro</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="money" label="Digite o valor do troco" className="shadow border-light">
                        <Form.Control type="text" placeholder="Digite o valor do troco" disabled />
                      </FloatingLabel>
                    </Card.Body>
                  </Card>
                </Tab>
              </Tabs>
            </Card.Body>
            <Card.Footer>
              Pagamento será feito na entrega.
            </Card.Footer>
          </Card>
          <hr />
          <Card className="shadow border-light mb-2">
            <Card.Header className="small">Resumo</Card.Header>
            <Card.Body>
              <Card.Text className="mb-0">Previsão de entrega: 00:00 - 00:00.</Card.Text>
              <hr />
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
          <Button variant="primary" className="w-100 shadow-lg mb-3" onClick={handleCart}>Finalizar compra</Button>
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
