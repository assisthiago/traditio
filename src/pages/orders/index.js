import { useState } from "react";
import { Badge, Button, Card, Container, Offcanvas, Stack } from "react-bootstrap";

import Layout from "@/components/Layout";

import { ORDERS } from "@/fixtures/models";

export default function Orders() {
  const logged = true;

  const [show, setShow] = useState(false);
  const [order, setOrder] = useState(null);

  const handleOrder = (order) => {
    setOrder(order);
    setShow(true);
  };

  const setStatus = (status) => {
    switch (status) {
      case "aguardando":
        return "secondary";
      case "preparando":
        return "primary";
      case "entregando":
        return "warning";
      case "finalizado":
        return "success";
      case "cancelado":
        return "danger";
      default:
        return "secondary";
    }
  }

  const setPaymentMethod = (paymentMethod) => {
    switch (paymentMethod) {
      case "debit":
        return "débito";
      case "credit":
        return "crédito";
      case "cash":
        return "dinheiro";
      default:
        return "PIX";
    }
  }

  return (
    <>
      <Layout logged={logged} currentPage="orders">
        <Container fluid>
          {ORDERS.map((order, index) => (
            <Card key={index} border="light" className="shadow-lg mb-3">
              <Card.Header>
                <Stack direction="horizontal" gap={3} className="justify-content-between">
                  <h5 className="mb-0 small fw-bold"># {order.id}</h5>
                  <Badge
                    bg={setStatus(order.status)}
                    className={"text-capitalize shadow " + (order?.status === "entregando" ? "text-black" : "text-white")}>
                    {order.status}
                  </Badge>
                </Stack>
              </Card.Header>
              <Card.Body className={order?.status === "cancelado" ? "text-decoration-line-through" : ""}>
                <Card.Text className="mb-0">Pedido entregue em:</Card.Text>
                <Card.Text className="mb-0 fw-medium">Rua Jornalista Mario Lisboa 298 - Casa 101 - CEP 21655-460.</Card.Text>
                <Card.Text className="mb-0">Pagamento via <span className="fw-medium">{setPaymentMethod(order?.payment_method)}</span>.</Card.Text>
                <Card.Text className="mb-0">Para <span className="fw-medium">João Sem Braço</span>.</Card.Text>
              </Card.Body>
              <Card.Body className="pt-0">
                <Button
                  variant={order?.status === "cancelado" ? "outline-danger" : "outline-primary"}
                  size="sm"
                  className="me-2 shadow"
                  onClick={() => handleOrder(order)}>Ver pedido</Button>
              </Card.Body>
              <Card.Footer className={order?.status === "cancelado" ? "text-decoration-line-through" : ""}>{order.updated_at}</Card.Footer>
            </Card>
          ))}
        </Container>
      </Layout>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="bottom" className="vh-75">
        <Offcanvas.Header closeButton className="shadow-sm">
          <Offcanvas.Title className="text-uppercase me-3">Pedido # {order?.id}</Offcanvas.Title>
          <Badge bg={setStatus(order?.status)} className="text-capitalize">{order?.status}</Badge>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container
            fluid
            className={"bg-body-tertiary p-3 font-monospace small shadow-lg rounded " + (order?.status === "cancelado" ? "text-decoration-line-through" : "")}
          >
            <p className="mb-0">Pedido em {order?.created_at}.</p>
            <p className="mb-0">Entregue em {order?.updated_at}.</p>
            <p className="mb-0">No endereço {order?.address}.</p>
            <p className="mb-0">Pagamento via {setPaymentMethod(order?.payment_method)}.</p>
            <hr />
            <Stack direction="verital" gap={1}>
              {order?.products.map((product, j, row) => (
                <div key={j} className={'mb-' + (j === row.length - 1 ? '0' : '3')}>
                  <Stack direction="horizontal" gap={3} className="justify-content-between align-items-start mb-2 fw-bold">
                    <p className="mb-0">{product?.quantity}x {product?.name}</p>
                    <p className="mb-0">R${product?.price}</p>
                  </Stack>
                  {product?.additionals.map((additional, k) => (
                    <Stack direction="horizontal" gap={3} className="ms-3 justify-content-between align-items-start" key={k}>
                      <p className="mb-0">{additional.quantity}x {additional.name}</p>
                      <p className="mb-0">R${product?.price}</p>
                    </Stack>
                  ))}
                </div>
              ))}
            </Stack>
            <hr />
            <p>Observação: {order?.observation}.</p>
            <hr />
            <Stack direction="horizontal" gap={3} className="justify-content-between">
              <p className="mb-0">Entrega</p>
              <p className="mb-0">R${order?.delivery_cost}</p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="justify-content-between">
              <p className="mb-0">Total</p>
              <p className="mb-0">R${order?.total}</p>
            </Stack>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
