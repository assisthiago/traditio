'use client';

import {
  Container,
  Card,
  Stack,
  Button,
  Form,
  InputGroup,
  Offcanvas,
  FloatingLabel,
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

import Layout from "@/components/Layout";

// import { CART } from "@/fixtures/models";
import { useEffect, useState } from "react";
import { BagFill, InfoCircleFill, TicketPerforatedFill, Trash } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter()

  // States and Effect
  const [showRemoveOffcanvas, setShowRemoveOffcanvas] = useState(false);
  const [showCouponOffcanvas, setShowCouponOffcanvas] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);
  const [key, setKey] = useState('card');

  useEffect(() => {
    const _order = JSON.parse(localStorage.getItem('order'));
    if (!order) setOrder(_order);

    const _address = JSON.parse(localStorage.getItem('address'));
    if (_address) setAddress(_address);
  }, [order]);

  // Handlers
  const handleOrder = () => {
    // router.push('/orders/1');
  };

  const handleDeleteProduct = () => {
    const products = order.products.filter((item) => item.id !== product.id);  // Remove product from order
    setOrder({
      ...order,
      products: products,
    });
    let _order = order;
    _order.products = products;
    localStorage.setItem('order', JSON.stringify(_order));
    setProduct(null);
    setShowRemoveOffcanvas(false);
  };

  const handlePaymentMethod = (value, type) => {
    if (type === "card") {
      setPayment({
        ...payment,
        card: value,
        flag: "",
        money: "",
        change: "",
      });
    }
    else if (type === "flag") {
      setPayment({
        ...payment,
        flag: value,
        money: "",
        change: "",
      });
    }
    else if (type === "money") {
      setPayment({
        ...payment,
        money: value,
        change: value === "cash" ? 0 : "",
        card: "",
        flag: "",
      });
    }
  }

  // Functions
  const calcPrice = (price, quantity, orderQuantity = 1) => {
    const _price = parseFloat(price);
    const _quantity = parseInt(quantity);
    const _orderQuantity = parseInt(orderQuantity);
    return parseFloat((_price * _quantity) * _orderQuantity).toFixed(2);
  }

  const calcOrderPrice = () => {
    const _products = order?.products?.map((product) => parseFloat(product.total));
    if (!_products) return 0;
    const _total = _products.reduce((acc, curr) => acc + curr, 0);
    return parseFloat(_total).toFixed(2);
  }

  return (
    <>
      <Layout currentPage="cart">
        <Container fluid>

          {/* Orders */}
          {order?.products.map((product, i) => (
            <Card key={i} border="light" className="shadow-lg mb-3">
              <Card.Header className="small">
                <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                  <Card.Text className="mb-0 fw-bold">{product.quantity}x {product.name}</Card.Text>
                  <Card.Text className="mb-0">R${calcPrice(product.price, product.quantity)}</Card.Text>
                </Stack>
              </Card.Header>
              <Card.Body className="small">
                {product.additionals.map((additional, j) => (
                  <Stack key={j} direction="horizontal" gap={2} className="justify-content-between align-items-start">
                    <Card.Text className="mb-0">{additional.quantity}x {additional.name}</Card.Text>
                    <Card.Text className="mb-0">R${calcPrice(additional.price, additional.quantity, product.quantity)}</Card.Text>
                  </Stack>
                ))}
                <hr />
                {product?.observation && (
                  <>
                    <p className="m-0">Observação:</p>
                    <p className="m-0 fw-semibold">{product?.observation}</p>
                    <hr />
                  </>
                )}
                <Stack direction="horizontal" gap={2} className="justify-content-between align-items-center">
                  <Card.Text className="mb-0">Valor</Card.Text>
                  {product.quantity > 1 ? (
                    <Stack direction="horizontal" gap={2} className="justify-content-between align-items-center">
                      <OverlayTrigger
                        trigger="click"
                        placement="auto"
                        rootClose
                        delay={{ show: 250, hide: 150 }}
                        overlay={
                          <Tooltip id="tooltip" key={i}>
                            O valor de cada adicional está sendo multiplicado por <strong>{product.quantity}x</strong>, de acordo com a quantidade escolhida do produto.
                          </Tooltip>
                        }
                      >
                        <Card.Text className="mb-0">
                          <Button
                            variant="link"
                            size="sm"
                            className="d-flex justify-content-center align-items-center text-decoration-none"
                          >
                            <InfoCircleFill size={16} className="me-1" />
                            <span className="text-black">R${product.total}</span>
                          </Button>
                        </Card.Text>
                      </OverlayTrigger>
                    </Stack>
                  ) : (
                    <Card.Text className="mb-0">
                      <span className="text-black">R${product.total}</span>
                    </Card.Text>
                  )}

                </Stack>
              </Card.Body>
              <Card.Footer>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                  <Button
                    variant="link"
                    size="sm"
                    className="d-flex justify-content-center align-items-center link-danger text-decoration-none"
                    onClick={() => {
                      setProduct(product);
                      setShowRemoveOffcanvas(true);
                    }}>
                    <Trash size={20} color="red" className="me-1" />
                    Remover
                  </Button>
                </Stack>
              </Card.Footer>
            </Card>
          ))}

          <hr />

          {/* Coupon */}
          <>
            <Button
              variant="warning"
              size="sm"
              className="w-100 shadow d-flex justify-content-center align-items-center"
              onClick={() => setShowCouponOffcanvas(true)}
            >
              <TicketPerforatedFill size={20} className="me-2" />
              <span>Aplicar cupom</span>
            </Button>
            {coupon && (
              <Card className="shadow mt-2 small border-light">
                <Card.Body>
                  <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                    <Card.Text className="mb-0 text-uppercase">{coupon.name}</Card.Text>
                    <Card.Text className="mb-0">-R{coupon.discount}</Card.Text>
                  </Stack>
                </Card.Body>
              </Card>
            )}
          </>

          <hr />

          {/* Address */}
          <Card className="shadow border-light small">
            <Card.Header className="small">Endereço de entrega</Card.Header>
            <Card.Body>
              {address ? (
                <>
                  <Card.Text className="mb-0">{address.street}, {address.number}</Card.Text>
                  <Card.Text className="mb-0">
                    {address.neighborhood}, {address.city} - {address.state}
                  </Card.Text>
                  <Card.Text className="mb-0">CEP: {address.zip_code}</Card.Text>
                </>
              ) : (
                <>
                  <Card.Text className="mb-0">Nenhum endereço informado.</Card.Text>
                  <Card.Text className="mb-0">Encontre seu endereço para entrega.</Card.Text>
                </>
              )}
            </Card.Body>
          </Card>

          <hr />

          {/* Payment */}
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
                        <Form.Select
                          aria-label="Selecione o modo de pagamento"
                          className="shadow border-light"
                          onChange={(e) => handlePaymentMethod(e.target.value, "card")}
                          value={payment?.card}
                        >
                          <option value="">N/A</option>
                          <option value="debit">Débito</option>
                          <option value="credit">Crédito</option>
                          <option value="vr">Vale-refeição</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="flag" label="Selecione a bandeira do cartão">
                        <Form.Select
                          aria-label="Selecione a bandeira do cartão"
                          className="shadow border-light"
                          onChange={(e) => handlePaymentMethod(e.target.value, "flag")}
                          value={payment?.flag}
                          disabled={!payment?.card}
                        >
                          <option value="">N/A</option>
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
                        <Form.Select
                          aria-label="Selecione o modo de pagamento"
                          className="shadow border-light"
                          onChange={(e) => handlePaymentMethod(e.target.value, "money")}
                          value={payment?.money}
                        >
                          <option value="">N/A</option>
                          <option value="pix">PIX</option>
                          <option value="cash">Dinheiro</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel controlId="money" label="Digite o valor do troco" className="shadow border-light">
                        <Form.Control
                          type="text"
                          placeholder="Digite o valor do troco"
                          onChange={(e) => setPayment({ ...payment, change: e.target.value })}
                          value={payment?.change}
                          disabled={payment?.money !== "cash"}
                        />
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
          <Card className="shadow border-light mb-3">
            <Card.Header className="small">Resumo</Card.Header>
            <Card.Body>
              <Card.Text className="mb-0">Previsão de entrega: 00:00 - 00:00.</Card.Text>
              <hr />
              <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                <Card.Text className="mb-0 text-decoration-line-through">Entrega</Card.Text>
                <Card.Text className="mb-0 text-decoration-line-through">R$0.00</Card.Text>
              </Stack>
              <Stack direction="horizontal" gap={2} className="justify-content-between align-items-start">
                <Card.Text className="mb-0 fw-bold">Total</Card.Text>
                <Card.Text className="mb-0 fw-bold">R${calcOrderPrice()}</Card.Text>
              </Stack>
            </Card.Body>
            <Card.Footer className="small">
              Deseja finalizar compra?
            </Card.Footer>
          </Card>
          <Button
            variant="primary"
            className="w-100 shadow-lg mb-3 d-flex justify-content-center align-items-center"
            onClick={handleOrder}>
            <BagFill size={20} className="me-2" />
            Finalizar compra
          </Button>
        </Container>
      </Layout>

      {/* Remove */}
      <Offcanvas show={showRemoveOffcanvas} onHide={() => setShowRemoveOffcanvas(false)} placement="bottom">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Deseja remover este produto?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            <small className="text-muted">
              {product?.quantity} unidade(s) de
            </small>
            <strong className="ms-1">{product?.name}</strong>.
          </p>
          <Button
            variant="danger"
            size="sm"
            className="w-100 shadow d-flex justify-content-center align-items-center"
            onClick={handleDeleteProduct}>
            <Trash size={20} className="me-1" />
            Remover
          </Button>
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
