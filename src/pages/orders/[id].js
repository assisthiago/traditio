import { useRouter } from "next/router";

import { Card, Container, ProgressBar, Stack } from "react-bootstrap";

import Layout from "@/components/Layout";
import OrderDetail from "@/components/OrderDetail";

import { ORDERS } from "@/fixtures/models";

export default function Order() {
  const router = useRouter();
  const { id } = router.query;

  const instance = ORDERS[0];

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

  return (
    <>
      <Layout currentPage="orders">
        <Container fluid>
          <ProgressBar
            now={100}
            label={instance.status}
            variant={setStatus(instance.status)}
            animated
            className={"text-uppercase fw-bold shadow " + (instance.status === "entregando" && "text-black")}
            style={{ height: "2rem" }}
          />
          <Stack direction="horizontal" gap={3} className="justify-content-between align-items-center mt-2">
            <p className="m-0">Previsão de entrega:</p>
            <p className="m-0">{instance.delivery_forecast}</p>
          </Stack>
          <Stack direction="horizontal" gap={3} className="justify-content-between align-items-center">
            <p className="m-0">Última atualização:</p>
            <p className="m-0">{instance.delivery_forecast}</p>
          </Stack>
          <hr />
          <div className="mb-3">
            <OrderDetail order={instance} />
          </div>
        </Container>
      </Layout>
    </>
  );
}
