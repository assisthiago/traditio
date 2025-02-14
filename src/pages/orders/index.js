import { useState } from "react";
import { Badge, Button, Card, Container, Offcanvas, Stack } from "react-bootstrap";

import Layout from "@/components/Layout";

import { ORDERS } from "@/fixtures/orders";

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
      case "finalizado":
        return "success";
      case "cancelado":
        return "danger";
      default:
        return "primary";
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
                  <Badge bg={setStatus(order.status)} className="text-capitalize shadow-sm">{order.status}</Badge>
                </Stack>
              </Card.Header>
              <Card.Body className={order?.status === "cancelado" ? "text-decoration-line-through" : ""}>
                <Card.Text className="mb-0">Pedido entregue em:</Card.Text>
                <Card.Text className="mb-0 fw-medium">Rua Jornalista Mario Lisboa 298 - Casa 101 - CEP 21655-460.</Card.Text>
                <Card.Text className="mb-0">Para <span className="fw-medium">João Sem Braço</span>.</Card.Text>
              </Card.Body>
              <Card.Body className="pt-0">
                <Button variant="primary" className="me-2 shadow" onClick={() => handleOrder(order)}>Ver pedido</Button>
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
            className={"bg-body-tertiary p-3 font-monospace small shadow " + (order?.status === "cancelado" ? "text-decoration-line-through" : "")}
          >
            <p className="mb-0">Pedido em {order?.created_at}.</p>
            <p className="mb-0">Entregue em {order?.updated_at}.</p>
            <p className="mb-0">No endereço {order?.address}.</p>
            <hr />
            <Stack direction="verital" gap={1}>
              {order?.items.map((item, j) => (
                <>
                  <Stack direction="horizontal" gap={3} className="justify-content-between">
                    <p className="mb-0">{item?.quantity}x {item?.name}</p>
                    <p className="mb-0">R$ {item?.price}</p>
                  </Stack>
                  <Stack direction="vertical" gap={0} className="ms-3">
                    <p className="mb-0">1x Aliqua Ut</p>
                    <p className="mb-0">1x Dolor Sit</p>
                    <p className="mb-0">1x Amet Consectetur</p>
                    <p className="mb-0">1x Adipiscing Elit</p>
                  </Stack>
                </>
              ))}
            </Stack>
            <hr />
            <p>Observação: {order?.observation}.</p>
            <hr />
            <Stack direction="horizontal" gap={3} className="justify-content-between">
              <p className="mb-0">Entrega</p>
              <p className="mb-0">R$ {order?.delivery_cost}</p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="justify-content-between">
              <p className="mb-0">Total</p>
              <p className="mb-0">R$ {order?.total}</p>
            </Stack>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
