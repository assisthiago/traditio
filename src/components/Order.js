import { Container, Stack } from "react-bootstrap";

export default function Order({ order }) {
  return (
    <Container
      fluid
      className={"bg-body-tertiary p-3 font-monospace small shadow " + (order?.status === "cancelado" ? "text-decoration-line-through" : "")}
    >
      {order?.id && (
        <>
          <p className="mb-0">Pedido em {order?.created_at}.</p>
          <p className="mb-0">Entregue em {order?.updated_at}.</p>
          <p className="mb-0">No endereço {order?.address}.</p>
          <hr />
        </>
      )}
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
  );
}
